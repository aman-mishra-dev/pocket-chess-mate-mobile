
import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useNavigate } from "react-router-dom";

const Welcome = () => {
  const [difficulty, setDifficulty] = useState<string>("beginner");
  const navigate = useNavigate();

  const handleStartGame = () => {
    navigate('/game', { state: { difficulty } });
  };

  const handleLearnChess = () => {
    navigate('/lessons');
  };

  return (
    <div className="min-h-screen flex flex-col items-center bg-blue-50 p-4">
      <div className="mt-8 mb-6 text-center">
        <h1 className="text-4xl font-bold text-blue-600">Pocket Chess</h1>
        <p className="text-gray-600 mt-2">Your strategic pocket companion</p>
      </div>
      
      <div className="w-full max-w-md mx-auto bg-white rounded-lg shadow-md p-6">
        <h2 className="text-2xl font-bold text-center mb-6">Welcome to Pocket Chess!</h2>
        
        <p className="text-center mb-8">
          Challenge yourself against our AI or play with a friend. Master
          strategy, improve your tactical skills, and have fun!
        </p>
        
        <div className="flex items-center justify-between mb-6">
          <span className="font-medium">Difficulty:</span>
          <Select 
            value={difficulty} 
            onValueChange={setDifficulty}
          >
            <SelectTrigger className="w-32">
              <SelectValue placeholder="Select difficulty" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="beginner">Beginner</SelectItem>
              <SelectItem value="intermediate">Intermediate</SelectItem>
              <SelectItem value="advanced">Advanced</SelectItem>
            </SelectContent>
          </Select>
        </div>
        
        <div className="space-y-4">
          <Button 
            className="w-full py-6 text-lg" 
            onClick={handleStartGame}
          >
            Start New Game
          </Button>
          
          <Button 
            variant="outline" 
            className="w-full py-6 text-lg"
            onClick={handleLearnChess}
          >
            Learn Chess
          </Button>
        </div>
      </div>
    </div>
  );
};

export default Welcome;
