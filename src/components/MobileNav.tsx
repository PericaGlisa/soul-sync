import { useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { Home, ClipboardList, Wind, History, BookOpen, X, Menu } from "lucide-react";
import { routes } from "@/lib/routes";

const navItems = [
  { label: "Početna", path: routes.pocetna, icon: Home },
  { label: "Upitnik", path: routes.upitnik, icon: ClipboardList },
  { label: "Vežbe", path: routes.vezbe, icon: Wind },
  { label: "Istorija", path: routes.istorija, icon: History },
  { label: "Edukacija", path: routes.edukacija, icon: BookOpen },
];

const MobileNav = () => {
  const [isOpen, setIsOpen] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();
  const handleNavigate = (path: string) => {
    setIsOpen(false);
    navigate(path);
  };

  return (
    <>
      <button
        onClick={() => setIsOpen(true)}
        className="hidden md:flex fixed top-4 right-4 z-[60] w-11 h-11 rounded-2xl glass-card shadow-lg items-center justify-center text-foreground hover:scale-105 active:scale-95 transition-all duration-200"
        aria-label="Otvori meni"
      >
        <Menu className="w-5 h-5" />
      </button>

      <div
        className={`hidden md:block fixed inset-0 z-[70] bg-foreground/30 backdrop-blur-sm transition-opacity duration-300 ${
          isOpen ? "opacity-100 pointer-events-auto" : "opacity-0 pointer-events-none"
        }`}
        onClick={() => setIsOpen(false)}
      />

      <nav
        className={`hidden md:block fixed top-0 right-0 z-[80] h-full w-80 bg-background/95 backdrop-blur-xl shadow-2xl transition-transform duration-400 ease-out ${
          isOpen ? "translate-x-0" : "translate-x-full"
        }`}
      >
        <div className="px-6 pt-5 pb-4 border-b border-border/50 bg-gradient-to-r from-secondary/15 via-background to-primary/15">
          <div className="flex items-center justify-between">
            <span className="font-heading font-bold text-lg text-foreground">SoulSync</span>
            <button
              onClick={() => setIsOpen(false)}
              className="w-9 h-9 rounded-xl hover:bg-muted flex items-center justify-center transition-colors"
              aria-label="Zatvori meni"
            >
              <X className="w-5 h-5 text-muted-foreground" />
            </button>
          </div>
          <p className="text-xs text-muted-foreground mt-2">Brza navigacija kroz sadržaj i alate za smirenje.</p>
        </div>
        <div className="px-4 pt-4">
          <button
            onClick={() => handleNavigate(routes.upitnik)}
            className="w-full rounded-2xl px-4 py-3 text-left bg-gradient-to-r from-primary/20 via-secondary/15 to-accent/30 border border-border/50 hover:shadow-md transition-all duration-200"
          >
            <p className="text-sm font-semibold text-foreground">Pokreni procenu odmah</p>
            <p className="text-xs text-muted-foreground mt-1">20 pitanja · oko 3 minuta</p>
          </button>
        </div>
        <div className="px-4 py-6 space-y-1.5">
          {navItems.map((item) => {
            const isActive = location.pathname === item.path;
            return (
              <button
                key={item.path}
                onClick={() => handleNavigate(item.path)}
                className={`w-full flex items-center gap-4 px-4 py-3.5 rounded-2xl text-[15px] font-medium transition-all duration-200 active:scale-[0.97] ${
                  isActive
                    ? "bg-gradient-to-r from-primary/15 to-primary/5 text-primary shadow-sm"
                    : "text-foreground hover:bg-muted/70"
                }`}
              >
                <item.icon className={`w-5 h-5 ${isActive ? "text-primary" : "text-muted-foreground"}`} />
                <span>{item.label}</span>
                {isActive && (
                  <div className="ml-auto w-1.5 h-1.5 rounded-full bg-primary" />
                )}
              </button>
            );
          })}
        </div>
        <div className="absolute bottom-0 left-0 right-0 px-6 py-4 border-t border-border/50 bg-background/90">
          <p className="text-xs text-center text-muted-foreground/70">🔒 Privatno · Bez registracije · Besplatno</p>
        </div>
      </nav>

      {/* Bottom tab bar — mobile only */}
      <div className="fixed bottom-0 left-0 right-0 z-[55] md:hidden">
        <div className="bg-background/90 backdrop-blur-xl border-t border-border/50 shadow-[0_-4px_20px_rgba(0,0,0,0.06)]">
          <div className="flex items-center justify-around px-2 py-1.5 max-w-lg mx-auto">
            {navItems.slice(0, 5).map((item) => {
              const isActive = location.pathname === item.path;
              return (
                <button
                  key={item.path}
                  onClick={() => navigate(item.path)}
                  className={`flex flex-col items-center gap-0.5 py-1.5 px-3 rounded-xl transition-all duration-200 active:scale-90 ${
                    isActive ? "text-primary" : "text-muted-foreground"
                  }`}
                >
                  <item.icon className={`w-5 h-5 ${isActive ? "text-primary" : ""}`} />
                  <span className={`text-[10px] font-medium ${isActive ? "text-primary" : ""}`}>
                    {item.label}
                  </span>
                  {isActive && (
                    <div className="w-4 h-0.5 rounded-full bg-primary mt-0.5" />
                  )}
                </button>
              );
            })}
          </div>
          {/* Safe area spacer for iOS */}
          <div className="h-[env(safe-area-inset-bottom)]" />
        </div>
      </div>
    </>
  );
};

export default MobileNav;
