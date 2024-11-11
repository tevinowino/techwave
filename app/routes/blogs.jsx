import {Link} from "@remix-run/react";
import { json } from "@remix-run/node";
import { useLoaderData } from "@remix-run/react";
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

const BlogsPage = () => {
 let articles = useLoaderData()
  const groupedArticles = articles.reduce((acc, article) => {
    if (!acc[article.category]) {
      acc[article.category] = [];
    }
    acc[article.category].push(article);
    return acc;
  }, {});

  return (
    <div className="min-h-screen bg-black text-white font-sans">
      <head>
        <title>TechWave Blogs - Latest Tech & Design Insights</title>
        <meta
          name="description"
          content="Explore articles on the latest technology, insights, and design trends."
        />
      </head>

      <main className="container mx-auto px-4 lg:px-8 py-12">
        {/* Hero Section */}
        <section className="text-center mb-12">
          <h1 className="text-5xl font-bold mb-4">TechWave Blogs</h1>
          <p className="text-lg max-w-2xl mx-auto">
            Discover the latest news, insights, and trends in the world of
            technology and design.
          </p>
        </section>

        {/* Articles by Category */}
        {Object.keys(groupedArticles).map((category) => (
          <section key={category} className="mb-12">
            <h2 className="text-3xl font-bold mb-4">{category}</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {groupedArticles[category].map((article, index) => (
                <Link
                  key={index}
                  to={`/blog/${article._id}`}
                  aria-label={`Read more about ${article.title}`}
                  className="block bg-gray-900 rounded-lg overflow-hidden shadow-lg hover:shadow-xl transition-shadow duration-300"
                >
                  <div className="relative h-48 overflow-hidden">
                    <img
                      src={article.image}
                      alt={article.title}
                      className="w-full h-full object-cover object-center"
                    />
                    <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-t from-black/80 to-transparent"></div>
                  </div>
                  <div className="p-6">
                    <div className="flex items-center mb-2">
                      <span className="bg-blue-600 text-white px-3 py-1 rounded-full text-xs font-medium">
                        {article.category}
                      </span>
                      <span className="text-gray-500 text-sm ml-3">
                        {article.date}
                      </span>
                    </div>
                    <h3 className="text-xl font-bold mb-2">{article.title}</h3>
                    <p className="text-gray-400 line-clamp-3">
                      {article.description}
                    </p>
                  </div>
                </Link>
              ))}
            </div>
          </section>
        ))}
      </main>
    </div>
  );
};

export default BlogsPage;
