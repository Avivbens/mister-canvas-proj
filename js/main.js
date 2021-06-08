'use strict';

var gCanvas;
var gCtx;

function init() {
    gCanvas = document.getElementById('my-canvas');
    gCtx = gCanvas.getContext('2d');
    addListeners();
    initCanvasService();
}

function addListeners() {
    window.addEventListener('resize', resizeCanvas);

    var elCanvas = document.querySelector('canvas');

    // if (gTouchEvs.includes(ev.type)) {
    //     ev.preventDefault();
    // }
    // Pan on
    var hammerTime = new Hammer(elCanvas);
    hammerTime.on('panstart', function (ev) {
        let x = ev.changedPointers[0].offsetX;
        let y = ev.changedPointers[0].offsetY;
        gTouchStartPos = {
            x,
            y,
        };
    });

    // Pan off
    hammerTime.on('panend', function (ev) {
        let x = ev.changedPointers[0].offsetX;
        let y = ev.changedPointers[0].offsetY;
        gTouchEndPos = {
            x,
            y,
        };

        // Stop the free style
        if (gCurrShape === 'free-style-flow') {
            gFreeStylePath.push({ x, y });
            draw();

            gAllObjectOnCanvas.push({
                shape: 'free-style-flow',
                innerData: [gFreeStylePath],
            });

            gFreeStylePath = [];
            return;
        }

        if (gCurrShape === 'text') return;
        draw();
    });

    // Single tap
    hammerTime.on('tap', function (ev) {
        let x = ev.changedPointers[0].offsetX;
        let y = ev.changedPointers[0].offsetY;
        gCurrentClickPos = {
            x,
            y,
        };

        if (gCurrShape === 'text') draw();
    });

    // Pan move
    hammerTime.on('panmove', function (ev) {
        if (gCurrShape !== 'free-style-flow') return;

        let x = ev.changedPointers[0].offsetX;
        let y = ev.changedPointers[0].offsetY;
        gCurrentClickPos = {
            x,
            y,
        };

        // Taking care of free style draw
        if (gCurrShape === 'free-style-flow') {
            gFreeStylePath.push({ x, y });
            draw();
            return;
        }

        if (gCurrShape === 'text') draw();
    });
}

function resizeCanvas() {
    var elContainer = document.querySelector('.canvas-container');

    // Note: changing the canvas dimension this way clears the canvas
    gCanvas.width = elContainer.offsetWidth;
    gCanvas.height = elContainer.offsetHeight;
}
