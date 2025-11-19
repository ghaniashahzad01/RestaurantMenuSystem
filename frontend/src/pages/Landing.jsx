import { Link } from "react-router-dom";

export default function Landing() {
  return (
    <div className="min-h-[85vh] flex items-center justify-center px-4">
      <div className="grid md:grid-cols-2 gap-10 items-center max-w-6xl">
        
        <div>
          <h1 className="text-5xl font-serif mb-4 text-[var(--gold)]">Welcome to Royal Dine</h1>
          <p className="text-[var(--muted-text)] mb-6 text-lg">
            A premium restaurant experience — managed with a modern digital dashboard.
            Explore menu items, specials, and track analytics effortlessly.
          </p>

          <div className="flex gap-4">
            <Link to="/menu-items" className="btn-primary">View Menu</Link>
            <Link to="/login" className="btn-dark border border-[var(--gold)]">Admin Login</Link>
          </div>
        </div>

        <div>
          <img 
            src="/src/assets/restaurant-hero.jpg" 
            className="rounded-xl shadow-lg opacity-90"
          />
        </div>
      </div>
    </div>
  );
}
