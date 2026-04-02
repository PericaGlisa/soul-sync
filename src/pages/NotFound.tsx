import { useLocation } from "react-router-dom";
import { useEffect } from "react";
import { routes } from "@/lib/routes";

const NotFound = () => {
  const location = useLocation();

  useEffect(() => {
    console.error("404 Error: User attempted to access non-existent route:", location.pathname);
  }, [location.pathname]);

  return (
    <div className="flex min-h-screen items-center justify-center bg-background">
      <div className="text-center space-y-4">
        <h1 className="text-6xl font-heading font-bold text-foreground">404</h1>
        <p className="text-xl text-muted-foreground">Stranica nije pronađena</p>
        <a href={routes.pocetna} className="text-primary font-semibold underline underline-offset-4 hover:text-primary/80 transition-colors">
          Nazad na početnu
        </a>
      </div>
    </div>
  );
};

export default NotFound;
