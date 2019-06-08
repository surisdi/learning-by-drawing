import $ from 'jquery';
import * as d3 from 'd3'
import "d3-selection-multi";

import '../css/pt2.scss'


import "!file-loader?name=pt2.html!../pt2.html";
import {SimpleEventHandler} from "./etc/SimpleEventHandler";
import {GlobalEvents} from "./etc/GlobalVars";
import URLHandler from "./etc/URLHandler";
import {ExampleView, ExampleViewMouseEvent} from "./vis/ExampleView";


import * as PS from "paint_select";
import {GanterAPI, ImageMask} from "./api/GanterAPI";
import {PaintSelectView} from "./vis/PaintSelectView";
import {argsort} from "./etc/Util";


let exampleIDs = d3.range(0, 60);


const global = {
    sidebar: () => (<Element>d3.select('.sidenav').node())
        .getBoundingClientRect().width
};

const current = {
    project: "",
    indexSort: d3.range(100),
    layer: () => (<HTMLSelectElement>d3.select("#layer_selector").node()).value,
    single_ngram:()=> +(<HTMLInputElement> d3.select("#unitSingleAbNgram").node()).value
}


window.onload = () => {
    const eventHandler = new SimpleEventHandler(<Element>d3.select('body').node());

    const project_selector = d3.select('#project_selector');
    const main_view_sel = d3.select('.floating_content');
    const exampleView = new ExampleView(main_view_sel.select('.ablation_examples'), eventHandler)
    exampleView.imgWidth = 50;


    const psv = new PaintSelectView(d3.select('#paint_image'), eventHandler);
    d3.select("#reset_mask_btn").on("click", () => psv.reset())
    const compare_img = d3.select('#compare_img');


    const minExInput = d3.select('#minEx');
    const noExInput = d3.select('#noEx');
    const abNoInput = d3.select("#noAb");


    const start_params = URLHandler.parameters;

    GanterAPI.allProjects()
        .then((projects) => {

            const project_selected = start_params['project'];

            let options = project_selector
                .selectAll('option').data(projects);
            options.exit().remove();
            options.enter().append('option')
                .merge(options)
                .attr('value', d => d.project).text(d => d.project)
                .property('selected', d => d.project === project_selected);

            projectChange(project_selector.property('value'));

        });

    project_selector.on('change', d => {
        projectChange(project_selector.property('value'));
    });


    function projectChange(project) {
        console.log(project, "--- project");
        current.project = project;
        URLHandler.updateURLParam('project', project, false);
        // GanterAPI.ablationChannels(project)
        //     .then((data) => {
        //         //     ablationView.update(data.res);
        //         //
        //         //     barchartTest.update({
        //         //         ids: [], values: data.res.ablation
        //         //
        //         //     })
        //         //
        //         //     recipes = {};
        //         //     d3.json(`/api/recipes?project=${project}`)
        //         //         .then((data: APIRes_Recipes) => {
        //         //             console.log(data.res, "--- data.res");
        //         //             data.res.forEach(rec => recipes[rec.name] = rec);
        //         //
        //         //             d3.select('.recipes').selectAll('option').remove();
        //         //             d3.select('.recipes').selectAll('option')
        //         //                 .data(data.res).enter().append('option').attrs({
        //         //                 value: d => d.name
        //         //             }).text(d => d.name)
        //         //                 .property('selected', d => d.name === start_params['recipe']);
        //         //
        //         //
        //         //             d3.select(".apply_rec_btn")
        //         //                 .style('opacity', 1)
        //         //                 .style('pointer-events', null)
        //         //             ;
        //         //
        //         //             if ('recipe' in start_params) {
        //         //                 applyRecipe();
        //         //             }
        //         //
        //         //
        //         //         })
        //         //
        //         //
        //     })

        generateSamples();
    }

    minExInput.on('input', () => {
        URLHandler.updateURLParam('minEx', (<HTMLInputElement>minExInput.node()).value);
        generateSamples();
    })

    noExInput.on('input', () => {
        URLHandler.updateURLParam('noEx', (<HTMLInputElement>noExInput.node()).value);
        generateSamples();
    })


    function generateSamples() {

        const url_p = URLHandler.parameters;

        let minEx = +(<HTMLInputElement>minExInput.node()).value;
        let noEx = +(<HTMLInputElement>noExInput.node()).value;
        if ('minEx' in url_p) {
            minEx = +url_p['minEx'];
            (<HTMLInputElement>minExInput.node()).value = '' + minEx;
        }
        if ('noEx' in url_p) {
            noEx = +url_p['noEx'];
            (<HTMLInputElement>noExInput.node()).value = '' + noEx;
        }


        exampleIDs = d3.range(minEx, minEx + noEx);

        console.log(exampleIDs, "--- exampleIDs");

        GanterAPI.generateImgs(current.project, exampleIDs)
            .then((data) => {
                exampleView.update({orig: data})
                //
            })

    }


    window.onresize = () => {
        const w = window.innerWidth;
        const h = window.innerHeight;
        // console.log(w, h, "--- w,h");

        re_layout(w, h);


    };

    function re_layout(w, h) {
        d3.selectAll('.sidenav')
            .style('height', (h - 45) + 'px')

        d3.selectAll('.main_frame')
            .style('height', (h - 45) + 'px')
            .style('width', (w - 300) + 'px')

        eventHandler.trigger(GlobalEvents.window_resize, {w, h})

        eventHandler.trigger(GlobalEvents.main_resize, {
            w: (w - global.sidebar()),
            h: (h - 45)
        })

    }

    re_layout(window.innerWidth, window.innerHeight);

    function displayDetails(imgList) {
        const dt = d3.select('.sidenav .detail_img');
        if (imgList) {
            dt.html(imgList
                .map(img => `<img src="${img}" width="${global.sidebar() - 10}">`)
                .join('<br>'))
        } else {
            dt.html(`<svg width="${global.sidebar() - 10}" height="${global.sidebar() - 10}">`)
        }
    }


    eventHandler.bind(ExampleView.events.hovered_image_pair, (d: ExampleViewMouseEvent) => {

        if (d.hovered) {
            displayDetails(d.images.map(img => img.d))
        } else {
            displayDetails(null)
        }
    })


    eventHandler.bind(ExampleView.events.clicked_image_pair, (d: ExampleViewMouseEvent) => {
        console.log(d, "--- d");

        const img = new Image();
        img.onload = () => {
            psv.update({
                image: img,
                imageID: ''+d.images[0].id
            })
        };
        img.src = d.images[0].d;


    })


    abNoInput.on('input', () => {
        URLHandler.updateURLParam('noAb', (<HTMLInputElement>abNoInput.node()).value);
        generateCompare();
    });


    function generateCompare() {
        const url_p = URLHandler.parameters;
        if ('noAb' in url_p) {
            (<HTMLInputElement>abNoInput.node()).value = url_p['noAb'];
        } else {
            URLHandler.updateURLParam('noAb', (<HTMLInputElement>abNoInput.node()).value);
        }
        const noAb = +(<HTMLInputElement>abNoInput.node()).value;


        GanterAPI.generateImgs(current.project,
            [psv.imageID],
            0,
            current.indexSort.slice(0, noAb).map(d => ({
                alpha: 1,
                layer: current.layer(),
                unit: d
            }))
        ).then((abImage) => {
                console.log(abImage, "--- abimage");
                compare_img.html(`<img src="${abImage.res[0].d}" width="200%"/>`)
            }
        )
    }


    eventHandler.bind(PaintSelectView.events.maskChanged, (mask: ImageMask) => {


        GanterAPI.generateFeatures(
            current.project,
            [mask],
            [current.layer()]
        ).then((data) => {
                console.log(data.res, "--- values");

                const indexSort = argsort(data.res[current.layer()].max, (a, b) => b - a);

                current.indexSort = indexSort;

                GanterAPI.units(current.project, current.layer()).then(
                    (data) => {
                        console.log(data.res, "--- units");
                        const units = d3.select("#units").selectAll(".units").data(indexSort);
                        units.exit().remove();

                        const unitsEnter = units.enter().append('img').attr('class', 'units');

                        unitsEnter.merge(units).attrs({
                            src: im_index => data.res[im_index].img,
                            width: 50
                        })


                    }
                )

                generateCompare();


            }
        )


    })


    async function requestAll(indices, cummulative = true, everyUnit = 10, unitStepSize = 10, callback: (img: string, index?: number) => any = null) {

        const res = [];

        let indis = [...d3.range(0, everyUnit)];
        if (unitStepSize > 0) {
            indis = [...indis, ...d3.range(everyUnit, indices.length, unitStepSize)];
        }


        for (const i of indis) {
            console.log(indices.slice(0, i), "--- indices.slice(0, i)");

            let layers = [];
            if (cummulative) {
                layers = indices.slice(0, i).map(d => ({
                    alpha: 1,
                    layer: current.layer(),
                    unit: d
                }))
            } else {
                // layers = [{
                //     alpha: 1,
                //     layer: current.layer(),
                //     unit: indices[i]
                // }]

                layers = indices.map((d,ii) => ({
                    alpha: ((i - current.single_ngram() < ii) && (ii <= i)) ? 0 : 1,
                    layer: current.layer(),
                    unit: d
                }))
            }

            const img = await GanterAPI.generateImgs(current.project,
                [psv.imageID],
                0,
                layers
            );

            if (callback && cummulative) callback(img.res[0].d, i);
            if (callback && !cummulative) callback(img.res[0].d, indices[i]);
            res.push(img.res[0]);
        }

        return res;
    }


    d3.select("#unitAbBtn").on('click', () => {

        const unitAb = d3.select('#unitAb');
        unitAb.html('');

        // const indis = current.indexSort;


        const all = requestAll(current.indexSort,
            true,
            10,
            10,
            (img, index) => {

                const div = unitAb.append('div')
                    .style('display', 'inline-block')
                    .style('position', 'relative')
                    .style('margin-left', '2px')
                    .on('mouseenter', d => {
                        displayDetails([img])
                    })
                    .on('mouseleave', d => {
                        displayDetails(null)
                    })

                div.append('img').attr('src', img).attr('width', 100);
                div.append('text')
                    .style('position', 'absolute')
                    .style('top', '5px')
                    .style('left', '5px')

                    .text('i: ' + index)
                if (index === 10) unitAb.append('br');
            })

        all.then(a => console.log(a, "--- a"))


    })


    d3.select("#unitSingleAbBtn").on('click', () => {

        const unitAb = d3.select('#unitSingleAb');
        unitAb.html('');

        const indis = current.indexSort;


        const all = requestAll(indis,
            false,
            indis.length,
            -1,
            (img, index) => {

                const div = unitAb.append('div')
                    .style('display', 'inline-block')
                    .style('position', 'relative')
                    .style('margin-left', '2px')
                    .on('mouseenter', d => {
                        displayDetails([img])
                    })
                    .on('mouseleave', d => {
                        displayDetails(null)
                    })

                div.append('img').attr('src', img).attr('width', 100);
                div.append('text')
                    .style('position', 'absolute')
                    .style('top', '5px')
                    .style('left', '5px')
                    .text('i: ' + index)
                // if (index === 10) unitAb.append('br');
            })

        all.then(a => console.log(a, "--- a"))


    })

}

