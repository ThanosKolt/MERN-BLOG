import React, { useEffect, useState } from "react";
import { useGlobalContext } from "../context/context";
import { SinglePost } from "../components/SinglePost";
import { useParams } from "react-router-dom";
import axios from "axios";
import Loading from "../components/Loading";
import authFetch from "../axios/global";

const Profile = () => {
  const [isError, setIsError] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const { posts, setPosts, currentUser, setInput, fetchCurrentUser } =
    useGlobalContext();
  const [profile, setProfile] = useState({});
  const [isFollowing, setIsFollowing] = useState(false);
  const { userId } = useParams();
  const getUserPosts = async () => {
    try {
      const { data } = await authFetch(`/posts/profile/${userId}`);
      setPosts(data.posts);
      setProfile(data.user[0]);
      setIsError(false);
    } catch (error) {
      setIsError(true);
      console.error(error.message);
    }
    setIsLoading(false);
  };
  const handleFollow = async (e, friendId, type) => {
    try {
      e.preventDefault();
      const token = localStorage.getItem("token");
      const response = await axios.post(
        `http://localhost:5000/friends/${type === "follow" ? "add" : "remove"}`,
        {
          friendId,
        },
        { headers: { Authorization: `Bearer ${token}` } }
      );
      setIsFollowing(!isFollowing);
      // to update the friends array in global state
      fetchCurrentUser();
    } catch (error) {
      console.error(error.message);
    }
  };
  useEffect(() => {
    setIsFollowing(currentUser.friends.includes(profile._id));
  }, [userId, profile]);
  useEffect(() => {
    setInput("");
    getUserPosts();
  }, [userId]);
  if (isLoading) {
    return <Loading />;
  }
  if (isError) {
    return (
      <div className="container mt-5">
        <h1 className="text-center">
          Sorry, we couldn't find the profile you are looking for
        </h1>
      </div>
    );
  }
  return (
    <div className="container-fluid">
      <div className="row justify-content-center">
        <div className="col-auto my-3">
          <div className="row align-items-center">
            <div className="col">
              <h1 className="text-capitalize m-0">{profile.username}</h1>
            </div>
            <div className="col">
              {currentUser._id === profile._id ? null : !isFollowing ? (
                <button
                  className="btn btn-sm btn-primary"
                  onClick={(e) => handleFollow(e, profile._id, "follow")}
                >
                  Follow
                </button>
              ) : (
                <button
                  className="btn btn-success btn-sm"
                  onClick={(e) => handleFollow(e, profile._id, "unfollow")}
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="16"
                    height="16"
                    fill="currentColor"
                    className="bi bi-check-lg"
                    viewBox="0 0 16 16"
                  >
                    <path d="M12.736 3.97a.733.733 0 0 1 1.047 0c.286.289.29.756.01 1.05L7.88 12.01a.733.733 0 0 1-1.065.02L3.217 8.384a.757.757 0 0 1 0-1.06.733.733 0 0 1 1.047 0l3.052 3.093 5.4-6.425a.247.247 0 0 1 .02-.022Z" />
                  </svg>
                </button>
              )}
            </div>
          </div>
        </div>
      </div>
      {posts.map((post, index) => {
        return (
          <SinglePost
            post={post}
            setPosts={setPosts}
            username={profile.username}
            key={index}
          />
        );
      })}
    </div>
  );
};

export default Profile;
