import { BrowserRouter, Routes, Route } from "react-router-dom";

// Pages
import Login from "./pages/Login";
import Dashboard from "./pages/Dashboard";
import Categories from "./pages/Categories";
import MenuItems from "./pages/MenuItems";
import AddCategory from "./pages/AddCategory";
import AddMenuItem from "./pages/AddMenuItem";
import EditMenuItem from "./pages/EditMenuItem";
import Specials from "./pages/Specials";
import Analytics from "./pages/Analytics";

export default function App() {
  return (
    <BrowserRouter>
      <Routes>

        <Route path="/" element={<Login />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/categories" element={<Categories />} />
        <Route path="/menu-items" element={<MenuItems />} />
        <Route path="/add-category" element={<AddCategory />} />
        <Route path="/add-menu-item" element={<AddMenuItem />} />
        <Route path="/edit-menu-item/:id" element={<EditMenuItem />} />
        <Route path="/specials" element={<Specials />} />
        <Route path="/analytics" element={<Analytics />} />

      </Routes>
    </BrowserRouter>
  );
}
