function Navbar() {

  const scrollToSection = (id) => {
    const element = document.getElementById(id);

    if (element) {
      element.scrollIntoView({
        behavior: "smooth",
      });
    }
  };


  return (
    <nav className="sticky top-0 z-50 border-b border-slate-200 bg-white/90 backdrop-blur">

      <div className="mx-auto flex max-w-6xl items-center justify-between px-6 py-4">

        {/* Logo */}

        <button
          type="button"
          onClick={() => scrollToSection("top")}
          className="text-xl font-bold tracking-tight text-slate-900"
        >
          TalentOps
        </button>


        {/* Navigation */}

        <div className="flex items-center gap-2">

          <button
            type="button"
            onClick={() => scrollToSection("analyze")}
            className="rounded-xl px-4 py-2 text-sm font-medium text-slate-600 transition hover:bg-slate-100 hover:text-slate-900"
          >
            Analyze
          </button>

          <button
            type="button"
            onClick={() => scrollToSection("history")}
            className="rounded-xl px-4 py-2 text-sm font-medium text-slate-600 transition hover:bg-slate-100 hover:text-slate-900"
          >
            History
          </button>

        </div>

      </div>

    </nav>
  );
}

export default Navbar;