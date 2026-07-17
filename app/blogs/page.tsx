/* eslint-disable @typescript-eslint/no-explicit-any */
import React from "react";
import MyServerComponent from "../ui/MyServerComponent";
import { getBlogs } from "../service/getBlogs";

const BlogsPage = async () => {
  const blogs = await getBlogs();
  console.log(blogs);
  return (
    <div>
      {blogs.map((blog: any) => (
        <div key={blog.id}>
          <h2>{blog.title}</h2>
          <p>{blog.body}</p>
        </div>
      ))}
      <MyServerComponent />
    </div>
  );
};

export default BlogsPage;
