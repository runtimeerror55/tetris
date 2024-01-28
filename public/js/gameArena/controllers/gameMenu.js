class GameMenu extends GameStats {
      play;
      pause;
      menu;

      constructor() {
            super();
            this.play = document.querySelector("#play-button");
            this.menu = document.querySelector(".menu");
            this.createGameMenuEventListeners();
      }

      createGameMenuEventListeners() {
            this.play.addEventListener(
                  "click",
                  function () {
                        this.menu.classList.toggle("menu-toggle");
                        this.play.innerText = "Play again";
                        this.reset();
                        this.setStartingPosition();
                        this.start();
                  }.bind(this)
            );
      }
}

const laserGunShotSound = new Audio("public/sounds/laserGunShot.wav");
const fall = new Audio("public/sounds/fireball.wav");
const glassBreak = new Audio("public/sounds/bonus.wav");
const gameOver = new Audio("public/sounds/gameOver.wav");
