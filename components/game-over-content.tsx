"use client";

import Link from "next/link";

import { Button } from "@/components/ui/button";
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
            Sitecore + Vercel
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4 text-left">
          <div className="text-muted-foreground text-sm leading-relaxed">
            <p className="pb-3">
              {
                "Develop composable, personalized digital experiences powered by Sitecore faster and deploy to Vercel's fully managed infrastructure for the most performant, reliable sites."
              }
            </p>

            <div className="flex flex-col gap-2 md:flex-row">
              <Card>
                <CardHeader>
                  <CardTitle>2x Faster Page Loads</CardTitle>
                </CardHeader>
                <CardContent className="text-foreground/40">
                  Serve fast, personalized sites from a global Edge Network and
                  stay fast with Speed Insights and Web Analytics.
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>7x Faster time to Market</CardTitle>
                </CardHeader>
                <CardContent className="text-foreground/40">
                  Serve fast, personalized sites from a global Edge Network and
                  stay fast with Speed Insights and Web Analytics.
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Zero Configuration</CardTitle>
                </CardHeader>
                <CardContent className="text-foreground/40">
                  Serve fast, personalized sites from a global Edge Network and
                  stay fast with Speed Insights and Web Analytics.
                </CardContent>
              </Card>
            </div>

            <h3 className="pt-4 font-bold text-lg text-white">
              Superior performance
            </h3>
            <p className="pt-3">
              Build and deploy high-performance web apps with Sitecore and
              Vercel. Integrate Sitecore's comprehensive solutions (XM Cloud,
              XM, XP, OrderCloud, Personalize, Content Hub, Content Hub ONE)
              with Vercel's Frontend Cloud. Eliminate infrastructure
              complexities and leverage Vercel's scalable infrastructure for
              unparalleled performance.
            </p>

            <h3 className="pt-4 font-bold text-lg text-white">
              The composable Sitecore solution
            </h3>
            <p className="pt-3">
              From selecting tools to building infrastructure, migrating to a
              composable enterprise solution is daunting. Vercel's Frontend
              Cloud, combined with Sitecore, simplifies and accelerates your
              path to composable with Firewall, Secure Compute, Preview
              Comments, Preview Comments, and Serverless function failover.
            </p>

            <h3 className="pt-4 font-bold text-lg text-white">
              Build the experience customers want
            </h3>
            <p className="pt-3">
              Increased flexibility in frontend development and a fully
              composable architecture lets you build Sitecore sites how you want
              with best-of-breed tools and deliver the interactive, personalized
              experience that users expect.
            </p>

            <Button
              asChild
              className="mt-3 border-white bg-transparent text-white"
              variant="outline"
            >
              <Link href="https://vercel.com/partners/sitecore" target="_blank">
                Learn more {`->`}
              </Link>
            </Button>
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
