let activePlayer = 'x';

let run = true;

const canvas = document.getElementById('win-lines');
const c = canvas.getContext('2d');

let hard = false;
let dark = false;

let pScore = 0;
let cScore = 0;

let selectedSquares = [];

var winConditions = [
[0, 1, 2],
[3, 4, 5],
[6, 7, 8],
[0, 3, 6],
[1, 4, 7],
[2, 5, 8],
[0, 4, 8],
[2, 4, 6]];

// listen for keypress events to reset game
window.addEventListener('keypress', function (evt) {
    if (evt.key === 'r' || evt.key === 'Enter') {
        reset();
        run = true;
    }
}, false);

function placeXorO(square) {
    if (!run) return;
    if (!selectedSquares.some(element => element.includes(square))) {

        let select = document.getElementById(square);

        select.style.backgroundImage = 'url("images/' + activePlayer + '.png")';
        selectedSquares.push(square + activePlayer);

        audio('./media/place.mp3');

        if (checkWin()) {
            disableClickPerm();
        }

        if (activePlayer === 'x') {
            disableClick();
            setTimeout(function () { computersTurn(); }, 1000);
            activePlayer = 'o';
        } else {
            activePlayer = 'x';
        }

        return true;
    }
}

function computersTurn() {
    if (!run || selectedSquares.length === 9 || activePlayer === 'x' || checkNearWin()) { // prevent computer from doing things when the game is finished or when not supposed to/ if there's a better option
        return;
    }

    while (true) {
        square = Math.floor(Math.random() * 9);

        if (placeXorO(square)) {
            console.log('randomly chose ' + square);
            activePlayer = 'x';
            break;
        }
    }
}

// check if the computer should pick a specific square
function checkNearWin() {
    if (!hard) return false;
    for (let i = 0; i < winConditions.length; i++) {
        var first = winConditions[i][0];
        var second = winConditions[i][1];
        var third = winConditions[i][2];
        var firstX = first + 'x';
        var secondX = second + 'x';
        var thirdX = third + 'x';
        var firstO = first + 'o';
        var secondO = second + 'o';
        var thirdO = third + 'o';

        // prioritize win over blocking
        if (selectedSquares.includes(firstO) && selectedSquares.includes(secondO)) {
            if (placeXorO(third)) {
                console.log(third + ' ' + winConditions[i]);
                return true;
            }
        }

        if (selectedSquares.includes(firstO) && selectedSquares.includes(thirdO)) {
            if (placeXorO(second)) {
                console.log(second + ' ' + winConditions[i]);
                return true;
            }
        }

        if (selectedSquares.includes(secondO) && selectedSquares.includes(thirdO)) {
            if (placeXorO(first)) {
                console.log(first + ' ' + winConditions[i]);
                return true;
            }
        }

        // check for way to block
        if (selectedSquares.includes(firstX) && selectedSquares.includes(secondX)) {
            if (placeXorO(third)) {
                console.log(third + ' ' + winConditions[i]);
                return true;
            }
        }

        if (selectedSquares.includes(secondX) && selectedSquares.includes(thirdX)) {
            if (placeXorO(first)) {
                console.log(first + ' ' + winConditions[i]);
                return true;
            }
        }

        if (selectedSquares.includes(firstX) && selectedSquares.includes(thirdX)) {
            if (placeXorO(second)) {
                console.log(second + ' ' + winConditions[i]);
                return true;
            }
        }
    }

    // will pick random number
    return false;
}

function checkWin() {
    for (let i = 0; i < winConditions.length; i++) {
        var first = winConditions[i][0] + activePlayer;
        var second = winConditions[i][1] + activePlayer;
        var third = winConditions[i][2] + activePlayer;
        if (selectedSquares.includes(first) && selectedSquares.includes(second) && selectedSquares.includes(third)) {

            drawLine(winConditions[i][0], winConditions[i][1], winConditions[i][2]);
            if (activePlayer === 'x') {
                audio('./media/win.mp3');
                pScore++;
                document.getElementById('score').innerHTML = 'Score: ' + pScore + '-' + cScore;
                setTimeout(function () { alert('You win! Press R or Enter to play again.'); }, 500); // timeout of 500 to let the audio play correctly
                return true;
            } else {
                audio('./media/lose.mp3');
                cScore++;
                document.getElementById('score').innerHTML = 'Score: ' + pScore + '-' + cScore;
                setTimeout(function () { alert('Computer wins! Press R or Enter to play again.'); }, 500); // timeout of 500 to let the audio play correctly
                return true;
            }
        }
    }

    if (selectedSquares.length === 9) {
        audio('./media/tie.mp3');
        setTimeout(function () { alert('It\'s a tie. Press R or Enter to play again.'); }, 500); // timeout of 500 to let the audio play correctly
        return true;
    }

    return false;
}

function disableClick() {
    body.style.pointerEvents = 'none';
    setTimeout(function () { body.style.pointerEvents = 'auto'; }, 1000);
}

function disableClickPerm() {
    body.style.pointerEvents = 'none';
    run = false;
}

function audio(url) {
    new Audio(url).play();
}

function reset() {
    selectedSquares = [];
    activePlayer = 'x';
    body.style.pointerEvents = 'auto';
    c.clearRect(0, 0, canvas.width, canvas.height);
    for (let i = 0; i < 9; i++) {
        document.getElementById(i).style.backgroundImage = '';
    }
}

function drawLine(x, y, z) {
    if (x === 0 && y === 1 && z === 2) {
        renderLine(50, 100, 558, 100);
    } else if (x === 3 && y === 4 && z === 5) {
        renderLine(50, 304, 558, 304);
    } else if (x === 6 && y === 7 && z === 8) {
        renderLine(50, 508, 558, 508);
    } else if (x === 0 && y === 3 && z === 6) {
        renderLine(100, 50, 100, 558);
    } else if (x === 1 && y === 4 && z === 7) {
        renderLine(304, 50, 304, 558);
    } else if (x === 2 && y === 5 && z === 8) {
        renderLine(508, 50, 508, 558);
    } else if (x === 0 && y === 4 && z === 8) {
        renderLine(100, 100, 520, 520)
    } else if (x === 2 && y === 4 && z === 6) {
        renderLine(100, 508, 510, 90)
    }
}

function renderLine(x, y, x1, y1) {
    // draw colour coded line between win numbers
    c.beginPath();
    c.moveTo(x, y);
    c.lineTo(x1, y1);
    c.lineWidth = 10;
    if (activePlayer === 'x') {
        c.strokeStyle = 'green';
    } else {
        c.strokeStyle = 'red';
    }

    // fixes some funky drawing
    if (x <= x1 && y <= y1) {
        if (x < x1) {
            x += 10;
        }
        if (y < y1) {
            y += 10;
        }

        if (x <= x1 && y >= y1) {
            x1 += 10;
            y1 -= 10;
            if (x === x1 && y === y1) {
                cancelAnimationFrame(animationLoop);
            }
        }
    }

    c.stroke();
    c.closePath();
}

function changeTheme() {
    var element = document.body;
    element.classList.toggle("dark-mode");
    dark = !dark;
    document.getElementById('theme').innerHTML = 'Current Theme: ' + (dark ? 'Dark' : 'Light');
}

function toggleHard() {
    hard = !hard;
    document.getElementById('hard').innerHTML = 'Current Mode: ' + (hard ? 'Hard' : 'Normal');
}