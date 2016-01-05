var gameArray = [];
var gameWonArray = ["1","2","3","4","5","6","7","8","9","10","11","12","13","14","15"];
var gameStatus;
var moves;

$(document).ready(function(){
    //$('.mainbox').draggable();
    $('.newgame').button().click(function(){
        location.reload();
    });
    
    newGame();//Set the game for the first time
    
    $('.element').click(function(){
        //this.id contains the element ID
        var moveObj = this.id;
        var elementId;
        var moveP = document.getElementById(this.id).innerHTML;
        if(moveP.length === 8)
            elementId = moveP.substring(3,4);
        else
            elementId = moveP.substring(3,5);
        //try moving the element
        moveElement(elementId, moveObj);
    });
});

var moveElement = function(inId, moveObj){
    //get position of the element that we are trying to move
    var elementPos = gameArray.indexOf(inId);
    //find the position of the empty string in the gameArray
    var emptyPos = gameArray.indexOf(" ");
    var val = elementPos - emptyPos;
    if(val === -1)
    {
        moveRight(moveObj);
        swap(elementPos, emptyPos);
    }
    else if(val === -4)
    {
        moveDown(moveObj);
        swap(elementPos, emptyPos);
    }
    else if(val === 4)
    {
        moveUp(moveObj);
        swap(elementPos, emptyPos);
    }
    else if(val === 1)
    {
        moveLeft(moveObj);
        swap(elementPos, emptyPos);
    }
    
    if(gameStatus)
    {
        $('.banner').append('<p  id="#bannerText"> Game over. Total moves: '+moves+'.</p>').fadeIn('fast');
        window.setTimeout(function(){
            $('.mainbox').toggle("explode");
        },800);
    }
};

var swap =function(from, to){
    var temp = gameArray[to];
    gameArray[to] = gameArray[from];
    gameArray[from] = temp;
    checkGameStatus();
    console.log(gameArray);
    moves++;
    
    $('#countval').remove();
    $('.counts').append('<p id="countval"> Moves: '+moves+'</p>');
};


var checkGameStatus = function(){
    var i=0;
    gameStatus = true;
    for(i=0; i< 15; i++)
    {
        if(gameArray[i+1] != gameWonArray[i])
        {
            gameStatus = false;
            return;
        }
    }
};

var moveRight = function(inElementId){
    //build identifier
    var moveId = "#"+inElementId;
    //move the element on the board
    $(moveId).animate({'marginLeft':"+=90px"},'fast');
};

var moveLeft = function(inElementId){
    var moveId = "#"+inElementId;
    $(moveId).animate({'marginLeft':"-=90px"},'fast');
};

var moveUp = function(inElementId){
    var moveId = "#"+inElementId;
    $(moveId).animate({'marginTop':"-=90px"},'fast');
};

var moveDown = function(inElementId){
    var moveId = "#"+inElementId;
    $(moveId).animate({'marginTop':"+=90px"},'fast');
};


var newGame = function(){
    $("#bannerText").remove();
    $('#countval').remove();
    
    gameStatus = false;
    moves = 0;
    var count = 0;
    var alreadyPopulated = [];
    var i=0;
    do{
        var pos = Math.floor(Math.random() * 15 + 1);
        if((pos >= 1 || pos <= 15) && (alreadyPopulated.indexOf(pos) === -1))
        {
            alreadyPopulated[i] = pos;
            i++;
            count ++;
            var elementId = "#element" + i;
            $(elementId).append('<p>'+pos+'</p>');
            gameArray[i] = pos.toString();
        }
    }while(count < 15)
    i++;
    gameArray[i]=" ";
};