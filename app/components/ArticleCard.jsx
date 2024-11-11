import { Link } from "@remix-run/react";

export default function ArticleCard({ article }) {
    return (
       
            <div className="bg-gray-800 p-6 rounded-lg">
                    <h3 className="text-xl font-semibold text-white">{article.category}</h3>
                <Link key={article._id} to ={`/blog/${article._id}`}>
                 <h2 className="text-2xl font-bold mt-2">{article.title}</h2>
                </Link>
                <p className="text-gray-400 mt-2">{article.description}</p>
                <span className="text-gray-500 block mt-4">{article.date}</span>
            </div>
       
    );
}
