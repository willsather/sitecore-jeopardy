"use client";

import { useEffect, useState } from "react";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Dialog,
  DialogContent,
  DialogOverlay,
  DialogTitle,
} from "@/components/ui/dialog";
import { useGameStore } from "@/lib/game-state";

export function QuestionModal() {
  const { currentQuestion, answerQuestion, closeQuestion } = useGameStore();
  const [selectedAnswer, setSelectedAnswer] = useState<number | null>(null);
  const [showResult, setShowResult] = useState(false);

  const handleClose = () => {
    closeQuestion();
    setSelectedAnswer(null);
    setShowResult(false);
  };

  useEffect(() => {
    if (currentQuestion) {
      setSelectedAnswer(null);
      setShowResult(false);
    }
  }, [currentQuestion]);

  useEffect(() => {
    if (showResult) {
      const timer = setTimeout(() => {
        handleClose();
      }, 3000);

      return () => clearTimeout(timer);
    }
  }, [showResult, handleClose]);

  if (!currentQuestion) return null;

  const handleAnswerSelect = (answerIndex: number) => {
    if (showResult) return;

    setSelectedAnswer(answerIndex);
    setShowResult(true);

    const isCorrect = answerIndex === currentQuestion.correctAnswer;

    answerQuestion(isCorrect);
  };

  return (
    <Dialog open={!!currentQuestion} onOpenChange={handleClose}>
      <DialogOverlay className="bg-black/80 backdrop-blur-sm" />
      <DialogTitle className="text-center font-bold text-xl">
        Question
      </DialogTitle>
      <DialogContent className="mx-auto my-4 max-h-[90vh] w-[95vw] max-w-2xl overflow-hidden overflow-y-auto rounded-xl p-0 shadow-2xl sm:my-8 sm:w-full">
        <Card className="overflow-hidden border-0 bg-card p-0">
          <CardHeader className="-m-px relative bg-primary py-4 text-primary-foreground sm:py-6">
            <CardTitle className="text-left font-bold text-xl sm:text-center sm:text-2xl md:text-3xl">
              <p>${currentQuestion.value}</p>
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4 p-4 sm:space-y-6 sm:p-8">
            {/* Question Display */}
            <div className="space-y-4 text-center">
              <div className="rounded-lg border-2 border-primary/20 bg-primary/5 p-4 sm:p-6">
                <p className="font-medium text-foreground text-lg leading-relaxed sm:text-xl">
                  {currentQuestion.question}
                </p>
              </div>
            </div>

            {!showResult && (
              <div className="space-y-3">
                {currentQuestion.options.map((option, index) => (
                  <Button
                    key={option}
                    onClick={() => handleAnswerSelect(index)}
                    variant="outline"
                    className="h-auto w-full justify-start border-2 border-muted-foreground/20 p-3 text-left text-sm hover:border-primary/50 hover:bg-primary/5 sm:p-4 sm:text-base"
                  >
                    <span className="mr-2 font-semibold text-primary sm:mr-3">
                      {String.fromCharCode(65 + index)}.
                    </span>
                    {option}
                  </Button>
                ))}
              </div>
            )}

            {showResult && (
              <div className="fade-in-50 animate-in space-y-4 duration-300">
                <div className="space-y-3">
                  {currentQuestion.options.map((option, index) => (
                    <Button
                      key={option}
                      variant="outline"
                      disabled={true}
                      className={`h-auto w-full justify-start border-2 p-3 text-left sm:p-4 ${
                        index === currentQuestion.correctAnswer
                          ? "border-green-400 bg-green-50 text-base text-green-500 hover:bg-green-50 sm:text-lg"
                          : index === selectedAnswer
                            ? "border-red-400 bg-red-50 text-base text-red-500 hover:bg-red-50 sm:text-lg"
                            : "border-muted-foreground/20 bg-muted font-normal text-muted-foreground text-sm hover:bg-muted sm:text-base"
                      }`}
                    >
                      <span className="mr-2 font-semibold sm:mr-3 sm:text-xl">
                        {String.fromCharCode(65 + index)}.
                      </span>
                      {option}
                    </Button>
                  ))}
                </div>
              </div>
            )}
          </CardContent>
        </Card>
      </DialogContent>
    </Dialog>
  );
}
