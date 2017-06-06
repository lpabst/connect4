angular.module("app")
.controller("homeCtrl", function($scope) {

    var board = [
        ['white', 'white', 'white', 'white', 'white', 'white', ], //column0
        ['white', 'white', 'white', 'white', 'white', 'white', ], //column1
        ['white', 'white', 'white', 'white', 'white', 'white', ], //column2
        ['white', 'white', 'white', 'white', 'white', 'white', ], //column3
        ['white', 'white', 'white', 'white', 'white', 'white', ], //column4
        ['white', 'white', 'white', 'white', 'white', 'white', ], //column5
        ['white', 'white', 'white', 'white', 'white', 'white', ]  //column6
    ];
    var color = 'blue';
    var id = '';
    var functionToExecute = clearBoard;
    
    $scope.showAreYouSureBox = false;
    $scope.score = {
        player1: 0,
        player2: 0,
    }

    var $column = $('.column');
    var $circle = $('.circle');

//Controls Fuctions

    $scope.getScore = function(){
        return $scope.score;
    }

    $scope.getScore();

    var clearBoard = function(){
        for (var i = 0; i < board.length; i++){
            for (var j = 0; j < board[i].length; j++){
                board[i][j] = 'white';
            }
        }
        $circle.css('background', '#eee');
        $scope.showAreYouSureBox = false;
    }

    var resetScore = function(){
        $scope.score = {
            player1: 0,
            player2: 0
        }
        $scope.showAreYouSureBox = false;
    }

    $scope.areYouSure = function(num, str){
        $scope.action = str;
        $scope.showAreYouSureBox = true;
        if (num === 1){
            functionToExecute = clearBoard;
        }else if (num === 2){
            functionToExecute = resetScore;
        }
    }

    $scope.executeSelectedFunction = function(){
        functionToExecute();
    }

    $scope.hideAreYouSureBox = function(){
        $scope.showAreYouSureBox = false;
    }

// Board Functions
    
    //Show piece drop location on hover
    $column.mouseenter(highlightLocation);

    function highlightLocation(){
        var columnIndex = $(this).attr('id').split('').pop();   //gets column index from the 'id' attribute
        for (var j = 0; j < board[columnIndex].length; j++){    //loops through the selected column in the array
            if (board[columnIndex][j] == 'white'){              //finds the first circle that is white
                var id = '#c'+columnIndex+'r'+j;                //constructs the proper id selector using the current array index 
                if (color == 'blue'){                       
                    return $(id).css('background', '#aaf');     //highlights the id-selected div light blue;
                }else{
                    return $(id).css('background', '#faa');     //highlights the id-selected div light red;
                }
                
            }
        }
    }

    //Return css to normal background when mouse
    //leaves the hover
    $column.mouseleave(function(){
        var columnIndex = $(this).attr('id').split('').pop();
        for (var j = 0; j < board[columnIndex].length; j++){
            if (board[columnIndex][j] != 'blue' 
            && board[columnIndex][j] != 'red'){
                var id = '#c'+columnIndex+'r'+j;
                $(id).css('background', '#eee');
            }
        }
    })

  //Player 1 = 'blue', Player 2 = 'red'
    function colorChange(){
        if (color == 'blue'){
            color = 'red';
        }else{
            color = 'blue';
        }
    }

//Changes the color of appropriate circle 
//when column is clicked
    $column.click(function(){
        var columnIndex = $(this).attr('id').split('').pop();   //gets column index from the 'id' attribute
        for (var j = 0; j < board[columnIndex].length; j++){    //loops through the selected column in the array
            if (board[columnIndex][j] == 'white'){              //finds the first circle that is white
                board[columnIndex][j] = color;                  //updates the array according to who made the move
                var id = '#c'+columnIndex+'r'+j;                //constructs the appropriate id-selector
                $(id).css('background', color);                 //updates the id-selected div according to who made the move
                return colorChange();                           //changes who's turn it is
            }
        }
    })

//Check for winner         
    $scope.checkForWinner = function(){
        //vertical winner
        for (var i = 0; i < board.length; i ++){
            for (var j = 0; j <= 2; j ++){
                if (board[i][j] == 'blue'
                && board[i][j+1] == 'blue'
                && board[i][j+2] == 'blue'
                && board[i][j+3] == 'blue'){
                    clearBoard();
                    return $scope.score.player1 += 1;
                }else if (board[i][j] == 'red'
                && board[i][j+1] == 'red'
                && board[i][j+2] == 'red'
                && board[i][j+3] == 'red'){
                    clearBoard();
                    return $scope.score.player2 += 1;
                }
            }
        }

        //horizontal winner
        for (var i = 0; i < board.length-3; i ++){
            for (var j = 0; j < 6; j ++){
                if (board[i][j] == 'blue'
                && board[i+1][j] == 'blue'
                && board[i+2][j] == 'blue'
                && board[i+3][j] == 'blue'){
                    clearBoard();
                    return $scope.score.player1 += 1;
                }else if (board[i][j] == 'red'
                && board[i+1][j] == 'red'
                && board[i+2][j] == 'red'
                && board[i+3][j] == 'red'){
                    clearBoard();
                    return $scope.score.player2 += 1;
                }
            }
        }

        //bottom left to upper right winner
        for (var i = 0; i < board.length-3; i ++){
            for (var j = 0; j <=2; j ++){
                if (board[i][j] == 'blue'
                && board[i+1][j+1] == 'blue'
                && board[i+2][j+2] == 'blue'
                && board[i+3][j+3] == 'blue'){
                    clearBoard();
                    return $scope.score.player1 += 1;
                }else if (board[i][j] == 'red'
                && board[i+1][j+1] == 'red'
                && board[i+2][j+2] == 'red'
                && board[i+3][j+3] == 'red'){
                    clearBoard();
                    return $scope.score.player2 += 1;
                }
            }
        }

        //upper left to bottom right winner
        for (var i = 0; i < board.length-3; i ++){
            for (var j = board[i].length-1; j >= 3; j --){
                if (board[i][j] == 'blue'
                && board[i+1][j-1] == 'blue'
                && board[i+2][j-2] == 'blue'
                && board[i+3][j-3] == 'blue'){
                    clearBoard();
                    return $scope.score.player1 += 1;
                }else if (board[i][j] == 'red'
                && board[i+1][j-1] == 'red'
                && board[i+2][j-2] == 'red'
                && board[i+3][j-3] == 'red'){
                    clearBoard();
                    return $scope.score.player2 += 1;
                }
            }
        }
    }

});
