"use client";

import type React from "react";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";

interface Blog {
  id: string;
  title: string;
  description: string;
  image: string;
  authorId: string;
  createdAt: string;
}

export default function EditBlogPage({ params }: { params: { id: string } }) {
  const router = useRouter();
  const [blog, setBlog] = useState<Blog | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isSaving, setIsSaving] = useState(false);
  const [error, setError] = useState<string | null>("");
  const [successMessage, setSuccessMessage] = useState<string | null>("");

  useEffect(() => {
    // Check if user is logged in
    const userLoginCheck = localStorage.getItem("currentUser");
    if (!userLoginCheck || !JSON.parse(userLoginCheck).isLoggedIn) {
      router.push("/login");
      return;
    }

    // Load blog from localStorage
    const blogsStr = localStorage.getItem("blogs");
    if (blogsStr) {
      const blogs = JSON.parse(blogsStr);
      const foundBlog = blogs.find((b: Blog) => b.id === params.id);

      if (foundBlog) {
        setBlog(foundBlog);
      } else {
        setSuccessMessage("Blog not found.");
        router.push("/blogs");
      }
    }

    setIsLoading(false);
  }, [params.id, router]);

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsSaving(true);

    const formData = new FormData(e.currentTarget);
    const title = formData.get("title") as string;
    const description = formData.get("description") as string;
    const imageInput = formData.get("image") as string;

    // Validate form
    if (!title || !description) {
      setError("Please fill all the fields.");
      setIsSaving(false);
      return;
    }

    if (!blog) {
      setIsSaving(false);
      return;
    }

    // Update blog
    const updatedBlog = {
      ...blog,
      title,
      description,
      image: imageInput,
    };

    // Get existing blogs
    const blogsStr = localStorage.getItem("blogs");
    if (blogsStr) {
      const blogs = JSON.parse(blogsStr);
      const updatedBlogs = blogs.map((b: Blog) =>
        b.id === params.id ? updatedBlog : b
      );

      // Save updated blogs to localStorage
      localStorage.setItem("blogs", JSON.stringify(updatedBlogs));

      setSuccessMessage("Blog updated successfully.");

      // Redirect to blogs page
      setTimeout(() => {
        setIsSaving(false);
        router.push("/blogs");
      }, 1000);
    }
  };

  if (isLoading) {
    return (
      <div className="container flex items-center justify-center min-h-screen">
        <p>Loading...</p>
      </div>
    );
  }

  if (!blog) {
    return (
      <div className="container flex items-center justify-center min-h-screen">
        <p>Blog not found</p>
      </div>
    );
  }

  return (
    <div className="container py-8 px-1">
      <button className="p-2 rounded bg-secondary text-mycolor1 cursor-pointer font-semibold mb-6">
        <Link href="/blogs">Back to Blogs</Link>
      </button>

      <div className="max-w-2xl mx-auto">
        <div className="mb-4">
          <h2 className="text-secondary text-3xl font-bold">Edit Blog</h2>
          <p className="text-secondary text-muted">
            Update your blog post details
          </p>
        </div>
        {error && (
          <div className="p-2 rounded text-red-600 bg-red-100 mb-2">
            {error}
          </div>
        )}
        <form onSubmit={handleSubmit}>
          <div className="space-y-4">
            <div className="space-y-2 flex flex-col">
              <label className="text-secondary font-semibold" htmlFor="title">
                Title
              </label>
              <input
                id="title"
                name="title"
                defaultValue={blog.title}
                placeholder="Enter blog title"
                className="outline-none border-2 rounded px-1 py-1 border-mycolor2 focus:border-mycolor2 focus:ring focus:ring-mycolor2/50"
              />
            </div>
            <div className="space-y-2 flex flex-col">
              <label
                className="text-secondary font-semibold"
                htmlFor="description"
              >
                Description
              </label>
              <textarea
                rows={8}
                id="description"
                name="description"
                defaultValue={blog.description}
                placeholder="Enter blog content"
                className="outline-none border-2 rounded px-1 py-1 border-mycolor2 focus:border-mycolor2 focus:ring focus:ring-mycolor2/50"
              />
            </div>
            <div className="space-y-2 flex flex-col">
              <label className="text-secondary font-semibold" htmlFor="image">
                Image URL
              </label>
              <input
                id="image"
                name="image"
                defaultValue={blog.image}
                className="outline-none border-2 rounded px-1 py-1 border-mycolor2 focus:border-mycolor2 focus:ring focus:ring-mycolor2/50"
                placeholder="https://example.com/image.jpg"
              />
            </div>
          </div>
          <footer className="flex justify-between mt-4 gap-5">
            <button
              type="button"
              onClick={() => router.push("/blogs")}
              className={`w-full font-bold text-lg text-mycolor1 cursor-pointer bg-red-600 rounded py-2 mt-2 
                ${isLoading ? "opacity-50 cursor-not-allowed" : ""}`}
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={isSaving}
              className={`w-full font-bold text-lg text-mycolor1 cursor-pointer bg-secondary rounded py-2 mt-2 
                ${isLoading ? "opacity-50 cursor-not-allowed" : ""}`}
            >
              {isSaving ? "Saving..." : "Save Changes"}
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
}
