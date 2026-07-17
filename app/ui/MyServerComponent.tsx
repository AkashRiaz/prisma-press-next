import React from "react";

const MyServerComponent = async () => {
  const response = await fetch("https://jsonplaceholder.typicode.com/posts");
  const data = await response.json();
  console.log(data);
  return <div>My Server Component</div>;
};

export default MyServerComponent;
