
import { ChessPiece, PieceColor, Position, isValidPosition } from "../lib/chessPiecePositions";

// Get piece at a specific position
export const getPieceAtPosition = (
  pieces: ChessPiece[],
  position: Position
): ChessPiece | undefined => {
  return pieces.find(
    (piece) =>
      piece.position[0] === position[0] && piece.position[1] === position[1]
  );
};

// Check if a move is valid based on piece type and current board state
export const isValidMove = (
  piece: ChessPiece,
  targetPosition: Position,
  pieces: ChessPiece[]
): boolean => {
  if (!isValidPosition(targetPosition)) {
    return false;
  }

  const [targetRow, targetCol] = targetPosition;
  const [currentRow, currentCol] = piece.position;
  
  // Check if target has piece of same color
  const targetPiece = getPieceAtPosition(pieces, targetPosition);
  if (targetPiece && targetPiece.color === piece.color) {
    return false;
  }

  const rowDiff = targetRow - currentRow;
  const colDiff = targetCol - currentCol;

  switch (piece.type) {
    case "pawn": {
      const direction = piece.color === "white" ? -1 : 1;
      
      // Forward move (no capture)
      if (colDiff === 0 && !targetPiece) {
        // Single move forward
        if (rowDiff === direction) {
          return true;
        }
        
        // Double move from starting position
        if (
          !piece.hasMoved &&
          rowDiff === 2 * direction &&
          !getPieceAtPosition(pieces, [currentRow + direction, currentCol])
        ) {
          return true;
        }
      }
      
      // Diagonal capture
      if (Math.abs(colDiff) === 1 && rowDiff === direction && targetPiece) {
        return true;
      }
      
      return false;
    }
    
    case "rook": {
      // Rook moves horizontally or vertically
      if (rowDiff !== 0 && colDiff !== 0) {
        return false;
      }
      
      // Check for pieces in the path
      return !hasObstaclesInPath(piece.position, targetPosition, pieces);
    }
    
    case "knight": {
      // Knight moves in an L shape
      return (Math.abs(rowDiff) === 2 && Math.abs(colDiff) === 1) ||
             (Math.abs(rowDiff) === 1 && Math.abs(colDiff) === 2);
    }
    
    case "bishop": {
      // Bishop moves diagonally
      if (Math.abs(rowDiff) !== Math.abs(colDiff)) {
        return false;
      }
      
      // Check for pieces in the path
      return !hasObstaclesInPath(piece.position, targetPosition, pieces);
    }
    
    case "queen": {
      // Queen moves like rook or bishop
      if (
        (rowDiff !== 0 && colDiff !== 0) && 
        (Math.abs(rowDiff) !== Math.abs(colDiff))
      ) {
        return false;
      }
      
      // Check for pieces in the path
      return !hasObstaclesInPath(piece.position, targetPosition, pieces);
    }
    
    case "king": {
      // King moves one square in any direction
      return Math.abs(rowDiff) <= 1 && Math.abs(colDiff) <= 1;
    }
    
    default:
      return false;
  }
};

// Check if there are any pieces blocking the path
const hasObstaclesInPath = (
  from: Position,
  to: Position,
  pieces: ChessPiece[]
): boolean => {
  const [fromRow, fromCol] = from;
  const [toRow, toCol] = to;
  
  const rowDiff = toRow - fromRow;
  const colDiff = toCol - fromCol;
  
  // Direction of movement
  const rowStep = rowDiff === 0 ? 0 : rowDiff > 0 ? 1 : -1;
  const colStep = colDiff === 0 ? 0 : colDiff > 0 ? 1 : -1;
  
  let currentRow = fromRow + rowStep;
  let currentCol = fromCol + colStep;
  
  // Check each square in the path
  while (currentRow !== toRow || currentCol !== toCol) {
    if (getPieceAtPosition(pieces, [currentRow, currentCol])) {
      return true;
    }
    
    currentRow += rowStep;
    currentCol += colStep;
  }
  
  return false;
};

// Check if a player is in check
export const isInCheck = (
  pieces: ChessPiece[],
  color: PieceColor
): boolean => {
  // Find king of the specified color
  const king = pieces.find(
    (piece) => piece.type === "king" && piece.color === color
  );
  
  if (!king) {
    return false;
  }
  
  // Check if any opponent piece can capture the king
  return pieces.some(
    (piece) =>
      piece.color !== color &&
      isValidMove(piece, king.position, pieces)
  );
};

// Simple AI for computer player - select a random valid move
export const getComputerMove = (
  pieces: ChessPiece[],
  computerColor: PieceColor
): { piece: ChessPiece; targetPosition: Position } | null => {
  const computerPieces = pieces.filter((piece) => piece.color === computerColor);
  
  // Shuffle pieces to randomize move selection
  const shuffledPieces = [...computerPieces].sort(() => Math.random() - 0.5);
  
  for (const piece of shuffledPieces) {
    // Try all possible moves on the board
    for (let row = 0; row < 8; row++) {
      for (let col = 0; col < 8; col++) {
        const targetPosition: Position = [row, col];
        
        if (isValidMove(piece, targetPosition, pieces)) {
          return {
            piece,
            targetPosition,
          };
        }
      }
    }
  }
  
  return null;
};
