define('gamemanager', [], function() {
    "use strict";
    var status = false;
    var moves = 0;
    var gameArray = [];

    var init = function() {
        debugger;
        status = false;
        moves = 0;
        gameArray = [];
        newGame();
    };

    var newGame = function() {
        var  i = 0;
        do {
            var pos = Math.floor(Math.random() * 15 + 1);
            if ((pos >= 1 || pos <= 15) && (gameArray.indexOf(pos.toString()) === -1)) {
                gameArray[i] = pos.toString();
                i++;
            }
        } while (i < 15);
        gameArray[i] = " ";
    };

    var isWon = function() {
        console.log("Called.. isWon");
        var wonArray = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15];
        status = true;
        for (var i = 0; i < 15; i++) {
            if (gameArray[i] != wonArray[i]) {
                status = false;
                break;
            }
        }
        return status;
    };

    var indexVal = function(atPos) {
        return gameArray[atPos];
    };

    var getPos = function(val) {
        return gameArray.indexOf(val);
    };

    var swap = function(from, to) {
        var temp = gameArray[to];
        gameArray[to] = gameArray[from];
        gameArray[from] = temp;
        isWon();
        console.log(gameArray);
        moves++;

    };
    
    var getMoves = function(){
        return moves;  
    };

    return {
        init: init,
        isWon: isWon,
        indexVal: indexVal,
        getPos: getPos,
        swap: swap,
        getMoves: getMoves
    };
});