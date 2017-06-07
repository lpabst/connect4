angular.module("app")
.controller("homeCtrl", function($scope) {

    var board = [
        ['#111', '#111', '#111', '#111', '#111', '#111', ], //column0
        ['#111', '#111', '#111', '#111', '#111', '#111', ], //column1
        ['#111', '#111', '#111', '#111', '#111', '#111', ], //column2
        ['#111', '#111', '#111', '#111', '#111', '#111', ], //column3
        ['#111', '#111', '#111', '#111', '#111', '#111', ], //column4
        ['#111', '#111', '#111', '#111', '#111', '#111', ], //column5
        ['#111', '#111', '#111', '#111', '#111', '#111', ]  //column6
    ];
    var color = '#7f3';
    var id = '';
    var functionToExecute = clearBoard;
    
    $scope.playerOneName = 'Player 1';
    $scope.playerTwoName = 'Player 2';
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
                board[i][j] = '#111';
            }
        }
        $circle.css('background', '#111');
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
            if (board[columnIndex][j] == '#111'){              //finds the first circle that is #111
                var id = '#c'+columnIndex+'r'+j;                //constructs the proper id selector using the current array index 
                if (color == '#7f3'){                       
                    return $(id).css('background', '#af7');     //highlights the id-selected div light green;
                }else{
                    return $(id).css('background', '#940');     //highlights the id-selected div light orange;
                }
                
            }
        }
    }

    //Return css to normal background when mouse
    //leaves the hover
    $column.mouseleave(function(){
        var columnIndex = $(this).attr('id').split('').pop();
        for (var j = 0; j < board[columnIndex].length; j++){
            if (board[columnIndex][j] != '#7f3' 
            && board[columnIndex][j] !='#f80'){
                var id = '#c'+columnIndex+'r'+j;
                $(id).css('background', '#111');
            }
        }
    })

  //Player 1 = '#7f3 (green)', Player 2 ='#f80 (orange)'
    function colorChange(){
        if (color == '#7f3'){
            color = '#f80';
        }else{
            color = '#7f3';
        }
    }

//Changes the color of appropriate circle 
//when column is clicked
    $column.click(function(){
        var columnIndex = $(this).attr('id').split('').pop();   //gets column index from the 'id' attribute
        for (var j = 0; j < board[columnIndex].length; j++){    //loops through the selected column in the array
            if (board[columnIndex][j] == '#111'){              //finds the first circle that is #111
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
                if (board[i][j] == '#7f3'
                && board[i][j+1] == '#7f3'
                && board[i][j+2] == '#7f3'
                && board[i][j+3] == '#7f3'){
                    clearBoard();
                    return $scope.score.player1 += 1;
                }else if (board[i][j] =='#f80'
                && board[i][j+1] =='#f80'
                && board[i][j+2] =='#f80'
                && board[i][j+3] =='#f80'){
                    clearBoard();
                    return $scope.score.player2 += 1;
                }
            }
        }

        //horizontal winner
        for (var i = 0; i < board.length-3; i ++){
            for (var j = 0; j < 6; j ++){
                if (board[i][j] == '#7f3'
                && board[i+1][j] == '#7f3'
                && board[i+2][j] == '#7f3'
                && board[i+3][j] == '#7f3'){
                    clearBoard();
                    return $scope.score.player1 += 1;
                }else if (board[i][j] =='#f80'
                && board[i+1][j] =='#f80'
                && board[i+2][j] =='#f80'
                && board[i+3][j] =='#f80'){
                    clearBoard();
                    return $scope.score.player2 += 1;
                }
            }
        }

        //bottom left to upper right winner
        for (var i = 0; i < board.length-3; i ++){
            for (var j = 0; j <=2; j ++){
                if (board[i][j] == '#7f3'
                && board[i+1][j+1] == '#7f3'
                && board[i+2][j+2] == '#7f3'
                && board[i+3][j+3] == '#7f3'){
                    clearBoard();
                    return $scope.score.player1 += 1;
                }else if (board[i][j] =='#f80'
                && board[i+1][j+1] =='#f80'
                && board[i+2][j+2] =='#f80'
                && board[i+3][j+3] =='#f80'){
                    clearBoard();
                    return $scope.score.player2 += 1;
                }
            }
        }

        //upper left to bottom right winner
        for (var i = 0; i < board.length-3; i ++){
            for (var j = board[i].length-1; j >= 3; j --){
                if (board[i][j] == '#7f3'
                && board[i+1][j-1] == '#7f3'
                && board[i+2][j-2] == '#7f3'
                && board[i+3][j-3] == '#7f3'){
                    clearBoard();
                    return $scope.score.player1 += 1;
                }else if (board[i][j] =='#f80'
                && board[i+1][j-1] =='#f80'
                && board[i+2][j-2] =='#f80'
                && board[i+3][j-3] =='#f80'){
                    clearBoard();
                    return $scope.score.player2 += 1;
                }
            }
        }
    }

    //Audio Controls
    var playlist=[
        './img/audio/tiptoe.mp3',
        './img/audio/bats.mp3',
        './img/audio/troll_hunt.mp3',
        './img/audio/in_doubt.mp3',
        './img/audio/spy_story.mp3'
    ];
    
    var nextSong = 1;
    var audio = document.getElementById('audio');
    audio.addEventListener('ended', function(){
        audio.src = playlist[nextSong];
        audio.load();
        audio.play();
        if (nextSong >= playlist.length-1){
            nextSong = 0;
        }else{
            nextSong++
        }
    })

});
