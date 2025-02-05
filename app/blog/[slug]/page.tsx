import Navbar from '@/components/Navbar'
import React, { Suspense } from 'react'
import Image from 'next/image'
import { Metadata, Viewport } from 'next'
import { blogs } from '@/content'

// Add viewport export
export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1
}

//here i need to fetch the blog data from the database and show it in the page        
// Get blog data by slug from local content
function getBlogBySlug(slug: string) {
  const blog = blogs.find(blog => blog.slug === slug);
  if (!blog) {
    throw new Error('Blog post not found');
  }
  return blog;
}

type Params = Promise<{ slug: string }>;

export async function generateMetadata({
  params
}: {
  params: Params
}): Promise<Metadata> {
  const { slug } = await params;
  const blog = getBlogBySlug(slug);

  return {
    title: blog.title,
    description: blog.description || 'Blog post'
  }
}

// Make the page component async
const Page = async ({ params }: { params: Params }) => {
  const { slug } = await params;
  const blog = getBlogBySlug(slug);

  // Format the date
  const formattedDate = new Date(blog.date).toLocaleDateString('en-US', {
    month: 'long',
    day: 'numeric',
    year: 'numeric'
  });

  return (
    <Suspense fallback={<div>Loading...</div>}>
      <div className="flex flex-col items-center justify-center py-2 h-full bg-black">
        <Navbar />
        <div className="flex flex-col items-center justify-center p-[75px] space-y-[1.6rem] text-[#8e51c8]">
          <p className="text-lg">Published: {formattedDate}</p>
          <h1 className="text-[2.75rem] tracking-[-.02rem] font-bold text-white text-center px-[300px]">
            {blog.title}
          </h1>
          <div className="flex flex-col items-center justify-center">
            <div className="bg-[#F9F5FF] rounded-full inline-block p-2">
              <div className="px-2 bg-white rounded-full text-[12px] font-semibold text-[#8e51c8]">
                {blog.tag}
              </div>
            </div>
          </div>
          <div className="flex flex-col items-center justify-center">
            <Image
              src={blog.thumbnail}
              alt={blog.title}
              width={1000}
              height={1000}
              className="rounded-2xl"
            />
          </div>

          <div className="prose lg:prose-xl">
            {blog.content}
          </div>
        </div>
      </div>
    </Suspense>
  )
}

export default Page