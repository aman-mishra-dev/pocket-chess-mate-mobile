
import React from "react";
import { ChessPiece, Position, positionToAlgebraic } from "@/lib/chessPiecePositions";

interface MoveHistoryProps {
  moves: {
    piece: ChessPiece;
    fromPosition: Position;
    toPosition: Position;
    capturedPiece: ChessPiece | null;
  }[];
}

const MoveHistory: React.FC<MoveHistoryProps> = ({ moves }) => {
  if (moves.length === 0) {
    return (
      <div className="w-full mt-6 bg-white rounded-lg shadow p-4">
        <h2 className="text-xl font-semibold mb-3">Move History</h2>
        <p className="text-gray-500">No moves yet</p>
      </div>
    );
  }

  // Create pairs of moves (white and black)
  const movePairs = [];
  for (let i = 0; i < moves.length; i += 2) {
    movePairs.push({
      number: Math.floor(i / 2) + 1,
      white: moves[i],
      black: i + 1 < moves.length ? moves[i + 1] : null,
    });
  }

  const formatMove = (move: typeof moves[0]) => {
    const { piece, fromPosition, toPosition, capturedPiece } = move;
    const from = positionToAlgebraic(fromPosition);
    const to = positionToAlgebraic(toPosition);
    
    // Use initial for piece (e.g., N for Knight, K for King, etc.)
    let pieceInitial = '';
    if (piece.type !== 'pawn') {
      pieceInitial = piece.type.charAt(0).toUpperCase();
    }
    
    const captureSymbol = capturedPiece ? 'x' : '';
    return `${pieceInitial}${captureSymbol}${to}`;
  };

  return (
    <div className="w-full mt-6 bg-white rounded-lg shadow p-4">
      <h2 className="text-xl font-semibold mb-3">Move History</h2>
      
      <div className="max-h-40 overflow-y-auto">
        <table className="w-full text-sm">
          <thead>
            <tr className="border-b">
              <th className="py-2 px-3 text-left w-1/6">#</th>
              <th className="py-2 px-3 text-left">White</th>
              <th className="py-2 px-3 text-left">Black</th>
            </tr>
          </thead>
          <tbody>
            {movePairs.map((pair) => (
              <tr key={pair.number} className="border-b last:border-0">
                <td className="py-2 px-3">{pair.number}.</td>
                <td className="py-2 px-3">{formatMove(pair.white)}</td>
                <td className="py-2 px-3">{pair.black ? formatMove(pair.black) : ''}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default MoveHistory;
