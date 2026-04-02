import { useLocation, useNavigate } from "react-router-dom";
import { useEffect, useRef } from "react";
import { Button } from "@/components/ui/button";
import { categoryLabels, categoryEmoji, type Category } from "@/lib/questions";
import type { AssessmentResult } from "@/lib/scoring";
import { RotateCcw, BookOpen, Share2, Wind, History, Link2 } from "lucide-react";
import { toast } from "sonner";
import FloatingElements from "@/components/FloatingElements";
import { saveResult } from "@/lib/history";
import { routes } from "@/lib/routes";

const Results = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const results = location.state?.results as AssessmentResult | undefined;
  const savedRef = useRef(false);

  useEffect(() => {
    if (!results) {
      navigate(routes.pocetna);
    } else if (!savedRef.current) {
      saveResult(results);
      savedRef.current = true;
    }
  }, [results, navigate]);

  if (!results) {
    return null;
  }

  const statusColors: Record<string, string> = {
    stable: "text-primary",
    moderate: "text-yellow-600",
    struggling: "text-secondary",
  };

  const handleShare = async () => {
    const url = "https://soulsync.net/";
    const text = `Upravo sam proverio/la svoje mentalno blagostanje na SoulSync! Moj status: ${results.statusEmoji} ${results.statusLabel}. Uradi i ti procenu.`;
    const shareData = {
      title: "SoulSync — Moj rezime mentalnog blagostanja",
      text,
      url,
    };
    try {
      if (navigator.share && (!navigator.canShare || navigator.canShare(shareData))) {
        await navigator.share(shareData);
        toast.success("Rezime je uspešno podeljen.");
        return;
      }
      await navigator.clipboard.writeText(`${text}\n${url}`);
      toast.success("Rezime je kopiran u klipbord.");
    } catch (error) {
      if (error instanceof DOMException && error.name === "AbortError") {
        return;
      }
      toast.error("Deljenje trenutno nije moguće. Pokušajte ponovo.");
    }
  };

  const handleCopyLink = async () => {
    const url = "https://soulsync.net/";
    try {
      await navigator.clipboard.writeText(url);
      toast.success("Link je kopiran u klipbord.");
    } catch {
      toast.error("Kopiranje linka trenutno nije moguće.");
    }
  };

  return (
    <div className="relative min-h-screen px-4 py-8 pb-24 md:pb-8 max-w-lg sm:max-w-xl lg:max-w-2xl mx-auto grain-overlay">
      <FloatingElements />

      <div className="relative z-10 space-y-8 animate-page-enter">
        {/* Score Circle */}
        <div className="text-center space-y-5">
          <div className="relative inline-flex items-center justify-center">
            {/* Glow behind circle */}
            <div className="absolute inset-0 rounded-full bg-gradient-to-br from-primary/20 to-secondary/20 blur-2xl scale-125" />
            <svg className="relative w-48 h-48 -rotate-90" viewBox="0 0 120 120">
              <circle cx="60" cy="60" r="52" fill="none" stroke="hsl(var(--muted))" strokeWidth="8" />
              <circle
                cx="60" cy="60" r="52" fill="none"
                stroke="url(#scoreGradient)"
                strokeWidth="8"
                strokeLinecap="round"
                strokeDasharray={`${(results.totalScore / 100) * 327} 327`}
                className="animate-score-fill"
              />
              <defs>
                <linearGradient id="scoreGradient" x1="0%" y1="0%" x2="100%" y2="100%">
                  <stop offset="0%" stopColor="hsl(var(--primary))" />
                  <stop offset="100%" stopColor="hsl(var(--secondary))" />
                </linearGradient>
              </defs>
            </svg>
            <div className="absolute text-center">
              <span className="text-4xl font-heading font-bold text-foreground">{results.totalScore}</span>
              <span className="block text-xs text-muted-foreground font-medium tracking-wider">od 100</span>
            </div>
          </div>

          <div className="space-y-1">
            <span className="text-5xl block">{results.statusEmoji}</span>
            <h1 className={`text-3xl font-heading font-bold ${statusColors[results.status]}`}>
              {results.statusLabel}
            </h1>
          </div>
        </div>

        {/* Insight */}
        <div className="glass-card rounded-3xl p-6 shadow-lg animate-fade-in" style={{ animationDelay: "0.3s", opacity: 0 }}>
          <p className="text-foreground leading-relaxed text-[15px]">{results.insight}</p>
        </div>

        {/* Category Breakdown */}
        <div className="space-y-4 animate-fade-in" style={{ animationDelay: "0.5s", opacity: 0 }}>
          <h2 className="text-xl font-heading font-bold text-foreground">Pregled po kategorijama</h2>
          {results.categoryScores.map((cs, i) => (
            <div key={cs.category} className="space-y-2" style={{ animationDelay: `${0.6 + i * 0.1}s` }}>
              <div className="flex justify-between text-sm">
                <span className="font-semibold tracking-wide">
                  {categoryEmoji[cs.category as Category]} {categoryLabels[cs.category as Category]}
                </span>
                <span className="text-muted-foreground font-medium">{cs.score}%</span>
              </div>
              <div className="h-2.5 bg-muted rounded-full overflow-hidden">
                <div
                  className="h-full rounded-full bg-gradient-to-r from-primary to-secondary transition-all duration-1000 ease-out"
                  style={{ width: `${cs.score}%` }}
                />
              </div>
            </div>
          ))}
        </div>

        {/* Recommendations */}
        <div className="space-y-4 animate-fade-in" style={{ animationDelay: "0.7s", opacity: 0 }}>
          <h2 className="text-xl font-heading font-bold text-foreground">Preporuke</h2>
          <div className="space-y-3">
            {results.recommendations.map((rec, i) => (
              <div key={i} className="glass-card flex gap-4 items-start p-4 rounded-2xl shadow-sm">
                <span className="text-primary text-lg mt-0.5">✦</span>
                <p className="text-sm text-foreground leading-relaxed">{rec}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Disclaimer */}
        <p className="text-xs text-center text-muted-foreground/70 italic py-2 leading-relaxed">
          ⚠️ Ovo nije medicinska dijagnoza. Ako ste u krizi, molimo vas kontaktirajte stručnjaka za mentalno zdravlje ili kriznu liniju.
        </p>

        {/* Actions */}
        <div className="flex flex-col gap-3 pb-10 animate-fade-in" style={{ animationDelay: "0.9s", opacity: 0 }}>
          <Button
            onClick={() => navigate(routes.vezbe)}
            className="btn-glow rounded-full py-6 font-semibold tracking-wide bg-primary text-primary-foreground shadow-xl"
          >
            <Wind className="w-4 h-4 mr-2" />
            Vođene vežbe za opuštanje
          </Button>
          <Button
            onClick={handleShare}
            variant="outline"
            className="rounded-full py-6 font-semibold tracking-wide border-2 hover:shadow-md transition-all duration-300"
          >
            <Share2 className="w-4 h-4 mr-2" />
            Podeli rezime
          </Button>
          <Button
            onClick={handleCopyLink}
            variant="outline"
            className="rounded-full py-6 font-semibold tracking-wide border-2 hover:shadow-md transition-all duration-300"
          >
            <Link2 className="w-4 h-4 mr-2" />
            Kopiraj link
          </Button>
          <Button
            onClick={() => navigate(routes.istorija)}
            variant="outline"
            className="rounded-full py-6 font-semibold tracking-wide border-2 hover:shadow-md transition-all duration-300"
          >
            <History className="w-4 h-4 mr-2" />
            Moja istorija
          </Button>
          <Button
            onClick={() => navigate(routes.edukacija)}
            variant="outline"
            className="rounded-full py-6 font-semibold tracking-wide border-2 hover:shadow-md transition-all duration-300"
          >
            <BookOpen className="w-4 h-4 mr-2" />
            Saznaj više
          </Button>
          <Button
            onClick={() => navigate(routes.upitnik)}
            variant="outline"
            className="rounded-full py-6 font-semibold tracking-wide border-2 hover:shadow-md transition-all duration-300"
          >
            <RotateCcw className="w-4 h-4 mr-2" />
            Ponovi procenu
          </Button>
          <p className="text-xs text-center text-muted-foreground/80 pt-1">
            Deljenje ne objavljuje celu stranicu rezultata. Šalje se samo kratak rezime i link ka početnoj stranici.
          </p>
        </div>
      </div>
    </div>
  );
};

export default Results;
