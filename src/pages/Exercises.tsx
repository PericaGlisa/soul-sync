import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { ArrowLeft, Wind, Brain, Anchor, Play, Pause, RotateCcw } from "lucide-react";
import { Button } from "@/components/ui/button";
import FloatingElements from "@/components/FloatingElements";
import { useEffect, useRef, useCallback } from "react";

type ExerciseType = "breathing" | "grounding" | "bodyscan" | null;

const Exercises = () => {
  const navigate = useNavigate();
  const [activeExercise, setActiveExercise] = useState<ExerciseType>(null);

  return (
    <div className="relative min-h-screen px-4 py-8 pb-24 md:pb-8 max-w-lg sm:max-w-xl lg:max-w-2xl mx-auto grain-overlay">
      <FloatingElements />
      <div className="relative z-10 space-y-8 animate-page-enter">
        {/* Header */}
        <div className="flex items-center gap-3">
          <button
            onClick={() => activeExercise ? setActiveExercise(null) : navigate(-1)}
            className="p-2.5 rounded-2xl hover:bg-muted transition-all duration-300 active:scale-95"
          >
            <ArrowLeft className="w-5 h-5 text-muted-foreground" />
          </button>
          <h1 className="text-2xl font-heading font-bold text-foreground">
            {activeExercise ? exerciseData[activeExercise].title : "Vođene vežbe"}
          </h1>
        </div>

        {!activeExercise ? (
          <ExerciseMenu onSelect={setActiveExercise} />
        ) : activeExercise === "breathing" ? (
          <BreathingExercise onBack={() => setActiveExercise(null)} />
        ) : activeExercise === "grounding" ? (
          <GroundingExercise onBack={() => setActiveExercise(null)} />
        ) : (
          <BodyScanExercise onBack={() => setActiveExercise(null)} />
        )}
      </div>
    </div>
  );
};

const exerciseData = {
  breathing: {
    title: "Disanje 4-7-8",
    description: "Tehnika dubokog disanja koja smiruje nervni sistem i smanjuje anksioznost za samo 2 minuta.",
    icon: Wind,
    color: "from-primary/20 to-primary/5",
    duration: "2 min",
  },
  grounding: {
    title: "5-4-3-2-1 Uzemljenje",
    description: "Tehnika svesnosti koja vas vraća u sadašnji trenutak korišćenjem svih pet čula.",
    icon: Anchor,
    color: "from-secondary/20 to-secondary/5",
    duration: "5 min",
  },
  bodyscan: {
    title: "Skeniranje tela",
    description: "Vođena meditacija koja pomaže da prepoznate i otpustite napetost u svakom delu tela.",
    icon: Brain,
    color: "from-accent/40 to-accent/10",
    duration: "3 min",
  },
};

const ExerciseMenu = ({ onSelect }: { onSelect: (e: ExerciseType) => void }) => (
  <div className="space-y-4">
    <p className="text-muted-foreground leading-relaxed">
      Odaberite vežbu koja vam najviše odgovara. Svaka je osmišljena da vam pomogne da se smirite i povežete sa sobom.
    </p>
    {(Object.keys(exerciseData) as Array<keyof typeof exerciseData>).map((key) => {
      const ex = exerciseData[key];
      const Icon = ex.icon;
      return (
        <button
          key={key}
          onClick={() => onSelect(key)}
          className="w-full glass-card rounded-3xl p-6 text-left hover:shadow-xl transition-all duration-300 active:scale-[0.98] group"
        >
          <div className="flex items-start gap-4">
            <div className={`w-14 h-14 rounded-2xl bg-gradient-to-br ${ex.color} flex items-center justify-center shrink-0 group-hover:scale-110 transition-transform duration-300`}>
              <Icon className="w-6 h-6 text-foreground" />
            </div>
            <div className="space-y-1 flex-1">
              <div className="flex items-center justify-between">
                <h3 className="font-heading font-bold text-foreground text-lg">{ex.title}</h3>
                <span className="text-xs text-muted-foreground bg-muted px-2.5 py-1 rounded-full">{ex.duration}</span>
              </div>
              <p className="text-sm text-muted-foreground leading-relaxed">{ex.description}</p>
            </div>
          </div>
        </button>
      );
    })}
  </div>
);

/* =================== BREATHING EXERCISE =================== */

const breathingPhases = [
  { label: "Udahnite", duration: 4000, instruction: "Polako udahnite kroz nos..." },
  { label: "Zadržite", duration: 7000, instruction: "Nežno zadržite dah..." },
  { label: "Izdahnite", duration: 8000, instruction: "Lagano izdahnite kroz usta..." },
];

const BreathingExercise = ({ onBack }: { onBack: () => void }) => {
  const [isRunning, setIsRunning] = useState(false);
  const [phaseIndex, setPhaseIndex] = useState(0);
  const [cycles, setCycles] = useState(0);
  const [progress, setProgress] = useState(0);
  const timerRef = useRef<ReturnType<typeof setInterval>>();
  const startTimeRef = useRef(0);
  const totalCycles = 4;

  const phase = breathingPhases[phaseIndex];

  const advancePhase = useCallback(() => {
    setPhaseIndex((prev) => {
      const next = (prev + 1) % breathingPhases.length;
      if (next === 0) {
        setCycles((c) => {
          if (c + 1 >= totalCycles) {
            setIsRunning(false);
            return c + 1;
          }
          return c + 1;
        });
      }
      return next;
    });
  }, []);

  useEffect(() => {
    if (!isRunning) {
      if (timerRef.current) clearInterval(timerRef.current);
      return;
    }

    startTimeRef.current = Date.now();
    setProgress(0);

    const interval = setInterval(() => {
      const elapsed = Date.now() - startTimeRef.current;
      const pct = Math.min(elapsed / phase.duration, 1);
      setProgress(pct);

      if (pct >= 1) {
        advancePhase();
        startTimeRef.current = Date.now();
        setProgress(0);
      }
    }, 50);

    timerRef.current = interval;
    return () => clearInterval(interval);
  }, [isRunning, phaseIndex, phase.duration, advancePhase]);

  const reset = () => {
    setIsRunning(false);
    setPhaseIndex(0);
    setCycles(0);
    setProgress(0);
  };

  const isComplete = cycles >= totalCycles;

  // Scale the circle based on phase
  const getScale = () => {
    if (!isRunning) return 1;
    if (phaseIndex === 0) return 1 + progress * 0.4; // inhale: grow
    if (phaseIndex === 1) return 1.4; // hold: stay big
    return 1.4 - progress * 0.4; // exhale: shrink
  };

  return (
    <div className="space-y-8 text-center">
      {/* Animated circle */}
      <div className="flex items-center justify-center py-8">
        <div className="relative">
          <div
            className="w-52 h-52 rounded-full bg-gradient-to-br from-primary/30 to-secondary/30 flex items-center justify-center transition-transform duration-300 ease-out"
            style={{ transform: `scale(${getScale()})` }}
          >
            <div className="w-36 h-36 rounded-full bg-gradient-to-br from-primary/50 to-secondary/50 flex items-center justify-center backdrop-blur-sm">
              <div className="text-center">
                <span className="text-2xl font-heading font-bold text-foreground block">
                  {isComplete ? "✨" : phase.label}
                </span>
                <span className="text-xs text-muted-foreground mt-1 block">
                  {isComplete
                    ? "Završeno!"
                    : isRunning
                    ? `${Math.ceil((phase.duration / 1000) * (1 - progress))}s`
                    : "Spremno"}
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Instruction */}
      <p className="text-muted-foreground text-lg leading-relaxed min-h-[3rem]">
        {isComplete
          ? "Odlično! Završili ste vežbu disanja. Primetite kako se osećate."
          : isRunning
          ? phase.instruction
          : "Pritisnite dugme da započnete. Pratite ritam kruga."}
      </p>

      {/* Cycle counter */}
      <div className="flex justify-center gap-2">
        {Array.from({ length: totalCycles }).map((_, i) => (
          <div
            key={i}
            className={`w-3 h-3 rounded-full transition-all duration-500 ${
              i < cycles ? "bg-primary scale-110" : "bg-muted"
            }`}
          />
        ))}
      </div>

      {/* Controls */}
      <div className="flex gap-3 justify-center">
        {!isComplete && (
          <Button
            onClick={() => setIsRunning(!isRunning)}
            className="btn-glow rounded-full px-8 py-6 text-lg font-semibold bg-primary text-primary-foreground shadow-xl"
          >
            {isRunning ? <Pause className="w-5 h-5 mr-2" /> : <Play className="w-5 h-5 mr-2" />}
            {isRunning ? "Pauza" : "Započni"}
          </Button>
        )}
        {(isComplete || cycles > 0) && (
          <Button
            onClick={reset}
            variant="outline"
            className="rounded-full px-6 py-6 border-2"
          >
            <RotateCcw className="w-4 h-4 mr-2" />
            Ponovi
          </Button>
        )}
      </div>
    </div>
  );
};

/* =================== GROUNDING EXERCISE =================== */

const groundingSteps = [
  { sense: "👀", count: 5, instruction: "Imenujte 5 stvari koje možete da VIDITE oko sebe" },
  { sense: "✋", count: 4, instruction: "Imenujte 4 stvari koje možete da DODIRNETE" },
  { sense: "👂", count: 3, instruction: "Imenujte 3 stvari koje možete da ČUJETE" },
  { sense: "👃", count: 2, instruction: "Imenujte 2 stvari koje možete da NAMIRISETE" },
  { sense: "👅", count: 1, instruction: "Imenujte 1 stvar koju možete da OKUSITЕ" },
];

const GroundingExercise = ({ onBack }: { onBack: () => void }) => {
  const [step, setStep] = useState(0);
  const [items, setItems] = useState<string[]>([]);
  const isComplete = step >= groundingSteps.length;
  const current = groundingSteps[step];

  const markItem = () => {
    const newItems = [...items, "✓"];
    setItems(newItems);
    if (newItems.length >= current.count) {
      setTimeout(() => {
        setStep((s) => s + 1);
        setItems([]);
      }, 600);
    }
  };

  const reset = () => {
    setStep(0);
    setItems([]);
  };

  return (
    <div className="space-y-8 text-center">
      {/* Progress dots */}
      <div className="flex justify-center gap-3">
        {groundingSteps.map((_, i) => (
          <div
            key={i}
            className={`w-10 h-10 rounded-full flex items-center justify-center text-sm font-bold transition-all duration-500 ${
              i < step
                ? "bg-primary text-primary-foreground scale-90"
                : i === step
                ? "bg-gradient-to-br from-primary to-secondary text-primary-foreground scale-110 shadow-lg"
                : "bg-muted text-muted-foreground"
            }`}
          >
            {i < step ? "✓" : groundingSteps[i].count}
          </div>
        ))}
      </div>

      {isComplete ? (
        <div className="space-y-6 py-8">
          <span className="text-6xl block">🌿</span>
          <h2 className="text-2xl font-heading font-bold text-foreground">Odlično urađeno!</h2>
          <p className="text-muted-foreground leading-relaxed">
            Sada ste potpuno prisutni u ovom trenutku. Primetite kako se vaše telo i um osećaju.
          </p>
          <Button onClick={reset} variant="outline" className="rounded-full px-6 py-6 border-2">
            <RotateCcw className="w-4 h-4 mr-2" />
            Ponovi vežbu
          </Button>
        </div>
      ) : (
        <div className="space-y-8 py-4">
          <div className="space-y-3">
            <span className="text-5xl block">{current.sense}</span>
            <p className="text-xl font-heading font-bold text-foreground leading-snug">
              {current.instruction}
            </p>
          </div>

          {/* Tap circles */}
          <div className="flex justify-center gap-3">
            {Array.from({ length: current.count }).map((_, i) => (
              <button
                key={i}
                onClick={() => i === items.length ? markItem() : undefined}
                disabled={i !== items.length}
                className={`w-14 h-14 rounded-full flex items-center justify-center text-lg font-bold transition-all duration-500 ${
                  i < items.length
                    ? "bg-primary text-primary-foreground scale-95 shadow-inner"
                    : i === items.length
                    ? "bg-card border-2 border-primary text-primary shadow-lg hover:shadow-xl hover:scale-110 active:scale-95 cursor-pointer animate-pulse-glow"
                    : "bg-muted text-muted-foreground/40 cursor-not-allowed"
                }`}
              >
                {i < items.length ? "✓" : i + 1}
              </button>
            ))}
          </div>

          <p className="text-sm text-muted-foreground">
            Pritisnite krug kada imenujete svaku stvar
          </p>
        </div>
      )}
    </div>
  );
};

/* =================== BODY SCAN EXERCISE =================== */

const bodyScanSteps = [
  { area: "🦶", label: "Stopala", instruction: "Usmerite pažnju na svoja stopala. Osetite kontakt sa podlogom. Da li ima napetosti? Pustite je da se otpusti." },
  { area: "🦵", label: "Noge", instruction: "Polako pomerite svest ka nogama. Primetite svaki osećaj — toplotu, težinu, napetost. Samo posmatrajte." },
  { area: "💗", label: "Stomak i grudi", instruction: "Osetite kako se vaš stomak i grudi podižu i spuštaju sa svakim dahom. Neka disanje bude prirodno." },
  { area: "🤲", label: "Ruke i šake", instruction: "Primetite svoje ruke i šake. Da li stiskate pesnice? Opustite prste, jedan po jedan." },
  { area: "😌", label: "Lice i glava", instruction: "Opustite čelo, vilicu, oči. Zamislite kako napetost isparava sa svakim izdahom." },
];

const BodyScanExercise = ({ onBack }: { onBack: () => void }) => {
  const [step, setStep] = useState(0);
  const [isActive, setIsActive] = useState(false);
  const [timer, setTimer] = useState(30);
  const intervalRef = useRef<ReturnType<typeof setInterval>>();
  const isComplete = step >= bodyScanSteps.length;
  const current = bodyScanSteps[step];

  useEffect(() => {
    if (!isActive) {
      if (intervalRef.current) clearInterval(intervalRef.current);
      return;
    }

    setTimer(30);
    intervalRef.current = setInterval(() => {
      setTimer((t) => {
        if (t <= 1) {
          setIsActive(false);
          setStep((s) => s + 1);
          return 30;
        }
        return t - 1;
      });
    }, 1000);

    return () => { if (intervalRef.current) clearInterval(intervalRef.current); };
  }, [isActive, step]);

  const reset = () => {
    setStep(0);
    setIsActive(false);
    setTimer(30);
  };

  return (
    <div className="space-y-8 text-center">
      {/* Body map */}
      <div className="flex justify-center gap-1">
        {bodyScanSteps.map((s, i) => (
          <div
            key={i}
            className={`flex flex-col items-center transition-all duration-500 ${
              i === step ? "scale-125" : i < step ? "opacity-40 scale-90" : "opacity-30"
            }`}
          >
            <span className="text-3xl">{s.area}</span>
            <span className="text-[10px] text-muted-foreground mt-1">{s.label}</span>
          </div>
        ))}
      </div>

      {isComplete ? (
        <div className="space-y-6 py-6">
          <span className="text-6xl block">🧘</span>
          <h2 className="text-2xl font-heading font-bold text-foreground">Skeniranje završeno</h2>
          <p className="text-muted-foreground leading-relaxed">
            Celo vaše telo je sada opuštenije. Zapamtite ovaj osećaj — možete ga pozvati kad god vam zatreba.
          </p>
          <Button onClick={reset} variant="outline" className="rounded-full px-6 py-6 border-2">
            <RotateCcw className="w-4 h-4 mr-2" />
            Ponovi
          </Button>
        </div>
      ) : (
        <div className="space-y-6 py-2">
          <div className="glass-card rounded-3xl p-8 space-y-4">
            <span className="text-5xl block">{current.area}</span>
            <h3 className="text-xl font-heading font-bold text-foreground">{current.label}</h3>
            <p className="text-muted-foreground leading-relaxed">{current.instruction}</p>
          </div>

          {/* Timer ring */}
          {isActive && (
            <div className="flex justify-center">
              <div className="relative w-20 h-20">
                <svg className="w-full h-full -rotate-90" viewBox="0 0 60 60">
                  <circle cx="30" cy="30" r="26" fill="none" stroke="hsl(var(--muted))" strokeWidth="4" />
                  <circle
                    cx="30" cy="30" r="26" fill="none"
                    stroke="hsl(var(--primary))"
                    strokeWidth="4"
                    strokeLinecap="round"
                    strokeDasharray={`${(timer / 30) * 163} 163`}
                    className="transition-all duration-1000 linear"
                  />
                </svg>
                <span className="absolute inset-0 flex items-center justify-center text-lg font-bold text-foreground">
                  {timer}
                </span>
              </div>
            </div>
          )}

          <div className="flex gap-3 justify-center">
            {!isActive ? (
              <Button
                onClick={() => setIsActive(true)}
                className="btn-glow rounded-full px-8 py-6 text-lg font-semibold bg-primary text-primary-foreground shadow-xl"
              >
                <Play className="w-5 h-5 mr-2" />
                {step === 0 ? "Započni" : "Nastavi"}
              </Button>
            ) : (
              <Button
                onClick={() => { setIsActive(false); setStep((s) => s + 1); }}
                variant="outline"
                className="rounded-full px-6 py-6 border-2"
              >
                Preskoči →
              </Button>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default Exercises;
