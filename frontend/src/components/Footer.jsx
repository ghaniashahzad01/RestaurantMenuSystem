export default function Footer() {
  return (
    <footer className="bg-gray-50 mt-12 border-t">
      <div className="container mx-auto px-4 py-6 text-center text-sm text-gray-600">
        © {new Date().getFullYear()} Restaurant Menu Management • Built by Ghania
      </div>
    </footer>
  );
}