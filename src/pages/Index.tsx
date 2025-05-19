
import React from "react";
import ChessBoard from "@/components/ChessBoard";
import GameControls from "@/components/GameControls";
import GameModeSelector from "@/components/GameModeSelector";
import { useChessGame } from "@/hooks/useChessGame";

const Index = () => {
  const {
    pieces,
    selectedPiece,
    currentTurn,
    gameMode,
    isGameOver,
    winner,
    selectPiece,
    movePiece,
    resetGame,
    undoMove,
    setGameMode,
  } = useChessGame();

  return (
    <div className="min-h-screen flex flex-col items-center bg-background p-4">
      <h1 className="text-2xl font-bold mb-6 text-center">Pocket Chess Mate</h1>
      
      <div className="w-full max-w-md mx-auto">
        <ChessBoard
          pieces={pieces}
          selectedPiece={selectedPiece}
          currentTurn={currentTurn}
          onSelectPiece={selectPiece}
          onMovePiece={movePiece}
        />
        
        <GameControls
          onUndo={undoMove}
          onReset={resetGame}
          currentTurn={currentTurn}
          isGameOver={isGameOver}
          winner={winner}
        />
        
        <GameModeSelector
          currentMode={gameMode}
          onSelectMode={setGameMode}
        />
      </div>
      
      <div className="mt-auto text-sm text-gray-400 pt-4 text-center">
        <p>Tap a piece to select it, then tap a valid square to move</p>
      </div>
    </div>
  );
};

export default Index;
