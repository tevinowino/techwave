import { json, useLoaderData, Form, Link } from "@remix-run/react";
import { client } from "../../mongoClient";
import { ObjectId } from "mongodb";
import { Heart, HeartOff, Send } from 'lucide-react';

// Loader to fetch the article
export const loader = async ({ params }) => {
  const { id } = params;
  const db = client.db("techwave");
  const collection = db.collection("articles");
  const article = await collection.findOne({ _id: new ObjectId(id) });
  if (!article) throw new Response("Article not found", { status: 404 });
  return json(article);
};

// Action to handle likes, dislikes, and comments
export const action = async ({ request, params }) => {
  const { id } = params;
  const formData = new URLSearchParams(await request.text());
  console.log({formData});
  const db = client.db("techwave");
  const collection = db.collection("articles");

  if (formData.has("action")) {
    const action = formData.get("action");
    await collection.updateOne({ _id: new ObjectId(id) }, { $inc: { [action === "like" ? "likes" : "dislikes"]: 1 } });
  }

  if (formData.has("comment")) {
    const comment = formData.get("comment").trim();
    if (comment) {
      const newComment = { text: comment, timestamp: new Date().toLocaleString() };
      await collection.updateOne({ _id: new ObjectId(id) }, { $push: { comments: newComment } });
    }
  }

  return json({ success: true, updatedArticle: await collection.findOne({ _id: new ObjectId(id) }) });
};

// Main BlogPage component
const BlogPage = () => {
  const article = useLoaderData();

  return (
    <div className="min-h-screen bg-gray-900 text-white font-sans">
      <div className="container mx-auto py-12 px-4 lg:px-8">
        {/* Header Section */}
        <header className="mb-12">
          <div className="relative h-96 overflow-hidden">
            <img src={article.image || '/path/to/default/image.jpg'} alt={article.title} className="w-full h-full object-cover object-center" />
            <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-t from-gray-900/80 to-transparent"></div>
            <div className="absolute bottom-0 left-0 p-8">
              <div className="flex items-center mb-4">
                <span className="bg-blue-600 text-white px-3 py-1 rounded-full text-xs font-medium">{article.category}</span>
                <span className="text-gray-400 text-sm ml-3">{article.date}</span>
              </div>
              <h1 className="text-4xl font-bold">{article.title}</h1>
            </div>
          </div>
        </header>

        {/* Main Content Section */}
        <main>
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Article Content */}
            <section className="lg:col-span-2">
              <p className="text-gray-400 mb-8">{article.description}</p>
              <div className="prose prose-lg text-white">
                <p>{article.content}</p>
              </div>
            </section>

            {/* Sidebar */}
            <aside>
              {/* Likes and Dislikes */}
              <div className="bg-gray-800 rounded-lg p-6 mb-8">
                <h2 className="text-2xl font-bold mb-4">Engagement</h2>
                <div className="flex justify-center space-x-4">
                  <Form method="post" action={`/blog/${article._id}`}>
                    <button type="submit" name="action" value="like" className="flex items-center px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700" aria-label="Like">
                      <Heart className="mr-2" />
                      Like ({article.likes})
                    </button>
                    <button type="submit" name="action" value="dislike" className="flex items-center px-4 py-2 bg-red-600 text-white rounded hover:bg-red-700" aria-label="Dislike">
                      <HeartOff className="mr-2" />
                      Dislike ({article.dislikes})
                    </button>
                  </Form>
                </div>
              </div>

              {/* Comments Section */}
              <div className="bg-gray-800 rounded-lg p-6">
                <h2 className="text-2xl font-bold mb-4">Comments</h2>
                <div className="space-y-4">
                  {(article.comments || []).map((comment, index) => (
                    <div key={index} className="bg-gray-700 rounded-lg p-4">
                      <p className="text-gray-400">{comment.text}</p>
                      <span className="text-gray-500 text-sm">{comment.timestamp}</span>
                    </div>
                  ))}
                </div>
                <Form method="post" action={`/blog/${article._id}`} className="mt-6">
                  <textarea name="comment" className="bg-gray-700 rounded-lg p-4 w-full text-white focus:ring-2 focus:ring-blue-600" placeholder="Add a comment..." rows={3}></textarea>
                  <button type="submit" className="flex items-center px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 mt-2">
                    <Send className="mr-2" />
                    Submit Comment
                  </button>
                </Form>
              </div>
            </aside>
          </div>
        </main>

        {/* Footer */}
        <footer className="mt-12 flex justify-center">
          <Link to="/blogs" className="px-6 py-3 bg-gray-800 text-white rounded-lg hover:bg-gray-700">Back to Blogs</Link>
        </footer>
      </div>
    </div>
  );
};

export default BlogPage;
