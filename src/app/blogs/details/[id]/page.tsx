"use client";
import type React from "react";
import Link from "next/link";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

interface Blog {
  id: string;
  title: string;
  description: string;
  image: string;
  authorId: string;
  createdAt: string;
}

type Props = {
    params: { id: string };
  };

const BlogDetailPage = ({ params }: Props) => {
  const router = useRouter();

  const [blog, setBlog] = useState<Blog | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Check if user is logged in
    const userStr = localStorage.getItem("currentUser");
    if (!userStr || !JSON.parse(userStr).isLoggedIn) {
      router.push("/login");
      return;
    }

    setIsLoading(true);
    const blogsStr = localStorage.getItem("blogs");
    if (blogsStr) {
      const blogs = JSON.parse(blogsStr);
      const foundBlog = blogs.find((b: Blog) => b.id === params.id);

      if (foundBlog) {
        setBlog(foundBlog);
      } else {
        router.push("/blogs");
      }
    }

    setIsLoading(false);
  }, [params.id, router]);

  if (isLoading) {
    return (
      <div className="container flex items-center justify-center min-h-screen">
        <p>Loading...</p>
      </div>
    );
  }
  return (
    <div className="container py-8 px-1">
      <button className="p-2 rounded bg-secondary text-mycolor1 cursor-pointer font-semibold mb-6">
        <Link href="/blogs"> Back to Blogs</Link>
      </button>
      <div className="max-w-2xl mx-auto flex flex-col gap-4">
        <h2 className="text-secondary text-3xl md:text-4xl font-bold text-center pb-4 border-b-2 border-secondary">
          {blog?.title}
        </h2>
        <img
          src={blog?.image}
          alt={blog?.title}
          className="w-full h-full object-cover"
        />

        <p className="text-justify">{blog?.description}</p>
      </div>
    </div>
  );
};

export default BlogDetailPage;
