"use client";

import type React from "react";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";

const NewBlogPage = () => {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);
  const [currentUser, setCurrentUser] = useState<any>(null);
  const [error, setError] = useState<string | null>("");
  const [successMessage, setSuccessMessage] = useState<string | null>("");

  useEffect(() => {
    // to check if user is logged in
    const userLgn = localStorage.getItem("currentUser");
    if (!userLgn || !JSON.parse(userLgn).isLoggedIn) {
      router.push("/login");
      return;
    }

    setCurrentUser(JSON.parse(userLgn));
  }, [router]);

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsLoading(true);

    const formData = new FormData(e.currentTarget);
    const title = formData.get("title") as string;
    const description = formData.get("description") as string;
    const imageInput = formData.get("image") as string;

    // Validate form
    if (!title || !description) {
      setError("Please fill all the fields.");
      setIsLoading(false);
      return;
    }

    // Create new blog
    const newBlog = {
      id: Date.now().toString(),
      title,
      description,
      image: imageInput,
      authorId: currentUser?.id,
      createdAt: new Date().toISOString(),
    };

    // Get existing blogs or initialize empty array
    const existingBlogs = JSON.parse(localStorage.getItem("blogs") || "[]");

    // Save blog to localStorage
    localStorage.setItem("blogs", JSON.stringify([newBlog, ...existingBlogs]));

    setSuccessMessage("Blog created successfully.");

    // Redirect to blogs page
    setTimeout(() => {
      setIsLoading(false);
      router.push("/blogs");
    }, 1000);
  };

  return (
    <div className="container py-8 px-1">
      <button className="p-2 rounded bg-secondary text-mycolor1 cursor-pointer font-semibold mb-6">
        <Link href="/blogs"> Back to Blogs</Link>
      </button>

      <div className="max-w-2xl mx-auto">
        <div className="mb-4">
          <h2 className="text-secondary text-3xl font-bold">Create New Blog</h2>
          <p className="text-secondary text-muted"> Fill in the details to create a new blog post</p>
        </div>
        {error && <div className="p-2 rounded text-red-600 bg-red-100 mb-2">{error}</div>}
        <form onSubmit={handleSubmit}>
          <div className="space-y-4">
            <div className="space-y-2 flex flex-col ">
              <label htmlFor="title" className="text-secondary font-semibold">Title</label>
              <input
                id="title"
                name="title"
                placeholder="Enter blog title"
                    className="outline-none border-2 rounded px-1 py-1 border-mycolor2 focus:border-mycolor2 focus:ring focus:ring-mycolor2/50"
              />
            </div>
            <div className="space-y-2  flex flex-col ">
              <label htmlFor="description" className="text-secondary font-semibold">Description</label>
              <textarea
                id="description"
                name="description"
                placeholder="Enter blog content"
              className="outline-none border-2 rounded px-1 py-1 border-mycolor2 focus:border-mycolor2 focus:ring focus:ring-mycolor2/50"
              rows={8}
                
              />
            </div>
            <div className="space-y-2 flex flex-col">
              <label htmlFor="image" className="text-secondary font-semibold">Image URL (optional)</label>
              <input
                id="image"
                name="image"
                placeholder="https://example.com/image.jpg"
                 className="outline-none border-2 rounded px-1 py-1 border-mycolor2 focus:border-mycolor2 focus:ring focus:ring-mycolor2/50"
              />
          
            </div>
          </div>
          <footer className="mt-2 ">
            <button type="submit"  className={`w-full font-bold text-lg text-mycolor1 cursor-pointer bg-secondary rounded py-2 mt-2 
                ${isLoading ? "opacity-50 cursor-not-allowed" : ""}`} disabled={isLoading}>
              {isLoading ? "Creating..." : "Create Blog"}
            </button>
          </footer>
        </form>
      </div>
      {successMessage && (
          <div className="absolute right-8 bottom-8 bg-mycolor1 p-4 rounded">
     
          <h2 className="text-xl  text-green-700">{successMessage}</h2>
     
      </div>
         )}
    </div>
  );
};

export default NewBlogPage;
