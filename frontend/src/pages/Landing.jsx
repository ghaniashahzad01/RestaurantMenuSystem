import { Link } from "react-router-dom";

export default function Landing() {
  return (
    <div className="bg-gradient-to-b from-white to-gray-50 min-h-[70vh] flex items-center">
      <div className="container mx-auto px-4 grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
        <div>
          <h1 className="text-4xl md:text-5xl font-extrabold mb-4">
            Manage your restaurant menu, simply.
          </h1>
          <p className="text-gray-700 mb-6">
            Create, update, and organize dishes with a clean admin dashboard.
            Highlight today's specials and view simple analytics — fast and secure.
          </p>

          <div className="flex gap-3">
            <Link to="/login" className="px-6 py-3 bg-blue-600 text-white rounded font-medium">
              Admin Login
            </Link>
            <Link to="/menu-items" className="px-6 py-3 border border-gray-300 rounded">
              View Menu
            </Link>
          </div>
        </div>

        <div className="flex justify-center">
          <div className="w-full max-w-md">
            <img src="/src/assets/restaurant-hero.jpg" alt="menu" className="rounded shadow-lg" />
           
          </div>
        </div>
      </div>
    </div>
  );
}
