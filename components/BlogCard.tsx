import React from 'react';
import Image from 'next/image';
import { format } from 'date-fns';

const BlogCard = ({ blog }: any) => {
  const formattedDate = format(new Date(blog.date), 'MMM dd, yyyy');

  return (
    <div className="w-[25rem] h-[30rem] rounded-2xl overflow-hidden border-slate-200 border-[1px] hover:bg-slate-50 hover:scale-105 hover:shadow-lg transition-all flex flex-col bg-[#F0F0F0]">
      <Image
        src={blog.thumbnail}
        alt={`Thumbnail for ${blog.title}`}  // Improved alt text for SEO
        width={580}
        height={580}
        className="object-cover"
        priority={true} // Add priority for important images
        quality={75} // Optional: improve load performance
      />
      <div className="flex flex-col p-4 flex-grow">
        <div className="flex justify-between items-center">
          <div className="bg-[#F9F5FF] rounded-full inline-block p-2">
            <div className="px-2 bg-white rounded-full text-[12px] font-semibold text-[#8e51c8]">{blog.tag}</div>
          </div>
          <div>{formattedDate}</div> {/* Formatted Date */}
        </div>
        <h1 className="text-[1.5rem] font-semibold line-clamp-2 pt-4">{blog.title}</h1> {/* Optional: Add a clamp for the title */}
        <div className="flex-grow" /> {/* Ensures content stretches and pushes the "Learn More" button down */}
        <a
          href={`/blog/${blog.slug}`}
          className="inline-block text-[1.3rem] font-semibold text-[#8e51c8] mt-2 hover:underline "
          aria-label={`Read more about ${blog.title}`}
        >
          Learn More
        </a>
      </div>
    </div>
  );
};

export default BlogCard;
