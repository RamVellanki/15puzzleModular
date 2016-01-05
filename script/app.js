require.config({
    paths: {
        jquery: '/lib/jquery-1.11.1.min',
        gamemanager: 'game'
    }
});

require(["jquery", "gamemanager"], function($, game) {

    var newGame = function() {
        debugger;
        window.requestAnimationFrame(function() {
            $("#bannerText").remove();
            $('#countval').remove();
            debugger;
            //Initialize game
            game.init();

            for (var i = 1; i < 16; i++) {
                var element = game.indexVal(i - 1);
                var elementId = "#element" + i;
                $(elementId).html('<p>' + element + '</p>');
            }
        });
    };

    $(document).ready(function() {

        $('.newgame').click(function() {
            newGame();
        });

        newGame(); //Set the game for the first time

        $('.element').click(function() {
            //this.id contains the element ID
            var moveObj = this.id;
            var elementId;
            var moveP = document.getElementById(this.id).innerHTML;
            if (moveP.length === 8)
                elementId = moveP.substring(3, 4);
            else
                elementId = moveP.substring(3, 5);
            //try moving the element
            moveElement(elementId, moveObj);
        });

    });

    var moveElement = function(inId, moveObj) {
        //get position of the element that we are trying to move
        var elementPos = game.getPos(inId);
        //find the position of the empty string in the gameArray
        var emptyPos = game.getPos(" ");
        var val = elementPos - emptyPos;
        if (val === -1) {
            moveRight(moveObj);
            game.swap(elementPos, emptyPos);
        } else if (val === -4) {
            moveDown(moveObj);
            game.swap(elementPos, emptyPos);
        } else if (val === 4) {
            moveUp(moveObj);
            game.swap(elementPos, emptyPos);
        } else if (val === 1) {
            moveLeft(moveObj);
            game.swap(elementPos, emptyPos);
        }

        $('#countval').remove();
        $('.counts').append('<p id="countval"> Moves: ' + game.getMoves() + '</p>');

        if (game.isWon()) {
            $('.banner').append('<p  id="#bannerText"> Game over. Total moves: ' + game.getMoves() + '.</p>').fadeIn('fast');
            window.setTimeout(function() {
                $('.mainbox').toggle("explode");
            }, 800);
        }
    };

    var moveRight = function(inElementId) {
        //build identifier
        var moveId = "#" + inElementId;
        $(moveId).removeClass().addClass("moveright", 'fast');
    };

    var moveLeft = function(inElementId) {
        var moveId = "#" + inElementId;
        $(moveId).removeClass().addClass("moveleft", 'fast');
        // $(moveId).animate({
        //     'marginLeft': "-=90px"
        // }, 'fast');
    };

    var moveUp = function(inElementId) {
        var moveId = "#" + inElementId;
        $(moveId).removeClass().addClass("moveup", 'fast');
        // $(moveId).animate({
        //     'marginTop': "-=90px"
        // }, 'fast');
    };

    var moveDown = function(inElementId) {
        var moveId = "#" + inElementId;
        $(moveId).removeClass().addClass("movedown", 'fast');
        // $(moveId).animate({
        //     'marginTop': "+=90px"
        // }, 'fast');
    };
});