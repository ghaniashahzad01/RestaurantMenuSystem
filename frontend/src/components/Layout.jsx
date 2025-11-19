import Navbar from "./Navbar";
import Footer from "./Footer";

export default function Layout({ children, user, setUser }) {
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar user={user} setUser={setUser} />
      <main className="grow container mx-auto px-4 py-6">
        {children}
      </main>
      <Footer />
    </div>
  );
}
