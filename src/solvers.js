/*           _
   ___  ___ | |_   _____ _ __ ___
  / __|/ _ \| \ \ / / _ \ '__/ __|
  \__ \ (_) | |\ V /  __/ |  \__ \
  |___/\___/|_| \_/ \___|_|  |___/

*/

// hint: you'll need to do a full-search of all possible arrangements of pieces!
// (There are also optimizations that will allow you to skip a lot of the dead search space)
// take a look at solversSpec.js to see what the tests are expecting


// return a matrix (an array of arrays) representing a single nxn chessboard, with n rooks placed such that none of them can attack each other

window.findNRooksSolution = function(n) {
  var board = new Board({'n':n})
  //loop through each row and find a legal play
  for (var i = 0; i < n; i++) {
    for(var j = 0; j < n; j++) {
      board.togglePiece(i,j);
      if(board.hasAnyRooksConflicts()){
        //if illegal play, remove piece
        board.togglePiece(i,j);
      }
    }
  }
  var solution = board.rows()
  console.log('Single solution for ' + n + ' rooks:', JSON.stringify(solution));
  return solution;
};



// return the number of nxn chessboards that exist, with n rooks placed such that none of them can attack each other
window.countNRooksSolutions = function(n) {
  var board = new Board({'n':n})
  var solutionCount = 0; //fixme

  var placeRook = function(row) {
    for(var j = 0; j < n; j++) {
      if(row === n) {
        return solutionCount++;
      }
      board.togglePiece(row,j);
      if(!(board.hasAnyRooksConflicts())) {
        placeRook(row+1);
      }
      board.togglePiece(row,j);
    }
  }
  placeRook(0);
  console.log('Number of solutions for ' + n + ' rooks:', solutionCount);
  return solutionCount;
};



// return a matrix (an array of arrays) representing a single nxn chessboard, with n queens placed such that none of them can attack each other
window.findNQueensSolution = function(n) {
  var board = new Board({'n':n})
  var solution;
  if (n === 1) {
    return [[1]];
  }
  if (n === 0 || n === 2 || n === 3) {
    return board.rows();
  }

  var placeQueen = function(row){
    for(var j = 0; j < n; j++) {
      if(row === n) {
        return solution = _.map(board.rows(), function(row){
          return row.slice();
        });
      }
      board.togglePiece(row,j);
      if(!(board.hasAnyQueensConflicts())) {
        placeQueen(row+1);
      }
      board.togglePiece(row,j);
    }
  }
  placeQueen(0);
  return solution;
};


// return the number of nxn chessboards that exist, with n queens placed such that none of them can attack each other
window.countNQueensSolutions = function(n) {
  var board = new Board({'n':n})
  var solutionCount = 0;
  if (n === 1 || n === 0) {
    return 1;
  }
  if (n === 2 || n === 3) {
    return 0;
  }
  var placeQueen = function(row){
    for(var j = 0; j < n; j++) {
      if(row === n) {
        return solutionCount++;
      }
      board.togglePiece(row,j);
      if(!(board.hasAnyQueensConflicts())) {
        placeQueen(row+1);
      }
      board.togglePiece(row,j);
    }
  }
  placeQueen(0);
  console.log('Number of solutions for ' + n + ' queens:', solutionCount);
  return solutionCount;
};
