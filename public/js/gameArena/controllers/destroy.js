class Destroy {
      destroy() {
            this.currentTetromino.allCoordinates.forEach((coordinates) => {
                  if (
                        this.playerBoardInBinary[coordinates[0] * 16 + 15] == 15
                  ) {
                        for (let i = 0; i < 16; i++) {
                              let tempCoordinates = [coordinates[0], i];
                              this.toggleClass(tempCoordinates);
                        }
                  }
            });
      }

      isDestroyPossible() {
            this.currentTetromino.allCoordinates.some((coordinates) => {
                  return (
                        this.playerBoardInBinary[coordinates[0] * 16 + 15] == 15
                  );
            });
      }
}
