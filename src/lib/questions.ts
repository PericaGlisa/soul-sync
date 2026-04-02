export type Category = "mood" | "anxiety" | "social" | "functionality" | "outlook";

export interface Question {
  id: number;
  text: string;
  category: Category;
  options: { label: string; value: number }[];
}

const likertOptions = [
  { label: "Uopšte se ne slažem", value: 1 },
  { label: "Ne slažem se", value: 2 },
  { label: "Neutralno", value: 3 },
  { label: "Slažem se", value: 4 },
  { label: "U potpunosti se slažem", value: 5 },
];

const reverseLikert = [
  { label: "Uopšte se ne slažem", value: 5 },
  { label: "Ne slažem se", value: 4 },
  { label: "Neutralno", value: 3 },
  { label: "Slažem se", value: 2 },
  { label: "U potpunosti se slažem", value: 1 },
];

export const questions: Question[] = [
  // Raspoloženje / Emocionalno stanje (4)
  { id: 1, text: "Generalno se osećam srećno i zadovoljno svojim životom.", category: "mood", options: likertOptions },
  { id: 2, text: "Često se osećam tužno ili potišteno bez jasnog razloga.", category: "mood", options: reverseLikert },
  { id: 3, text: "Mogu da uživam u stvarima u kojima sam ranije uživao/la.", category: "mood", options: likertOptions },
  { id: 4, text: "Osećam se emocionalno utrnulo ili odsečeno.", category: "mood", options: reverseLikert },

  // Anksioznost i stres (4)
  { id: 5, text: "Često se osećam anksiozno ili zabrinuto zbog svakodnevnih stvari.", category: "anxiety", options: reverseLikert },
  { id: 6, text: "Teško mi je da se opustim čak i kada imam slobodno vreme.", category: "anxiety", options: reverseLikert },
  { id: 7, text: "Osećam se preopterećeno svojim obavezama.", category: "anxiety", options: reverseLikert },
  { id: 8, text: "U stanju sam da efikasno upravljam stresom.", category: "anxiety", options: likertOptions },

  // Socijalna podrška (4)
  { id: 9, text: "Imam ljude sa kojima mogu da razgovaram kada se osećam loše.", category: "social", options: likertOptions },
  { id: 10, text: "Osećam podršku prijatelja ili porodice.", category: "social", options: likertOptions },
  { id: 11, text: "Često se osećam usamljeno ili izolovano.", category: "social", options: reverseLikert },
  { id: 12, text: "Osećam se prijatno kada trebam da zatražim pomoć.", category: "social", options: likertOptions },

  // Obrasci ponašanja / Funkcionisanje (4)
  { id: 13, text: "Dobro spavam i osećam se odmorno.", category: "functionality", options: likertOptions },
  { id: 14, text: "Moj apetit i navike u ishrani su zdravi.", category: "functionality", options: likertOptions },
  { id: 15, text: "Imam poteškoća sa koncentracijom ili donošenjem odluka.", category: "functionality", options: reverseLikert },
  { id: 16, text: "Osećam motivaciju za obavljanje svakodnevnih aktivnosti.", category: "functionality", options: likertOptions },

  // Pogled na budućnost (4)
  { id: 17, text: "Osećam nadu u vezi sa svojom budućnošću.", category: "outlook", options: likertOptions },
  { id: 18, text: "Verujem da će stvari biti bolje kada je teško.", category: "outlook", options: likertOptions },
  { id: 19, text: "Osećam da imam svrhu i smisao u životu.", category: "outlook", options: likertOptions },
  { id: 20, text: "Ponekad imam osećaj da želim da odustanem.", category: "outlook", options: reverseLikert },
];

export const categoryLabels: Record<Category, string> = {
  mood: "Emocionalno stanje",
  anxiety: "Anksioznost i stres",
  social: "Socijalna podrška",
  functionality: "Svakodnevno funkcionisanje",
  outlook: "Pogled na budućnost",
};

export const categoryWeights: Record<Category, number> = {
  mood: 0.25,
  anxiety: 0.25,
  social: 0.20,
  functionality: 0.15,
  outlook: 0.15,
};

export const categoryEmoji: Record<Category, string> = {
  mood: "💛",
  anxiety: "🧘",
  social: "🤝",
  functionality: "⚡",
  outlook: "🌟",
};