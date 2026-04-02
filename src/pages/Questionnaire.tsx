import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { questions } from "@/lib/questions";
import { calculateResults } from "@/lib/scoring";
import { Progress } from "@/components/ui/progress";
import { Button } from "@/components/ui/button";
import { ArrowLeft } from "lucide-react";
import { routes } from "@/lib/routes";

const Questionnaire = () => {
  const navigate = useNavigate();
  const [currentIndex, setCurrentIndex] = useState(0);
  const [answers, setAnswers] = useState<Record<number, number>>({});
  const [isTransitioning, setIsTransitioning] = useState(false);

  const question = questions[currentIndex];
  const progress = ((currentIndex) / questions.length) * 100;
  const selectedValue = answers[question.id];

  const handleSelect = (value: number) => {
    const newAnswers = { ...answers, [question.id]: value };
    setAnswers(newAnswers);

    if (currentIndex < questions.length - 1) {
      setIsTransitioning(true);
      setTimeout(() => {
        setCurrentIndex((i) => i + 1);
        setIsTransitioning(false);
      }, 400);
    }
  };

  const handleBack = () => {
    if (currentIndex > 0) {
      setIsTransitioning(true);
      setTimeout(() => {
        setCurrentIndex((i) => i - 1);
        setIsTransitioning(false);
      }, 300);
    } else {
      navigate(routes.pocetna);
    }
  };

  const handleSubmit = () => {
    const results = calculateResults(answers);
    navigate(routes.rezultati, { state: { results } });
  };

  const isLastQuestion = currentIndex === questions.length - 1;
  const allAnswered = Object.keys(answers).length === questions.length;

  return (
    <div className="min-h-screen flex flex-col px-4 py-6 pb-24 md:pb-6 max-w-lg sm:max-w-xl lg:max-w-2xl mx-auto grain-overlay">
      {/* Header */}
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <button
            onClick={handleBack}
            className="p-2.5 rounded-2xl hover:bg-muted transition-all duration-300 active:scale-95"
          >
            <ArrowLeft className="w-5 h-5 text-muted-foreground" />
          </button>
          <span className="text-sm font-semibold text-muted-foreground tracking-wider uppercase">
            {currentIndex + 1} od {questions.length}
          </span>
          <div className="w-10" /> {/* spacer */}
        </div>
        <div className="relative">
          <Progress value={progress} className="h-1.5 bg-muted" />
          <div
            className="absolute top-0 left-0 h-1.5 rounded-full bg-gradient-to-r from-primary to-secondary transition-all duration-700 ease-out"
            style={{ width: `${progress}%` }}
          />
        </div>
      </div>

      {/* Question */}
      <div
        className={`flex-1 flex flex-col justify-center py-10 transition-all duration-400 ${
          isTransitioning ? "opacity-0 translate-y-4" : "opacity-100 translate-y-0"
        }`}
        key={question.id}
      >
        <div className="space-y-8">
          <h2 className="text-2xl md:text-3xl font-heading font-bold text-foreground leading-snug tracking-tight">
            {question.text}
          </h2>

          {/* Options */}
          <div className="space-y-3.5">
            {question.options.map((option, idx) => (
              <button
                key={idx}
                onClick={() => handleSelect(option.value)}
                className={`group w-full text-left px-6 py-5 rounded-3xl border-2 transition-all duration-300 font-medium tracking-wide backdrop-blur-sm
                  ${
                    selectedValue === option.value
                      ? "border-primary bg-gradient-to-r from-primary/15 to-primary/5 text-foreground shadow-xl shadow-primary/15 scale-[1.02] ring-1 ring-primary/20"
                      : "border-border/60 bg-card/80 text-foreground hover:border-primary/40 hover:bg-card hover:shadow-lg active:scale-[0.98]"
                  }
                `}
              >
                <div className="flex items-center gap-4">
                  <div className={`w-6 h-6 rounded-full border-2 flex items-center justify-center transition-all duration-300 shrink-0
                    ${selectedValue === option.value ? "border-primary bg-primary shadow-md shadow-primary/30" : "border-muted-foreground/25 group-hover:border-primary/50"}`}
                  >
                    {selectedValue === option.value && (
                      <div className="w-2.5 h-2.5 rounded-full bg-primary-foreground" />
                    )}
                  </div>
                  <span className="text-[15px] leading-snug">{option.label}</span>
                </div>
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Submit button (last question) */}
      {isLastQuestion && selectedValue !== undefined && (
        <div className="pb-6 animate-slide-up">
          <Button
            onClick={handleSubmit}
            disabled={!allAnswered}
            size="lg"
            className="btn-glow w-full rounded-full py-7 text-lg font-semibold bg-primary text-primary-foreground shadow-xl"
          >
            Pogledaj moje rezultate
          </Button>
        </div>
      )}
    </div>
  );
};

export default Questionnaire;
