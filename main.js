let bingoBoard = Array(49).fill("unclaimed")
var blueCells = 0
var redCells = 0
var blueBingos = 0
var redBingos = 0
function setToBlue(r,c) {
    targetCell = "cell" + r + c //Transforms the coordinates (rows and collumns) to an id
    if (document.getElementById(targetCell).className == "incomplete") { //do this only if the tile is unclaimed
    document.getElementById(targetCell).className = "blue" //change the class of the element
    updateArray("blue",r,c) //update the array
    checkForBingos("blue")
    blueCells ++ //increase the total amount of blue cells
    playWinSound()
    }
    updateElements()
}
function setToRed(r,c) {
    targetCell = "cell" + r + c
    if (document.getElementById(targetCell).className == "incomplete") {
    document.getElementById(targetCell).className = "red"
    updateArray("red",r,c)
    checkForBingos("red")
    redCells ++
    playWinSound()
    }
    updateElements()
}
function updateArray(color,r,c) {
    cellPosition = (r-1)*7 + (c-1) //tranforms the coordinates (rows and collumns) to an array position
    bingoBoard[cellPosition] = color //changes the corresponding element in the array to the right color
}
function checkForBingos(color) {
    checkForHorizontal(color) //check for any horizontal 3s in a row
    checkForVertical(color) //check for vertical 3s in a row
    checkForDiagonals(color) //check for diagonal 3s in a row
}
function checkForHorizontal(color) {
    cellsInARow = 0
    currentCell = 0
    if (color == "red") {
    redBingos = 0
    } else {
    blueBingos = 0
    }
    for (let i = 1; i <= 49; i ++) { //repeat the following steps until it reaches the last cell
        if (bingoBoard[currentCell] == color) { //check if the cell is the right color, if it's not ignore it and reset the counter to 0
            cellsInARow ++ // if it is, increases the cellInARow counter by 1
            if (cellsInARow >= 3) { // if we are at 3 or more cellsInARow, add 1 bingo to the corresponding color
                if (color == "red") {
                    redBingos ++
                } else {
                    blueBingos ++
                }
            }
        } else {
            cellsInARow = 0
        }
        currentCell ++
        if (currentCell%7 == 0) { //if we are at the end of the row, reset the cells in a row counter
            cellsInARow = 0
        }
    }
}
function checkForVertical(color) {
    cellsInARow = 0
    currentCell = 0
    for (let i = 1; i <= 49; i ++) {
        if (bingoBoard[currentCell] == color) {
            cellsInARow ++
            if (cellsInARow >= 3) {
                if (color == "red") {
                    redBingos ++
                } else {
                    blueBingos ++
                }
            }
        } else {
            cellsInARow = 0
        }
        currentCell +=7
        if (currentCell > 48) { //if we are at the end of a collumn, rest the cellsInARow counter to 0 and reset to the next row
            currentCell -= 48
            cellsInARow = 0
        }
    }
}
function checkForDiagonals(color) {
    let cellsInARow = 0
    let row = 6
    let collumn = 0
    let startingRow = 6
    let startingCollumn = 0
    for (; (startingCollumn < 7) && (startingRow >= 0);) {
        row = startingRow
        collumn = startingCollumn
        for (; (row < 7) && (collumn < 7);) {
            if (bingoBoard[row*7 + collumn] == color) {
                cellsInARow ++
                if (cellsInARow >= 3) {
                    if (color == "red") {
                        redBingos ++
                    } else {
                        blueBingos ++
                    }
                }
            } else {
                cellsInARow = 0
            }
            row ++
            collumn ++
        }
    startingRow --
    if (startingRow < 0) {
        startingRow = 0
        startingCollumn ++
    }
    cellsInARow = 0
}
    cellsInARow = 0
    row = 6
    collumn = 6
    startingRow = 6
    startingCollumn = 6
    for (; (startingCollumn >= 0) && (startingRow >= 0);) {
        row = startingRow
        collumn = startingCollumn
        for (; (row < 7) && (collumn >= 0);) {
            if (bingoBoard[row*7 + collumn] == color) {
                cellsInARow ++
                if (cellsInARow >= 3) {
                    if (color == "red") {
                        redBingos ++
                    } else {
                        blueBingos ++
                    }
                }
            } else {
                cellsInARow = 0
            }
            row ++
            collumn --
        }
    startingRow --
    if (startingRow < 0) {
        startingRow = 0
        startingCollumn --
    }
    cellsInARow = 0
}
console.log(redBingos)
}
function updateElements() {
    document.getElementById("blue-cells").innerHTML = "Pretzels : " + blueCells
    document.getElementById("red-cells").innerHTML = "Vodka : " + redCells
    document.getElementById("blue-bingos").innerHTML = "Camps de Concentration : " + blueBingos
    document.getElementById("red-bingos").innerHTML = "Famines Générales : " + redBingos
    if ((blueBingos >= 4) && (redBingos >= 4)) {
        document.getElementById("red-territory1").style.display = "inline-block"
        document.getElementById("red-territory2").style.display = "inline-block"
        document.getElementById("blue-territory1").style.display = "inline-block"
        document.getElementById("blue-territory2").style.display = "inline-block"
        document.getElementById("explain-objective-blue").innerHTML = "Vous obtenez 1 territoire pour chaque bingo que vous avez de PLUS que votre adversaire (minimum 0)"
        document.getElementById("explain-objective-red").innerHTML = "Vous obtenez 1 territoire pour chaque bingo que vous avez de PLUS que votre adversaire (minimum 0)"
        var blueLead = blueBingos - redBingos
        document.getElementById("objective-blue").innerHTML = "Gagnez en obtenant 2 territoires (" + (redBingos + 2) + " bingos)"
        document.getElementById("objective-red").innerHTML = "Gagnez en obtenant 2 territoires (" + (blueBingos + 2) + " bingos)"
        if (blueLead == 0) {
            document.getElementById("blue-territory1").style.backgroundColor = "rgba(100, 100, 100, 0.7)"
            document.getElementById("blue-territory2").style.backgroundColor = "rgba(100, 100, 100, 0.7)"
            document.getElementById("red-territory1").style.backgroundColor = "rgba(100, 100, 100, 0.7)"
            document.getElementById("red-territory2").style.backgroundColor = "rgba(100, 100, 100, 0.7)"
        } else if (blueLead == 1) {
            document.getElementById("blue-territory1").style.backgroundColor = "rgba(0, 0, 255, 0.7)"
            document.getElementById("blue-territory2").style.backgroundColor = "rgba(100, 100, 100, 0.7)"
            document.getElementById("red-territory1").style.backgroundColor = "rgba(100, 100, 100, 0.7)"
            document.getElementById("red-territory2").style.backgroundColor = "rgba(100, 100, 100, 0.7)"
        } else if (blueLead >= 2) {
            document.getElementById("blue-territory1").style.backgroundColor = "rgba(0, 0, 255, 0.7)"
            document.getElementById("blue-territory2").style.backgroundColor = "rgba(0, 0, 255, 0.7)"
            document.getElementById("red-territory1").style.backgroundColor = "rgba(100, 100, 100, 0.7)"
            document.getElementById("red-territory2").style.backgroundColor = "rgba(100, 100, 100, 0.7)"
            blueTeamWins()
        } else if (blueLead == -1) {
            document.getElementById("blue-territory1").style.backgroundColor = "rgba(100, 100, 100, 0.7)"
            document.getElementById("blue-territory2").style.backgroundColor = "rgba(100, 100, 100, 0.7)"
            document.getElementById("red-territory1").style.backgroundColor = "rgba(255, 0, 0, 0.7)"
            document.getElementById("red-territory2").style.backgroundColor = "rgba(100, 100, 100, 0.7)"
        } else if (blueLead <= -2) {
            document.getElementById("blue-territory1").style.backgroundColor = "rgba(100, 100, 100, 0.7)"
            document.getElementById("blue-territory2").style.backgroundColor = "rgba(100, 100, 100, 0.7)"
            document.getElementById("red-territory1").style.backgroundColor = "rgba(255, 0, 0, 0.7)"
            document.getElementById("red-territory2").style.backgroundColor = "rgba(255, 0, 0, 0.7)"
            redTeamWins()
        }
    }
    document.getElementById("blue-leader1").src = "./lockedBingo.png"
    document.getElementById("blue-leader2").src = "./lockedBingo.png"
    document.getElementById("blue-leader3").src = "./lockedBingo.png"
    document.getElementById("blue-leader4").src = "./lockedBingo.png"
    document.getElementById("blue-leader5").src = "./lockedBingo.png"
    if (blueBingos >= 1) {
        document.getElementById("blue-leader1").src = "./blueBingo1.jpg"
    }
    if (blueBingos >= 2) {
        document.getElementById("blue-leader2").src = "./blueBingo2.jpg"
    }
    if (blueBingos >= 3) {
         document.getElementById("blue-leader3").src = "./blueBingo3.jpg"
    }
    if (blueBingos >= 4) {
        document.getElementById("blue-leader4").src = "./blueBingo4.jpg"
    }
    if (blueBingos >= 5) {
        document.getElementById("blue-leader5").src = "./blueBingo5.jpg"
        if (redBingos < 4) {
            blueTeamWins()
        }
    }
    document.getElementById("red-leader1").src = "./lockedBingo.png"
    document.getElementById("red-leader2").src = "./lockedBingo.png"
    document.getElementById("red-leader3").src = "./lockedBingo.png"
    document.getElementById("red-leader4").src = "./lockedBingo.png"
    document.getElementById("red-leader5").src = "./lockedBingo.png"
    if (redBingos >= 1) {
        document.getElementById("red-leader1").src = "./redBingo1.jpg"
    }
    if (redBingos >= 2) {
        document.getElementById("red-leader2").src = "./redBingo2.jpg"
    }
    if (redBingos >= 3) {
        document.getElementById("red-leader3").src = "./redBingo3.jpg"
    }
    if (redBingos >= 4) {
        document.getElementById("red-leader4").src = "./redBingo4.jpg"
    }
    if (redBingos >= 5) {
        document.getElementById("red-leader5").src = "./redBingo5.jpg"
        if (blueBingos < 4) {
            redTeamWins()
        }
    }
}
function blueTeamWins() {
    console.log("BLUE TEAM WINS")
    document.getElementById("buddy").style.backgroundColor = "rgb(0, 0, 255)"
    document.getElementById("erika").play()
}
function redTeamWins() {
    console.log("RED TEAM WINS")
    document.getElementById("buddy").style.backgroundColor = "rgb(255, 0, 0)"
    document.getElementById("ussr").play()
}
function playWinSound() {
    var winSoundPlayed = Math.floor(Math.random()*3)
    if (winSoundPlayed == 0) {
        document.getElementById("win1").play()
        setTimeout(() => {
    document.getElementById("win1").pause();
    document.getElementById("win1").currentTime = 0;
}, 10000);
    } else if (winSoundPlayed == 1) {
        document.getElementById("win2").play()
        setTimeout(() => {
    document.getElementById("win2").pause();
    document.getElementById("win2").currentTime = 0;
}, 10000);
    } else {
        document.getElementById("win3").play()
        setTimeout(() => {
    document.getElementById("win3").pause();
    document.getElementById("win3").currentTime = 0;
}, 10000);
    }
}

