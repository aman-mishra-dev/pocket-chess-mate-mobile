
export type PieceType = 'pawn' | 'rook' | 'knight' | 'bishop' | 'queen' | 'king';
export type PieceColor = 'white' | 'black';
export type Position = [number, number]; // [row, col] where [0,0] is top-left

export interface ChessPiece {
  id: string;
  type: PieceType;
  color: PieceColor;
  position: Position;
  hasMoved: boolean;
}

// Create a unique ID for each piece
export const createPieceId = (type: PieceType, color: PieceColor, index: number): string => {
  return `${color}-${type}-${index}`;
};

// Initialize the chess board with standard starting positions
export const getInitialPieces = (): ChessPiece[] => {
  const pieces: ChessPiece[] = [];
  
  // Pawns
  for (let col = 0; col < 8; col++) {
    pieces.push({
      id: createPieceId('pawn', 'white', col),
      type: 'pawn',
      color: 'white',
      position: [6, col],
      hasMoved: false,
    });
    
    pieces.push({
      id: createPieceId('pawn', 'black', col),
      type: 'pawn',
      color: 'black',
      position: [1, col],
      hasMoved: false,
    });
  }
  
  // Rooks
  pieces.push({ id: createPieceId('rook', 'white', 0), type: 'rook', color: 'white', position: [7, 0], hasMoved: false });
  pieces.push({ id: createPieceId('rook', 'white', 1), type: 'rook', color: 'white', position: [7, 7], hasMoved: false });
  pieces.push({ id: createPieceId('rook', 'black', 0), type: 'rook', color: 'black', position: [0, 0], hasMoved: false });
  pieces.push({ id: createPieceId('rook', 'black', 1), type: 'rook', color: 'black', position: [0, 7], hasMoved: false });
  
  // Knights
  pieces.push({ id: createPieceId('knight', 'white', 0), type: 'knight', color: 'white', position: [7, 1], hasMoved: false });
  pieces.push({ id: createPieceId('knight', 'white', 1), type: 'knight', color: 'white', position: [7, 6], hasMoved: false });
  pieces.push({ id: createPieceId('knight', 'black', 0), type: 'knight', color: 'black', position: [0, 1], hasMoved: false });
  pieces.push({ id: createPieceId('knight', 'black', 1), type: 'knight', color: 'black', position: [0, 6], hasMoved: false });
  
  // Bishops
  pieces.push({ id: createPieceId('bishop', 'white', 0), type: 'bishop', color: 'white', position: [7, 2], hasMoved: false });
  pieces.push({ id: createPieceId('bishop', 'white', 1), type: 'bishop', color: 'white', position: [7, 5], hasMoved: false });
  pieces.push({ id: createPieceId('bishop', 'black', 0), type: 'bishop', color: 'black', position: [0, 2], hasMoved: false });
  pieces.push({ id: createPieceId('bishop', 'black', 1), type: 'bishop', color: 'black', position: [0, 5], hasMoved: false });
  
  // Queens
  pieces.push({ id: createPieceId('queen', 'white', 0), type: 'queen', color: 'white', position: [7, 3], hasMoved: false });
  pieces.push({ id: createPieceId('queen', 'black', 0), type: 'queen', color: 'black', position: [0, 3], hasMoved: false });
  
  // Kings
  pieces.push({ id: createPieceId('king', 'white', 0), type: 'king', color: 'white', position: [7, 4], hasMoved: false });
  pieces.push({ id: createPieceId('king', 'black', 0), type: 'king', color: 'black', position: [0, 4], hasMoved: false });
  
  return pieces;
};

// Convert between algebraic notation and array positions
export const positionToAlgebraic = (position: Position): string => {
  const [row, col] = position;
  const file = String.fromCharCode(97 + col); // 'a' to 'h'
  const rank = 8 - row; // 1 to 8
  return `${file}${rank}`;
};

export const algebraicToPosition = (algebraic: string): Position => {
  const file = algebraic.charCodeAt(0) - 97; // 'a' to 'h' -> 0 to 7
  const rank = 8 - parseInt(algebraic[1]); // 1 to 8 -> 7 to 0
  return [rank, file];
};

// Check if a position is within the board bounds
export const isValidPosition = (position: Position): boolean => {
  const [row, col] = position;
  return row >= 0 && row < 8 && col >= 0 && col < 8;
};
