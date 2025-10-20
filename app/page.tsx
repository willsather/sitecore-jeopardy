"use client";

import { useEffect } from "react";

import { GameOverContent } from "@/components/game-over-content";
import { QuestionModal } from "@/components/question-modal";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import questionsData from "@/data/questions.json";
import { useGameStore } from "@/lib/game-state";

export default function Home() {
  const {
    score,
    gameData,
    gameCompleted,
    answeredQuestions,
    correctAnswers,
    incorrectAnswers,
    currentQuestion,
    setGameData,
    selectQuestion,
    resetGame,
  } = useGameStore();

  useEffect(() => {
    setGameData(questionsData);
  }, [setGameData]);

  if (!gameData) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-background">
        <div className="text-center">
          <p className="text-lg text-muted-foreground">Loading game...</p>
        </div>
      </div>
    );
  }

  const isQuestionAnswered = (categoryIndex: number, questionIndex: number) => {
    return answeredQuestions.has(`${categoryIndex}-${questionIndex}`);
  };

  const getQuestionIcon = (categoryIndex: number, questionIndex: number) => {
    const questionKey = `${categoryIndex}-${questionIndex}`;
    if (correctAnswers.has(questionKey)) {
      return "✓";
    } else if (incorrectAnswers.has(questionKey)) {
      return "✗";
    }
    return "✓"; // fallback
  };

  const getQuestionStyling = (
    categoryIndex: number,
    questionIndex: number,
    answered: boolean,
  ) => {
    if (!answered) {
      return "border-primary/30 bg-card text-foreground shadow-md hover:scale-105 hover:border-primary hover:bg-primary/20 hover:text-foreground hover:shadow-lg";
    }

    const questionKey = `${categoryIndex}-${questionIndex}`;
    if (correctAnswers.has(questionKey)) {
      return "cursor-not-allowed border-green-400 bg-green-50 text-green-500 shadow-sm";
    } else if (incorrectAnswers.has(questionKey)) {
      return "cursor-not-allowed border-red-400 bg-red-50 text-red-500 shadow-sm";
    }

    return "cursor-not-allowed border-muted bg-muted text-muted-foreground opacity-50";
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-primary/5 via-background to-accent/5 p-4">
      <div className="mx-auto max-w-4xl space-y-6">
        {/* Header with player info */}
        <div className="relative flex flex-col items-start justify-between gap-2 rounded-lg border-2 border-primary/20 p-3 shadow-lg sm:flex-row sm:items-center sm:gap-4 sm:p-6">
          <Button
            onClick={resetGame}
            variant="ghost"
            size="sm"
            className="absolute top-2 right-2 h-10 w-10 p-2 text-lg hover:bg-transparent sm:hidden"
            title="Start Over"
          >
            ↻
          </Button>

          <Button
            onClick={resetGame}
            variant="ghost"
            size="sm"
            className="absolute top-2 right-2 hidden h-10 w-10 p-2 text-lg hover:bg-transparent sm:block"
            title="Start Over"
          >
            ↻
          </Button>

          <div className="text-left">
            <h1 className="font-bold text-2xl text-primary sm:text-3xl">
              Compsable Commerce Jeopardy
            </h1>
            <p className="text-muted-foreground">
              powered by <span className="text-foreground">▲</span>
            </p>
          </div>
        </div>

        {/* Game Board or Game Over Content */}
        {gameCompleted ? (
          <Card className="border-2 border-primary/20 p-0 shadow-xl">
            <CardContent className="p-6">
              <GameOverContent />
            </CardContent>
          </Card>
        ) : (
          <Card className="border-2 border-primary/20 shadow-xl">
            <CardHeader className="flex h-12 items-center justify-center">
              <p className="font-bold text-2xl text-primary sm:text-3xl">
                ${score}
              </p>
            </CardHeader>

            <CardContent className="p-6">
              <div className="grid grid-cols-3 gap-4">
                {/* Category Headers */}
                {gameData.categories.map((category) => (
                  <div
                    key={category.name}
                    className="flex items-center justify-center rounded-lg bg-primary p-4 text-primary-foreground"
                  >
                    <h2 className="text-center font-bold text-sm uppercase leading-tight tracking-wide sm:text-lg md:text-xl">
                      {category.name}
                    </h2>
                  </div>
                ))}

                {/* Question Cells */}
                {[0, 1, 2].map((i) =>
                  gameData.categories.map((category, j) => {
                    const question = category.questions[i];
                    const answered = isQuestionAnswered(j, i);

                    return (
                      <Button
                        key={`${j}-${i}`}
                        variant="outline"
                        className={`h-24 border-2 font-bold text-2xl transition-all duration-200 ${getQuestionStyling(j, i, answered)}`}
                        onClick={() => !answered && selectQuestion(j, i)}
                        disabled={answered}
                      >
                        {answered
                          ? getQuestionIcon(j, i)
                          : `$${question.value}`}
                      </Button>
                    );
                  }),
                )}
              </div>
            </CardContent>
          </Card>
        )}

        {/* Question Modal */}
        {currentQuestion && <QuestionModal />}
      </div>
    </div>
  );
}
