
import { useState, useCallback, useEffect } from "react";
import { ChessPiece, PieceColor, Position, getInitialPieces } from "../lib/chessPiecePositions";
import { isValidMove, getPieceAtPosition, isInCheck, getComputerMove } from "../utils/chessEngine";

export type GameMode = "player-vs-player" | "player-vs-computer";

interface ChessGameState {
  pieces: ChessPiece[];
  selectedPiece: ChessPiece | null;
  currentTurn: PieceColor;
  gameMode: GameMode;
  moveHistory: {
    piece: ChessPiece;
    fromPosition: Position;
    toPosition: Position;
    capturedPiece: ChessPiece | null;
  }[];
  isGameOver: boolean;
  winner: PieceColor | null;
}

export const useChessGame = () => {
  const [gameState, setGameState] = useState<ChessGameState>({
    pieces: getInitialPieces(),
    selectedPiece: null,
    currentTurn: "white",
    gameMode: "player-vs-player",
    moveHistory: [],
    isGameOver: false,
    winner: null,
  });

  // Set game mode
  const setGameMode = useCallback((mode: GameMode) => {
    setGameState((prevState) => ({
      ...prevState,
      gameMode: mode,
    }));
  }, []);

  // Reset game to initial state
  const resetGame = useCallback(() => {
    setGameState({
      pieces: getInitialPieces(),
      selectedPiece: null,
      currentTurn: "white",
      gameMode: gameState.gameMode,
      moveHistory: [],
      isGameOver: false,
      winner: null,
    });
  }, [gameState.gameMode]);

  // Select a piece
  const selectPiece = useCallback((piece: ChessPiece | null) => {
    setGameState((prevState) => {
      // Don't allow selection if it's not the player's turn
      if (piece && piece.color !== prevState.currentTurn) {
        return prevState;
      }
      
      return {
        ...prevState,
        selectedPiece: piece,
      };
    });
  }, []);

  // Move a piece
  const movePiece = useCallback((targetPosition: Position) => {
    setGameState((prevState) => {
      const { selectedPiece, pieces, currentTurn } = prevState;
      
      if (!selectedPiece) {
        return prevState;
      }
      
      // Check if move is valid
      if (!isValidMove(selectedPiece, targetPosition, pieces)) {
        return prevState;
      }
      
      // Capture logic
      const capturedPiece = getPieceAtPosition(pieces, targetPosition);
      
      // Create new pieces array with updated position
      const updatedPieces = pieces.map((piece) => {
        if (piece.id === selectedPiece.id) {
          return {
            ...piece,
            position: targetPosition,
            hasMoved: true,
          };
        }
        return piece;
      }).filter((piece) => {
        // Remove captured piece
        return !(
          capturedPiece && 
          piece.id === capturedPiece.id
        );
      });
      
      const moveEntry = {
        piece: selectedPiece,
        fromPosition: selectedPiece.position,
        toPosition: targetPosition,
        capturedPiece: capturedPiece || null,
      };
      
      // Update game state
      return {
        ...prevState,
        pieces: updatedPieces,
        selectedPiece: null,
        currentTurn: currentTurn === "white" ? "black" : "white",
        moveHistory: [...prevState.moveHistory, moveEntry],
      };
    });
  }, []);

  // Undo last move
  const undoMove = useCallback(() => {
    setGameState((prevState) => {
      const { moveHistory, pieces } = prevState;
      
      if (moveHistory.length === 0) {
        return prevState;
      }
      
      const lastMove = moveHistory[moveHistory.length - 1];
      
      // Restore piece to original position
      const restoredPieces = pieces.map((piece) => {
        if (piece.id === lastMove.piece.id) {
          return {
            ...piece,
            position: lastMove.fromPosition,
            hasMoved: false, // This is simplified; would need to track original hasMoved state
          };
        }
        return piece;
      });
      
      // Add back captured piece if any
      if (lastMove.capturedPiece) {
        restoredPieces.push(lastMove.capturedPiece);
      }
      
      return {
        ...prevState,
        pieces: restoredPieces,
        currentTurn: prevState.currentTurn === "white" ? "black" : "white",
        moveHistory: moveHistory.slice(0, -1),
        selectedPiece: null,
      };
    });
  }, []);

  // Manually trigger computer move (for UI button)
  const computerMove = useCallback(() => {
    if (gameState.currentTurn === "black" && !gameState.isGameOver) {
      const computerMoveResult = getComputerMove(gameState.pieces, "black");
      
      if (computerMoveResult) {
        const { piece, targetPosition } = computerMoveResult;
        
        setGameState((prevState) => {
          // Capture logic
          const capturedPiece = getPieceAtPosition(prevState.pieces, targetPosition);
          
          // Update piece positions
          const updatedPieces = prevState.pieces.map((p) => {
            if (p.id === piece.id) {
              return {
                ...p,
                position: targetPosition,
                hasMoved: true,
              };
            }
            return p;
          }).filter((p) => {
            // Remove captured piece
            return !(capturedPiece && p.id === capturedPiece.id);
          });
          
          const moveEntry = {
            piece,
            fromPosition: piece.position,
            toPosition: targetPosition,
            capturedPiece: capturedPiece || null,
          };
          
          return {
            ...prevState,
            pieces: updatedPieces,
            currentTurn: "white",
            moveHistory: [...prevState.moveHistory, moveEntry],
          };
        });
      }
    }
  }, [gameState.currentTurn, gameState.isGameOver, gameState.pieces]);

  // Computer move logic
  useEffect(() => {
    if (
      gameState.gameMode === "player-vs-computer" &&
      gameState.currentTurn === "black" &&
      !gameState.isGameOver
    ) {
      // Add a small delay to make it feel more natural
      const timerId = setTimeout(() => {
        computerMove();
      }, 500);
      
      return () => clearTimeout(timerId);
    }
  }, [gameState.gameMode, gameState.currentTurn, gameState.isGameOver, computerMove]);

  // Check for game over conditions
  useEffect(() => {
    // Check if a king has been captured
    const whiteKing = gameState.pieces.some(
      (piece) => piece.type === "king" && piece.color === "white"
    );
    
    const blackKing = gameState.pieces.some(
      (piece) => piece.type === "king" && piece.color === "black"
    );
    
    if (!whiteKing) {
      setGameState((prevState) => ({
        ...prevState,
        isGameOver: true,
        winner: "black",
      }));
    } else if (!blackKing) {
      setGameState((prevState) => ({
        ...prevState,
        isGameOver: true,
        winner: "white",
      }));
    }
  }, [gameState.pieces]);

  return {
    ...gameState,
    selectPiece,
    movePiece,
    resetGame,
    undoMove,
    setGameMode,
    computerMove,
  };
};
