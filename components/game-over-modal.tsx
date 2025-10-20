"use client";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { ScrollArea } from "@/components/ui/scroll-area";
import { useGameStore } from "@/lib/game-state";

interface GameOverModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export function GameOverModal({ open, onOpenChange }: GameOverModalProps) {
  const { score, gameData, answeredQuestions, correctAnswers, resetGame } =
    useGameStore();

  const maxPossibleScore = 1800;
  const totalQuestions = 9;
  const totalCategories = 3;

  // Calculate actual statistics
  const questionsAnswered = answeredQuestions.size;
  const correctCount = correctAnswers.size;
  const accuracy =
    questionsAnswered > 0
      ? Math.round((correctCount / questionsAnswered) * 100)
      : 0;
  const scorePercentage = Math.round((score / maxPossibleScore) * 100);

  // Calculate categories completed (all 3 questions in a category answered)
  let categoriesCompleted = 0;
  if (gameData) {
    for (
      let categoryIndex = 0;
      categoryIndex < gameData.categories.length;
      categoryIndex++
    ) {
      let categoryQuestionsAnswered = 0;
      for (let questionIndex = 0; questionIndex < 3; questionIndex++) {
        if (answeredQuestions.has(`${categoryIndex}-${questionIndex}`)) {
          categoryQuestionsAnswered++;
        }
      }
      if (categoryQuestionsAnswered === 3) {
        categoriesCompleted++;
      }
    }
  }

  const handlePlayAgain = () => {
    resetGame();
    onOpenChange(false);
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-h-[calc(100dvh)]">
        <DialogHeader className="pb-6">
          <DialogTitle className="text-center text-3xl text-foreground">
            Game Complete!
          </DialogTitle>
        </DialogHeader>

        <ScrollArea className="h-[calc(100%-8rem)] w-full">
          <div className="space-y-6 pr-4">
            {/* Score Card */}
            <Card className="border-2 border-primary/20 p-0 shadow-xl">
              <CardHeader className="bg-primary/5 p-5 text-center">
                <CardTitle className="text-2xl text-foreground">
                  Final Score
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4 p-6 text-center">
                <div className="space-y-3">
                  <div className="font-bold text-4xl text-primary">
                    ${score}
                  </div>
                  <div className="text-muted-foreground text-sm">
                    {scorePercentage}% of maximum possible score
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Game Stats */}
            <Card className="border-2 border-accent/20">
              <CardHeader>
                <CardTitle className="text-lg">Game Statistics</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <div className="flex justify-between">
                  <span className="text-muted-foreground">
                    Questions Answered:
                  </span>
                  <span className="font-semibold">
                    {questionsAnswered} / {totalQuestions}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">
                    Categories Completed:
                  </span>
                  <span className="font-semibold">
                    {categoriesCompleted} / {totalCategories}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Accuracy:</span>
                  <span className="font-semibold">{accuracy}%</span>
                </div>
              </CardContent>
            </Card>

            {/* About Section */}
            <Card className="border-2 border-muted/20">
              <CardHeader>
                <CardTitle className="text-center text-xl">
                  What is the AI Cloud
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4 text-left">
                <div className="text-muted-foreground text-sm leading-relaxed">
                  <p className="pb-3">
                    {
                      "Vercel provides the developer tools and cloud infrastructure to build, scale, and secure a faster, more personalized web."
                    }
                  </p>

                  <p className="px-0 pb-2">
                    The AI Cloud introduces new AI-first tools and primitives,
                    like:
                  </p>
                  <ul className="ml-4 list-disc space-y-1 text-sm">
                    <li>
                      AI SDK and AI Gateway to integrate with any model or tool
                    </li>
                    <li>
                      Fluid compute with Active CPU pricing for
                      high-concurrency, low-latency, cost-efficient AI execution
                    </li>
                    <li>
                      Tool support, MCP servers, and queues, for autonomous
                      actions and background task execution
                    </li>
                    <li>
                      Secure sandboxes to run untrusted agent-generated code
                    </li>
                  </ul>

                  <p className="pt-3">
                    These solutions all work together so teams can build and
                    iterate on anything from conversational AI frontends to an
                    army of end-to-end autonomous agents, without infrastructure
                    or additional resource overhead.
                  </p>
                </div>

                <div className="border-border border-t pt-3">
                  <p className="text-muted-foreground text-sm">
                    Powered by <span className="text-foreground">▲</span>
                  </p>
                  <p className="mt-1 text-muted-foreground text-xs">
                    Learn more at vercel.com and v0.app
                  </p>
                </div>
              </CardContent>
            </Card>

            {/* Play Again Button */}
            <div className="flex justify-center pt-4">
              <Button onClick={handlePlayAgain} className="px-8 py-2 text-lg">
                Play Again
              </Button>
            </div>
          </div>
        </ScrollArea>
      </DialogContent>
    </Dialog>
  );
}
