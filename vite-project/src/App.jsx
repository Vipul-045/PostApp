import React, { useState } from "react";
import "./App.css"; // Import the CSS file

const Posts = () => {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(false);
  const [postCount, setPostCount] = useState(1);

  const fetchSinglePost = () => {
    setLoading(true);
    fetch(`https://jsonplaceholder.typicode.com/posts/${postCount}`)
      .then((response) => response.json())
      .then((data) => {
        const newPost = {
          ...data,
          likes: 0,
          liked: false,
        };
        setPosts((prevPosts) => [...prevPosts, newPost]);
        setPostCount((prevCount) => prevCount + 1);
        setLoading(false);
      })
      .catch((error) => {
        console.error("Error fetching post:", error);
        setLoading(false);
      });
  };

  const handleLike = (id) => {
    setPosts((prevPosts) =>
      prevPosts.map((post) =>
        post.id === id
          ? { ...post, liked: !post.liked, likes: post.liked ? post.likes - 1 : post.likes + 1 }
          : post
      )
    );
  };

  const handleShare = (title) => {
    alert(`You shared: "${title}"`);
  };

  return (
    <div className="container">
      <h1 className="title">Posts</h1>
      <div className="button-container">
        <button onClick={fetchSinglePost} className="add-post-button">
          Add Post
        </button>
      </div>
      {loading && <p className="loading-text">Loading post...</p>}
      <div className="posts">
        {posts.map((post) => (
          <div key={post.id} className="post-card">
            <h2 className="post-title">{post.title}</h2>
            <p className="post-body">{post.body}</p>
            <div className="post-actions">
              <button
                onClick={() => handleLike(post.id)}
                style={{
                  backgroundColor: post.liked ? "red" : "grey",
                }}
              >
                {post.liked ? "Unlike" : "Like"} ({post.likes})
              </button>
              <button
                onClick={() => handleShare(post.title)}
                className="share-button"
              >
                Share
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Posts;
