import { json, redirect } from "@remix-run/node";
import { useLoaderData, Form, useNavigation } from "@remix-run/react";
import { client } from "../../mongoClient";
import { useState } from "react";
import { Trash, Edit, Save, X } from "lucide-react"; // Import lucide-react icons
import { ObjectId } from "mongodb";

export const loader = async () => {
    try {
        const db = client.db("techwave");
        const collection = db.collection("articles");
        const allArticles = await collection.find({}).toArray();
        return json(allArticles);
    } catch (error) {
        console.error("Failed to fetch articles:", error);
        throw new Response("Failed to load articles", { status: 500 });
    }
};

export const action = async ({ request }) => {
    const formData = await request.formData();
    const action = formData.get("_action");
    const db = client.db("techwave");
    const collection = db.collection("articles");

    if (action === "delete") {
        const id = formData.get("id");
        await collection.deleteOne({ _id: new ObjectId(id) });
    } else if (action === "create") {
        const article = {
            title: formData.get("title"),
            description: formData.get("description"),
            content: formData.get("content"),
            category: formData.get("category"),
            image: formData.get("image"),
            date: new Date().toISOString().split("T")[0],
        };
        await collection.insertOne(article);
    } else if (action === "edit") {
        const id = formData.get("id");
        const updatedArticle = {
            title: formData.get("title"),
            description: formData.get("description"),
            content: formData.get("content"),
            category: formData.get("category"),
            image: formData.get("image"),
        };
        await collection.updateOne({ _id: new ObjectId(id) }, { $set: updatedArticle });
    }

    return redirect("/admin");
};

export default function Admin() {
    const articles = useLoaderData();
    const navigation = useNavigation();
    const [showNewArticleForm, setShowNewArticleForm] = useState(false);
    const [editingArticleId, setEditingArticleId] = useState(null);
    const [articleData, setArticleData] = useState({});
    const isSubmitting = navigation.state === "submitting";

    const handleEditClick = (article) => {
        setEditingArticleId(article._id);
        setArticleData(article);
    };

    const handleCancelEdit = () => {
        setEditingArticleId(null);
        setArticleData({});
    };

    return (
        <div className="min-h-screen bg-black text-white font-sans">
            <main className="container mx-auto px-4 lg:px-8 py-8">
                <div className="flex justify-between items-center mb-8">
                    <h1 className="text-4xl font-bold">TechWave Admin</h1>
                    <button
                        onClick={() => setShowNewArticleForm(!showNewArticleForm)}
                        className="bg-blue-600 hover:bg-blue-700 px-4 py-2 rounded-lg transition-colors"
                    >
                        {showNewArticleForm ? "Cancel" : "New Article"}
                    </button>
                </div>

                {showNewArticleForm && (
                    <div className="bg-gray-900 rounded-lg p-6 mb-8">
                        <h2 className="text-2xl font-bold mb-4">Create New Article</h2>
                        <Form method="post" className="space-y-4">
                            <input type="hidden" name="_action" value="create" />
                            <div>
                                <label className="block text-sm font-medium mb-2">Title</label>
                                <input
                                    type="text"
                                    name="title"
                                    required
                                    className="w-full bg-gray-800 rounded-lg px-4 py-2 focus:ring-2 focus:ring-blue-600"
                                />
                            </div>
                            <div>
                                <label className="block text-sm font-medium mb-2">Description</label>
                                <textarea
                                    name="description"
                                    required
                                    rows="2"
                                    className="w-full bg-gray-800 rounded-lg px-4 py-2 focus:ring-2 focus:ring-blue-600"
                                />
                            </div>
                            <div>
                                <label className="block text-sm font-medium mb-2">Content</label>
                                <textarea
                                    name="content"
                                    required
                                    rows="4"
                                    className="w-full bg-gray-800 rounded-lg px-4 py-2 focus:ring-2 focus:ring-blue-600"
                                />
                            </div>
                            <div className="grid grid-cols-2 gap-4">
                                <div>
                                    <label className="block text-sm font-medium mb-2">Category</label>
                                    <input
                                        type="text"
                                        name="category"
                                        required
                                        className="w-full bg-gray-800 rounded-lg px-4 py-2 focus:ring-2 focus:ring-blue-600"
                                    />
                                </div>
                                <div>
                                    <label className="block text-sm font-medium mb-2">Image URL</label>
                                    <input
                                        type="url"
                                        name="image"
                                        required
                                        className="w-full bg-gray-800 rounded-lg px-4 py-2 focus:ring-2 focus:ring-blue-600"
                                    />
                                </div>
                            </div>
                            <button
                                type="submit"
                                disabled={isSubmitting}
                                className="w-full bg-blue-600 hover:bg-blue-700 px-4 py-2 rounded-lg transition-colors disabled:opacity-50"
                            >
                                {isSubmitting ? "Creating..." : "Create Article"}
                            </button>
                        </Form>              </div>
                )}

                <div className="bg-gray-900 rounded-lg overflow-hidden">
                    <table className="w-full">
                        <thead>
                            <tr className="bg-gray-800">
                                <th className="px-6 py-3 text-left text-sm font-medium">Title</th>
                                <th className="px-6 py-3 text-left text-sm font-medium">Category</th>
                                <th className="px-6 py-3 text-left text-sm font-medium">Date</th>
                                <th className="px-6 py-3 text-right text-sm font-medium">Actions</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-gray-800">
                            {articles.map((article) => (
                                <tr key={article._id} className="hover:bg-gray-800/50">
                                    {editingArticleId === article._id ? (
                                        <>
                                            <td className="px-6 py-4 text-sm">
                                                <Form method="post">
                                                    <input type="hidden" name="_action" value="edit" />
                                                    <input type="hidden" name="id" value={article._id} />
                                                    <input
                                                        type="text"
                                                        name="title"
                                                        defaultValue={article.title}
                                                        required
                                                        className="w-full bg-gray-800 rounded-lg px-4 py-2"
                                                    />
                                                </Form>
                                            </td>
                                            <td className="px-6 py-4 text-sm">
                                                <input
                                                    type="text"
                                                    name="category"
                                                    defaultValue={article.category}
                                                    required
                                                    className="w-full bg-gray-800 rounded-lg px-4 py-2"
                                                />
                                            </td>
                                            <td className="px-6 py-4 text-sm text-gray-400">{article.date}</td>
                                            <td className="px-6 py-4 text-sm text-right">
                                                <button
                                                    type="submit"
                                                    className="text-blue-400 hover:text-blue-300 mr-2"
                                                >
                                                    <Save />
                                                </button>
                                                <button
                                                    onClick={handleCancelEdit}
                                                    className="text-gray-400 hover:text-gray-300"
                                                >
                                                    <X />
                                                </button>
                                            </td>
                                        </>
                                    ) : (
                                        <>
                                            <td className="px-6 py-4 text-sm">{article.title}</td>
                                            <td className="px-6 py-4 text-sm">
                                                <span className="bg-blue-600/20 text-blue-400 px-2 py-1 rounded-full text-xs">
                                                    {article.category}
                                                </span>
                                            </td>
                                            <td className="px-6 py-4 text-sm text-gray-400">{article.date}</td>
                                            <td className="px-6 py-4 text-sm text-right">
                                                <button
                                                    onClick={() => handleEditClick(article)}
                                                    className="text-yellow-400 hover:text-yellow-300 mr-2"
                                                >
                                                    <Edit />
                                                </button>
                                                <Form method="post" className="inline">
                                                    <input type="hidden" name="_action" value="delete" />
                                                    <input type="hidden" name="id" value={article._id} />
                                                    <button
                                                        type="submit"
                                                        className="text-red-400 hover:text-red-300"
                                                    >
                                                        <Trash />
                                                    </button>
                                                </Form>
                                            </td>
                                        </>
                                    )}
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </main>
        </div>
    );
}