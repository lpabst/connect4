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
    var score = {
        player1: 0,
        player2: 0
    }
    var color = 'blue';
    var id = '';
    var functionToExecute = clearBoard;
    
    $scope.pOneScore = score.player1;
    $scope.pTwoScore = score.player2;
    $scope.showAreYouSureBox = false;

//Controls Fuctions

    var clearBoard = function(){
        for (var i = 0; i < board.length; i++){
            for (var j = 0; j < board[i].length; j++){
                board[i][j] = 'white';
            }
        }
        $('.circle').css('background', '#eee');
        $scope.showAreYouSureBox = false;
    }

    var resetScore = function(){
        score = {
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
    
  //Player 1 = 'blue', Player 2 = 'red'

    function colorChange(){
        if (color == 'blue'){
            color = 'red';
        }else{
            color = 'blue';
        }
    }

    $('#col_0').click(function(){
        for (var i = 0; i < board[0].length; i ++){
            if (board[0][i] == 'white'){
                id = '#c0r' + i;
                $(id).css('background', color);
                board[0][i] = color;
                return colorChange();
            }
        }
    });

    $('#col_1').click(function(){
        for (var i = 0; i < board[1].length; i ++){
            if (board[1][i] == 'white'){
                id = '#c1r' + i;
                $(id).css('background', color);
                board[1][i] = color;
                return colorChange();
            }
        }
    });

    $('#col_2').click(function(){
        for (var i = 0; i < board[2].length; i ++){
            if (board[2][i] == 'white'){
                id = '#c2r' + i;
                $(id).css('background', color);
                board[2][i] = color;
                return colorChange();
            }
        }
    });

    $('#col_3').click(function(){
        for (var i = 0; i < board[3].length; i ++){
            if (board[3][i] == 'white'){
                id = '#c3r' + i;
                $(id).css('background', color);
                board[3][i] = color;
                return colorChange();
            }
        }
    });

    $('#col_4').click(function(){
        for (var i = 0; i < board[4].length; i ++){
            if (board[4][i] == 'white'){
                id = '#c4r' + i;
                $(id).css('background', color);
                board[4][i] = color;
                return colorChange();
            }
        }
    });

    $('#col_5').click(function(){
        for (var i = 0; i < board[5].length; i ++){
            if (board[5][i] == 'white'){
                id = '#c5r' + i;
                $(id).css('background', color);
                board[5][i] = color;
                return colorChange();
            }
        }
    });

    $('#col_6').click(function(){
        for (var i = 0; i < board[6].length; i ++){
            if (board[6][i] == 'white'){
                id = '#c6r' + i;
                $(id).css('background', color);
                board[6][i] = color;
                return colorChange();
            }
        }
    });


        

    






});
