import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import FloatingElements from "@/components/FloatingElements";
import soulsyncLogo from "@/assets/SoulSync_Logo_Image.png";
import { ClipboardCheck, BarChart3, Lightbulb, Wind, Shield, Heart, HelpCircle, ChevronDown } from "lucide-react";
import { useRef } from "react";
import { routes } from "@/lib/routes";

const Landing = () => {
  const navigate = useNavigate();
  const howItWorksRef = useRef<HTMLDivElement>(null);

  const scrollToHow = () => {
    howItWorksRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <div className="relative min-h-screen overflow-hidden grain-overlay">
      <FloatingElements />

      {/* ─── Hero Section ─── */}
      <section className="relative z-10 min-h-screen flex flex-col items-center justify-center px-6 py-10">
        <div className="flex flex-col items-center text-center w-full max-w-xl mx-auto space-y-8 md:space-y-10 animate-page-enter">
          {/* Logo */}
          <div className="relative">
            <div className="absolute inset-0 bg-gradient-to-br from-primary/30 via-secondary/25 to-accent/40 blur-2xl scale-105" />
            <img
              src={soulsyncLogo}
              alt="SoulSync Logo"
              className="relative w-[17rem] h-[15rem] md:w-[21rem] md:h-[18rem] drop-shadow-2xl object-contain"
            />
          </div>

          <div className="space-y-4">
            <p className="text-base md:text-xl text-muted-foreground font-medium leading-relaxed max-w-sm">
              SoulSync ti pomaže da razumeš emocije i napraviš sledeći dobar korak.
            </p>
          </div>

          <div className="w-full max-w-xs">
            <Button
              onClick={() => navigate(routes.upitnik)}
              size="lg"
              className="btn-glow w-full rounded-full px-10 py-7 text-lg font-semibold shadow-xl hover:shadow-2xl transition-all duration-500 hover:scale-[1.03] bg-primary text-primary-foreground"
            >
              Započni procenu u 3 minuta
            </Button>
          </div>

          <div className="space-y-3 pt-4">
            <p className="text-sm text-muted-foreground tracking-wide">
              🔒 Anonimno i privatno — Bez prijave
            </p>
            <div className="flex items-center justify-center gap-6 text-xs text-muted-foreground/60">
              <span>Besplatno</span>
              <span className="w-1 h-1 rounded-full bg-muted-foreground/30" />
              <span>Bez registracije</span>
              <span className="w-1 h-1 rounded-full bg-muted-foreground/30" />
              <span>Potpuno sigurno</span>
            </div>
          </div>

          <button
            onClick={scrollToHow}
            className="animate-float-slow text-muted-foreground/50 hover:text-muted-foreground transition-colors pt-2"
            aria-label="Saznaj više"
          >
            <ChevronDown className="w-7 h-7" />
          </button>
        </div>
      </section>

      {/* ─── Kako funkcioniše ─── */}
      <section ref={howItWorksRef} className="relative z-10 px-6 py-20 max-w-3xl mx-auto">
        <h2 className="text-3xl md:text-4xl font-heading font-bold text-foreground text-center mb-14">
          Kako funkcioniše?
        </h2>
        <div className="grid gap-8 md:grid-cols-3">
          {[
            {
              icon: <ClipboardCheck className="w-7 h-7" />,
              title: "Popuni anketu",
              desc: "20 pažljivo osmišljenih pitanja koja mapiraju kako se zaista osećaš — za oko 3 minuta.",
            },
            {
              icon: <BarChart3 className="w-7 h-7" />,
              title: "Dobij uvid",
              desc: "Jasan pregled po ključnim oblastima, uz smernice koje možeš odmah da primeniš.",
            },
            {
              icon: <Lightbulb className="w-7 h-7" />,
              title: "Preduzmi korak",
              desc: "Vođene vežbe disanja, uzemljenja i skeniranja tela za brzo umirenje nervnog sistema.",
            },
          ].map((step, i) => (
            <div
              key={i}
              className="glass-card rounded-3xl p-7 text-center space-y-4 shadow-lg hover:shadow-xl transition-shadow duration-300"
            >
              <div className="inline-flex items-center justify-center w-14 h-14 rounded-2xl bg-gradient-to-br from-primary/20 to-secondary/20 text-primary">
                {step.icon}
              </div>
              <h3 className="text-lg font-heading font-bold text-foreground">{step.title}</h3>
              <p className="text-sm text-muted-foreground leading-relaxed">{step.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* ─── Šta dobijate ─── */}
      <section className="relative z-10 px-6 py-20 max-w-3xl mx-auto">
        <h2 className="text-3xl md:text-4xl font-heading font-bold text-foreground text-center mb-14">
          Šta dobijate?
        </h2>
        <div className="grid gap-6 sm:grid-cols-2">
          {[
            { icon: <BarChart3 className="w-5 h-5" />, title: "Precizan uvid", desc: "Jasan rezultat kroz 5 ključnih oblasti mentalnog blagostanja." },
            { icon: <Heart className="w-5 h-5" />, title: "Lični plan podrške", desc: "Konkretne preporuke prilagođene baš tvom trenutnom stanju." },
            { icon: <Wind className="w-5 h-5" />, title: "Praktične vežbe", desc: "Disanje, uzemljenje i skeniranje tela kada ti je najpotrebnije." },
            { icon: <Shield className="w-5 h-5" />, title: "Privatnost bez kompromisa", desc: "Bez naloga i bez slanja podataka — sve ostaje kod tebe." },
          ].map((item, i) => (
            <div
              key={i}
              className="flex gap-4 items-start glass-card rounded-2xl p-5 shadow-sm hover:shadow-md transition-shadow duration-300"
            >
              <div className="shrink-0 w-10 h-10 rounded-xl bg-gradient-to-br from-primary/15 to-secondary/15 flex items-center justify-center text-primary">
                {item.icon}
              </div>
              <div>
                <h3 className="font-semibold text-foreground text-[15px]">{item.title}</h3>
                <p className="text-sm text-muted-foreground leading-relaxed mt-1">{item.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* ─── Statistike ─── */}
      <section className="relative z-10 px-4 sm:px-6 py-14 sm:py-16 max-w-3xl mx-auto">
        <div className="glass-card rounded-3xl p-5 sm:p-8 md:p-10 shadow-xl">
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 sm:gap-6 text-center">
            {[
              { value: "20", label: "pitanja" },
              { value: "5", label: "kategorija" },
              { value: "3 min", label: "trajanje" },
            ].map((stat, i) => (
              <div key={i} className="space-y-1.5 py-3 sm:py-0 rounded-2xl bg-background/35 sm:bg-transparent border border-border/40 sm:border-0">
                <span className={`block font-heading font-bold bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent whitespace-nowrap leading-none ${stat.value === "3 min" ? "text-2xl sm:text-3xl md:text-4xl" : "text-3xl sm:text-3xl md:text-4xl"}`}>
                  {stat.value}
                </span>
                <p className="text-[11px] sm:text-xs md:text-sm text-muted-foreground font-medium uppercase tracking-[0.16em]">
                  {stat.label}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ─── FAQ ─── */}
      <section className="relative z-10 px-6 py-20 max-w-2xl mx-auto">
        <h2 className="text-3xl md:text-4xl font-heading font-bold text-foreground text-center mb-14">
          Česta pitanja
        </h2>
        <div className="space-y-4">
          {[
            {
              q: "Da li je ovo medicinska dijagnoza?",
              a: "Ne. SoulSync je alat za samoprocenu i edukaciju. Nije zamena za profesionalnu dijagnozu ili terapiju. Ako vam je potrebna pomoć, obratite se stručnjaku.",
            },
            {
              q: "Da li se moji podaci čuvaju negde?",
              a: "Vaši rezultati se čuvaju isključivo lokalno u vašem pregledaču (localStorage). Ne šaljemo ništa na server i ne prikupljamo lične podatke.",
            },
            {
              q: "Koliko traje anketa?",
              a: "Anketa sadrži 20 pitanja i traje oko 3 minuta. Nema tačnih ili netačnih odgovora — odgovarajte iskreno.",
            },
            {
              q: "Mogu li da ponovim anketu?",
              a: "Naravno! Možete popuniti anketu koliko god puta želite. Svi rezultati se čuvaju u vašoj istoriji kako biste pratili napredak.",
            },
          ].map((faq, i) => (
            <details
              key={i}
              className="group glass-card rounded-2xl shadow-sm hover:shadow-md transition-shadow duration-300"
            >
              <summary className="flex items-center justify-between cursor-pointer p-5 text-[15px] font-semibold text-foreground list-none">
                <span className="flex items-center gap-3">
                  <HelpCircle className="w-4 h-4 text-primary shrink-0" />
                  {faq.q}
                </span>
                <ChevronDown className="w-4 h-4 text-muted-foreground transition-transform duration-300 group-open:rotate-180 shrink-0" />
              </summary>
              <p className="px-5 pb-5 text-sm text-muted-foreground leading-relaxed">
                {faq.a}
              </p>
            </details>
          ))}
        </div>
      </section>

      {/* ─── Final CTA ─── */}
      <section className="relative z-10 px-6 py-20 max-w-md mx-auto text-center">
        <div className="space-y-6">
          <h2 className="text-3xl font-heading font-bold text-foreground">Spreman/na za prvi korak?</h2>
          <p className="text-muted-foreground leading-relaxed">
            Tvoje mentalno zdravlje zaslužuje pažnju. Pokreni procenu odmah i dobij jasnu sliku svog stanja.
          </p>
          <Button
            onClick={() => navigate(routes.upitnik)}
            size="lg"
            className="btn-glow rounded-full px-10 py-7 text-lg font-semibold shadow-xl hover:shadow-2xl transition-all duration-500 hover:scale-[1.03] bg-primary text-primary-foreground"
          >
            Pokreni procenu
          </Button>
        </div>
      </section>

      {/* Footer */}
      <footer className="relative z-10 px-6 py-8 pb-24 md:pb-8 text-center border-t border-border/50">
        <p className="text-xs text-muted-foreground/60">
          © {new Date().getFullYear()} SoulSync. Sva prava zadržana. Ovo nije medicinski savet.
        </p>
      </footer>
    </div>
  );
};

export default Landing;
