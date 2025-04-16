import { useEffect, useState } from "react";
import Navbar from "../components/Navbar";
import axios from "axios";

const Knowledgebase = () => {
    const [searchQuery, setSearchQuery] = useState("");
    const [articles, setArticles] = useState([]);

    // Fetch articles from your backend
    useEffect(() => {
        const fetchArticles = async () => {
            try {
                const res = await axios.get("http://localhost:5001/api/articles");

                console.log("Fetched data:", res.data); // Check if it's an array
                // If it's an array, set it — otherwise, set to empty array
                if (Array.isArray(res.data)) {
                    setArticles(res.data);
                } else {
                    console.warn("Unexpected response format:", res.data);
                    setArticles([]);
                }
            } catch (err) {
                console.error("Error fetching articles", err);
                setArticles([]);
            }
        };

        fetchArticles();
    }, []);

    //  Only filter if `articles` is an array
    const filteredArticles = Array.isArray(articles)
        ? articles.filter((article) =>
            article.title.toLowerCase().includes(searchQuery.toLowerCase())
        )
        : [];

    return (
        <div className="min-h-screen flex flex-col bg-gray-50">
            <Navbar />
            <div className="container mx-auto p-6 bg-navy">
                <h1 className="text-2xl font-bold text-center text-gray-800 mb-4">📚 Knowledge Base</h1>

                {/* Search Bar */}
                <input
                    type="text"
                    placeholder="Search articles..."
                    className="w-full p-2 border border-blue-300 rounded-md mb-4 text-gray-800"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                />

                {/* Article List */}
                {filteredArticles.length > 0 ? (
                    <ul className="space-y-3">
                        {filteredArticles.map((article) => (
                            <li
                                key={article.id}
                                className="p-4 bg-sky-100 rounded-md shadow-md hover:bg-blue-300 transition duration-200"
                            >
                                <a href={article.source} target="_blank" rel="noopener noreferrer">
                                    <h2 className="text-lg font-semibold text-gray-800 underline">{article.title}</h2>
                                </a>
                                <p className="text-sm text-gray-600">
                                    {article.category} - {article.date}
                                </p>
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

export default Knowledgebase;