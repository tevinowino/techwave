import ArticleCard from "../components/ArticleCard";
import { json } from "@remix-run/node"; // Correct import
import { useLoaderData, Link } from "@remix-run/react";
import { client } from "../../mongoClient";

export const loader = async () => {
  try {
    let db = client.db("techwave");
    let collection = db.collection("articles");

    let allArticles = await collection.find({}).toArray();
    return json(allArticles);
  } catch (error) {
    console.error("Failed to fetch articles:", error);
    throw new Response("Failed to load articles", { status: 500 });
  }
};

export default function Index() {
  let articles = useLoaderData();

  return (
    <div className="min-h-screen bg-black text-white font-sans">
      <main className="container mx-auto px-4 lg:px-8">
        {/* Hero Section */}
        <section className="my-12 text-center">
          <h1 className="text-5xl font-bold mb-4">TechWave</h1>
          <p className="text-lg max-w-2xl mx-auto">
            News and resources from the frontiers of life science software and web applications.
          </p>
        </section>

        {/* Featured Article */}
        {articles[0] && (
          <section className="my-12 flex justify-center">
            <div className="w-full md:w-3/4 lg:w-2/3 bg-gray-900 rounded-lg overflow-hidden shadow-lg">
              <div className="relative h-72 overflow-hidden">
                <img
                  src={articles[0].image}
                  alt={articles[0].title}
                  className="w-full h-full object-cover object-center"
                />
                <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-t from-black/80 to-transparent"></div>
              </div>
              <div className="p-6">
                <div className="flex items-center mb-2">
                  <span className="bg-blue-600 text-white px-3 py-1 rounded-full text-xs font-medium">
                    {articles[0].category}
                  </span>
                  <span className="text-gray-500 text-sm ml-3">
                    {articles[0].date}
                  </span>
                </div>
                <Link to={`/blog/${articles[0]._id}`}>
                  <h3 className="text-3xl font-bold mb-2">{articles[0].title}</h3>
                </Link>
                <p className="text-gray-400">{articles[0].description}</p>
              </div>
            </div>
          </section>
        )}

        {/* Article Grid */}
        <section className="my-12 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {articles.slice(1, 7).map((article, index) => (
            <ArticleCard key={index} article={article} />
          ))}
        </section>
      </main>
    </div>
  );
}
