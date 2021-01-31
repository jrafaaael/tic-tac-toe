const reset = document.getElementById('resetBtn');
const board = document.querySelector('.board');
const cells = board.querySelectorAll('div');
const resultContainer = document.getElementById('resultContainer');
const newGame = document.getElementById('newGame');
const winningCombinations = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6]
]

// Functions

const startGame = () => {
    cells.forEach(cell => {
        cell.removeAttribute('data-played-by');
    });
    resultContainer.classList.remove('show');
    board.dataset.player = 'cross';

    printScore('cross');
    printScore('circle');
}

const checkWin = (player) => {
    return winningCombinations.some(combination => {
        return combination.every(index => {
            return cells[index].getAttribute('data-played-by') === player;
        });
    });
}

const isDraw = () => {
    return [...cells].every(cell => {
        return cell.getAttribute('data-played-by') === 'cross' || cell.getAttribute('data-played-by') === 'circle';
    })
}

const getLocalStorage = (prop) => {
    return localStorage.hasOwnProperty(prop) ? JSON.parse(localStorage.getItem(prop)) : {cross: 0, circle: 0};
}

const updateScore = (player) => {
    const score = getLocalStorage('score');

    score[player]++;

    localStorage.setItem('score', JSON.stringify(score));
}

const printScore = (player) => {
    const winnerPlayer = document.querySelector(`[data-${player}] span`);
    const score = getLocalStorage('score');

    winnerPlayer.textContent = score[player];
}

const setResult = (draw, player = '') => {
    const resultText = resultContainer.querySelector('.resultText');

    if (draw) resultText.textContent = 'Draw!';
    else {
        updateScore(player);
        printScore(player);
        resultText.textContent = player + ' Win!';
    }

    resultContainer.classList.add('show');
}

// Code

board.addEventListener('click', e => {
    if (
        !e.target.closest('div') ||
        e.target.hasAttribute('data-played-by')
    ) return;

    const player = board.getAttribute('data-player');
    const cell = e.target;

    cell.dataset.playedBy = player;

    board.dataset.player = (player === 'cross') ? 'circle' : 'cross';

    if (checkWin(player)) setResult(false, player);
    else if (isDraw()) setResult(true)
}, false);

reset.addEventListener('click', () => {
    localStorage.clear();
    startGame();
}, false);

newGame.addEventListener('click', startGame, false);

startGame();