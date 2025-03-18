import { useState } from "react";
import Navbar from "../components/Navbar";

const Knowledgedatabase = () => {
    const [searchQuery, setSearchQuery] = useState("");

    // Sample articles (You can replace this with dynamic data from an API)
    const articles = [
        { id: 1, title: "Understanding Hypertension", category: "Patient Care", date: "March 5, 2025" },
        { id: 2, title: "Latest Advances in Lab Testing", category: "Lab Results", date: "March 10, 2025" },
        { id: 3, title: "New AI-driven Diagnostics", category: "Technology", date: "March 8, 2025" },
        { id: 4, title: "Managing Diabetes: A Guide for Nurses", category: "Patient Care", date: "March 12, 2025" }
    ];

    // Filter articles based on search query
    const filteredArticles = articles.filter((article) =>
        article.title.toLowerCase().includes(searchQuery.toLowerCase())
    );

    return (
        <div className="min-h-screen flex flex-col bg-gray-50">
            <Navbar />
            <div className="container mx-auto p-6 bg-navy">
                <h1 className="text-2xl font-bold text-center text-gray-800 mb-4">📚 Knowledge Base</h1>

                {/* Search Bar */}
                <input
                    type="text"
                    placeholder="Search articles..."
                    className="w-full p-2 border border-gray-300 rounded-md mb-4 text-gray-800"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                />

                {/* Article List */}
                {filteredArticles.length > 0 ? (
                    <ul className="space-y-3">
                        {filteredArticles.map((article) => (
                            <li key={article.id} className="p-4 bg-gray-100 rounded-md shadow-md">
                                <h2 className="text-lg font-semibold text-gray-800">{article.title}</h2>
                                <p className="text-sm text-gray-600">{article.category} - {article.date}</p>
                            </li>
                        ))}
                    </ul>
                ) : (
                    <p className="text-gray-800 text-center">No articles found.</p>
                )}
            </div>
        </div>
    );
};

export default Knowledgedatabase;