import Navbar from "./Navbar";
import Sidebar from "./Sidebar";

export default function Layout({ children, user, setUser }) {
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar user={user} setUser={setUser} />

      <div className="flex flex-1">
        <Sidebar />
        <main className="flex-1 p-6">
          {children}
        </main>
      </div>
    </div>
  );
}
