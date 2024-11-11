import { json, useLoaderData } from "@remix-run/react";
import { client } from "../../mongoClient";
import { ObjectId } from "mongodb";
import { useRef, useState } from "react";
import { Link } from "lucide-react";

export const loader = async ({ params }) => {
  try {
    const { id } = params;  // The _id will be available as a URL parameter
    const db = client.db("techwave");
    const collection = db.collection("articles");

    // Fetch article by MongoDB ObjectId
    const article = await collection.findOne({ _id: new ObjectId(id) });

    if (!article) {
      throw new Response("Article not found", { status: 404 });
    }

    return json(article);  // Return the article object
  } catch (error) {
    console.error("Failed to fetch article:", error);
    throw new Response("Failed to load article", { status: 500 });
  }
};

const BlogPage = () => {
  const article = useLoaderData();  // Get the single article object from the loader
  console.log({ article });

  const [likes, setLikes] = useState(0);
  const [dislikes, setDislikes] = useState(0);
  const [comments, setComments] = useState([]);
  const [newComment, setNewComment] = useState("");
  const commentEndRef = useRef(null);

  const handleLike = () => setLikes(likes + 1);
  const handleDislike = () => setDislikes(dislikes + 1);

  const handleCommentSubmit = (e) => {
    e.preventDefault();
    if (newComment.trim()) {
      setComments([...comments, { text: newComment, timestamp: new Date().toLocaleString() }]);
      setNewComment("");
      setTimeout(() => commentEndRef.current?.scrollIntoView({ behavior: "smooth" }), 100);
    }
  };

  if (!article) {
    return (
      <div className="min-h-screen bg-black text-white flex flex-col items-center justify-center">
        <p>Article not found</p>
        <Link to="/blogs" className="px-6 py-3 bg-gray-800 text-white rounded-lg hover:bg-gray-700 transition-colors mt-4">
          Back to Blogs
        </Link>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-black text-white font-sans">
      <main className="container mx-auto px-4 lg:px-8 py-12">
        {/* Article Header */}
        <section className="mb-12">
          <div className="relative h-72 overflow-hidden">
            <img src={article.image} alt={article.title} className="w-full h-full object-cover object-center" />
            <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-t from-black/80 to-transparent"></div>
          </div>
          <div className="mt-6">
            <div className="flex items-center mb-2">
              <span className="bg-blue-600 text-white px-3 py-1 rounded-full text-xs font-medium">{article.category}</span>
              <span className="text-gray-500 text-sm ml-3">{article.date}</span>
            </div>
            <h1 className="text-4xl font-bold mb-4">{article.title}</h1>
          </div>
        </section>

        {/* Article Content */}
        <section className="mb-12">
          <p className="text-gray-400 mb-8">{article.description}</p>
          <div className="prose prose-lg text-white">
            <p>{article.content}</p>  {/* Assuming article has a content field */}
          </div>
        </section>

        {/* Likes and Dislikes */}
        <section className="mb-12 flex justify-center space-x-4">
          <button onClick={handleLike} className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition-colors" aria-label="Like">
            Like ({likes})
          </button>
          <button onClick={handleDislike} className="px-4 py-2 bg-red-600 text-white rounded hover:bg-red-700 transition-colors" aria-label="Dislike">
            Dislike ({dislikes})
          </button>
        </section>

        {/* Comments */}
        <section className="mb-12">
          <h2 className="text-3xl font-bold mb-4">Comments</h2>
          <div className="space-y-4">
            {comments.map((comment, index) => (
              <div key={index} className="bg-gray-900 rounded-lg p-4">
                <p className="text-gray-400">{comment.text}</p>
                <span className="text-gray-500 text-sm">{comment.timestamp}</span>
              </div>
            ))}
            <div ref={commentEndRef}></div>
          </div>
          <form onSubmit={handleCommentSubmit} className="mt-4">
            <textarea value={newComment} onChange={(e) => setNewComment(e.target.value)} className="bg-gray-900 rounded-lg p-4 w-full text-white" placeholder="Add a comment..." rows={3}></textarea>
            <button type="submit" className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition-colors mt-2">
              Submit Comment
            </button>
          </form>
        </section>

        {/* Back to Blogs */}
        <section className="flex justify-center">
          <Link to="/blogs" className="px-6 py-3 bg-gray-800 text-white rounded-lg hover:bg-gray-700 transition-colors">Back to Blogs</Link>
        </section>
      </main>
    </div>
  );
};

export default BlogPage;