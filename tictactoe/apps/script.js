const boxes = document.querySelectorAll('.box');
const scoreX = document.getElementById('score-x');
const scoreO = document.getElementById('score-o');
const resetScoreBtn = document.querySelector('.reset-score');

let currentPlayer = 'X';
let board = Array(9).fill(null);
let score = { X: 0, O: 0 };

boxes.forEach((box, index) => {
    box.addEventListener('click', () => handleClick(box, index));
});

resetScoreBtn.addEventListener('click', () => {
    score = { X: 0, O: 0 };
    scoreX.textContent = 0;
    scoreO.textContent = 0;
    showResetScoreAlert();
});

function handleClick(box, index) {
    if (board[index]) {
        showBoxFilledAlert();
        return;
    }

    if (checkWinner()) return;

    board[index] = currentPlayer;
    box.textContent = currentPlayer;
    box.classList.add(`player-${currentPlayer}`);

    if (checkWinner()) {
        score[currentPlayer]++;
        updateScore();
        showWinAlert(currentPlayer);
    } else if (board.every(cell => cell)) {
        showDrawAlert();
    } else {
        currentPlayer = currentPlayer === 'X' ? 'O' : 'X';
    }
}

function checkWinner() {
    const winCombos = [
        [0,1,2],[3,4,5],[6,7,8],
        [0,3,6],[1,4,7],[2,5,8],
        [0,4,8],[2,4,6]
    ];

    for (let combo of winCombos) {
        const [a,b,c] = combo;
        if (board[a] && board[a] === board[b] && board[a] === board[c]) {
            highlightWinner(combo);
            return true;
        }
    }
    return false;
}

function highlightWinner(combo) {
    combo.forEach(i => boxes[i].classList.add('menang'));
}

function resetBoard() {
    board = Array(9).fill(null);
    boxes.forEach(box => {
        box.textContent = '';
        box.classList.remove('player-X', 'player-O', 'menang');
    });
    currentPlayer = 'X';
}

function updateScore() {
    scoreX.textContent = score.X;
    scoreO.textContent = score.O;
}

function showResetScoreAlert() {
    Swal.fire({
        title: 'Score Reset!',
        text: 'Semua skor telah dihapus 😎',
        icon: 'info',
        position: 'bottom',
        toast: true,
        timer: 2000,
        showConfirmButton: false
    });
}

function showBoxFilledAlert() {
    Swal.fire({
        title: 'Kotak sudah diisi!',
        icon: 'warning',
        position: 'bottom',
        toast: true,
        timer: 1500,
        showConfirmButton: false
    });
}

function showWinAlert(player) {
    Swal.fire({
        title: `Player ${player} menang! 🎉`,
        icon: 'success',
        position: 'bottom',
        toast: true,
        timer: 2000,
        showConfirmButton: false
    }).then(resetBoard);
}

function showDrawAlert() {
    Swal.fire({
        title: 'Seri 😅',
        icon: 'warning',
        position: 'bottom',
        toast: true,
        timer: 2000,
        showConfirmButton: false
    }).then(resetBoard);
}
