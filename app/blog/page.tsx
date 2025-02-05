"use client";
import React, { useEffect, useRef, useState, Suspense } from "react";
import BlogCard from "@/components/BlogCard";
import Navbar from "@/components/Navbar";
import { blogs } from "@/content";
import { tags } from "@/tag";
import Head from "next/head";
import { useRouter, useSearchParams } from "next/navigation";

type BlogContentProps = {
  postsToShow: number;
  setPostsToShow: (value: number) => void;
  selectedTag: string;
  setSelectedTag: (value: string) => void;
  blogCardsSectionRef: React.RefObject<HTMLDivElement>;
}

export default function BlogPage() {
  const router = useRouter();
  const blogCardsSectionRef = useRef<HTMLDivElement>(null);

  const initialPostsToShow = 15;
  const increment = 15;
  const [postsToShow, setPostsToShow] = useState(initialPostsToShow);
  const [selectedTag, setSelectedTag] = useState("All Posts");

  return (
    <Suspense fallback={<div>Loading...</div>}>
      <BlogContent
        postsToShow={postsToShow}
        setPostsToShow={setPostsToShow}
        selectedTag={selectedTag}
        setSelectedTag={setSelectedTag}
        blogCardsSectionRef={blogCardsSectionRef as React.RefObject<HTMLDivElement>}
      />
    </Suspense>
  );
}

function BlogContent({ postsToShow, setPostsToShow, selectedTag, setSelectedTag, blogCardsSectionRef }: BlogContentProps) {
  const router = useRouter();
  const searchParams = useSearchParams(); // Now inside <Suspense>


  useEffect(() => {
    const categoryParam = searchParams.get("category");
    setSelectedTag(categoryParam || "All Posts");
  }, [searchParams]);

  const filteredBlogs = selectedTag !== "All Posts"
    ? blogs.filter((blog) => blog.tag === selectedTag)
    : blogs;

  const allTags = ["All Posts", ...tags];
  const blogsToDisplay = filteredBlogs.slice(0, postsToShow);

  const handleTagClick = (tag: string) => {
    const formattedTag = tag.replace(/ /g, "+");
    router.push(tag === "All Posts" ? "/blog" : `/blog?category=${formattedTag}`);
  };

  return (
    <>
      <Head>
        <title>Blog - Transform Meetings with Acta.ai</title>
        <meta name="description" content="Explore insightful blog posts on AI and meeting transformation with Acta.ai." />
        <meta name="keywords" content="Acta.ai, AI, meetings, blog, tech blog" />
        <meta property="og:title" content="Blog - Transform Meetings with Acta.ai" />
        <meta property="og:description" content="Explore insightful blog posts on AI and meeting transformation with Acta.ai." />
        <meta property="og:type" content="website" />
        <meta property="og:image" content="path_to_image.jpg" />
      </Head>
      <div className="flex flex-col items-center justify-center py-2 bg-[#020203]">
        <Navbar />
        <div className="flex flex-col items-center justify-center p-[75px] space-y-[6rem]">
          <div className="flex flex-col space-y-6 justify-center items-center px-[13rem]">
            <h1 className="text-[3.75rem] tracking-[-.02rem] font-bold text-white">Blog</h1>
            <div className="text-[1.75rem] font-thin text-center text-white">
              Transform Meetings with Acta.ai - Start Free Today
            </div>
          </div>

          <div className="flex flex-col justify-center items-center gap-y-24">
            <div className="flex flex-wrap justify-center items-center gap-4 mb-6 px-10">
              {allTags.map((tag, i) => (
                <div
                  className={`px-4 py-2 rounded-lg cursor-pointer text-white ${selectedTag === tag ? "bg-[#5E589E]" : "hover:bg-[#5b4a76]"
                    }`}
                  key={i}
                  onClick={() => handleTagClick(tag)}
                >
                  {tag}
                </div>
              ))}
            </div>

            <div ref={blogCardsSectionRef} className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-x-8 gap-y-16">
              {blogsToDisplay.map((blog, index) => (
                <div
                  className="transform transition-all duration-500 ease-out opacity-0 animate-fadeInUp"
                  style={{ animation: `fadeInUp ${0.3 * (index + 1)}s forwards` }}
                  key={index}
                >
                  <BlogCard blog={blog} />
                </div>
              ))}
            </div>

            {filteredBlogs.length > postsToShow && (
              <button
                onClick={() => setPostsToShow(postsToShow + 3)}
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
