import Navbar from "./Navbar";
import Sidebar from "./Sidebar";

export default function Layout({ children, user, setUser, admin }) {
  return (
    <div className="min-h-screen flex flex-col">

      {/* Navbar always visible */}
      <Navbar user={user} setUser={setUser} admin={admin} />

      <div className="flex flex-1">

        {/* SHOW SIDEBAR ONLY IF ADMIN IS LOGGED IN */}
        {admin && <Sidebar />}

        {/* Main content always visible */}
        <main className="flex-1 p-6">
          {children}
        </main>
      </div>
    </div>
  );
}
