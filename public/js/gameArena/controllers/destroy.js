class Destroy {
      destroy(destroyableRows) {
            destroyableRows.forEach((row) => {
                  let r1 = this.playerBoardMatrix[row];
                  r1.forEach((cell, index) => {
                        if (index != 15) {
                              cell.node.classList.toggle(cell.colorClass);
                              cell.colorClass = "";
                        }
                  });
                  row--;
                  let r2 = this.playerBoardMatrix[row];
                  console.log(r2[15]);
                  while (r2[15]) {
                        for (let i = 0; i < 15; i++) {
                              let cell1 = r1[i];
                              let cell2 = r2[i];
                              if (cell2.colorClass) {
                                    cell2.node.classList.toggle(
                                          cell2.colorClass
                                    );
                                    cell1.node.classList.toggle(
                                          cell2.colorClass
                                    );
                                    cell1.colorClass = cell2.colorClass;
                                    cell2.colorClass = "";
                              }
                        }
                        r1[15] = r2[15];
                        r2[15] = 0;
                        row--;
                        r1 = r2;
                        r2 = this.playerBoardMatrix[row];
                  }
            });
      }

      areThereAnydestroyableRows() {
            const destroyableRows = new Set();
            this.currentTetromino.allCoordinates.forEach((coordinates) => {
                  if (this.playerBoardMatrix[coordinates[0]][15] == 15) {
                        destroyableRows.add(coordinates[0]);
                  }
            });
            return [...destroyableRows];
      }
}
