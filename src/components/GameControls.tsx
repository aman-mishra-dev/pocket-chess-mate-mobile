
import React from "react";
import { Button } from "@/components/ui/button";
import { ArrowLeft, RotateCw } from "lucide-react";

interface GameControlsProps {
  onUndo: () => void;
  onReset: () => void;
  currentTurn: "white" | "black";
  isGameOver: boolean;
  winner: "white" | "black" | null;
}

const GameControls: React.FC<GameControlsProps> = ({
  onUndo,
  onReset,
  currentTurn,
  isGameOver,
  winner
}) => {
  return (
    <div className="w-full max-w-md mx-auto p-4">
      <div className="flex justify-between items-center mb-4">
        <div className="flex items-center space-x-2">
          <div className={`w-3 h-3 rounded-full ${currentTurn === "white" ? "bg-white" : "bg-gray-500"}`}></div>
          <span>{currentTurn === "white" ? "White" : "Black"}'s Turn</span>
        </div>
        
        {isGameOver && (
          <div className="text-primary font-bold">
            Game Over! {winner && `${winner === "white" ? "White" : "Black"} wins!`}
          </div>
        )}
      </div>
      
      <div className="flex justify-center gap-4">
        <Button onClick={onUndo} variant="outline" className="flex items-center gap-2">
          <ArrowLeft className="h-4 w-4" />
          Undo
        </Button>
        
        <Button onClick={onReset} variant="default" className="flex items-center gap-2">
          <RotateCw className="h-4 w-4" />
          New Game
        </Button>
      </div>
    </div>
  );
};

export default GameControls;
