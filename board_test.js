import { expect } from "jsr:@std/expect";
import { Board } from "./board.js";

const one = 1;
const two = 2;
const empty = 0;
const dimension = 8;

function fullBoardWithPlayerTwoFillRestWithPlayerOne(playerOneCount) {
     // fill board with player two
     const fields = Array.from({ length: dimension }, () =>
          Array(dimension).fill(two)
     );

     // fill some fields with player one
     let counter = 0;
     for (let r = 0; r < dimension && counter < playerOneCount; r++) {
          for (let c = 0; c < dimension && counter < playerOneCount; c++) {
               fields[r][c] = one;
               counter++;
          }
     }
     return Board.of(fields);
}

function emptyBoard() {
     const fields = Array.from({ length: dimension }, () =>
          Array(dimension).fill(empty)
     );
     return Board.of(fields);
}

function almostFullBoard() {
     const fields = Array.from({ length: dimension }, () =>
          Array(dimension).fill(one)
     );
     fields[0][0] = empty;
     return Board.of(fields);
}

Deno.test("test initial count", () => {
     // Arrange
     const board = new Board();

     // Act
     const playerOneFields = board.fieldsWithState(1);
     const playerTwoFields = board.fieldsWithState(2);
     const emptyFields = board.fieldsWithState(0);

     // Assert
     expect(playerOneFields.length).toBe(2);
     expect(playerTwoFields.length).toBe(2);
     expect(emptyFields.length).toBe(8 * 8 - 2 * 2);
});

Deno.test("test tied = true", () => {
     // Arrange
     const board = fullBoardWithPlayerTwoFillRestWithPlayerOne(32);

     // Act
     const result = board.result();
     const winner = result.winner;
     const tied = result.tied;
     const finished = result.finished;
     const playerOneCount = result.playerOne;
     const playerTwoCount = result.playerTwo;

     // Assert
     expect(finished).toBe(true);
     expect(tied).toBe(true);
     expect(winner).toBe(0);
     expect(playerOneCount).toBe(32);
     expect(playerTwoCount).toBe(32);
});

Deno.test("test tied = false  -> player one wins", () => {
     // Arrange
     const board = fullBoardWithPlayerTwoFillRestWithPlayerOne(40);

     // Act
     const result = board.result();
     const winner = result.winner;
     const tied = result.tied;
     const finished = result.finished;
     const playerOneCount = result.playerOne;
     const playerTwoCount = result.playerTwo;

     // Assert
     expect(finished).toBe(true);
     expect(tied).toBe(false);
     expect(winner).toBe(1);
     expect(playerOneCount).toBe(40);
     expect(playerTwoCount).toBe(24);
});

Deno.test("test tied = false  -> player two wins", () => {
     // Arrange
     const board = fullBoardWithPlayerTwoFillRestWithPlayerOne(20);

     // Act
     const result = board.result();
     const winner = result.winner;
     const tied = result.tied;
     const finished = result.finished;
     const playerOneCount = result.playerOne;
     const playerTwoCount = result.playerTwo;

     // Assert
     expect(finished).toBe(true);
     expect(tied).toBe(false);
     expect(winner).toBe(2);
     expect(playerOneCount).toBe(20);
     expect(playerTwoCount).toBe(44);
});

Deno.test("test tied = false, game not finished", () => {
     // Arrange
     const board = almostFullBoard();

     // Act
     const result = board.result();
     const winner = result.winner;
     const tied = result.tied;
     const finished = result.finished;
     const playerOneCount = result.playerOne;
     const playerTwoCount = result.playerTwo;

     // Assert
     expect(finished).toBe(false);
     expect(tied).toBe(false);
     expect(winner).toBe(0);
     expect(playerOneCount).toBe(63);
     expect(playerTwoCount).toBe(0);
});

Deno.test("test valid move player 1", () => {
     // Arrange
     const board = new Board();
     const player = 1;
     const row = 2;
     const col = 3;

     // Act
     const isValid = board.isValidMove(player, row, col);

     // Assert
     expect(isValid).toBe(true);
});

Deno.test("test valid move player 2", () => {
     // Arrange
     const board = new Board();
     const player = 2;
     const row = 3;
     const col = 5;

     // Act
     const isValid = board.isValidMove(player, row, col);

     // Assert
     expect(isValid).toBe(true);
});

Deno.test("test invalid shift", () => {
     // Arrange
     const board = new Board();
     const player = 1;
     const row = 0;
     const col = 0;

     // Act
     const isValid = board.isValidMove(player, row, col);

     // Assert
     expect(isValid).toBe(false);
});


Deno.test("test invalid move out of bounds", () => {
     // Arrange
     const board = new Board();
     const player = 1;
     const row = -1;
     const col = 8;

     // Act & Assert
     expect(() => board.isValidMove(player, row, col)).toThrow(RangeError);
});


Deno.test("test invalid move on occupied field", () => {
     // Arrange
     const board = new Board();
     const player = 1;
     const rowOccupiedByPlayerTwo = 3;
     const colOccupiedByPlayerTwo = 3;

     // Act
     const isValid = board.isValidMove(player, rowOccupiedByPlayerTwo, colOccupiedByPlayerTwo);

     // Assert
     expect(isValid).toBe(false);
});

Deno.test("test invalid player", () => {
     // Arrange
     const board = new Board();
     const player = 3;
     const row = 2;
     const col = 3;

     // Act & Assert
     expect(() => board.isValidMove(player, row, col)).toThrow(RangeError);
});

Deno.test("test invalid move with no opponent between", () => {
     // Arrange
     const board = new Board();
     const player = 1;
     const row = 2;
     const col = 2;

     // Act
     const isValid = board.isValidMove(player, row, col);

     // Assert
     expect(isValid).toBe(false);
});
