import React from "react";
import { Link } from "react-router-dom";

const Header = () => {
  return (
    <header className="bg-yellow-400 p-4 flex justify-between items-center">
      <Link to="/" className="text-xl font-bold">Amazon Clone</Link>
      <nav className="space-x-4">
        <Link to="/" className="hover:underline">Home</Link>
        <Link to="/cart" className="hover:underline">Cart</Link>
      </nav>
    </header>
  );
};

export default Header;
