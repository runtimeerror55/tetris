const CoordinatesAndColorsOfTetrominos = [
      {
            allCoordinates: [
                  [0, 5],
                  [1, 5],
                  [2, 5],
                  [2, 6],
            ],
            colorClass: "l-tetromino-active",
      }, // l tetromino
      {
            allCoordinates: [
                  [0, 5],
                  [0, 6],
                  [0, 7],
                  [1, 6],
            ],
            colorClass: "t-tetromino-active",
      }, // t tetromino

      {
            allCoordinates: [
                  [0, 5],
                  [0, 6],
                  [1, 5],
                  [1, 6],
            ],
            colorClass: "square-tetromino-active",
      }, // square

      {
            allCoordinates: [
                  [0, 5],
                  [0, 6],
                  [0, 7],
                  [0, 8],
            ],
            colorClass: "line-tetromino-active",
      }, // line tetromino

      {
            allCoordinates: [
                  [0, 5],
                  [1, 5],
                  [1, 6],
                  [2, 6],
            ],
            colorClass: "z-tetromino-active",
      }, // skew tetromino
];

let randomGeneratedTetrominos = [
      1, 3, 1, 0, 1, 3, 2, 2, 1, 1, 3, 2, 2, 3, 3, 3, 3, 1, 3, 1, 3, 2, 3, 2, 0,
      1, 3, 0, 1, 2, 3, 0, 0, 3, 1, 2, 2, 2, 0, 0, 0, 1, 1, 2, 0, 0, 1, 1, 0, 1,
      1, 2, 0, 2, 3, 1, 3, 3, 2, 2, 1, 1, 1, 0, 1, 1, 0, 2, 2, 3, 1, 1, 0, 3, 3,
      2, 0, 1, 2, 0, 2, 2, 3, 2, 1, 0, 3, 1, 3, 2, 2, 3, 2, 2, 1, 1, 1, 2, 2, 1,
];
