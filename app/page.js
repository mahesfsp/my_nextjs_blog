"use client";
import Link from "next/link";
import { useEffect, useRef, useState } from "react";

export default function Home() {
  const [posts, setPosts] = useState([]);
  const inputRef = useRef("");
  const [search, setSearch] = useState(false);

  useEffect(() => {
    fetch("api/posts")
      .then((res) => {
        if (!res.ok) {
          throw new Error("Failed to fetch posts");
        }
        return res.json();
      })
      .then((data) => setPosts(data))
      .catch((error) => {
        console.error("Error fetching posts:", error.message);
      });
  }, []);

  const searchPost = (e) => {
    if (e.type === "keydown" && e.key !== "Enter") {
      return;
    }
    setSearch(true);
    fetch("api/posts?q=" + inputRef.current.value)
      .then((res) => {
        if (!res.ok) {
          throw new Error("Failed to fetch posts");
        }
        return res.json();
      })
      .then((data) => setPosts(data))
      .finally(() => setSearch(false));
  };

  return (
    <>
      <main className="container mx-auto px-4 py-6">
        <h2 className="text-4xl font-bold mb-4">Welcome to Our Blog</h2>
        <p>Here you can read the latest articles</p>
      </main>

      <div className="flex justify-end px-4 mb-6">
        <input
          ref={inputRef}
          onKeyDown={searchPost}
          type="text"
          disabled={search}
          className="px-4 py-2 border border-gray-300 rounded-md"
          placeholder="Search..."
        />
        <button
          disabled={search}
          onClick={searchPost}
          className="px-4 py-2 bg-blue-500 text-white rounded-md ml-4"
        >
          {search ? "..." : "Search"}
        </button>
      </div>

      {posts.length === 0 ? (
        <p className="text-center text-gray-500">No posts available.</p>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 px-4">
          {posts.map((post) => (
            <Link key={post._id} href={`/post/${post._id}`}>
              <div className="border border-gray-200 p-4 rounded-md shadow-sm">
                <img
                  className="w-full h-48 object-cover mb-4"
                  src={post.image}
                  alt={post.title || "Post Image"}
                />
                <h2 className="text-xl font-semibold mb-2">{post.title}</h2>
                <p className="text-gray-600">{post.short_description}</p>
              </div>
            </Link>
          ))}
          {inputRef.current.value && posts.length === 0 && (
            <p className="text-center text-gray-500">
              No posts available for this search item: {inputRef.current.value}
            </p>
          )}
        </div>
      )}
    </>
  );
}
