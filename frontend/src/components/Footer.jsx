export default function Footer() {
  return (
    <footer
      className="mt-12 py-6 text-center"
      style={{ background: "#1A1714" }}  // matches navbar + sidebar
    >
      <div className="text-sm text-[var(--muted-text)]">
        © {new Date().getFullYear()}{" "}
        <span className="text-[var(--gold)] font-serif">
          Restaurant Menu Management
        </span>{" "}
        • Built by{" "}
        <span className="text-[var(--gold)] font-medium">Ghania</span>
      </div>
    </footer>
  );
}
