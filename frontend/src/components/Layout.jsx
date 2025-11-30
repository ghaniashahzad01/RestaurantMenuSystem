import Navbar from "./Navbar";
import Sidebar from "./Sidebar";
import Footer from "./Footer";

export default function Layout({ children, admin, setAdmin, user, setUser }) {
  return (
    <>
      <Navbar admin={admin} setAdmin={setAdmin} setUser={setUser} />

      <main className="flex min-h-screen">
        {admin && <Sidebar />}

        <div className="flex-1 flex flex-col">
          
          {/* PAGE CONTENT */}
          <div className="flex-grow p-6">
            {children}
          </div>

          {/* ✅ FOOTER FOR BOTH ADMIN & USER */}
          <Footer />

        </div>
      </main>
    </>
  );
}
