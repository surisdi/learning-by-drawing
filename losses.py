import numpy as np
import torch

import utils


def hard_negative_loss(image_outputs, audio_outputs, nframes, margin, symfun):
    """
    Computes the triplet margin ranking loss for each anchor image/caption pair using the hardes sample from the
    positive images batch
    """
    # I = image_outputs.view(image_outputs.size(0), embedding_dim)
    # A = audio_outputs.view(audio_outputs.size(0), embedding_dim)
    n = image_outputs.size(0)

    with torch.no_grad():
        N = image_outputs.size(0)
        similarity_loss = torch.zeros(N, N, requires_grad=False).type(image_outputs.data.type())
        D = image_outputs.size(1)
        H = image_outputs.size(2)
        W = image_outputs.size(3)
        T = audio_outputs.size(3)
        image_outputs_hard = image_outputs.detach()
        audio_outputs_hard = audio_outputs.detach()
        image_outputs_hard = image_outputs_hard.view(N, 1, D, H, W).expand(N, N, D, H, W).contiguous().view(-1, D, H, W)
        audio_outputs_hard = audio_outputs_hard.view(1, N, D, 1, T).expand(N, N, D, 1, T).contiguous().view(-1, D, 1, T)
        match_hard = utils.compute_matchmap_vectorized(image_outputs_hard, audio_outputs_hard).view(N, N, H, W, T)
        match_hard, _ = match_hard.max(3)
        match_hard, _ = match_hard.max(2)
        for i in range(N):
            similarity_loss[:, i] = match_hard[:, i, 0:nframes[i]].mean(1)

    loss = torch.zeros(1, requires_grad=True).type(image_outputs.data.type())
    for i in range(n):
        _, rank_image = torch.topk(similarity_loss[:, i], 3)
        _, rank_audio = torch.topk(similarity_loss[i, :], 3)

        I_imp_ind = rank_image[0]
        A_imp_ind = rank_audio[0]
        if I_imp_ind == i:
            I_imp_ind = rank_image[1]

        if A_imp_ind == i:
            A_imp_ind = rank_audio[1]

        nF = nframes[i]
        if A_imp_ind < nframes.size(0):
            nFimp = nframes[A_imp_ind]
        else:
            nFimp = 16

        anchorsim = utils.matchmap_sim(utils.compute_matchmap(image_outputs[i], audio_outputs[i][:, :, 0:nF], symfun))
        Iimpsim = utils.matchmap_sim(
            utils.compute_matchmap(image_outputs[I_imp_ind], audio_outputs[i][:, :, 0:nF], symfun))
        Aimpsim = utils.matchmap_sim(
            utils.compute_matchmap(image_outputs[i], audio_outputs[A_imp_ind][:, :, 0:nFimp], symfun))
        A2I_simdif = margin + Iimpsim - anchorsim

        if (A2I_simdif.data > 0).all():
            loss = loss + A2I_simdif
        I2A_simdif = margin + Aimpsim - anchorsim

        if (I2A_simdif.data > 0).all():
            loss = loss + I2A_simdif

    loss = loss / n
    return loss


def sampled_margin_rank_loss(image_outputs, audio_outputs, nframes, margin, symfun):
    """
    Computes the triplet margin ranking loss for each anchor image/caption pair
    The impostor image/caption is randomly sampled from the minibatch
    """
    # I = image_outputs.view(image_outputs.size(0), embedding_dim)
    # A = audio_outputs.view(audio_outputs.size(0), embedding_dim)
    n = image_outputs.size(0)

    loss = torch.zeros(1, requires_grad=True).type(image_outputs.data.type())

    for i in range(n):
        I_imp_ind = i
        A_imp_ind = i
        while I_imp_ind == i:
            I_imp_ind = np.random.randint(0, n)
        while A_imp_ind == i:
            A_imp_ind = np.random.randint(0, n)
        nF = nframes[i]
        nFimp = nframes[A_imp_ind]

        anchorsim = utils.matchmap_sim(
            utils.compute_matchmap(image_outputs[i], audio_outputs[i][:, :, 0:nF], symfun))
        Iimpsim = utils.matchmap_sim(
            utils.compute_matchmap(image_outputs[I_imp_ind], audio_outputs[i][:, :, 0:nF], symfun))
        Aimpsim = utils.matchmap_sim(
            utils.compute_matchmap(image_outputs[i], audio_outputs[A_imp_ind][:, :, 0:nFimp], symfun))

        A2I_simdif = margin + Iimpsim - anchorsim
        if (A2I_simdif.data > 0).all():
            loss = loss + A2I_simdif

        I2A_simdif = margin + Aimpsim - anchorsim
        if (I2A_simdif.data > 0).all():
            loss = loss + I2A_simdif

    loss = loss / n
    return loss


def negatives_loss(image_outputs, audio_outputs, negatives_output, nframes, margin, symfun):
    """
    Computes the triplet margin ranking loss for each anchor image/caption pair using the specific negative
    """
    # I = image_outputs.view(image_outputs.size(0), embedding_dim)
    # A = audio_outputs.view(audio_outputs.size(0), embedding_dim)
    # num_negatives = len(negatives_output)
    num_units = image_outputs.size(1)

    n = image_outputs.size(0)
    loss = torch.zeros(1, requires_grad=True).type(image_outputs.data.type())
    first = 0
    last = num_units
    # first = (j*num_units)//num_negatives
    # last = ((j+1)*num_units)//num_negatives
    for i in range(n):
        nF = nframes[i]
        anchorsim = utils.matchmap_sim(
            utils.compute_matchmap(image_outputs[i][first:last], audio_outputs[i][first:last, :, 0:nF], symfun))
        Aimpsim = utils.matchmap_sim(
            utils.compute_matchmap(negatives_output[i][first:last], audio_outputs[i][first:last, :, 0:nF], symfun))
        I2A_simdif = margin + Aimpsim - anchorsim
        if (I2A_simdif.data > 0).all():
            loss = loss + I2A_simdif

    loss = loss / n
    return loss


def vectorized_negatives_loss(image_outputs, audio_outputs, negatives_output, nframes, margin, symfun):
    """
    Computes the triplet margin ranking loss for each anchor image/caption pair using the specific negative, in a
    vectorized way
    """
    # I = image_outputs.view(image_outputs.size(0), embedding_dim)
    # A = audio_outputs.view(audio_outputs.size(0), embedding_dim)
    # num_negatives = len(negatives_output)
    num_units = image_outputs.size(1)
    output_loss = []

    n = image_outputs.size(0)
    loss = torch.zeros(1, requires_grad=True).type(image_outputs.data.type())
    first = 0
    last = num_units
    # first = (j*num_units)//num_negatives
    # last = ((j+1)*num_units)//num_negatives
    for i in range(n):
        nF = nframes[i]
        anchorsim = utils.matchmap_sim(
            utils.compute_matchmap(image_outputs[i][first:last], audio_outputs[i][first:last, :, 0:nF], symfun))
        Aimpsim = utils.matchmap_sim(
            utils.compute_matchmap(negatives_output[i][first:last], audio_outputs[i][first:last, :, 0:nF], symfun))
        I2A_simdif = margin + Aimpsim - anchorsim
        output_loss.append(I2A_simdif)

    return output_loss


def combined_random_hard_negative_loss(image_outputs, audio_outputs, negatives_output, nframes, margin, symfun):
    """
    Computes the triplet margin ranking loss for each anchor image/caption pair using both the hardes negative in the
    positive images batch, and also the specific negative for the image. Returns the highest of the two losses for each
    sample
    """
    # I = image_outputs.view(image_outputs.size(0), embedding_dim)
    # A = audio_outputs.view(audio_outputs.size(0), embedding_dim)
    n = image_outputs.size(0)

    with torch.no_grad():
        N = image_outputs.size(0)
        similarity_loss = torch.zeros(N, N, requires_grad=False).type(image_outputs.data.type())
        D = image_outputs.size(1)
        H = image_outputs.size(2)
        W = image_outputs.size(3)
        T = audio_outputs.size(3)
        image_outputs_hard = image_outputs.detach()
        audio_outputs_hard = audio_outputs.detach()
        image_outputs_hard = image_outputs_hard.view(N, 1, D, H, W).expand(N, N, D, H, W).contiguous().view(-1, D, H, W)
        audio_outputs_hard = audio_outputs_hard.view(1, N, D, 1, T).expand(N, N, D, 1, T).contiguous().view(-1, D, 1, T)
        match_hard = utils.compute_matchmap_vectorized(image_outputs_hard, audio_outputs_hard).view(N, N, H, W, T)
        match_hard, _ = match_hard.max(3)
        match_hard, _ = match_hard.max(2)
        for i in range(N):
            similarity_loss[:, i] = match_hard[:, i, 0:nframes[i]].mean(1)

    loss = torch.zeros(1, requires_grad=True).type(image_outputs.data.type())
    for i in range(n):
        if n >= 2:
            _, rank_image = torch.topk(similarity_loss[:, i], 2)
            _, rank_audio = torch.topk(similarity_loss[i, :], 2)
            I_imp_ind = rank_image[0]
            A_imp_ind = rank_audio[0]
            if I_imp_ind == i:
                I_imp_ind = rank_image[1]

            if A_imp_ind == i:
                A_imp_ind = rank_audio[1]

            I_imp_ind = max(min(image_outputs.size(0) - 1, I_imp_ind), 0)
            A_imp_ind = max(min(image_outputs.size(0) - 1, A_imp_ind), 0)
        else:
            I_imp_ind = 0
            A_imp_ind = 0

            # I_imp_ind = max(min(image_outputs.size(0)-1,I_imp_ind),0)
            # A_imp_ind =max(min(image_outputs.size(0)-1,A_imp_ind),0)

        nF = nframes[i]
        if A_imp_ind < nframes.size(0):
            nFimp = nframes[A_imp_ind]
        else:
            nFimp = 16

        anchorsim = utils.matchmap_sim(utils.compute_matchmap(image_outputs[i], audio_outputs[i][:, :, 0:nF], symfun))
        Iimpsim = utils.matchmap_sim(
            utils.compute_matchmap(image_outputs[I_imp_ind], audio_outputs[i][:, :, 0:nF], symfun))
        Aimpsim = utils.matchmap_sim(
            utils.compute_matchmap(image_outputs[i], audio_outputs[A_imp_ind][:, :, 0:nFimp], symfun))
        A2I_simdif = margin + Aimpsim - anchorsim

        anchorsim_neg = utils.matchmap_sim(
            utils.compute_matchmap(image_outputs[i], audio_outputs[i][:, :, 0:nF], symfun))
        Iimpsim_neg = utils.matchmap_sim(
            utils.compute_matchmap(negatives_output[i], audio_outputs[i][:, :, 0:nF], symfun))
        I2A_simdif_neg = margin + Iimpsim_neg - anchorsim_neg

        if (A2I_simdif.data > 0).all():
            loss = loss + A2I_simdif

        I2A_simdif = margin + Iimpsim - anchorsim
        if (torch.max(I2A_simdif.data,I2A_simdif_neg.data) > 0).all():
            loss = loss + torch.max(I2A_simdif, I2A_simdif_neg)

    loss = loss / n
    return loss


def combined_random_sampled_margin_rank_loss(image_outputs, audio_outputs, negatives_output, nframes, margin, symfun):
    """
    Computes the triplet margin ranking loss for each anchor image/caption pair using both a random negative from the
    positive images batch, and also the specific negative for the image. The returned loss for each sample is the
    highest of the two
    """
    # I = image_outputs.view(image_outputs.size(0), embedding_dim)
    # A = audio_outputs.view(audio_outputs.size(0), embedding_dim)
    n = image_outputs.size(0)

    loss = torch.zeros(1, requires_grad=True).type(image_outputs.data.type())

    for i in range(n):
        I_imp_ind = i
        A_imp_ind = i
        while I_imp_ind == i:
            I_imp_ind = np.random.randint(0, n)
        while A_imp_ind == i:
            A_imp_ind = np.random.randint(0, n)
        nF = nframes[i]
        nFimp = nframes[A_imp_ind]

        anchorsim = utils.matchmap_sim(
            utils.compute_matchmap(image_outputs[i], audio_outputs[i][:, :, 0:nF], symfun))
        Iimpsim = utils.matchmap_sim(
            utils.compute_matchmap(image_outputs[I_imp_ind], audio_outputs[i][:, :, 0:nF], symfun))
        Aimpsim = utils.matchmap_sim(
            utils.compute_matchmap(image_outputs[i], audio_outputs[A_imp_ind][:, :, 0:nFimp], symfun))

        anchorsim_neg = utils.matchmap_sim(
            utils.compute_matchmap(image_outputs[i], audio_outputs[i][:, :, 0:nF], symfun))
        Iimpsim_neg = utils.matchmap_sim(
            utils.compute_matchmap(negatives_output[i], audio_outputs[i][:, :, 0:nF], symfun))
        I2A_simdif_neg = margin + Iimpsim_neg - anchorsim_neg

        A2I_simdif = margin + Aimpsim - anchorsim
        if (A2I_simdif.data > 0).all():
            loss = loss + A2I_simdif

        I2A_simdif = margin + Iimpsim - anchorsim
        if (torch.max(I2A_simdif.data,I2A_simdif_neg.data) > 0).all():        
            loss = loss + torch.max(I2A_simdif, I2A_simdif_neg)

    loss = loss / n
    return loss
