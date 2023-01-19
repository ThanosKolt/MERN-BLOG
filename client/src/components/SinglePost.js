import axios from "axios";
import React, { useEffect, useState } from "react";
import authFetch from "../axios/global";
import { useGlobalContext } from "../context/context";
import CommentSection from "./CommentSection";
import { Link } from "react-router-dom";

export const SinglePost = ({ post }) => {
  const { likes } = post;
  const { username } = post.createdBy;
  const { currentUser, setPosts, posts } = useGlobalContext();
  const [isLiked, setIsLiked] = useState(false);
  const [likesCount, setLikesCount] = useState("");
  const [year, month, day] = String(post.createdAt).split("T")[0].split("-");
  const onLike = async (type) => {
    try {
      const response = await authFetch.post(
        `/posts/${type === "like" ? "like" : "dislike"}`,
        { postId: post._id }
      );
      setIsLiked(!isLiked);
      if (type === "like") setLikesCount(likesCount + 1);
      if (type === "dislike") setLikesCount(likesCount - 1);
    } catch (error) {
      console.error(error.response);
    }
  };
  const onDelete = async (post) => {
    try {
      const response = await authFetch.delete(`/posts/${post._id}`);
      setPosts(posts.filter((item) => item._id !== post._id));
    } catch (error) {
      console.error(error.response);
    }
  };
  useEffect(() => {
    setIsLiked(likes.includes(currentUser._id));
    setLikesCount(likes.length);
  }, [post]);
  return (
    <div className="container p-3">
      <div className="row justify-content-center">
        <div className="bg-white col-10 col-md-8 col-lg-7 col-xl-6 col-xxl-5 border border-secondary-subtle rounded">
          <div className="d-flex justify-content-between align-items-center border-bottom py-2">
            <Link
              to={`/${post.createdBy._id}`}
              className="fst-italic text-primary-emphasis m-0 text-decoration-none"
            >
              @{username}
            </Link>
            {post.createdBy._id === currentUser._id ? (
              <div className="dropdown">
                <button
                  className="btn border-0"
                  type="button"
                  id="dropdownMenuButton"
                  data-bs-toggle="dropdown"
                  aria-expanded="false"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="16"
                    height="16"
                    fill="currentColor"
                    className="bi bi-three-dots-vertical"
                    viewBox="0 0 16 16"
                  >
                    <path d="M9.5 13a1.5 1.5 0 1 1-3 0 1.5 1.5 0 0 1 3 0zm0-5a1.5 1.5 0 1 1-3 0 1.5 1.5 0 0 1 3 0zm0-5a1.5 1.5 0 1 1-3 0 1.5 1.5 0 0 1 3 0z" />
                  </svg>
                </button>
                <div
                  className="dropdown-menu"
                  aria-labelledby="dropdownMenuButton"
                >
                  <button className="dropdown-item" href="#">
                    Edit
                  </button>
                  <button
                    className="dropdown-item link-danger"
                    href="#"
                    onClick={() => onDelete(post)}
                  >
                    Delete
                  </button>
                </div>
              </div>
            ) : null}
          </div>
          <div className="row">
            <p className="mt-3">{post.body}</p>
          </div>
          <div className="d-flex align-items-center mb-1">
            {!isLiked ? (
              <button
                className="btn border-0 ps-0 pe-2 py-0"
                onClick={() => onLike("like")}
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="16"
                  height="16"
                  fill="currentColor"
                  className="bi bi-heart"
                  viewBox="0 0 16 16"
                >
                  <path d="m8 2.748-.717-.737C5.6.281 2.514.878 1.4 3.053c-.523 1.023-.641 2.5.314 4.385.92 1.815 2.834 3.989 6.286 6.357 3.452-2.368 5.365-4.542 6.286-6.357.955-1.886.838-3.362.314-4.385C13.486.878 10.4.28 8.717 2.01L8 2.748zM8 15C-7.333 4.868 3.279-3.04 7.824 1.143c.06.055.119.112.176.171a3.12 3.12 0 0 1 .176-.17C12.72-3.042 23.333 4.867 8 15z" />
                </svg>
              </button>
            ) : (
              <button
                className="btn border-0 ps-0 pe-2 py-0 text-danger"
                onClick={() => onLike("dislike")}
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="16"
                  height="16"
                  fill="currentColor"
                  className="bi bi-heart-fill"
                  viewBox="0 0 16 16"
                >
                  <path
                    fillRule="evenodd"
                    d="M8 1.314C12.438-3.248 23.534 4.735 8 15-7.534 4.736 3.562-3.248 8 1.314z"
                  />
                </svg>
              </button>
            )}
            <p className="m-0 text-secondary">{`${likesCount} ${
              likesCount === 1 ? "Like" : "Likes"
            }`}</p>
          </div>
          <div className="row border-bottom">
            <p
              className="mx-0 text-secondary fst-italic"
              style={{ fontSize: "0.8rem" }}
            >
              {day && `${day}/${month}/${year}`}
            </p>
          </div>
          <CommentSection post={post} />
        </div>
      </div>
    </div>
  );
};
