
import React from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { ArrowLeft } from "lucide-react";

const lessons = [
  {
    id: 'basics',
    title: 'Basics of Chess',
    description: 'Learn the rules, piece movements, and setup of the chessboard.',
    content: 'Chess is played on a square board with 64 squares arranged in an 8×8 grid. Each player starts with 16 pieces: one king, one queen, two rooks, two knights, two bishops, and eight pawns.',
    difficulty: 'beginner'
  },
  {
    id: 'openings',
    title: 'Opening Principles',
    description: 'Master the fundamentals of chess openings.',
    content: 'Good opening principles include controlling the center, developing your pieces quickly, keeping your king safe, and not moving the same piece twice.',
    difficulty: 'beginner'
  },
  {
    id: 'tactics',
    title: 'Tactical Patterns',
    description: 'Learn common tactical motifs like pins, forks, and skewers.',
    content: 'Tactical patterns are short sequences of moves that result in material gain or other advantages. Common tactics include pins, forks, discovered attacks, and skewers.',
    difficulty: 'intermediate'
  },
  {
    id: 'endgames',
    title: 'Essential Endgames',
    description: 'Master fundamental endgame techniques and principles.',
    content: 'Endgames are crucial to understand as they require different techniques than the opening or middlegame. King activity becomes vital, and understanding pawn promotion is essential.',
    difficulty: 'intermediate'
  }
];

const Lessons = () => {
  const navigate = useNavigate();

  const handleBack = () => {
    navigate(-1);
  };

  const handleStartLesson = (lessonId: string) => {
    navigate(`/lessons/${lessonId}`);
  };

  return (
    <div className="min-h-screen bg-blue-50 p-4">
      <div className="max-w-3xl mx-auto">
        <div className="flex items-center mb-6">
          <Button variant="ghost" onClick={handleBack} className="mr-4">
            <ArrowLeft className="h-5 w-5" />
            <span className="ml-2">Back</span>
          </Button>
          <h1 className="text-3xl font-bold">Chess Lessons</h1>
        </div>

        <div className="grid gap-6">
          {lessons.map((lesson) => (
            <Card key={lesson.id}>
              <CardHeader>
                <div className="flex justify-between items-start">
                  <div>
                    <CardTitle className="text-xl">{lesson.title}</CardTitle>
                    <CardDescription className="mt-1">{lesson.description}</CardDescription>
                  </div>
                  <Badge variant={lesson.difficulty === 'beginner' ? 'default' : 'secondary'} className="text-sm">
                    {lesson.difficulty === 'beginner' ? 'Beginner' : 'Intermediate'}
                  </Badge>
                </div>
              </CardHeader>
              <CardContent>
                <p>{lesson.content}</p>
              </CardContent>
              <CardFooter className="flex justify-end">
                <Button onClick={() => handleStartLesson(lesson.id)}>Start Lesson</Button>
              </CardFooter>
            </Card>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Lessons;
