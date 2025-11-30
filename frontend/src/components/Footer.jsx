export default function Footer() {
  return (
    <footer
      className="mt-20 px-6 py-8 border-t border-[#2A2622]"
      style={{ background: "#14110F" }}
    >
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center gap-4">

        {/* LEFT */}
        <div className="text-sm text-[var(--muted-text)] tracking-wide">
          © {new Date().getFullYear()}{" "}
          <span className="text-[var(--gold)] font-serif">
            Royal Dine
          </span>{" "}
          — All Rights Reserved
        </div>

        {/* MIDDLE */}
        <div className="text-xs text-gray-500">
          Premium Restaurant Ordering System
        </div>

        {/* RIGHT */}
        <div className="text-sm text-[var(--muted-text)]">
          Crafted with care by{" "}
          <span className="text-[var(--gold)] font-medium">
            Ghania
          </span>
        </div>

      </div>
    </footer>
  );
}
