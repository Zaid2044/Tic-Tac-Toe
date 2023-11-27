// Game state
let board = ['', '', '', '', '', '', '', '', ''];
let currentPlayer = 'X';
let gameActive = true;

// DOM elements
const boardElement = document.getElementById('board');
const messageElement = document.getElementById('message');

// Create the game board
for (let i = 0; i < 9; i++) {
  const cell = document.createElement('div');
  cell.classList.add('cell');
  cell.dataset.index = i;
  cell.addEventListener('click', handleCellClick);
  boardElement.appendChild(cell);
}

// Handle cell click
function handleCellClick(event) {
  const index = event.target.dataset.index;

  if (board[index] === '' && gameActive) {
    board[index] = currentPlayer;
    event.target.textContent = currentPlayer;

    if (checkWin()) {
      messageElement.textContent = `Player ${currentPlayer} wins!`;
      gameActive = false;
    } else if (board.every(cell => cell !== '')) {
      messageElement.textContent = 'It\'s a draw!';
      gameActive = false;
    } else {
      currentPlayer = (currentPlayer === 'X') ? 'O' : 'X';
      messageElement.textContent = `Player ${currentPlayer}'s turn`;
    }
  }
}

// Check for a win
function checkWin() {
  const winPatterns = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6]
  ];

  return winPatterns.some(pattern => {
    const [a, b, c] = pattern;
    return board[a] !== '' && board[a] === board[b] && board[a] === board[c];
  });
}

// Restart the game
function restartGame() {
  board = ['', '', '', '', '', '', '', '', ''];
  currentPlayer = 'X';
  gameActive = true;

  // Reset cell content
  document.querySelectorAll('.cell').forEach(cell => {
    cell.textContent = '';
  });

  // Reset message
  messageElement.textContent = `Player X's turn`;
}
