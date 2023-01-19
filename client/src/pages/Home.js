import React, { useState, useEffect } from "react";
import { SinglePost } from "../components/SinglePost";
import axios from "axios";
import authFetch from "../axios/global";
import { useGlobalContext } from "../context/context";
import Loading from "../components/Loading";

const Home = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [isError, setIsError] = useState(false);
  const { posts, setPosts } = useGlobalContext();
  const { setInput } = useGlobalContext();
  const getAllPosts = async () => {
    try {
      const response = await authFetch("/posts");
      setPosts(response.data.posts);
      setIsLoading(false);
      setIsError(false);
    } catch (error) {
      setIsLoading(false);
      setIsError(true);
      console.error(error.message);
    }
  };
  useEffect(() => {
    getAllPosts();
    setInput("");
  }, []);
  if (isLoading) {
    return <Loading />;
  }
  if (isError) {
    return (
      <div className="container mt-5">
        <h1 className="text-center">Something wen't wrong :(</h1>
      </div>
    );
  }
  return (
    <div className="container-fluid">
      <div className="row">
        <div className="col">
          <h1 className="text-center my-3">Home</h1>
        </div>
      </div>
      {posts.map((post, index) => {
        return <SinglePost post={post} setPosts={setPosts} key={index} />;
      })}
    </div>
  );
};

export default Home;
