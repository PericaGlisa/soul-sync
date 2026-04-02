const FloatingElements = () => {
  return (
    <div className="fixed inset-0 pointer-events-none overflow-hidden z-0">
      {/* Organic floating shapes */}
      <div className="absolute top-[8%] left-[8%] w-3 h-3 rounded-full bg-primary/30 animate-float" />
      <div className="absolute top-[22%] right-[12%] w-2 h-2 rounded-full bg-secondary/50 animate-float-delayed" />
      <div className="absolute bottom-[30%] left-[15%] w-4 h-4 rounded-full bg-accent/60 animate-float-slow" />
      <div className="absolute top-[55%] right-[8%] w-2.5 h-2.5 rounded-full bg-primary/25 animate-float-delayed" />
      <div className="absolute bottom-[18%] right-[20%] w-3 h-3 rounded-full bg-secondary/30 animate-float" />
      <div className="absolute top-[40%] left-[5%] w-2 h-2 rounded-full bg-primary/20 animate-float-slow" />

      {/* Premium gradient orbs */}
      <div className="absolute -top-32 -right-32 w-96 h-96 rounded-full bg-gradient-to-br from-secondary/20 via-accent/16 to-primary/12 blur-3xl animate-pulse-glow" />
      <div className="absolute -bottom-32 -left-32 w-[28rem] h-[28rem] rounded-full bg-gradient-to-tr from-primary/18 via-secondary/14 to-accent/18 blur-3xl animate-pulse-glow" style={{ animationDelay: '2s' }} />
      <div className="absolute top-1/3 right-1/4 w-72 h-72 rounded-full bg-secondary/12 blur-3xl" />
    </div>
  );
};

export default FloatingElements;
