"use strict";

var StartChar = 'A';
var EndChar = 'B';
var ROW = 15;
var COL = 15;

function makeTable(rowNum, colNum) {
  var table = [];

  for (var r = 0; r < rowNum; r++) {
    var row = [];

    for (var c = 0; c < colNum; c++) {
      row.push(0);
    }

    table.push(row);
  }

  return table;
}

function setCellsValue(table, col, row, val) {
  table[row][col] = val;
}

function findStartEnd(path) {
  var s = null;
  var e = null;
  path.map(function (row, index) {
    s = row.includes(StartChar) ? [row.indexOf(StartChar), index] : s;
    e = row.includes(EndChar) ? [row.indexOf(EndChar), index] : e;
  });
  return {
    "start": s,
    "end": e
  };
}

function isWall(path, col, row) {
  return path[row][col] === 'X';
}

var path = makeTable(ROW, COL);
setCellsValue(path, 2, 0, 'A');
setCellsValue(path, 7, 0, 'B'); // setCellsValue(path, 5 ,1, 'X')
// setCellsValue(path, 5, 2, 'X')
// setCellsValue(path, 5, 3, 'X')
// setCellsValue(path, 5, 4, 'X')
// setCellsValue(path, 4, 4, 'X')
// setCellsValue(path, 3, 4, 'X')
// setCellsValue(path, 2, 4, 'X')

var dist = findStartEnd(path);
var start = dist.start;
var end = dist.end;
var i = 0;
var Sx = start[0];
var Sy = start[1];
var Ex = end[0];
var Ey = end[1];
var direction = [[-1, -1], [0, -1], [1, -1], [-1, 0], [1, 0], [-1, 1], [0, 1], [1, 1]]; // const direction = [[-1,0], [1, 0], [0, -1], [0,1]]

var visited = [];

function findpath(x, y, tires) {
  if (tires < 0) {
    return undefined;
  }

  if (x == Ex && y == Ey) {
    return undefined;
  } else {
    var shortCordinate = [];
    var _short = Infinity;
    direction.map(function (dir, index) {
      var Px = x + dir[0];
      var Py = y + dir[1];

      if (Px >= 0 && Px < COL - 1 && Py >= 0 && Py < ROW - 1 && !isWall(path, Px, Py)) {
        var DA = parseInt(Math.sqrt(Math.pow(Px - Sx, 2) + Math.pow(Py - Sy, 2)).toFixed(1) * 10);
        var DB = parseInt(Math.sqrt(Math.pow(Px - Ex, 2) + Math.pow(Py - Ey, 2)).toFixed(1) * 10);
        var AB = DA + DB; // setCellsValue(path, Px, Py, AB)

        var cellID = Py * COL + Px;

        if (AB < _short && !visited.includes(cellID)) {
          _short = AB;
          shortCordinate = [Px, Py];
          visited.push(cellID);
        }
      }
    });
    console.log(shortCordinate);

    if (path[shortCordinate[1]][shortCordinate[0]] != "A" && path[shortCordinate[1]][shortCordinate[1]] != "B") {
      setCellsValue(path, shortCordinate[0], shortCordinate[1], _short);
    }

    findpath(shortCordinate[0], shortCordinate[1], tires - 1);
  }
}

findpath(Sx, Sy, 100);
console.table(path);