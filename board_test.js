import { expect } from "jsr:@std/expect";
import { Board } from "./board.js";

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
