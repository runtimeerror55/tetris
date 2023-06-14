class Ui {
      toggleClass(coordinates) {
            this.playerBoardAllNodes[
                  coordinates[0] * 15 + coordinates[1]
            ].classList.toggle(this.currentTetromino.colorClass);
      }
}
