'use strict';

var gCanvas;
var gCtx;

var gCurrShape;
var gCurrentColor;
var gCurrentBgColor;

var gTouchStartPos, gTouchEndPos;

function init() {
    gCanvas = document.getElementById('my-canvas');
    gCtx = gCanvas.getContext('2d');
    addListeners();

    gCurrShape = 'line';
    gCurrentColor = '#000';
    gCurrentBgColor = '#fff';

    gTouchStartPos = null;
    gTouchEndPos = null;

    // window.addEventListener('resize', function(){
    //     gCanvas.width = window.innerWidth
    //     gCanvas.height = window.innerHeight
    //     resizeCanvas()
    // });
}

function addListeners() {
    window.addEventListener('resize', resizeCanvas);

    var elCanvas = document.querySelector('canvas');

    var hammerTime = new Hammer(elCanvas);
    hammerTime.on('panstart', function (ev) {
        let x = ev.changedPointers[0].offsetX;
        let y = ev.changedPointers[0].offsetY;
        gTouchStartPos = {
            x,
            y,
        };
    });

    hammerTime.on('panend', function (ev) {
        let x = ev.changedPointers[0].offsetX;
        let y = ev.changedPointers[0].offsetY;
        gTouchEndPos = {
            x,
            y,
        };

        draw();
    });
}

function drawLine(x, y, xEnd = 250, yEnd = 250) {
    gCtx.beginPath();
    gCtx.lineWidth = 2;
    gCtx.moveTo(x, y);
    gCtx.lineTo(xEnd, yEnd);
    gCtx.closePath();
    gCtx.strokeStyle = gCurrentColor;
    gCtx.stroke();
}

function drawTriangle(x, y, xEnd = 250, yEnd = 250) {
    gCtx.beginPath();
    gCtx.lineWidth = 2;
    gCtx.moveTo(x, y);
    gCtx.lineTo(20, 100);
    gCtx.lineTo(50, 220);
    gCtx.closePath();
    // gCtx.lineTo(x, y);

    gCtx.fillStyle = gCurrentBgColor;
    gCtx.fill();
    gCtx.strokeStyle = gCurrentColor;
    gCtx.stroke();
}

function drawRect(x, y, xEnd = 150, yEnd = 150) {
    gCtx.beginPath();
    gCtx.rect(x, y, xEnd - x, yEnd - y);
    gCtx.fillStyle = gCurrentBgColor;
    gCtx.fillRect(x, y, xEnd - x, yEnd - y);
    gCtx.strokeStyle = gCurrentColor;
    gCtx.stroke();
}

function drawArc(x, y) {
    gCtx.beginPath();
    gCtx.lineWidth = 6;
    gCtx.arc(x, y, 100, 0, 2 * Math.PI);
    gCtx.strokeStyle = gCurrentColor;
    gCtx.stroke();
    gCtx.fillStyle = gCurrentBgColor;
    gCtx.fill();
}

function drawText(text, x, y) {
    gCtx.lineWidth = 2;
    gCtx.font = '40px Arial';
    gCtx.fillText(text, x, y);
    gCtx.strokeText(text, x, y);
}

function saveAndRestoreExample() {
    gCtx.strokeStyle = gCurrentColor;
    gCtx.fillStyle = gCurrentBgColor;
    drawText('Before save', 180, 60);
    gCtx.save();

    gCtx.strokeStyle = gCurrentColor;
    gCtx.fillStyle = gCurrentBgColor;

    drawText('After save and change', 180, 160);
    gCtx.restore();
    drawText('After restore', 100, 360);
}

function clearCanvas() {
    gCtx.clearRect(0, 0, gCanvas.width, gCanvas.height);
}

function drawImg() {
    var elImg = document.querySelector('img');
    gCtx.drawImage(elImg, 0, 0, gCanvas.width, gCanvas.height);
}

function drawImg2() {
    var img = new Image();
    img.src = 'img/1.jpg';
    img.onload = () => {
        gCtx.drawImage(img, 0, 0, gCanvas.width, gCanvas.height);
    };
}

function drawImg3() {
    var img = new Image();
    img.src =
        'https://steamuserimages-a.akamaihd.net/ugc/940586530515504757/CDDE77CB810474E1C07B945E40AE4713141AFD76/';
    img.onload = () => {
        gCtx.drawImage(img, 0, 0, gCanvas.width, gCanvas.height);
    };
}

function downloadCanvas(elLink) {
    const data = gCanvas.toDataURL();
    console.log('DATA', data);
    elLink.href = data;
    elLink.download = 'puki';
}

function resizeCanvas() {
    var elContainer = document.querySelector('.canvas-container');

    // Note: changing the canvas dimension this way clears the canvas
    gCanvas.width = elContainer.offsetWidth;
    gCanvas.height = elContainer.offsetHeight;
}

function setShape(option) {
    var shape = option.value;
    gCurrShape = shape;
}

function setColor(color) {
    gCurrentColor = color.value;
}

function setBgColor(color) {
    gCurrentBgColor = color.value;
}

function draw(ev) {
    // const offsetX = ev.offsetX;
    // const offsetY = ev.offsetY;

    switch (gCurrShape) {
        case 'line':
            drawLine(
                gTouchStartPos.x,
                gTouchStartPos.y,
                gTouchEndPos.x,
                gTouchEndPos.y,
            );
            break;
        case 'triangle':
            drawTriangle(offsetX, offsetY);
            break;
        case 'rect':
            drawRect(
                gTouchStartPos.x,
                gTouchStartPos.y,
                gTouchEndPos.x,
                gTouchEndPos.y,
            );
            break;
        case 'text':
            drawText('Puki', offsetX, offsetY);
            break;
    }
}
