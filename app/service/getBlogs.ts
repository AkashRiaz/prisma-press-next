export const getBlogs = async () => {
  "use cache";
  const posts = await fetch("https://jsonplaceholder.typicode.com/posts");
  const data = await posts.json();
  return data;
};
