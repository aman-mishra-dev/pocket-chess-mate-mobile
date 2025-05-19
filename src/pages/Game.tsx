
import React, { useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import ChessBoard from "@/components/ChessBoard";
import GameControls from "@/components/GameControls";
import GameModeSelector from "@/components/GameModeSelector";
import MoveHistory from "@/components/MoveHistory";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useChessGame } from "@/hooks/useChessGame";
import { ArrowLeft, RefreshCw, RotateCcw, Play } from "lucide-react";

const Game = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const initialDifficulty = location.state?.difficulty || "beginner";
  const [difficulty, setDifficulty] = useState(initialDifficulty);
  
  const {
    pieces,
    selectedPiece,
    currentTurn,
    gameMode,
    isGameOver,
    winner,
    moveHistory,
    selectPiece,
    movePiece,
    resetGame,
    undoMove,
    setGameMode,
    computerMove,
  } = useChessGame();

  // Update difficulty in the chess game logic when it changes
  useEffect(() => {
    // Here you would implement logic to adjust AI difficulty
    console.log(`Difficulty set to: ${difficulty}`);
  }, [difficulty]);

  return (
    <div className="min-h-screen flex flex-col items-center bg-blue-50 p-4">
      <div className="w-full max-w-md mx-auto">
        <div className="flex justify-between items-center mb-4">
          <Button 
            variant="ghost" 
            onClick={() => navigate('/')} 
            className="flex items-center gap-1"
          >
            <ArrowLeft className="h-4 w-4" /> Back
          </Button>
          <div className="text-lg font-semibold">
            Turn: {currentTurn === "white" ? "White" : "Black"}
          </div>
        </div>
        
        <ChessBoard
          pieces={pieces}
          selectedPiece={selectedPiece}
          currentTurn={currentTurn}
          onSelectPiece={selectPiece}
          onMovePiece={movePiece}
        />
        
        <div className="grid grid-cols-2 gap-2 my-4">
          <Button onClick={resetGame} className="flex items-center justify-center gap-2">
            <RefreshCw className="h-4 w-4" /> New Game
          </Button>
          <Button onClick={undoMove} variant="outline" className="flex items-center justify-center gap-2">
            <RotateCcw className="h-4 w-4" /> Undo
          </Button>
          
          {gameMode === "player-vs-computer" && currentTurn === "black" && !isGameOver && (
            <Button onClick={computerMove} className="flex items-center justify-center gap-2">
              <Play className="h-4 w-4" /> AI Move
            </Button>
          )}
          
          <div className="col-span-1 flex items-center justify-end gap-2">
            <span className="text-sm font-medium">Difficulty:</span>
            <Select value={difficulty} onValueChange={setDifficulty}>
              <SelectTrigger className="w-28">
                <SelectValue placeholder="Difficulty" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="beginner">Beginner</SelectItem>
                <SelectItem value="intermediate">Intermediate</SelectItem>
                <SelectItem value="advanced">Advanced</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>
        
        <GameModeSelector
          currentMode={gameMode}
          onSelectMode={setGameMode}
        />
        
        <MoveHistory moves={moveHistory} />
        
        <div className="mt-4 w-full">
          <Button 
            variant="outline" 
            className="w-full"
            onClick={() => navigate('/lessons')}
          >
            Chess Lessons
          </Button>
        </div>
      </div>
    </div>
  );
};

export default Game;
