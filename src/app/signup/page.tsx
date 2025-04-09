"use client";

import type React from "react";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";

const SignupPage = () => {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>("");
  const [successMessage, setSuccessMessage] = useState<string | null>("");

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setIsLoading(true);
    setError("");

    // to get form data
    const formData = new FormData(event.currentTarget);
    const name = formData.get("name") as string;
    const email = formData.get("email") as string;
    const password = formData.get("password") as string;

    //to check all fileds are filled
    if (!name || !email || !password) {
      setError("Please fill all the fields.");
      setIsLoading(false);
      return;
    }

    // clearing error message
    setError("");

    // to get existing users or initialize empty array
    const existingUsers = JSON.parse(localStorage.getItem("users") || "[]");

    // to check if email already exists
    if (existingUsers.some((user: any) => user.email === email)) {
      setError("Email already exists. Please use a different email.");
      setIsLoading(false);
      return;
    }

    // to create new user
    const newUser = {
      id: Date.now().toString(),
      name,
      email,
      password, //since the password is not hashed as we are using local storage(as per the task requirements).
    };
    // to save user to localStorage
    localStorage.setItem("users", JSON.stringify([...existingUsers, newUser]));

    setTimeout(() => {
    setSuccessMessage("Account created successfully.");

      setError("");

      setIsLoading(false);
      router.push("/login");
    }, 1000);
  };

  return (
    <div className="container flex  items-center justify-center min-h-screen py-12 bg-secondary">
      <div className="w-full max-w-md shadow-md p-5 bg-mycolor1 rounded-xl flex flex-col gap-4">
        {/* For displaying errors */}
        {error && <div className="p-2 rounded bg-red-200 ">{error}</div>}

        <div className="flex flex-col items-center">
          <h2 className="text-3xl font-bold text-center text-mycolor2">
            Sign up
          </h2>
          <p className="text-center text-mycolor2">
            Create an account to get started
          </p>
        </div>

        <div>
          <form className="gap-3 flex flex-col" onSubmit={handleSubmit}>
            <div className="space-y-2 flex flex-col">
              <label htmlFor="name">Name</label>
              <input
                id="name"
                name="name"
                className="outline-none border-2 rounded px-1 py-1.5 border-mycolor2 focus:border-mycolor2 focus:ring focus:ring-mycolor2/50"
                placeholder="Enter your name"
              />
            </div>

            <div className="space-y-2 flex flex-col">
              <label htmlFor="email">Email</label>
              <input
                className="outline-none border-2 rounded px-1 py-1 border-mycolor2 focus:border-mycolor2 focus:ring focus:ring-mycolor2/50"
                id="email"
                name="email"
                type="email"
                placeholder="Enter your email"
              />
            </div>

            <div className="space-y-2 flex flex-col">
              <label htmlFor="password">Password</label>
              <input
                className="outline-none border-2 rounded px-1 py-1 border-mycolor2 focus:border-mycolor2 focus:ring focus:ring-mycolor2/50"
                id="password"
                name="password"
                type="password"
                placeholder="Enter your password"
              />
            </div>

            <button
              type="submit"
              disabled={isLoading}
              className={`w-full font-bold text-lg text-mycolor1 cursor-pointer bg-secondary rounded py-2 mt-2 
                ${isLoading ? "opacity-50 cursor-not-allowed" : ""}`}
              
            >
              {isLoading ? "Creating account..." : "Create account"}
            </button>

            <div className="text-center text-sm">
              Already have an account?{" "}
              <Link
                href="/login"
                className="underline text-secondary font-bold"
              >
                Log in
              </Link>
            </div>
          </form>
        </div>
      </div>
      {/* to display success message */}
      {successMessage && (
      <div className="absolute right-8 bottom-8 bg-mycolor1 p-4 rounded">
       
          <h2 className="text-xl  text-green-700">{successMessage}</h2>
    
      </div>
          )}
    </div>
  );
};

export default SignupPage;
