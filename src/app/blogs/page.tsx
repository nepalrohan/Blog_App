"use client";

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

interface User {
  id: string;
  name: string;
  email: string;
  isLoggedIn: boolean;
}

const BlogsPage = () => {
  const router = useRouter();
  const [blogs, setBlogs] = useState<Blog[]>([]);
  const [currentUser, setCurrentUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Check if user is logged in
    const userStr = localStorage.getItem("currentUser");
    if (!userStr || !JSON.parse(userStr).isLoggedIn) {
      router.push("/login");
      return;
    }

    setCurrentUser(JSON.parse(userStr));

    // Load blogs from localStorage
    const blogsStr = localStorage.getItem("blogs");
    if (blogsStr) {
      const loadedBlogs = JSON.parse(blogsStr);
      // Sort by date (newest first)
      loadedBlogs.sort(
        (a: Blog, b: Blog) =>
          new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
      );
      setBlogs(loadedBlogs);
    }

    setIsLoading(false);
  }, [router]);

  const handleLogout = () => {
    // Update current user to logged out
    if (currentUser) {
      const updatedUser = { ...currentUser, isLoggedIn: false };
      localStorage.setItem("currentUser", JSON.stringify(updatedUser));
    }

    // Redirect to login page
    router.push("/login");
  };

  const handleDelete = (id: string) => {
    // Filter out the blog to delete
    const updatedBlogs = blogs.filter((blog) => blog.id !== id);

    // Update localStorage
    localStorage.setItem("blogs", JSON.stringify(updatedBlogs));

    // Update state
    setBlogs(updatedBlogs);
  };

  if (isLoading) {
    return (
      <div className="container flex items-center justify-center min-h-screen">
        <p>Loading...</p>
      </div>
    );
  }

  return (
    <div className="container py-8 px-2">
      <div className="flex justify-between items-center mb-8 border-b-2 border-secondary pb-4">
        <div>
          <h1 className="text-3xl font-extrabold text-secondary">Blog-Store</h1>
          <p className="text-muted-foregroundv text-secondary">
            Welcome back, {currentUser?.name}
          </p>
        </div>
        <div className="flex gap-4">
          <button className="p-2 rounded bg-secondary text-mycolor1 cursor-pointer font-semibold">
            <Link href="/blogs/new">New Blog</Link>
          </button>
          <button
            className="p-2 rounded bg-secondary text-mycolor1 cursor-pointer font-semibold"
            onClick={handleLogout}
          >
            Logout
          </button>
        </div>
      </div>

      {blogs.length === 0 ? (
        <div className="text-center py-12">
          <h2 className="text-xl font-semibold mb-2 text-secondary">
            No blogs yet
          </h2>
          <p className="text-muted-foreground mb-4 text-secondary">
            Create your first blog post to get started
          </p>
          <button className="p-2 rounded bg-secondary text-mycolor1 cursor-pointer font-semibold">
            <Link href="/blogs/new">Create Blog</Link>
          </button>
        </div>
      ) : (
        <div className="grid  grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {blogs.map((blog) => (
            <div
              key={blog.id}
              className="overflow-hidden flex flex-col h-full shadow-md   p-3"
            >
              <div className="relative h-48 w-full overflow-hidden mb-1">
                <img
                  src={blog.image}
                  alt={blog.title}
                  className="w-full h-full object-cover"
               
                />
              </div>

              <h2 className="line-clamp-1 text-xl font-bold text-secondary">
                {blog.title}
              </h2>
              <p className="text-mycolor2">
                Published on:{new Date(blog.createdAt).toLocaleDateString()}
              </p>

              <div>
                <p className="line-clamp-3 text-sm text-secondary">
                  {blog.description}
                </p>
              </div>
              <footer className="mt-2 flex justify-between">
                <button className="p-2 rounded bg-secondary text-mycolor1 cursor-pointer font-semibold">
                  <Link href={`/blogs/edit/${blog.id}`}>Edit</Link>
                </button>
                <button
                  className="p-2 rounded bg-red-600 text-mycolor1 cursor-pointer font-semibold"
                  onClick={() => handleDelete(blog.id)}
                >
                  Delete
                </button>
              </footer>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default BlogsPage;
