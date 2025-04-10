"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";

export default function Home() {
  const router = useRouter();

  useEffect(() => {
    // to check if user is logged in
    const currentUser = localStorage.getItem("currentUser");
    if (currentUser && JSON.parse(currentUser).isLoggedIn) {
      router.push("/blogs");
    } else {
      router.push("/login");
    }

    // Initialize dummy blogs if none exist
    const blogs = localStorage.getItem("blogs");
    if (!blogs) {
      const dummyBlogs = [
        {
          id: "1",
          title: "Getting Started with Next.js",
          description:
            "Next.js is a React framework that gives you building blocks to create web applications...Creating websites that work well on all devices is essential in today's world...Creating websites that work well on all devices is essential in today's world...Creating websites that work well on all devices is essential in today's world...",
          image:
            "https://miro.medium.com/v2/resize:fit:720/1*_bJ2z2NRfTncHAv5UjUxwA.jpeg",

          createdAt: new Date().toISOString(),
        },
        {
          id: "2",
          title: "Mastering Tailwind CSS",
          description:
            "Tailwind CSS is a utility-first CSS framework packed with classes like flex, pt-4, text-center...Creating websites that work well on all devices is essential in today's world...Creating websites that work well on all devices is essential in today's world...Creating websites that work well on all devices is essential in today's world...Creating websites that work well on all devices is essential in today's world...",
          image: "https://miro.medium.com/v2/resize:fit:1400/1*tHpUU_Z2pTMt5G1KfY0ulg.jpeg",

          createdAt: new Date(Date.now() - 86400000).toISOString(),
        },
        {
          id: "3",
          title: "Client-Side Storage Options",
          description:
            "Learn about different client-side storage options like localStorage, sessionStorage, and IndexedDB...Creating websites that work well on all devices is essential in today's world...Creating websites that work well on all devices is essential in today's world...Creating websites that work well on all devices is essential in today's world...",
          image: "https://miro.medium.com/v2/resize:fit:1062/1*We4iFW6sdki5S8uhjn_ssQ.png",

          createdAt: new Date(Date.now() - 172800000).toISOString(),
        },
        {
          id: "4",
          title: "Building Authentication Systems",
          description:
            "Authentication is a critical part of most web applications. In this post, we explore...Creating websites that work well on all devices is essential in today's world...Creating websites that work well on all devices is essential in today's world...Creating websites that work well on all devices is essential in today's world...Creating websites that work well on all devices is essential in today's world...Creating websites that work well on all devices is essential in today's world...",
          image: "https://bs-uploads.toptal.io/blackfish-uploads/components/blog_post_page/6050490/cover_image/regular_1708x683/Untitled-c70a60f53e8c3003101e1dc3906274be.png",

          createdAt: new Date(Date.now() - 259200000).toISOString(),
        },
        {
          id: "5",
          title: "Responsive Design Principles",
          description:
            "Creating websites that work well on all devices is essential in today's world...Creating websites that work well on all devices is essential in today's world...Creating websites that work well on all devices is essential in today's world...Creating websites that work well on all devices is essential in today's world...Creating websites that work well on all devices is essential in today's world...Creating websites that work well on all devices is essential in today's world...Creating websites that work well on all devices is essential in today's world...Creating websites that work well on all devices is essential in today's world...Creating websites that work well on all devices is essential in today's world...",
          image: "https://www.webfx.com/wp-content/uploads/2021/10/iStock-612224522.jpg",

          createdAt: new Date(Date.now() - 345600000).toISOString(),
        },
      ];
      localStorage.setItem("blogs", JSON.stringify(dummyBlogs));
    }
  }, [router]);

  return null;
}
