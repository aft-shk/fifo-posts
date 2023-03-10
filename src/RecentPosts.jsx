import React, { useState, useEffect } from "react";
import axios from "axios";

const RecentPosts = () => {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const response = await axios.get(
          "https://techcrunch.com/wp-json/wp/v2/posts?per_page=20&context=embed"
        );
        setPosts(response.data);
        setLoading(false);
      } catch (error) {
        setError(error.message);
        setLoading(false);
      }
    };
    fetchPosts();
  }, []);

  const handleClick = (link) => {
    window.location.href = link;
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>{error}</div>;
  }

  return (
    <div className="card-container">
      {posts.map((post) => (
        <div className="card" key={post.id} onClick={() => handleClick(post.link)}>
          <img src={post.jetpack_featured_media_url} alt={post.title.rendered} />
          <h3>{post.title.rendered}</h3>
          <p>{post.excerpt.rendered}</p>
        </div>
      ))}
    </div>
  );
};

export default RecentPosts;
