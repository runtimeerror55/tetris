class playerInputsController extends VisualUpdate {
      constructor() {
            super();
            this.createInputEventListeners();
      }

      createInputEventListeners() {
            const body = document.querySelector("body");
            body.addEventListener("keydown", this.handleKeyDown.bind(this));
      }

      handleKeyDown(e) {
            if (e.key == "ArrowRight") {
                  playerone.moveRight();
            } else if (e.key == "ArrowLeft") {
                  playerone.moveLeft();
            } else if (e.key == "ArrowDown") {
                  playerone.moveDown();
            } else if (e.key == " ") {
                  const setOfrotatedCoordinates = this.isRotationPossible();

                  if (setOfrotatedCoordinates) {
                        this.rotate(setOfrotatedCoordinates);
                  }
            }
      }
      moveRight() {
            if (this.isPossibleToMove("ArrowRight")) {
                  const x = this.currentTetromino;
                  const y = this.playerBoardMatrix;
                  x.allCoordinates.forEach((z) => {
                        const cell = y[z[0]][z[1]];
                        cell.node.classList.toggle(x.colorClass);
                        z[1]++;
                  });

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

      isRotationPossible() {
            const x = this.currentTetromino.allCoordinates;
            const y = this.playerBoardMatrix;
            const setOfrotatedCoordinates = x.map((coordinates) => {
                  return [
                        coordinates[1] - x[0][1] + x[0][0],
                        -(coordinates[0] - x[0][0]) + x[0][1],
                  ];
            });

            const output = setOfrotatedCoordinates.every((coordinates) => {
                  return (
                        coordinates[0] < 22 &&
                        coordinates[0] > -1 &&
                        coordinates[1] < 14 &&
                        coordinates[1] > -1 &&
                        !y[coordinates[0]][coordinates[1]].colorClass
                  );
            });
            if (output) {
                  return setOfrotatedCoordinates;
            } else {
                  return false;
            }
      }
      rotate(setOfrotatedCoordinates) {
            this.currentTetromino.allCoordinates.forEach((coordinates) => {
                  this.toggleClass(coordinates);
            });
            setOfrotatedCoordinates.forEach((coordinates) => {
                  this.toggleClass(coordinates);
            });
            this.currentTetromino.allCoordinates = setOfrotatedCoordinates;
      }
}
