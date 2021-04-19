const BLANK = " ";
const human_XO = "X";
const ai_XO = "O";
const X = "X";
const O = "O";
const cellSIZE = 100;
let GAME_STATE = true;
let TURN;
let hasWinner = false;
let TheWinner = null;

const ai_won_wordbank = [
  "Bet you can't beat an AI",
  "Guess I'm smarter than you!",
  "Computers will rule the world soon enough",
  "Come on, that's the best you can do?",
  "To think I was going easy on you",
];

const human_won_wordbank = [
  "Wow! You actually beat an AI",
  " How did you even do that?",
  "Did you use a cheat or something?",
  "I guess I should say congratulations to you",
  "You're not half bad at this for a human",
];

const human_turn_wordbank = [
  "Try to outsmart me! I know you can't",
  "Don't take too long, you're losing anyway",
  "I can read your moves, you know",
  "At least make an effort to win!",
  "You're really starting to bore me",
  "No pressure, but I think you're gonna lose",
  "Do you honestly think you can beat me?",
  "I could play with one eye closed and still win",
];

const ai_turn_wordbank = [
  "Try to relax while I make a move",
  "You actually made a challenging move, I'll have to think about my next step",
  "Don't get nervous, I'm just planning how to bear you",
  "Wait for a little while, even AIs have to think",
  "Stay calm while I make a move, I'm sure you're losing anyway",
];

const tie_wordbank = [
  "Are you trying to tell me we have equal brain capacity?",
  "You should know that I meant for us to tie",
  "Thank me for going easy on you",
  "I'm pretty sure you used some sort of cheat or hack to tie with me",
  "You will never be an equal to my intellect",
  "This is just one tie game, don't get too cocky",
];

let BOARD = [
  [[BLANK], [BLANK], [BLANK]],
  [[BLANK], [BLANK], [BLANK]],
  [[BLANK], [BLANK], [BLANK]],
];

let turn_label;
let winner_label;
let ai_speech_label;
let playagain_label;

function setup() {
  createCanvas(301, 301);

  if (random() > 0.5) {
    TURN = "human";
  } else {
    TURN = "ai";
    setTimeout(() => {
      let possible = [
        [0, 0],
        [0, 2],
        [1, 1],
        [2, 0],
        [2, 2],
      ];
      possible = possible[int(random(0, 5))];
      BOARD[possible[0]][possible[1]] = ai_XO;
      TURN = "human";
    }, int(random(1000, 1200)));
  }

  turn_label = createP(`turn: ${TURN}`);
  ai_speech_label = createP(``);
  winner_label = createP(``);
  playagain_label = createP(``);
}

function draw() {
  background("#1e212d");
  drawBOARD(BOARD, cellSIZE);
  shoWinner();
  drawTURN();
  checkForTie();
}

function checkForTie() {
  let blanks = 0;

  for (let i = 0; i < BOARD.length; i++) {
    for (let j = 0; j < BOARD.length; j++) {
      if (BOARD[i][j] == BLANK) {
        blanks += 1;
      }
    }
  }

  if (blanks == 0) {
    hasWinner = "tie";
  }
}

function drawBOARD(board, size) {
  for (let i = 0; i < board.length; i++) {
    for (let j = 0; j < board.length; j++) {
      let x = j * size;
      let y = i * size;

      fill("#f3f4ed");

      if (board[i][j] == X) {
        textSize(size);
        text(X, x + 16, y + size - 12);
      } else if (board[i][j] == O) {
        textSize(size);
        text(O, x + 12, y + size - 12);
      }

      noFill();
      stroke("#f3f4ed");
      rect(x, y, size, size);
    }
  }
}

function mousePressed() {
  let mY = mouseY;
  let mX = mouseX;

  for (let i = 0; i < BOARD.length; i++) {
    for (let j = 0; j < BOARD.length; j++) {
      if (BOARD[i][j] == BLANK && GAME_STATE && TURN == "human") {
        let cellX = j * cellSIZE;
        let cellY = i * cellSIZE;
        let cellWidth = cellX + cellSIZE;
        let cellHeight = cellY + cellSIZE;

        if (mX > cellX && mX < cellWidth && mY > cellY && mY < cellHeight) {
          humanTURN(i, j);
        }
      }
    }
  }
}

function humanTURN(i, j) {
  if (!hasWinner) {
    BOARD[i][j] = human_XO;
    checkForWinner();
    TURN = "ai";
    AiTURN();
  }
}

function AiTURN() {
  setTimeout(() => {
    if (!hasWinner) {
      let aiMOVE = findBestMove(BOARD);
      BOARD[aiMOVE.i][aiMOVE.j] = ai_XO;
      checkForWinner();
      TURN = "human";
    }
  }, int(random(700, 1200)));
}

function checkForWinner(board = BOARD, usingAlgo = false) {
  let blanks = 0;
  let winner = null;

  //horizontal

  for (let i = 0; i < board.length; i++) {
    if (
      ifEqual(String(board[i][0]), String(board[i][1]), String(board[i][2]))
    ) {
      winner = String(board[i][0]);
    }
  }

  //vertical

  for (let i = 0; i < board.length; i++) {
    if (
      ifEqual(String(board[0][i]), String(board[1][i]), String(board[2][i]))
    ) {
      winner = String(board[0][i]);
    }
  }

  //diagonal
  if (ifEqual(String(board[0][0]), String(board[1][1]), String(board[2][2]))) {
    winner = String(board[0][0]);
  }

  if (ifEqual(String(board[2][0]), String(board[1][1]), String(board[0][2]))) {
    winner = String(board[2][0]);
  }

  for (let i = 0; i < board.length; i++) {
    for (let j = 0; j < board.length; j++) {
      if (board[i][j] == BLANK) {
        blanks += 1;
      }
    }
  }

  if (winner == null && blanks == 0) {
    return 0;
  } else if (!usingAlgo && winner == null && blanks == 0) {
    console.log("yes");
    stopGAME();
    hasWinner = "tie";
  } else if (!usingAlgo && winner != null) {
    stopGAME();
    hasWinner = true;
    TheWinner = winner;
  } else if (usingAlgo && winner != null) {
    return winner;
  }
}

function ifEqual(a, b, c) {
  return a == b && b == c && c != BLANK;
}

function stopGAME() {
  GAME_STATE = false;
}

function shoWinner() {
  if (hasWinner && hasWinner != "tie") {
    const winner_ =
      TheWinner === O
        ? ai_won_wordbank[int(random(ai_won_wordbank.length))]
        : human_won_wordbank[int(random(human_won_wordbank.length))];
    winner_label.html(winner_);
    turn_label.hide();
    ai_speech_label.hide("");
    playagain_label.html("play again?");
    playagain_label.mouseClicked(() => {
      restartGame();
    });
    noLoop();
  } else if (hasWinner == "tie") {
    playagain_label.mouseClicked(() => {
      restartGame();
    });
    turn_label.hide();
    ai_speech_label.hide("");
    winner_label.html(tie_wordbank[int(random(tie_wordbank.length))]);
    playagain_label.html("play again?");
    noLoop();
  }
}

function restartGame() {
  if (random() > 0.5) {
    TURN = "human";
  } else {
    TURN = "ai";
    setTimeout(() => {
      let possible = [
        [0, 0],
        [0, 2],
        [1, 1],
        [2, 0],
        [2, 2],
      ];
      possible = possible[int(random(0, 5))];
      BOARD[possible[0]][possible[1]] = ai_XO;
      TURN = "human";
    }, int(random(1000, 1200)));
  }

  turn_label.html("");
  ai_speech_label.html("");
  turn_label.show();
  ai_speech_label.show("");
  winner_label.html("");
  playagain_label.html("");
  TheWinner = null;
  hasWinner = false;
  prevTurn = null;
  BOARD = [
    [[BLANK], [BLANK], [BLANK]],
    [[BLANK], [BLANK], [BLANK]],
    [[BLANK], [BLANK], [BLANK]],
  ];
  GAME_STATE = true;
  loop();
}

let prevTurn = null;

function drawTURN() {
  if (prevTurn != TURN && !hasWinner) {
    const aiSpeech_ =
      TURN === "human"
        ? `${human_turn_wordbank[int(random(human_turn_wordbank.length))]}`
        : `${ai_turn_wordbank[int(random(ai_turn_wordbank.length))]}`;
    const turn_ = TURN === "human" ? "your turn" : "ai's turn";
    turn_label.html(turn_);

    ai_speech_label.html(`ai: ${aiSpeech_}`);
    prevTurn = TURN;
  }
}
