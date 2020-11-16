const StartChar = 'A'
const EndChar = 'B'
const ROW = 15;
const COL = 15;
function makeTable(rowNum, colNum){
    let table = [];
    for(let r=0; r < rowNum; r++){
        let row = []
        for(let c = 0; c < colNum; c++){
            row.push(0)
        }
        table.push(row)
    }
    return table;
}

function setCellsValue(table ,col, row, val){
    table[row][col] = val
}

function findStartEnd(path){
    let s = null;
    let e = null;
    path.map((row, index) => {
        s = row.includes(StartChar) ? [row.indexOf(StartChar) ,index] : s;
        e = row.includes(EndChar) ? [row.indexOf(EndChar), index] : e ;
    })

    return {
        "start": s,
        "end": e
    }
}

function isWall(path, col, row){
    return path[row][col] === 'X'
}

let path = makeTable(ROW,COL)
setCellsValue(path, 2, 0, 'A')
setCellsValue(path, 7, 0, 'B')
// setCellsValue(path, 5 ,1, 'X')
// setCellsValue(path, 5, 2, 'X')
// setCellsValue(path, 5, 3, 'X')
// setCellsValue(path, 5, 4, 'X')
// setCellsValue(path, 4, 4, 'X')
// setCellsValue(path, 3, 4, 'X')
// setCellsValue(path, 2, 4, 'X')

let dist = findStartEnd(path)
let start = dist.start;
let end = dist.end;

let i = 0;

let Sx = start[0];
let Sy = start[1];

let Ex = end[0];
let Ey = end[1];

const direction = [[-1, -1], [0, -1], [1, -1],
                   [-1, 0],           [1, 0],
                   [-1, 1],  [0, 1],   [1, 1]];

// const direction = [[-1,0], [1, 0], [0, -1], [0,1]]

let visited = [];

function findpath(x, y, tires){
    if(tires < 0 ){
        return undefined;
    }
    if(x == Ex && y == Ey){
        return undefined;
    }else {
        let shortCordinate = [];
        let short = Infinity;
        direction.map((dir, index) => {
            let Px = x + dir[0];
            let Py = y + dir[1];
            
            if ((Px >= 0 && Px < COL - 1) && (Py >= 0 && Py < ROW - 1) && !isWall(path, Px, Py)){
                let DA = parseInt(Math.sqrt(Math.pow(Px - Sx, 2) + Math.pow(Py - Sy, 2)).toFixed(1)*10)
                let DB = parseInt(Math.sqrt(Math.pow(Px - Ex, 2) + Math.pow(Py - Ey, 2)).toFixed(1)*10)
                
                let AB = DA + DB 
                // setCellsValue(path, Px, Py, AB)
                let cellID = Py*COL + Px;
                if(AB < short && !visited.includes(cellID)){
                    short = AB;
                    shortCordinate = [Px, Py];
                    visited.push(cellID)
                }
            }
            
        })
        console.log(shortCordinate)

        if(path[shortCordinate[1]][shortCordinate[0]] != "A" && path[shortCordinate[1]][shortCordinate[1]] != "B"){
            setCellsValue(path, shortCordinate[0], shortCordinate[1], short)
        }

        findpath(shortCordinate[0], shortCordinate[1], tires-1)

    }
}

findpath(Sx, Sy, 100)
console.table(path)