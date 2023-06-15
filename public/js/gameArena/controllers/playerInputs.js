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
