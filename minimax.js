function findBestMove (board) {
    
    let values = [];
    let newMove = null;
    bestScore = -Infinity;

    for (let i = 0; i < board.length; i++) {
        for (let j = 0; j < board.length; j++) {
            
            let current = board[i][j];
            

            if (current == BLANK ) {
                
                board[i][j] = ai_XO;
                let newBOARD = new BOARD_();
                newBOARD.matrix = board;
                let current_value = minimax(newBOARD.matrix, 0, false);
                board[i][j] = BLANK;

                if (current_value > bestScore) {
                    bestScore = current_value;
                    newMove = { i, j };
                  }

            }

        }
       
       
    }

  
  return newMove;
    

}

function minimax(board, depth, isMaximizingPlayer) {
    

    let result = checkForWinner(board, true);
        
    if (result != null){
        if(result == 'X') {
           return Number(-10);
        }else if (result == 'O') {
            return Number(10);
        }else {
            return Number(0);
        }
    }



 
    if (isMaximizingPlayer) {

        let bestVal = -Infinity;

        for (let i = 0; i < board.length; i++) {
            for (let j = 0; j < board.length; j++) {
                
        
                if (board[i][j] == BLANK ) {
                    
                    board[i][j] = ai_XO;
                    let newBOARD = new BOARD_();
                    newBOARD.matrix = board;
                    let current_value = minimax(newBOARD.matrix, depth + 1, false);
                    board[i][j] = BLANK;
                    bestVal = max(current_value, bestVal)
                }
            }
        }

        return bestVal;

    }else if (!isMaximizingPlayer) {

        let bestVal = Infinity;

        for (let i = 0; i < board.length; i++) {
            for (let j = 0; j < board.length; j++) {
                
                
                if (board[i][j] == BLANK ) {
                    board[i][j]  = human_XO;
                    let newBOARD = new BOARD_();
                    newBOARD.matrix = board;
                    let current_value = minimax(newBOARD.matrix, depth + 1, true);
                    board[i][j] = BLANK;
                    bestVal = min(current_value, bestVal)
                }
            }
        }

        return bestVal;

    }

    
}


class BOARD_ {
    constructor () {
        this.i = 0;
        this.matrix = [

            [[O],[BLANK],[BLANK]],
            [[O],[BLANK],[BLANK]],
            [[O],[BLANK],[BLANK]]
            
            ];
    }
}