import React, { useState, useEffect } from 'react';
import axios from 'axios';


const CryptoNews = () => {
    const API_KEY=import.meta.env.VITE_NEWS_API_KEY;
  const [news, setNews] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchNews = async () => {
      setLoading(true);
      try {
        const response = await axios.get(
          `https://newsapi.org/v2/everything?q=cryptocurrency&apiKey=${API_KEY}`
        );
        console.log('API Response:', response.data);
        setNews(response.data.articles);
        setLoading(false);
      } catch (err) {
        setError('Error fetching news');
        setLoading(false);
      }
    };

    fetchNews();
  }, []);

  if (loading) return <div>Loading news...</div>;
  if (error) return <div>{error}</div>;

  return (
    <div className="container mx-auto py-8">
      <h1 className="text-2xl font-bold text-center mb-8">Latest Crypto News</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {news.map((article, index) => (
          <div key={index} className="bg-gray-800 text-white p-4 rounded-lg shadow-md">
            <a href={article.url} target="_blank" rel="noopener noreferrer" className="hover:underline">
              <h2 className="text-xl font-bold">{article.title}</h2>
            </a>
            <p className="text-sm text-gray-400">{new Date(article.publishedAt).toLocaleDateString()}</p>
            {article.urlToImage && (
              <img
                src={article.urlToImage}
                alt={article.title}
                className="w-full h-40 object-cover rounded-lg mt-4"
              />
            )}
            <p className="mt-4">{article.description}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default CryptoNews;
