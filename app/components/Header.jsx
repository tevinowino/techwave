import { useState } from 'react';
import { Link } from "@remix-run/react";
import { Menu, X } from "lucide-react";

export default function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <header className="bg-gray-900 py-4 shadow-md">
      <nav className="container mx-auto px-4 flex justify-between items-center">
        <Link to="/" className="text-2xl font-bold text-white">
          TechWave
        </Link>
        <div className="hidden md:flex space-x-6">
          <Link to="/features" className="hover:text-gray-400 text-white">Features</Link>
          <Link to="/blogs" className="hover:text-gray-400 text-white">Blogs</Link>
          <Link to="/pricing" className="hover:text-gray-400 text-white">Pricing</Link>
          <Link to="/about" className="hover:text-gray-400 text-white">About</Link>
        </div>
        <div className="flex items-center space-x-4">
          <Link to="/contact" className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition-colors">
            Contact us
          </Link>
          <button
            className="md:hidden p-2 rounded-md hover:bg-gray-800 transition-colors"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
          >
            {isMenuOpen ? <X size={24} color="white" /> : <Menu size={24} color="white" />}
          </button>
        </div>
      </nav>
      {isMenuOpen && (
        <div className="md:hidden bg-gray-900 py-4 px-4 space-y-4">
          <Link to="/features" className="block text-white hover:text-gray-400">Features</Link>
          <Link to="/blogs" className="block text-white hover:text-gray-400">Blogs</Link>
          <Link to="/pricing" className="block text-white hover:text-gray-400">Pricing</Link>
          <Link to="/about" className="block text-white hover:text-gray-400">About</Link>
        </div>
      )}
    </header>
  );
}