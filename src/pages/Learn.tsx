import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { ArrowLeft, ExternalLink } from "lucide-react";
import FloatingElements from "@/components/FloatingElements";
import { routes } from "@/lib/routes";

const sections = [
  {
    emoji: "🧠",
    title: "Šta je mentalno zdravlje?",
    content:
      "Mentalno zdravlje obuhvata vaše emocionalno, psihološko i socijalno blagostanje. Utiče na to kako razmišljate, osećate se i delujete. Takođe pomaže da odredite kako se nosite sa stresom, kako se odnosite prema drugima i donosite odluke. Mentalno zdravlje je važno u svakoj fazi života.",
  },
  {
    emoji: "💚",
    title: "U redu je ne biti u redu",
    content:
      "Svi prolaze kroz teška vremena. Osećati se tužno, anksiozno ili preopterećeno ne znači da nešto nije u redu sa vama — to znači da ste ljudsko biće. Priznavanje svojih osećanja je prvi korak ka njihovom razumevanju.",
  },
  {
    emoji: "🗣",
    title: "Moć razgovora",
    content:
      "Otvaranje nekome kome verujete može napraviti ogromnu razliku. Bilo da je to prijatelj, član porodice ili stručnjak — izražavanje onoga što osećate pomaže vam da obradite emocije i smanjuje teret nošenja sa njima.",
  },
  {
    emoji: "🌱",
    title: "Mali koraci, veliki uticaj",
    content:
      "Ne morate da pravite drastične promene. Jednostavne navike poput redovnog sna, svakodnevnih šetnji, vođenja dnevnika ili ograničavanja vremena pred ekranom mogu značajno poboljšati vaše mentalno blagostanje tokom vremena.",
  },
  {
    emoji: "🤝",
    title: "Niste sami",
    content:
      "Milioni ljudi širom sveta se suočavaju sa izazovima mentalnog zdravlja. Traženje pomoći nije znak slabosti — to je znak snage. Postoje resursi i zajednice spremne da vas podrže.",
  },
];

const resources = [
  { name: "Nacionalna linija za pomoć", url: "https://centarsrce.org/", desc: "Centar Srce — emotivna podrška: 0800 300 303" },
  { name: "Institut za mentalno zdravlje", url: "https://www.imh.org.rs/", desc: "Institut za mentalno zdravlje, Beograd" },
  { name: "Društvo psihologa Srbije", url: "https://dps.org.rs/", desc: "Stručna podrška i resursi za mentalno zdravlje" },
  { name: "SOS telefon za žene", url: "https://www.womenngo.org.rs/", desc: "Autonomni ženski centar: 0800 222 003" },
];

const Learn = () => {
  const navigate = useNavigate();

  return (
    <div className="relative min-h-screen px-4 py-6 pb-24 md:pb-6 max-w-lg sm:max-w-xl lg:max-w-2xl mx-auto grain-overlay">
      <FloatingElements />

      <div className="relative z-10 space-y-8 animate-page-enter">
        {/* Header */}
        <div className="flex items-center gap-4">
          <button onClick={() => navigate(-1)} className="p-2.5 rounded-2xl hover:bg-muted transition-all duration-300 active:scale-95">
            <ArrowLeft className="w-5 h-5 text-muted-foreground" />
          </button>
          <h1 className="text-2xl font-heading font-bold text-foreground">Razumevanje mentalnog zdravlja</h1>
        </div>

        <p className="text-muted-foreground leading-relaxed text-[15px]">
          Znanje je prvi korak ka isceljenju. Evo nekih stvari za koje verujemo da bi svako trebalo da zna. 💛
        </p>

        {/* Sections */}
        {sections.map((section, i) => (
          <div
            key={i}
            className="glass-card rounded-3xl p-6 shadow-sm animate-fade-in"
            style={{ animationDelay: `${i * 0.12}s`, opacity: 0 }}
          >
            <div className="space-y-3">
              <h2 className="text-lg font-heading font-bold text-foreground">
                {section.emoji} {section.title}
              </h2>
              <p className="text-sm text-muted-foreground leading-relaxed">{section.content}</p>
            </div>
          </div>
        ))}

        {/* Resources */}
        <div className="space-y-4 animate-fade-in" style={{ animationDelay: "0.6s", opacity: 0 }}>
          <h2 className="text-xl font-heading font-bold text-foreground">📚 Korisni resursi</h2>
          {resources.map((res, i) => (
            <a
              key={i}
              href={res.url}
              target="_blank"
              rel="noopener noreferrer"
              className="glass-card flex items-center justify-between p-5 rounded-2xl hover:shadow-lg transition-all duration-300 group"
            >
              <div>
                <p className="font-semibold text-foreground group-hover:text-primary transition-colors">{res.name}</p>
                <p className="text-xs text-muted-foreground mt-0.5">{res.desc}</p>
              </div>
              <ExternalLink className="w-4 h-4 text-muted-foreground group-hover:text-primary transition-colors shrink-0" />
            </a>
          ))}
        </div>

        {/* Social */}
        <div className="text-center py-8 space-y-3 animate-fade-in" style={{ animationDelay: "0.8s", opacity: 0 }}>
          <p className="text-sm text-muted-foreground">Pratite nas za svakodnevni sadržaj o mentalnom blagostanju</p>
          <div className="flex justify-center gap-6">
            <a href="https://tiktok.com/@soulsync_co" target="_blank" rel="noopener noreferrer" className="text-sm font-semibold text-primary hover:underline underline-offset-4 transition-all">
              TikTok @soulsync_co
            </a>
            <a href="https://instagram.com/soulsync_co" target="_blank" rel="noopener noreferrer" className="text-sm font-semibold text-primary hover:underline underline-offset-4 transition-all">
              IG @soulsync_co
            </a>
          </div>
        </div>

        {/* Back to home */}
        <div className="pb-10">
          <Button onClick={() => navigate(routes.pocetna)} variant="outline" className="w-full rounded-full py-6 font-semibold tracking-wide border-2 hover:shadow-md transition-all duration-300">
            Nazad na početnu
          </Button>
        </div>
      </div>
    </div>
  );
};

export default Learn;
