import $ from 'jquery';
import * as d3 from 'd3'
import "d3-selection-multi";

import '../css/pt1.scss'


import "!file-loader?name=pt1.html!../pt1.html";
import {SimpleEventHandler} from "./etc/SimpleEventHandler";
import {GlobalEvents} from "./etc/GlobalVars";
import {AblationView} from "./vis/AblationView";
import URLHandler from "./etc/URLHandler";
import {ExampleView, ExampleViewMouseEvent} from "./vis/ExampleView";
import {BarchartCanvas} from "./vis/BarchartCanvas";
import {GanterAPI} from "./api/GanterAPI";


const global = {
    sidebar: () => (<Element>d3.select('.sidenav').node())
        .getBoundingClientRect().width
};


let exampleIDs = d3.range(20, 30);


window.onload = () => {
    console.log("-hen-- ");
    $();

    const eventHandler = new SimpleEventHandler(<Element>d3.select('body').node());

    const project_selector = d3.select('#project_selector');
    const layer_selector = d3.select('#layer_selector');
    const main_view_sel = d3.select('.floating_content');

    const ablationView = new AblationView(main_view_sel.select('.ablation_modifier'), eventHandler);
    const exampleView = new ExampleView(main_view_sel.select('.ablation_examples'), eventHandler)
    exampleView.imgWidth=75;


    // TODO: TEST starts here --------
    const barchartTest = new BarchartCanvas(main_view_sel.select('#bars'), eventHandler);


    barchartTest.update({
        ids: [1, 2, 4, 3, 5], values: [.2, .4, .12, -.5, -.2]
    })


    // TODO: TEST ends here --------

    // let projects = {};
    let recipes = {};

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
        URLHandler.updateURLParam('project', project, false);
        GanterAPI.ablationChannels(project)
            .then((channelResponse) => {
                ablationView.update(channelResponse.res);
                barchartTest.update({
                    ids: [], values: channelResponse.res.ablation
                });

                recipes = {};

                GanterAPI.recipes(project)
                    .then((recipeResponse) => {
                        console.log(recipeResponse.res, "--- data.res");
                        recipeResponse.res.forEach(rec => recipes[rec.name] = rec);

                        d3.select('.recipes').selectAll('option').remove();
                        d3.select('.recipes').selectAll('option')
                            .data(recipeResponse.res).enter().append('option').attrs({
                            value: d => d.name
                        }).text(d => d.name)
                            .property('selected', d => d.name === start_params['recipe']);


                        d3.select(".select_rec_btn")
                            .style('opacity', 1)
                            .style('pointer-events', null)
                        ;

                        if ('recipe' in start_params) {
                            selectRecipe();
                        }


                    })


            });

        GanterAPI.generateImgs(project, exampleIDs)
            .then((data) => {
                exampleView.update({orig: data})

            })

    }


    const apply_btn = d3.select('#apply_recipe_btn');
    const apply_spinner = d3.select('#apply_recipe_spinner');
    apply_btn.on('click', () => {
        const abl = ablationView.ablation_modified;
        const project = project_selector.property('value');
        const layer = layer_selector.property('value');

        apply_spinner.style('opacity', 1);

        GanterAPI.generateImgs(project, exampleIDs, 0,
            abl.map((alpha, unit) => ({
                alpha,
                layer,
                unit
            })))
            .then((data) => {
                apply_spinner.style('opacity', 0);
                exampleView.ablated = data;
            })
    });


    function selectRecipe() {
        const rec_key = d3.select('.recipes').property('value');
        URLHandler.updateURLParam('recipe', rec_key);

        const rec = recipes[rec_key];
        ablationView.ablation = rec.unit.map(d => d.alpha);

        barchartTest.update({
            ids: [], values: rec.unit.map(d => d.alpha)

        })

        d3.selectAll(".select_rec_btn")
            .style('opacity', 0)
            .style('pointer-events', 'none')
    }

    d3.selectAll(".select_rec_btn").on('click', () => {
        selectRecipe();
    });

    d3.select('#reset_all').on('click', () => {
        ablationView.reset_all();
    })

    d3.select('.recipes').on('change', () => {
        d3.selectAll(".select_rec_btn")
            .style('opacity', 1)
            .style('pointer-events', null)
    })



    /*
    *
    ******  GLOBAL EVENTS  *******
    *
    * */


    window.onresize = () => {
        const w = window.innerWidth;
        const h = window.innerHeight;
        // console.log(w, h, "--- w,h");

        re_layout(w, h);


    }

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


    eventHandler.bind(AblationView.events.image_hovered, d => {
        const dt = d3.select('.sidenav').select('.detail_img');

        if (d.hovered) {
            dt.html(`<img src="${d.image}" width="${global.sidebar() - 10}">`)

        } else {
            dt.html(`<svg width="${global.sidebar() - 10}" height="${global.sidebar() - 10}">`)
        }
    })

    eventHandler.bind(ExampleView.events.hovered_image_pair, (d:ExampleViewMouseEvent) => {
        const dt = d3.select('.sidenav').select('.detail_img');

        if (d.hovered) {
            dt.html(d.images
                .map(img =>`<img src="${img.d}" width="${global.sidebar() - 10}">` )
                .join('<br>'))
        } else {
            dt.html(`<svg width="${global.sidebar() - 10}" height="${global.sidebar() - 10}">`)
        }
    })


}



