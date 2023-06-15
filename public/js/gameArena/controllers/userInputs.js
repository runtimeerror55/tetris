class playerInputsController extends Ui {
      constructor() {
            super();
            this.createInputEventListeners();
      }

      createInputEventListeners() {
            const body = document.querySelector("body");
            body.addEventListener(
                  "keydown",
                  playerInputsController.handleKeyDown
            );
      }

      static handleKeyDown(e) {
            if (e.key == "ArrowRight") {
                  playerone.moveRight();
            } else if (e.key == "ArrowLeft") {
                  playerone.moveLeft();
            } else if (e.key == "ArrowDown") {
                  playerone.moveDown();
            }
      }
      moveRight() {
            if (this.isPossibleToMove("ArrowRight")) {
                  this.currentTetromino.allCoordinates.forEach(
                        (coordinates) => {
                              this.toggleClass(coordinates);
                              coordinates[1]++;
                        }
                  );

                  this.currentTetromino.allCoordinates.forEach(
                        (coordinates) => {
                              this.toggleClass(coordinates);
                        }
                  );
            }
      }

      moveDown() {
            if (this.isPossibleToMove("ArrowDown")) {
                  this.currentTetromino.allCoordinates.forEach(
                        (coordinates) => {
                              this.toggleClass(coordinates);
                              coordinates[0]++;
                        }
                  );

                  this.currentTetromino.allCoordinates.forEach(
                        (coordinates) => {
                              this.toggleClass(coordinates);
                        }
                  );
            }
      }

      moveLeft() {
            if (this.isPossibleToMove("ArrowLeft")) {
                  this.currentTetromino.allCoordinates.forEach(
                        (coordinates) => {
                              this.toggleClass(coordinates);
                              coordinates[1]--;
                        }
                  );

                  this.currentTetromino.allCoordinates.forEach(
                        (coordinates) => {
                              this.toggleClass(coordinates);
                        }
                  );
            }
      }

      isPossibleToMove(direction) {
            if (direction === "ArrowLeft") {
                  return this.currentTetromino.allCoordinates.every(
                        (coordinates) => {
                              return (
                                    coordinates[1] > 0 &&
                                    !this.playerBoardMatrix[coordinates[0]][
                                          coordinates[1] - 1
                                    ].colorClass
                              );
                        }
                  );
            } else if (direction === "ArrowRight") {
                  return this.currentTetromino.allCoordinates.every(
                        (coordinates) => {
                              return (
                                    coordinates[1] < 14 &&
                                    !this.playerBoardMatrix[coordinates[0]][
                                          coordinates[1] + 1
                                    ].colorClass
                              );
                        }
                  );
            } else if (direction === "ArrowDown") {
                  return this.currentTetromino.allCoordinates.every(
                        (coordinates) => {
                              return (
                                    coordinates[0] < 21 &&
                                    !this.playerBoardMatrix[coordinates[0] + 1][
                                          coordinates[1]
                                    ].colorClass
                              );
                        }
                  );
            } else if ("setStartingPosition") {
                  return this.currentTetromino.allCoordinates.every(
                        (coordinates) => {
                              return !this.playerBoardMatrix[coordinates[0]][
                                    coordinates[1]
                              ].colorClass;
                        }
                  );
            }
            return false;
      }
}

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
