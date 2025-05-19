
import React from "react";
import { Button } from "@/components/ui/button";
import { GameMode } from "@/hooks/useChessGame";

interface GameModeSelectorProps {
  currentMode: GameMode;
  onSelectMode: (mode: GameMode) => void;
}

const GameModeSelector: React.FC<GameModeSelectorProps> = ({ currentMode, onSelectMode }) => {
  return (
    <div className="w-full max-w-md mx-auto p-4">
      <h2 className="text-lg font-semibold mb-4 text-center">Game Mode</h2>
      
      <div className="flex gap-4 justify-center">
        <Button
          variant={currentMode === "player-vs-player" ? "default" : "outline"}
          onClick={() => onSelectMode("player-vs-player")}
          className="flex-1"
        >
          Player vs Player
        </Button>
        
        <Button
          variant={currentMode === "player-vs-computer" ? "default" : "outline"}
          onClick={() => onSelectMode("player-vs-computer")}
          className="flex-1"
        >
          Player vs Computer
        </Button>
      </div>
    </div>
  );
};

export default GameModeSelector;
