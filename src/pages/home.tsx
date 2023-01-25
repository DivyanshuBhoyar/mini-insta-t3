import React from "react";
import { Navbar } from "../components/Navbar";
import { PostCard } from "../components/PostCard";
import PostIdContext from "../contexts/PostCtx";
import { api } from "../utils/api";

const Home = () => {
  return (
    <>
      <Navbar />
      <main className="flex min-h-screen ">
        <Feed />
      </main>
    </>
  );
};

const Feed: React.FC = () => {
  const { data: posts } = api.post.getFeed.useQuery();
  console.log(posts);

  return (
    <div className="m-auto">
      {posts?.map((post) => (
        <PostIdContext.Provider key={post.id} value={{ postId: post.id }}>
          <PostCard post={post} />
        </PostIdContext.Provider>
      ))}
    </div>
  );
};

export default Home;
