const board = document.querySelector('.container');
const cells = board.querySelectorAll('div');
const resultContainer = document.getElementById('resultContainer');
const reset = document.getElementById('reset');
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

const setResult = (draw, player = '') => {
    const resultText = resultContainer.querySelector('.resultText');

    if (draw) resultText.textContent = 'Draw';
    else resultText.textContent = player + ' Win!';

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

    if (checkWin(player)) setResult(false, player[0].toUpperCase() + player.slice(1));
    else if (isDraw()) setResult(true)
}, false);

reset.addEventListener('click', startGame, false);

startGame();