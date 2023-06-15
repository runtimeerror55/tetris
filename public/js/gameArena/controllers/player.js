class Player extends playerInputsController {
      score;
      number;
      currentTetrominoIndex;
      playerBoardMatrix;
      count;
      constructor() {
            super();
            this.score = 0;
            this.number = 1;
            this.currentTetrominoIndex = 0;
            this.createPlayerBoardMatrix();
            this.count = 0;
            this.updateCurrentTetromino();
            this.setStartingPosition();
      }
      createPlayerBoardMatrix() {
            this.playerBoardMatrix = [];

            for (let i = 0; i < 22; i++) {
                  this.playerBoardMatrix[i] = [];
                  const rowColumnNodes = document.querySelectorAll(
                        `#player-1-row-${i} .column`
                  );
                  for (let j = 0; j < 15; j++) {
                        this.playerBoardMatrix[i].push({
                              node: rowColumnNodes[j],
                              colorClass: "",
                        });
                  }
            }
      }

      refreshBinaryMatrix() {
            for (let i = 0; i < 22; i++) {
                  for (let j = 0; j < 16; j++) {
                        this.binaryMatrix[i][j] = 0;
                  }
            }
      }
      updateplayerBoardMatrix() {
            this.currentTetromino.allCoordinates.forEach((coordinates) => {
                  this.playerBoardMatrix[coordinates[0]][
                        coordinates[1]
                  ].colorClass = this.currentTetromino.colorClass;
            });
      }
      updateCurrentTetromino() {
            this.currentTetrominoIndex++;
            this.currentTetromino = {
                  allCoordinates: CoordinatesAndColorsOfTetrominos[
                        randomGeneratedTetrominos[this.currentTetrominoIndex]
                  ].allCoordinates.map((element) => [element[0], element[1]]),

                  colorClass:
                        CoordinatesAndColorsOfTetrominos[
                              randomGeneratedTetrominos[
                                    this.currentTetrominoIndex
                              ]
                        ].colorClass,
            };
      }
      setStartingPosition() {
            this.currentTetromino.allCoordinates.forEach((coordinates) => {
                  this.toggleClass(coordinates);
            });
      }

      start() {
            if (this.count == 30) {
                  if (playerone.isPossibleToMove("ArrowDown")) {
                        playerone.moveDown();
                        this.count = 0;
                  } else {
                        this.updateplayerBoardMatrix();
                        this.updateCurrentTetromino();
                        if (this.isPossibleToMove("setStartingPosition")) {
                              this.setStartingPosition();
                        } else {
                              console.log("game over");
                              return;
                        }
                  }
            } else {
                  this.count++;
            }
            requestAnimationFrame(this.start.bind(this));
      }
}
