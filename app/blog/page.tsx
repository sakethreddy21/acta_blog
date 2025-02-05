"use client";
import React, { useEffect, useRef, useState } from "react";
import BlogCard from "@/components/BlogCard";
import Navbar from "@/components/Navbar";
import { blogs } from "@/content";
import { tags } from "@/tag";
import Head from "next/head";
import { useRouter, useSearchParams } from "next/navigation";

export default function BlogPage() {
  const router = useRouter();
  const searchParams = useSearchParams(); // Get the current query parameters

  const categoryParam = searchParams.get("category"); // Get the category from the URL query
  const selectedTag = categoryParam || "All Posts"; // Default to "All Posts" if no category is provided

  const initialPostsToShow = 15;
  const increment = 15; // Number of posts to load when "See Older Posts" is clicked
  const blogCardsSectionRef = useRef<HTMLDivElement | null>(null);

  // State for controlling the number of posts to show
  const [postsToShow, setPostsToShow] = useState(initialPostsToShow);

  // Filter blogs based on the selected tag
  const filteredBlogs = selectedTag && selectedTag !== "All Posts"
    ? blogs.filter((blog) => blog.tag === selectedTag)
    : blogs;

  const allTags = ["All Posts", ...tags];
  const blogsToDisplay = filteredBlogs.slice(0, postsToShow);

  // Function to handle tag selection and URL update with '+' for spaces
  const handleTagClick = (tag: string) => {
    const formattedTag = tag.replace(/ /g, "+"); // Replace spaces with '+'
    
    if (tag === "All Posts") {
      router.push("/blog"); // Remove the query parameter
    } else {
      router.push(`/blog?category=${formattedTag}`); // Set the category query parameter with '+' instead of spaces
    }
  };

  // Function to handle loading older posts
  const handleSeeOlderPosts = () => {
    setPostsToShow(postsToShow + increment); // Increase the posts to show by the increment value
  };

  return (
    <>
      <Head>
        <title>Blog - Transform Meetings with Acta.ai</title>
        <meta
          name="description"
          content="Explore insightful blog posts on AI and meeting transformation with Acta.ai. Stay updated with the latest in AI and meetings."
        />
        <meta name="keywords" content="Acta.ai, AI, meetings, blog, tech blog" />
        <meta property="og:title" content="Blog - Transform Meetings with Acta.ai" />
        <meta
          property="og:description"
          content="Explore insightful blog posts on AI and meeting transformation with Acta.ai. Stay updated with the latest in AI and meetings."
        />
        <meta property="og:type" content="website" />
        <meta property="og:image" content="path_to_image.jpg" />
      </Head>
      <div className="flex flex-col items-center justify-center py-2 bg-[#020203]">
        <Navbar />
        <div className="flex flex-col items-center justify-center p-[75px] space-y-[6rem]">
          {/* heading section */}
          <div className="flex flex-col space-y-6 justify-center items-center px-[13rem]">
            <h1 className="text-[3.75rem] tracking-[-.02rem] font-bold text-white">Blog</h1>
            <div className="text-[1.75rem] font-thin text-center text-white">
              Transform Meetings with Acta.ai - Start Free Today
            </div>
          </div>

          {/* Blog */}
          <div className="flex flex-col justify-center items-center gap-y-24">
            {/* tags */}
            <div className="flex flex-wrap justify-center items-center gap-4 mb-6 px-10">
              {allTags.map((tag, i) => (
                <div
                  className={`px-4 py-2 rounded-lg cursor-pointer  text-white ${
                    selectedTag === tag
                      ? "bg-[#5E589E] "
                      : "hover:bg-[#5b4a76] "
                  }`}
                  key={i}
                  onClick={() => handleTagClick(tag)} // Use the handleTagClick function
                >
                  {tag}
                </div>
              ))}
            </div>

            {/* Blog cards with animation */}
            <div
              ref={blogCardsSectionRef}
              className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-x-8 gap-y-16"
            >
              {blogsToDisplay.map((blog, index) => (
                <div
                  className="transform transition-all duration-500 ease-out opacity-0 animate-fadeInUp"
                  style={{
                    animation: `fadeInUp ${0.3 * (index + 1)}s forwards`,
                  }}
                  key={index}
                >
                  <BlogCard blog={blog} />
                </div>
              ))}
            </div>

            {/* See Older Posts button */}
            {filteredBlogs.length > postsToShow && (
              <button
                onClick={handleSeeOlderPosts} // Trigger the function to load more posts
                className="flex justify-center items-center border-slate-200 border-[1px] bg-slate-50 p-3 rounded-lg font-bold hover:bg-[#5E589E] hover:border-none"
              >
                See Older Posts
              </button>
            )}
          </div>
        </div>
      </div>
    </>
  );
}
