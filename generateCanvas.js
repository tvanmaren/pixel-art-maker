'use strict';
/*Paint Pixel*/

var brushInUse = false;
var currentColor = 'white';
var cssIndex = 0; // because styleSheets[0].rules inaccesible

//-----------------\\
//-----------------\\
//-----------------\\
/*Palette Maker*/

function makePaletteDiv(className, palette, colorName) {
    var newDiv = document.createElement('div');
    newDiv.className = className;
    newDiv.id = colorName;
    document.styleSheets[0].addRule(('#' + colorName), ('background: ' + palette[colorName] + ';'), ++cssIndex);
    return newDiv;
}

function makeColorDisplay(className, id) {
    var newDiv = document.createElement('div');
    newDiv.className = className;
    newDiv.id = id;
    var newContainer = document.createElement('div');
    newContainer.className = 'displayContainer';
    newContainer.appendChild(newDiv);
    // document.body.appendChild(newContainer);
    return newContainer;
}

//-----------------\\
//-----------------\\
//-----------------\\
/*Pixel Table Makers*/

function makeCell(className, idName, listen = false) {
    // make a Data Cell
    var newCell = document.createElement('td');
    // make a Div
    var newDiv = document.createElement('div');
    // add classification (class variable)
    newDiv.className = className;
    // add id
    newDiv.id = idName;
    // set white color
    newDiv.style.backgroundColor = 'white';
    // set Div's Parent to the Cell
    newCell.appendChild(newDiv);
    // add listening functionality here
    if (listen) {
        newCell.addEventListener('click', startstopPainting);
        newCell.addEventListener('mouseover', continuePainting);
    }
    return newCell;
}

function makeRow(className, length, yid, listen = false) {
    // make a Row
    var newRow = document.createElement('tr');
    // make the divs (class, id='x# y#', listen)
    var newCell, xid, xyvalue;
    for (var i = 0; i <= length; i++) {
        xid = i.toString();
        xyvalue = xid + '-' + yid.toString();
        newCell = makeCell(className, xyvalue, listen);
        // set Cell's Parent to the Row
        newRow.appendChild(newCell);
    }
    newRow.className = 'pixelContainer';
    // add listening functionality here
    if (listen) {
        newRow.addEventListener('click', startstopPainting);
        newRow.addEventListener('mouseover', continuePainting);
    }
    return newRow;
}

function makeTable(xsize, ysize, listen = false) {
    // var body = document.getElementsByTagName('body');
    // make a <table>
    var newTable = document.createElement('table');
    var className = 'pixel';
    var newRow;
    // LOOP with y-size
    for (var i = ysize; i >= 0; i--) {
        // makeRow(x-size, class=pixel, y#, listen)
        newRow = makeRow(className, xsize, i, listen);
        // set Parent to <table>
        newTable.appendChild(newRow);
    }
    newTable.className = 'canvas';
    // body[0].appendChild(newTable);
    if (listen) {
        newTable.addEventListener('click', startstopPainting);
        newTable.addEventListener('mouseover', continuePainting);
    }
    return newTable;
}

//-----------------\\
//-----------------\\
//-----------------\\
/*Event Functions*/

function setColor(event) {
    var displays = document.getElementsByClassName('colorDisplay');
    var clicked = event.target;
    if ((clicked !== event.currentTarget) && (clicked.className === 'paletteContainer' || clicked.className === 'paletteColor')) {
        currentColor = clicked.id;
        for (var i in displays) {
            displays[i].style.backgroundColor = currentColor;
        }
        console.log('color set to', currentColor);

    }
}

function startstopPainting(event) {
    var targetCell = event.target;
    if (targetCell.className === 'pixel') {
        if (!brushInUse) {
            brushInUse = true;
        } else {
            brushInUse = false;
        }
        if (brushInUse) {
            event.target.style.backgroundColor = currentColor;
            return;
        } else {
            return;
        }
        // console.log('pixel', event.target, 'painted', currentColor);
    } else {
        return;
    }
}

function continuePainting(event) {
    if (brushInUse) {
        event.target.style.backgroundColor = currentColor;
        return;
    } else {
        return;
    }
}

//-----------------\\
//-----------------\\
//-----------------\\
/*Palette Functions*/

function makePaletteDiv(className, palette, colorName) {
    var newDiv = document.createElement('div');
    newDiv.className = className;
    newDiv.id = colorName;
    document.styleSheets[0].addRule(('#' + colorName), ('background: ' + palette[colorName] + ';'), ++cssIndex);
    return newDiv;
}

function generatePalette(size, palette, listen = false) {
    console.log('palette received:', palette);
    var className = 'paletteColor';
    var colorNames = Object.keys(palette);
    var paletteContainer = document.createElement('div');
    var paletteDiv;
    paletteContainer.className = 'paletteContainer';
    // document.body.appendChild(paletteContainer);
    if (size === 'all') {
        size = colorNames.length;
        // console.log(size);
    }
    for (var i = 0; i < size; i++) {
        paletteDiv = makePaletteDiv(className, palette, colorNames[i]);
        paletteContainer.appendChild(paletteDiv);
        // console.log('class', className, 'from palette', palette, 'color:', colorNames[i]);
    }
    if (listen) {
        paletteContainer.addEventListener('click', setColor);
    }
    return paletteContainer;
}

//////////////////////////
//////////////////////////
//////////////////////////

/*Palette Colors Object*/
var paletteColors = {
    'black': '#000000',
    'silver': '#c0c0c0',
    'gray': '#808080',
    'white': '#ffffff',
    'maroon': '#800000',
    'red': '#ff0000',
    'purple': '#800080',
    'fuchsia': '#ff00ff',
    'green': '#008000',
    'lime': '#00ff00',
    'olive': '#808000',
    'yellow': '#ffff00',
    'navy': '#000080',
    'blue': '#0000ff',
    'teal': '#008080',
    'aqua': '#00ffff',
    'orange': '#ffa500',
    'aliceblue': '#f0f8ff',
    'antiquewhite': '#faebd7',
    'aquamarine': '#7fffd4',
    'azure': '#f0ffff',
    'beige': '#f5f5dc',
    'bisque': '#ffe4c4',
    'blanchedalmond': '#ffebcd',
    'blueviolet': '#8a2be2',
    'brown': '#a52a2a',
    'burlywood': '#deb887',
    'cadetblue': '#5f9ea0',
    'chartreuse': '#7fff00',
    'chocolate': '#d2691e',
    'coral': '#ff7f50',
    'cornflowerblue': '#6495ed',
    'cornsilk': '#fff8dc',
    'crimson': '#dc143c',
    'darkblue': '#00008b',
    'darkcyan': '#008b8b',
    'darkgoldenrod': '#b8860b',
    'darkgray': '#a9a9a9',
    'darkgreen': '#006400',
    'darkgrey': '#a9a9a9',
    'darkkhaki': '#bdb76b',
    'darkmagenta': '#8b008b',
    'darkolivegreen': '#556b2f',
    'darkorange': '#ff8c00',
    'darkorchid': '#9932cc',
    'darkred': '#8b0000',
    'darksalmon': '#e9967a',
    'darkseagreen': '#8fbc8f',
    'darkslateblue': '#483d8b',
    'darkslategray': '#2f4f4f',
    'darkslategrey': '#2f4f4f',
    'darkturquoise': '#00ced1',
    'darkviolet': '#9400d3',
    'deeppink': '#ff1493',
    'deepskyblue': '#00bfff',
    'dimgray': '#696969',
    'dimgrey': '#696969',
    'dodgerblue': '#1e90ff',
    'firebrick': '#b22222',
    'floralwhite': '#fffaf0',
    'forestgreen': '#228b22',
    'gainsboro': '#dcdcdc',
    'ghostwhite': '#f8f8ff',
    'gold': '#ffd700',
    'goldenrod': '#daa520',
    'greenyellow': '#adff2f',
    'grey': '#808080',
    'honeydew': '#f0fff0',
    'hotpink': '#ff69b4',
    'indianred': '#cd5c5c',
    'indigo': '#4b0082',
    'ivory': '#fffff0',
    'khaki': '#f0e68c',
    'lavender': '#e6e6fa',
    'lavenderblush': '#fff0f5',
    'lawngreen': '#7cfc00',
    'lemonchiffon': '#fffacd',
    'lightblue': '#add8e6',
    'lightcoral': '#f08080',
    'lightcyan': '#e0ffff',
    'lightgoldenrodyellow': '#fafad2',
    'lightgray': '#d3d3d3',
    'lightgreen': '#90ee90',
    'lightgrey': '#d3d3d3',
    'lightpink': '#ffb6c1',
    'lightsalmon': '#ffa07a',
    'lightseagreen': '#20b2aa',
    'lightskyblue': '#87cefa',
    'lightslategray': '#778899',
    'lightslategrey': '#778899',
    'lightsteelblue': '#b0c4de',
    'lightyellow': '#ffffe0',
    'limegreen': '#32cd32',
    'linen': '#faf0e6',
    'mediumaquamarine': '#66cdaa',
    'mediumblue': '#0000cd',
    'mediumorchid': '#ba55d3',
    'mediumpurple': '#9370db',
    'mediumseagreen': '#3cb371',
    'mediumslateblue': '#7b68ee',
    'mediumspringgreen': '#00fa9a',
    'mediumturquoise': '#48d1cc',
    'mediumvioletred': '#c71585',
    'midnightblue': '#191970',
    'mintcream': '#f5fffa',
    'mistyrose': '#ffe4e1',
    'moccasin': '#ffe4b5',
    'navajowhite': '#ffdead',
    'oldlace': '#fdf5e6',
    'olivedrab': '#6b8e23',
    'orangered': '#ff4500',
    'orchid': '#da70d6',
    'palegoldenrod': '#eee8aa',
    'palegreen': '#98fb98',
    'paleturquoise': '#afeeee',
    'palevioletred': '#db7093',
    'papayawhip': '#ffefd5',
    'peachpuff': '#ffdab9',
    'peru': '#cd853f',
    'pink': '#ffc0cb',
    'plum': '#dda0dd',
    'powderblue': '#b0e0e6',
    'rosybrown': '#bc8f8f',
    'royalblue': '#4169e1',
    'saddlebrown': '#8b4513',
    'salmon': '#fa8072',
    'sandybrown': '#f4a460',
    'seagreen': '#2e8b57',
    'seashell': '#fff5ee',
    'sienna': '#a0522d',
    'skyblue': '#87ceeb',
    'slateblue': '#6a5acd',
    'slategray': '#708090',
    'slategrey': '#708090',
    'snow': '#fffafa',
    'springgreen': '#00ff7f',
    'steelblue': '#4682b4',
    'tan': '#d2b48c',
    'thistle': '#d8bfd8',
    'tomato': '#ff6347',
    'turquoise': '#40e0d0',
    'violet': '#ee82ee',
    'wheat': '#f5deb3',
    'whitesmoke': '#f5f5f5',
    'yellowgreen': '#9acd32',
    'rebeccapurple': '#663399'
};

//-----------------\\
//-----------------\\
//-----------------\\
/*Palette Generator*/

var paletteElement = generatePalette(112, paletteColors, true);

//-----------------\\
//-----------------\\
//-----------------\\
/*Pixel Table Generator*/

var canvasElement = makeTable(60, 25, true);

//-----------------\\
//-----------------\\
//-----------------\\
/*Color Display Generator*/

var displayElementRightTop = makeColorDisplay('colorDisplay', 'displayRT');
var displayElementLeftBottom = makeColorDisplay('colorDisplay', 'displayLB');
var displayElementRightBottom = makeColorDisplay('colorDisplay', 'displayRB');

//-----------------\\
//-----------------\\
//-----------------\\
/*Table Setup*/
var bodyTable = document.createElement('table');
var tableRow = document.createElement('tr');
var cell1 = document.createElement('td');
var cell2 = document.createElement('td');
var cell3 = document.createElement('td');
document.body.appendChild(bodyTable);
bodyTable.appendChild(tableRow);
tableRow.appendChild(cell1);
tableRow.appendChild(cell2);
tableRow.appendChild(cell3);
cell1.appendChild(paletteElement);
cell1.className = 'paletteElement';
cell2.appendChild(canvasElement);
cell2.className = 'canvasElement';
cell3.appendChild(displayElementRightTop);
cell3.appendChild(displayElementLeftBottom);
cell3.appendChild(displayElementRightBottom);
cell3.className = 'displayElement';
