
import React from "react";
import { useParams, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { ArrowLeft } from "lucide-react";

const lessonContent = {
  basics: {
    title: 'Basics of Chess',
    sections: [
      {
        title: 'The Chessboard',
        content: 'The chessboard consists of 64 squares arranged in an 8×8 grid. The squares alternate between light and dark colors. The board is positioned so that each player has a white square in the right-hand corner closest to them.'
      },
      {
        title: 'The Pieces',
        content: 'Each player begins with 16 pieces: 1 king, 1 queen, 2 rooks, 2 bishops, 2 knights, and 8 pawns. Each piece type moves differently and has its own strategic value.'
      },
      {
        title: 'Basic Movement',
        content: 'King: Can move one square in any direction (horizontally, vertically, or diagonally).\nQueen: Can move any number of squares in any straight line (horizontally, vertically, or diagonally).\nRook: Can move any number of squares horizontally or vertically.\nBishop: Can move any number of squares diagonally.\nKnight: Moves in an "L" shape - two squares horizontally followed by one square vertically, or two squares vertically followed by one square horizontally.\nPawn: Typically moves forward one square, but has the option to move two squares forward on its first move. Pawns capture diagonally one square forward.'
      }
    ]
  },
  openings: {
    title: 'Opening Principles',
    sections: [
      {
        title: 'Control the Center',
        content: 'The central squares (e4, e5, d4, d5) are the most important part of the board initially. Controlling these squares gives your pieces more mobility and options.'
      },
      {
        title: 'Develop Pieces Quickly',
        content: 'Aim to move your minor pieces (knights and bishops) out early. This allows them to participate in the game sooner.'
      },
      {
        title: 'King Safety',
        content: 'Castle early to protect your king. This special move places your king in a safer position and connects your rooks.'
      },
      {
        title: 'Common Openings',
        content: '1. e4 (King\'s Pawn Opening) - Immediately contests the center and opens lines for the queen and king\'s bishop.\n2. d4 (Queen\'s Pawn Opening) - Controls the center and opens a line for the queen\'s bishop.\n3. c4 (English Opening) - Controls d5 but from the flank.'
      }
    ]
  },
  tactics: {
    title: 'Tactical Patterns',
    sections: [
      {
        title: 'Pins',
        content: 'A pin restricts the movement of an enemy piece because moving it would expose a more valuable piece behind it to capture.'
      },
      {
        title: 'Forks',
        content: 'A fork is a tactic where a single piece attacks two or more enemy pieces simultaneously.'
      },
      {
        title: 'Skewers',
        content: 'A skewer is similar to a pin but the more valuable piece is in front. When the more valuable piece moves, it allows the capture of the piece behind it.'
      },
      {
        title: 'Discovered Attacks',
        content: 'A discovered attack occurs when moving one piece reveals an attack from another piece that was previously blocked.'
      }
    ]
  },
  endgames: {
    title: 'Essential Endgames',
    sections: [
      {
        title: 'King Activity',
        content: 'In the endgame, the king becomes a fighting piece. It\'s crucial to activate your king and bring it to the center or to support your pawns.'
      },
      {
        title: 'Pawn Promotion',
        content: 'Understanding how to promote pawns is essential. Creating a passed pawn (a pawn with no opposing pawns in its path) is often a decisive advantage.'
      },
      {
        title: 'Opposition',
        content: 'The opposition is a concept where kings face each other with one empty square between them. The player who doesn\'t have to move (i.e., who "has the opposition") often has the advantage.'
      },
      {
        title: 'Basic Checkmates',
        content: 'Learn fundamental checkmate patterns like king and queen vs king, king and rook vs king, and king and two bishops vs king.'
      }
    ]
  }
};

const LessonDetail = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  
  // Default to basics if ID doesn't match any lesson
  const lesson = id && lessonContent[id as keyof typeof lessonContent] 
    ? lessonContent[id as keyof typeof lessonContent] 
    : lessonContent.basics;

  return (
    <div className="min-h-screen bg-blue-50 p-4">
      <div className="max-w-3xl mx-auto">
        <Button variant="ghost" onClick={() => navigate('/lessons')} className="mb-6 flex items-center">
          <ArrowLeft className="h-5 w-5 mr-2" />
          Back to Lessons
        </Button>
        
        <h1 className="text-3xl font-bold mb-8">{lesson.title}</h1>
        
        <div className="space-y-8">
          {lesson.sections.map((section, index) => (
            <div key={index} className="bg-white p-6 rounded-lg shadow">
              <h2 className="text-xl font-semibold mb-4">{section.title}</h2>
              <div className="space-y-2">
                {section.content.split('\n').map((paragraph, i) => (
                  <p key={i} className="text-gray-700">{paragraph}</p>
                ))}
              </div>
            </div>
          ))}
        </div>
        
        <div className="mt-8 flex justify-between">
          <Button onClick={() => navigate('/lessons')}>
            Back to All Lessons
          </Button>
          <Button onClick={() => navigate('/game')}>
            Practice in a Game
          </Button>
        </div>
      </div>
    </div>
  );
};

export default LessonDetail;
