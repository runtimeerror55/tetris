class Ui {
      toggleClass(coordinates) {
            this.playerBoardMatrix[coordinates[0]][
                  coordinates[1]
            ].node.classList.toggle(this.currentTetromino.colorClass);
      }
}
