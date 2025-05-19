
import React from "react";
import { ChessPiece as ChessPieceType } from "../lib/chessPiecePositions";

interface ChessPieceProps {
  piece: ChessPieceType;
  isSelected: boolean;
  onSelect: (piece: ChessPieceType) => void;
}

const ChessPiece: React.FC<ChessPieceProps> = ({ piece, isSelected, onSelect }) => {
  const handleClick = () => {
    onSelect(piece);
  };

  // Unicode chess pieces
  const pieceSymbols = {
    white: {
      king: "♔",
      queen: "♕",
      rook: "♖",
      bishop: "♗",
      knight: "♘",
      pawn: "♙",
    },
    black: {
      king: "♚",
      queen: "♛",
      rook: "♜",
      bishop: "♝",
      knight: "♞",
      pawn: "♟",
    },
  };

  return (
    <div
      className={`chess-piece absolute w-full h-full flex items-center justify-center text-4xl sm:text-5xl cursor-pointer z-10 ${
        isSelected ? "animate-piece-move" : ""
      }`}
      onClick={handleClick}
    >
      {pieceSymbols[piece.color][piece.type]}
    </div>
  );
};

export default ChessPiece;
