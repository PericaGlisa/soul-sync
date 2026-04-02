import { useNavigate } from "react-router-dom";
import { ArrowLeft, Trash2, TrendingUp, TrendingDown, Minus } from "lucide-react";
import { Button } from "@/components/ui/button";
import { getHistory, clearHistory, type HistoryEntry } from "@/lib/history";
import FloatingElements from "@/components/FloatingElements";
import { useState } from "react";
import { toast } from "sonner";
import { routes } from "@/lib/routes";

const History = () => {
  const navigate = useNavigate();
  const [history, setHistory] = useState(getHistory);

  const handleClear = () => {
    clearHistory();
    setHistory([]);
    toast.success("Istorija je obrisana");
  };

  const formatDate = (iso: string) => {
    const d = new Date(iso);
    return d.toLocaleDateString("sr-Latn-RS", {
      day: "numeric",
      month: "long",
      year: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    });
  };

  const getTrend = (index: number): "up" | "down" | "same" | null => {
    if (index >= history.length - 1) return null;
    const current = history[index].results.totalScore;
    const previous = history[index + 1].results.totalScore;
    if (current > previous + 3) return "up";
    if (current < previous - 3) return "down";
    return "same";
  };

  return (
    <div className="relative min-h-screen px-4 py-8 pb-24 md:pb-8 max-w-lg sm:max-w-xl lg:max-w-2xl mx-auto grain-overlay">
      <FloatingElements />
      <div className="relative z-10 space-y-8 animate-page-enter">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <button
              onClick={() => navigate(-1)}
              className="p-2.5 rounded-2xl hover:bg-muted transition-all duration-300 active:scale-95"
            >
              <ArrowLeft className="w-5 h-5 text-muted-foreground" />
            </button>
            <h1 className="text-2xl font-heading font-bold text-foreground">Moja istorija</h1>
          </div>
          {history.length > 0 && (
            <button
              onClick={handleClear}
              className="p-2.5 rounded-2xl hover:bg-destructive/10 transition-all duration-300 active:scale-95"
            >
              <Trash2 className="w-4 h-4 text-muted-foreground" />
            </button>
          )}
        </div>

        {history.length === 0 ? (
          <div className="text-center py-20 space-y-4">
            <span className="text-5xl block">📊</span>
            <h2 className="text-xl font-heading font-bold text-foreground">Još nema rezultata</h2>
            <p className="text-muted-foreground">Popunite anketu da biste videli svoju istoriju ovde.</p>
            <Button
              onClick={() => navigate(routes.upitnik)}
              className="btn-glow rounded-full px-8 py-6 font-semibold bg-primary text-primary-foreground shadow-xl mt-4"
            >
              Započni anketu
            </Button>
          </div>
        ) : (
          <>
            {/* Mini trend chart */}
            {history.length >= 2 && (
              <div className="glass-card rounded-3xl p-5 space-y-3">
                <h3 className="text-sm font-semibold text-muted-foreground tracking-wider uppercase">Trend</h3>
                <div className="flex items-end gap-1 h-20">
                  {history.slice(0, 10).reverse().map((entry, i, arr) => {
                    const maxH = 80;
                    const h = (entry.results.totalScore / 100) * maxH;
                    return (
                      <div key={entry.id} className="flex-1 flex flex-col items-center justify-end gap-1">
                        <span className="text-[9px] text-muted-foreground font-medium">{entry.results.totalScore}</span>
                        <div
                          className="w-full rounded-t-lg bg-gradient-to-t from-primary to-secondary transition-all duration-700"
                          style={{ height: `${h}%`, minHeight: 4 }}
                        />
                      </div>
                    );
                  })}
                </div>
              </div>
            )}

            {/* History list */}
            <div className="space-y-3">
              {history.map((entry, i) => {
                const trend = getTrend(i);
                return (
                  <button
                    key={entry.id}
                    onClick={() => navigate(routes.rezultati, { state: { results: entry.results } })}
                    className="w-full glass-card rounded-2xl p-5 text-left hover:shadow-lg transition-all duration-300 active:scale-[0.98]"
                  >
                    <div className="flex items-center justify-between">
                      <div className="space-y-1">
                        <div className="flex items-center gap-2">
                          <span className="text-2xl">{entry.results.statusEmoji}</span>
                          <span className="font-heading font-bold text-foreground text-lg">
                            {entry.results.totalScore}/100
                          </span>
                          {trend === "up" && <TrendingUp className="w-4 h-4 text-primary" />}
                          {trend === "down" && <TrendingDown className="w-4 h-4 text-secondary" />}
                          {trend === "same" && <Minus className="w-4 h-4 text-muted-foreground" />}
                        </div>
                        <p className="text-sm text-muted-foreground">{formatDate(entry.date)}</p>
                      </div>
                      <span className="text-xs text-muted-foreground/60">→</span>
                    </div>
                  </button>
                );
              })}
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default History;
