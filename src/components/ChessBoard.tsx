
import React from "react";
import { ChessPiece as ChessPieceType, Position } from "../lib/chessPiecePositions";
import ChessPiece from "./ChessPiece";
import { isValidMove } from "../utils/chessEngine";
import { useIsMobile } from "@/hooks/use-mobile";

interface ChessBoardProps {
  pieces: ChessPieceType[];
  selectedPiece: ChessPieceType | null;
  currentTurn: "white" | "black";
  onSelectPiece: (piece: ChessPieceType) => void;
  onMovePiece: (position: Position) => void;
}

const ChessBoard: React.FC<ChessBoardProps> = ({
  pieces,
  selectedPiece,
  currentTurn,
  onSelectPiece,
  onMovePiece,
}) => {
  const isMobile = useIsMobile();
  
  // Handle square click
  const handleSquareClick = (position: Position) => {
    const pieceAtPosition = pieces.find(
      (p) => p.position[0] === position[0] && p.position[1] === position[1]
    );

    // If there's a piece at this position and it's the current player's turn
    if (pieceAtPosition && pieceAtPosition.color === currentTurn) {
      onSelectPiece(pieceAtPosition);
      return;
    }

    // If a piece is selected and the square is valid for movement
    if (selectedPiece) {
      onMovePiece(position);
    }
  };

  // Check if a move to this position would be valid
  const isValidMoveTarget = (position: Position): boolean => {
    if (!selectedPiece) return false;
    return isValidMove(selectedPiece, position, pieces);
  };

  // Render the board
  const renderSquares = () => {
    const squares = [];

    for (let row = 0; row < 8; row++) {
      for (let col = 0; col < 8; col++) {
        const position: Position = [row, col];
        const isLightSquare = (row + col) % 2 === 0;
        const pieceAtPosition = pieces.find(
          (p) => p.position[0] === row && p.position[1] === col
        );
        const isSelected = selectedPiece && 
          selectedPiece.position[0] === row && 
          selectedPiece.position[1] === col;
        
        const isValidTarget = selectedPiece && isValidMoveTarget(position);

        squares.push(
          <div
            key={`${row}-${col}`}
            className={`w-1/8 h-1/8 relative ${
              isLightSquare ? "bg-chessWhiteSquare" : "bg-chessDarkSquare"
            } ${isValidTarget ? "bg-chessHighlight" : ""}
              ${isSelected ? "bg-chessSelected" : ""}`}
            onClick={() => handleSquareClick([row, col])}
          >
            {/* Render piece if there is one at this position */}
            {pieceAtPosition && (
              <ChessPiece
                piece={pieceAtPosition}
                isSelected={isSelected}
                onSelect={onSelectPiece}
              />
            )}
            
            {/* Square coordinates (only shown on larger screens) */}
            {!isMobile && (
              <span className="absolute bottom-0 right-1 text-xs opacity-50">
                {String.fromCharCode(97 + col)}{8 - row}
              </span>
            )}
          </div>
        );
      }
    }

    return squares;
  };

  return (
    <div className="w-full max-w-md mx-auto aspect-square">
      <div className="grid grid-cols-8 grid-rows-8 w-full h-full border-2 border-gray-800 shadow-lg">
        {renderSquares()}
      </div>
    </div>
  );
};

export default ChessBoard;
