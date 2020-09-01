/*
GAME RULES:

- The game has 2 players, playing in rounds
- In each turn, a player rolls a dice as many times as he whishes. Each result get added to his ROUND score
- BUT, if the player rolls a 1, all his ROUND score gets lost. After that, it's the next player's turn
- The player can choose to 'Hold', which means that his ROUND score gets added to his GLBAL score. After that, it's the next player's turn
- The first player to reach 100 points on GLOBAL score wins the game

*/
//==========================================================================================================================
//Declaring Variables
var score, roundScore, activePlayer, isGamePlaying;

//Starting new game
init();

//Roll dice function
document.querySelector('.btn-roll').addEventListener('click', function() {
    if(isGamePlaying) {
        //1. Get random number
        var dice = Math.floor(Math.random() * 6) + 1;
    
        //2. Change number according to random number
        var diceDOM = document.querySelector('.dice');
        diceDOM.style.display = 'block';
        diceDOM.src = 'dice-' + dice + '.png';
    
        //3. update roundscore if rolled dice is not 1
        if(dice !== 1){
            //Add roundScore
            roundScore += dice;        
            document.querySelector('#current-' + activePlayer).textContent = roundScore;
        }
        else{
            //Switch player
            switchPlayer();
        }
    }
});

//Hold score function
document.querySelector('.btn-hold').addEventListener('click', function() {
    if(isGamePlaying) {
        //1. Update Global Score
        score[activePlayer] += roundScore;
    
        //2. Update Global score on UI
        document.querySelector('#score-' + activePlayer).textContent = score[activePlayer];
    
        //3. Check who's the winner    
        if(score[activePlayer] >= 20){
            document.querySelector('#name-' + activePlayer).textContent = "WINNER!";
            isGamePlaying = false;
            hideDice();
            hideButton();
            document.querySelector('.player-' + activePlayer + '-panel').classList.remove('active');
            document.querySelector('.player-' + activePlayer + '-panel').classList.add('winner');
        }
        else {
            //4. Switch Player
            switchPlayer();
        }  
    }
});

//New Game Function
document.querySelector('.btn-new').addEventListener('click', init);


/**********************************************
*** Functions
**********************************************/


//Switch Player function
function switchPlayer() {
        activePlayer === 0 ? activePlayer = 1 : activePlayer = 0;
        roundScore = 0;
        
        //reset their roundScores
        document.getElementById('current-0').textContent = '0';
        document.getElementById('current-1').textContent = '0';
        
        //Toggle active class
        document.querySelector('.player-0-panel').classList.toggle('active');
        document.querySelector('.player-1-panel').classList.toggle('active');
        
        //Hide the dice when switching players
        hideDice();
}

//hide dice function
function hideDice() {
    document.querySelector('.dice').style.display = 'none';
}

//init function
function init() {
    //Initializing values
    score = [0,0];
    roundScore = 0;
    activePlayer = 0;  
    isGamePlaying = true;

    //Setting the image to none at start
    hideDice();

    //Setting the initial scores to zero
    document.getElementById('score-0').textContent = '0';
    document.getElementById('score-1').textContent = '0';
    document.getElementById('current-0').textContent = '0';
    document.getElementById('current-1').textContent = '0';
    
    //Change the name of players
    document.getElementById('name-0').textContent = 'Player 1';
    document.getElementById('name-1').textContent = 'Player 2';
    
    //Removing the winner class and active class
    document.querySelector('.player-0-panel').classList.remove('winner');
    document.querySelector('.player-1-panel').classList.remove('winner');
    document.querySelector('.player-0-panel').classList.remove('active');
    document.querySelector('.player-1-panel').classList.remove('active');
    
    //Setting palyer 1 as active on new game
    document.querySelector('.player-0-panel').classList.add('active');
    
    //Display button
    showButton();
}

//Hide button after selecting winner
function hideButton() {
    var x = document.getElementById("btnRoll").style.display = "none";
    var y = document.getElementById("btnHold").style.display = "none";
}

//Show button on new game
function showButton() {
    var x = document.getElementById("btnRoll").style.display = "block";
    var y = document.getElementById("btnHold").style.display = "block";
}