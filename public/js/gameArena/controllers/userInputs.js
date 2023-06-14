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
                                    !this.playerBoardInBinary[
                                          coordinates[0] * 16 +
                                                coordinates[1] -
                                                1
                                    ] && coordinates[1] > 0
                              );
                        }
                  );
            } else if (direction === "ArrowRight") {
                  return this.currentTetromino.allCoordinates.every(
                        (coordinates) => {
                              return (
                                    !this.playerBoardInBinary[
                                          coordinates[0] * 16 +
                                                coordinates[1] +
                                                1
                                    ] && coordinates[1] < 14
                              );
                        }
                  );
            } else if (direction === "ArrowDown") {
                  return this.currentTetromino.allCoordinates.every(
                        (coordinates) => {
                              return (
                                    !this.playerBoardInBinary[
                                          coordinates[0] * 16 +
                                                coordinates[1] +
                                                16
                                    ] && coordinates[0] < 21
                              );
                        }
                  );
            } else if ("setStartingPosition") {
                  return this.currentTetromino.allCoordinates.every(
                        (coordinates) => {
                              return !this.playerBoardInBinary[
                                    coordinates[0] * 16 + coordinates[1]
                              ];
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
      playerBoardInBinary;
      count;
      playerBoardAllNodes;
      constructor() {
            super();
            this.score = 0;
            this.number = 1;
            this.currentTetrominoIndex = 0;
            this.createPlayerBoardBinaryArray();
            this.count = 0;
            this.playerBoardAllNodes = document.querySelectorAll(".column");
            this.updateCurrentTetromino();
            this.setStartingPosition();
      }
      createPlayerBoardBinaryArray() {
            this.playerBoardInBinary = [];
            for (let i = 0; i < 22; i++) {
                  for (let j = 0; j < 16; j++) {
                        this.playerBoardInBinary.push(0);
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
      updateplayerBoardInBinary() {
            this.currentTetromino.allCoordinates.forEach((coordinates) => {
                  this.playerBoardInBinary[
                        coordinates[0] * 16 + coordinates[1]
                  ] = 1;
                  this.playerBoardInBinary[coordinates[0] * 16 + 15]++;
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
                        this.updateplayerBoardInBinary();
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

let x = [];
for (let i = 0; i < 22; i++) {
      x[i] = [];
      for (let j = 0; j < 16; j++) {
            x[i].push(0);
      }
}

let y = [];

for (let i = 0; i < 22; i++) {
      for (let j = 0; j < 16; j++) {
            y.push(0);
      }
}

function startxx() {
      let start = Date.now();
      for (let i = 0; i < 22; i++) {
            for (let j = 0; j < 16; j++) {
                  x[i][j] = 1;
            }
      }
      let end = Date.now();
      console.log(end - start);
}

function starty() {
      let start = Date.now();
      for (let i = 0; i < 22 * 16; i++) {
            y[i] = 1;
      }
      let end = Date.now();
      console.log(end - start);
}
