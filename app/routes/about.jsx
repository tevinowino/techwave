import { Link } from "@remix-run/react";
//import { GitHub, LinkedIn } from 'lucide-react';

const AboutPage = () => {
  return (
    <div className="min-h-screen bg-black text-white font-sans">
      <main className="container mx-auto px-4 lg:px-8 py-12">
        {/* Hero Section */}
        <section className="text-center mb-12">
          <h1 className="text-5xl font-bold mb-4">About TechWave</h1>
          <p className="text-lg max-w-2xl mx-auto">
            Discover the latest news, insights, and trends in the world of
            technology and design.
          </p>
        </section>

        {/* Mission and Values */}
        <section className="mb-12">
          <h2 className="text-3xl font-bold mb-4">Our Mission</h2>
          <p className="text-gray-400 mb-8">
            At TechWave, our mission is to be the premier destination for
            technology and design enthusiasts. We are dedicated to providing
            our readers with the latest news, in-depth analysis, and
            innovative ideas that shape the future of the industry.
          </p>
          <h2 className="text-3xl font-bold mb-4">Our Values</h2>
          <ul className="text-gray-400 space-y-4">
            <li>
              <h3 className="text-xl font-semibold mb-2">Passion</h3>
              <p>
                We are driven by a deep passion for technology and design,
                and we strive to share that enthusiasm with our readers.
              </p>
            </li>
            <li>
              <h3 className="text-xl font-semibold mb-2">Integrity</h3>
              <p>
                We believe in providing accurate, unbiased, and trustworthy
                information to our community.
              </p>
            </li>
            <li>
              <h3 className="text-xl font-semibold mb-2">Innovation</h3>
              <p>
                We are committed to exploring new and innovative ideas that
                push the boundaries of what is possible in the world of
                technology and design.
              </p>
            </li>
          </ul>
        </section>

        {/* Meet the Team */}
        <section className="mb-12">
          <h2 className="text-3xl font-bold mb-4">Meet the Team</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            <div className="bg-gray-900 rounded-lg p-6 shadow-lg">
              <img
                src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSvbAlu2Sjwe7z3uPBg-Ln3uZjxzXBTVQKaVw&s"
                alt="John Doe"
                className="w-24 h-24 rounded-full mx-auto mb-4"
              />
              <h3 className="text-xl font-bold mb-2">John Doe</h3>
              <p className="text-gray-400 mb-4">Founder & CEO</p>
              <div className="flex justify-center space-x-4">
                <Link to="https://github.com/johndoe">
                  {/* <GitHub size={24} /> */}
                </Link>
                <Link to="https://twitter.com/johndoe">
                </Link>
                <Link to="https://linkedin.com/in/johndoe">
                  {/* <LinkedIn size={24} /> */}
                </Link>
              </div>
            </div>
            {/* Repeat for other team members */}
          </div>
        </section>

        {/* Contact Us */}
        <section className="mb-12">
          <h2 className="text-3xl font-bold mb-4">Contact Us</h2>
          <p className="text-gray-400 mb-8">
            We would love to hear from you! Feel free to reach out with any
            questions, feedback, or collaboration opportunities.
          </p>
          <div className="flex justify-center">
            <Link
              to="/contact"
              className="px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
            >
              Contact Us
            </Link>
          </div>
        </section>
      </main>
    </div>
  );
};

export default AboutPage;
