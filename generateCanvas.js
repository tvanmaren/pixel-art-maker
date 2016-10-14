'use strict';

function makeCell(className, idName, listen = false) {
    // make a Data Cell
    var newCell = document.createElement('td');
    // make a Div
    var newDiv = document.createElement('div');
    // add classification (class variable)
    newDiv.className = className;
    // add id
    newDiv.id = idName;
    // set Div's Parent to the Cell
    newCell.appendChild(newDiv);
    // do I listen?
    // add listening functionality here
    return newCell;
}

function makeRow(className, length, yid, listen = false) {
    // make a Row
    var newRow = document.createElement('tr');
    // make the divs (class, id='x# y#', listen)
    var newCell, xid, xyvalue;
    for (var i = 0; i <= length; i++) {
        xid = i.toString();
        xyvalue = xid + ' ' + yid.toString();
        newCell = makeCell(className, xyvalue, listen);
        // set Cell's Parent to the Row
        newRow.appendChild(newCell);
    }
    // do I listen?
    // add listening functionality here
    return newRow;
}

function makeTable(xsize, ysize, listen = false) {
    var body = document.getElementsByTagName('body');
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
    body[0].appendChild(newTable);
    return newTable;
}

makeTable(20, 20);
