import { Link } from "@remix-run/react";

const FeaturesPage = () => {
  return (
    <div className="min-h-screen bg-black text-white font-sans">
      <main className="container mx-auto px-4 lg:px-8 py-12">
        {/* Hero Section */}
        <section className="text-center mb-12">
          <h1 className="text-5xl font-bold mb-4">Features</h1>
          <p className="text-lg max-w-2xl mx-auto">
            Discover the key features that make TechWave your go-to destination for tech and design news.
          </p>
        </section>

        {/* Features Grid */}
        <section className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          <div className="bg-gray-900 rounded-lg p-6 shadow-lg">
            <div className="flex items-center mb-4">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-8 w-8 mr-2 text-blue-600"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z"
                />
              </svg>
              <h3 className="text-xl font-bold">Reliable Information</h3>
            </div>
            <p className="text-gray-400">
              Trust our team of experts to provide you with accurate, up-to-date, and unbiased information on the latest technology and design trends.
            </p>
          </div>
          <div className="bg-gray-900 rounded-lg p-6 shadow-lg">
            <div className="flex items-center mb-4">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-8 w-8 mr-2 text-blue-600"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253"
                />
              </svg>
              <h3 className="text-xl font-bold">In-depth Analysis</h3>
            </div>
            <p className="text-gray-400">
              Dive deep into the latest technology and design news with our comprehensive analysis and insights.
            </p>
          </div>
          <div className="bg-gray-900 rounded-lg p-6 shadow-lg">
            <div className="flex items-center mb-4">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-8 w-8 mr-2 text-blue-600"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z"
                />
              </svg>
              <h3 className="text-xl font-bold">Curated Content</h3>
            </div>
            <p className="text-gray-400">
              Discover the most relevant and engaging tech and design content, handpicked by our editorial team.
            </p>
          </div>
          <div className="bg-gray-900 rounded-lg p-6 shadow-lg">
            <div className="flex items-center mb-4">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-8 w-8 mr-2 text-blue-600"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M8 12h.01M12 12h.01M16 12h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                />
              </svg>
              <h3 className="text-xl font-bold">Diverse Perspectives</h3>
            </div>
            <p className="text-gray-400">
              Gain insights from a wide range of industry experts, thought leaders, and diverse voices.
            </p>
          </div>
          <div className="bg-gray-900 rounded-lg p-6 shadow-lg">
            <div className="flex items-center mb-4">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-8 w-8 mr-2 text-blue-600"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6"
                />
              </svg>
              <h3 className="text-xl font-bold">Actionable Insights</h3>
            </div>
            <p className="text-gray-400">
              Receive practical tips and strategies to help you stay ahead of the curve in the tech and design industries.
            </p>
          </div>
          <div className="bg-gray-900 rounded-lg p-6 shadow-lg">
            <div className="flex items-center mb-4">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-8 w-8 mr-2 text-blue-600"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"
                />
              </svg>
              <h3 className="text-xl font-bold">Timely Updates</h3>
            </div>
            <p className="text-gray-400">
              Stay up-to-date with the latest news, trends, and developments in the ever-evolving world of technology and design.
            </p>
          </div>
        </section>

        {/* Call-to-Action */}
        <section className="text-center mt-12">
          <p className="text-gray-400 mb-4">
            Ready to explore the world of tech and design?
          </p>
          <Link
            to="/subscribe"
            className="px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
          >
            Subscribe Now
          </Link>
        </section>
      </main>
    </div>
  );
};

export default FeaturesPage;