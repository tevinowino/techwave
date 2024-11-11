import { Link } from "@remix-run/react";

export default function Footer() {
  return (
    <footer className="bg-gray-900 py-6 mt-12">
      <div className="container mx-auto px-4 grid grid-cols-2 lg:grid-cols-4 gap-4 text-gray-400">
        <div>
          <h4 className="text-white font-semibold mb-2">Company</h4>
          <ul>
            <li><Link to="/about" className="hover:text-gray-300">About</Link></li>
            <li><Link to="/careers" className="hover:text-gray-300">Careers</Link></li>
          </ul>
        </div>
        {/* Repeat similar blocks for Support, Follow Us, Legal */}
        <div className="col-span-full text-center mt-6 text-sm text-gray-600">
          &copy; 2023 Newsroom. All rights reserved.
        </div>
      </div>
    </footer>
  );
}
