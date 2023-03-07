class Game {
    constructor() {
        this.missed = 0;
        this.phrases = [
            {phrase: 'Chuku Luku'}, {phrase: 'JavaScript'}, {phrase: 'Front Backend'}, {phrase: 'Israel'}, {phrase: 'Jerusalem'}
        ];
        this.activePhrase = null;
    }
    
    /**
    * Selects random phrase from phrases property
    * @return {Object} Phrase object chosen to be used
    */
    getRandomPhrase() {
        const random = this.phrases[Math.floor(Math.random() * this.phrases.length)];
        return new Phrase(random.phrase);
    }

        /**
    * Begins game by selecting a random phrase and displaying it to user
    */
    startGame() {
        overlay.style.display = 'none';
        this.activePhrase = this.getRandomPhrase()
        this.activePhrase.addPhraseToDisplay();
    }

    checkForWin() {
        const hideLetter = document.querySelectorAll('.letter.hide');
        return hideLetter.length === 0;
    }

    removeLife() {
        const hiddenLetter = document.querySelectorAll(`.letter.hide`);
        const img = document.querySelectorAll('.tries img');
        this.missed += 1;
        // selects the heart image corresponding to the cuurent number of lives lost
        img[this.missed - 1].src = 'images/lostHeart.png';
        img[this.missed - 1].alt = 'Lost Heart Icon';
        if(this.missed === 5) {
            this.gameOver(false);
        }
    }


    gameOver(gameWon) {
        const gameOverMessage = document.getElementById('game-over-message');
        overlay.style.display = '';
        if (gameWon) {
            gameOverMessage.textContent = `You gueesed the right phrase after ${this.missed} wrong guesses. Well Done!`
            overlay.classList.remove('start')
            overlay.classList.add('win');
        } else {
            gameOverMessage.textContent = `Keep on going, try to start over again and guess the right phrase.`
            overlay.classList.remove('start')
            overlay.classList.add('lose');
        }
        this.resetGame()
    }


    // function buttonsEvent(e) {
//   const button = e.target;
//   const buttonText = e.target.textContent;
//   if (button.tagName === 'BUTTON') {
//       button.classList.add('chosen');
//     if (!game.handleInteraction(buttonText)) {
//       button.classList.add('wrong');
//       button.disabled = true;
//     }
//   }
// }

    handleInteraction(button) {
        button.disabled = true;
        const isMatch = this.activePhrase.checkLetter(button.textContent);
        if(isMatch) {
            button.classList.add('chosen');
            if(this.checkForWin()) {
                this.gameOver(true);
            }
            return true;
        } else {
            button.classList.add('wrong');
            this.removeLife();
            return false;
        }
    }



      

    resetGame() {
        this.missed = 0;
        const buttons = document.querySelectorAll('.key');
        for (let i = 0; i < buttons.length; i++) {
          buttons[i].classList.remove('chosen', 'wrong');
          buttons[i].disabled = false;;
        }
        const img = document.querySelectorAll('.tries img');
        for (let i=0; i< img.length; i++) {
            img[i].src = 'images/liveHeart.png';
            img[i].alt = 'Heart Icon'
        }
        const liArray = [...phraseUL.children];
        for (let i = 0; i < liArray.length; i++) {
          phraseUL.removeChild(liArray[i]);
        }
    }
}
