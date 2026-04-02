import { questions, categoryWeights, type Category } from "./questions";

export interface CategoryScore {
  category: Category;
  score: number;
  rawScore: number;
  maxScore: number;
}

export interface AssessmentResult {
  totalScore: number;
  status: "stable" | "moderate" | "struggling";
  statusEmoji: string;
  statusLabel: string;
  categoryScores: CategoryScore[];
  insight: string;
  recommendations: string[];
}

function getCategoryScores(answers: Record<number, number>): CategoryScore[] {
  const categories: Category[] = ["mood", "anxiety", "social", "functionality", "outlook"];

  return categories.map((cat) => {
    const catQuestions = questions.filter((q) => q.category === cat);
    const maxScore = catQuestions.length * 5;
    const rawScore = catQuestions.reduce((sum, q) => sum + (answers[q.id] || 3), 0);
    const score = Math.round((rawScore / maxScore) * 100);
    return { category: cat, score, rawScore, maxScore };
  });
}

export function calculateResults(answers: Record<number, number>): AssessmentResult {
  const categoryScores = getCategoryScores(answers);

  const totalScore = Math.round(
    categoryScores.reduce((sum, cs) => {
      return sum + cs.score * categoryWeights[cs.category];
    }, 0)
  );

  let status: AssessmentResult["status"];
  let statusEmoji: string;
  let statusLabel: string;
  let insight: string;

  if (totalScore >= 70) {
    status = "stable";
    statusEmoji = "🌱";
    statusLabel = "Stabilno";
    insight = "Pokazujete snažnu emocionalnu stabilnost i zdrav sistem podrške. Nastavite da negujete svoje blagostanje i ostanete povezani sa ljudima oko sebe.";
  } else if (totalScore >= 40) {
    status = "moderate";
    statusEmoji = "🌤";
    statusLabel = "Umereno";
    insight = "Možda prolazite kroz određene emocionalne izazove. Potpuno je normalno osećati se tako ponekad. Razmislite o tome da se obratite nekome kome verujete ili istražite neke prakse brige o sebi.";
  } else {
    status = "struggling";
    statusEmoji = "🌧";
    statusLabel = "Poteškoće";
    insight = "Možda prolazite kroz težak period. Znajte da niste sami i da je u redu tražiti pomoć. Razmislite o razgovoru sa osobom od poverenja, članom porodice ili stručnjakom za mentalno zdravlje.";
  }

  const recommendations = getRecommendations(status, categoryScores);

  return { totalScore, status, statusEmoji, statusLabel, categoryScores, insight, recommendations };
}

const categoryRecommendations: Record<Category, { low: string; mid: string; high: string }> = {
  mood: {
    low: "Vaše raspoloženje ukazuje na potrebu za podrškom — razgovarajte sa bliskom osobom ili pozovite Centar Srce (0800 300 303)",
    mid: "Posvetite se bar jednoj aktivnosti dnevno koja vam donosi radost — šetnja, muzika, kreativni izraz",
    high: "Vaše raspoloženje je stabilno — nastavite sa aktivnostima koje vam prijaju i delite pozitivnu energiju",
  },
  anxiety: {
    low: "Visok nivo anksioznosti zahteva pažnju — isprobajte tehniku 4-7-8 disanja i razmislite o konsultaciji sa stručnjakom",
    mid: "Anksioznost je prisutna — uvedite 10 minuta svesne meditacije ili vođene relaksacije svakodnevno",
    high: "Dobro upravljate stresom — nastavite sa tehnikama koje vam pomažu i budite svesni svojih okidača",
  },
  social: {
    low: "Izolacija pogoršava mentalno zdravlje — pokušajte da se povežete sa bar jednom osobom ove nedelje, makar kratkim pozivom",
    mid: "Vaša socijalna mreža postoji, ali bi mogla biti jača — uložite vreme u dublje razgovore sa bliskim ljudima",
    high: "Imate dobru socijalnu podršku — cenite te odnose i budite tu i za druge kada im je potrebno",
  },
  functionality: {
    low: "Svakodnevno funkcionisanje vam je otežano — prioritet neka bude redovan san (7-8h), ishrana i bazična rutina",
    mid: "Struktura vam može pomoći — napravite jednostavan dnevni plan sa fiksnim vremenom za san, obroke i pauze",
    high: "Dobro funkcionišete u svakodnevici — održavajte ovu rutinu jer je ona temelj vašeg blagostanja",
  },
  outlook: {
    low: "Teško vam je da vidite svetlu stranu — zapišite jednu malu stvar za koju ste zahvalni svaki dan pre spavanja",
    mid: "Vaš pogled na budućnost je pomešan — fokusirajte se na male, ostvarive ciljeve koji grade samopouzdanje",
    high: "Imate pozitivan pogled na svet — koristite tu energiju da pomognete i inspirišete ljude oko sebe",
  },
};

function getRecommendations(status: AssessmentResult["status"], scores: CategoryScore[]): string[] {
  const recs: string[] = [];
  const sorted = [...scores].sort((a, b) => a.score - b.score);

  // Add specific recommendations based on each category's actual score
  for (const cs of sorted) {
    const catRecs = categoryRecommendations[cs.category];
    if (cs.score < 40) {
      recs.push(catRecs.low);
    } else if (cs.score < 70) {
      recs.push(catRecs.mid);
    } else {
      recs.push(catRecs.high);
    }
  }

  // Add crisis recommendation for struggling status
  if (status === "struggling") {
    recs.unshift("Preporučujemo da se obratite stručnjaku — pozovite Centar Srce na 0800 300 303 ili posetite Institut za mentalno zdravlje");
  }

  // Return top 5 most relevant (lowest categories first via sorted order)
  return recs.slice(0, 5);
}