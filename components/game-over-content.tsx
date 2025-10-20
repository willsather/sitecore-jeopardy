"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useGameStore } from "@/lib/game-state";

export function GameOverContent() {
  const { score, gameData, answeredQuestions, correctAnswers } = useGameStore();

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

  return (
    <div>
      {/* Score Card */}
      <Card className="mb-4 border-2 border-primary p-0 shadow-xl">
        <CardHeader className="bg-primary/5 p-5 text-center">
          <CardTitle className="text-2xl text-foreground">
            Final Score
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4 p-6 text-center">
          <div className="space-y-3">
            <div className="font-bold text-4xl text-primary">${score}</div>
            <div className="text-muted-foreground text-sm">
              {scorePercentage}% of maximum possible score
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Game Stats */}
      <Card>
        <CardHeader>
          <CardTitle className="text-lg">Game Statistics</CardTitle>
        </CardHeader>
        <CardContent className="space-y-3">
          <div className="flex justify-between">
            <span className="text-muted-foreground">Questions Answered:</span>
            <span className="font-semibold">
              {questionsAnswered} / {totalQuestions}
            </span>
          </div>
          <div className="flex justify-between">
            <span className="text-muted-foreground">Categories Completed:</span>
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
              The AI Cloud introduces new AI-first tools and primitives, like:
            </p>
            <ul className="ml-4 list-disc space-y-1 text-sm">
              <li>AI SDK and AI Gateway to integrate with any model or tool</li>
              <li>
                Fluid compute with Active CPU pricing for high-concurrency,
                low-latency, cost-efficient AI execution
              </li>
              <li>
                Tool support, MCP servers, and queues, for autonomous actions
                and background task execution
              </li>
              <li>Secure sandboxes to run untrusted agent-generated code</li>
            </ul>

            <p className="pt-3">
              These solutions all work together so teams can build and iterate
              on anything from conversational AI frontends to an army of
              end-to-end autonomous agents, without infrastructure or additional
              resource overhead.
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
    </div>
  );
}
