import React, { useEffect, useState } from "react";
import axios from "axios";
import { useGlobalContext } from "../context/context";
import authFetch from "../axios/global";
import { Link } from "react-router-dom";
const CommentSection = ({ post }) => {
  const { currentUser } = useGlobalContext();
  const [text, setText] = useState("");
  const [comments, setComments] = useState([]);
  const isMyPost = currentUser._id === post.createdBy._id;
  const postComment = async (e) => {
    e.preventDefault();
    try {
      const { data } = await authFetch.post("/posts/comment", {
        postId: post._id,
        commentText: text,
      });
      setText("");
      setComments(data.post.comments);
    } catch (error) {
      console.error(error.message);
    }
  };
  const deleteComment = async (commentId) => {
    try {
      const response = await authFetch.patch(`/posts/comment/${commentId}`, {
        postId: post._id,
      });
      setComments((comments) =>
        comments.filter((comment) => comment._id !== commentId)
      );
    } catch (error) {
      console.error(error.message);
    }
  };

  useEffect(() => {
    setComments(post.comments);
  }, [post]);
  return (
    <div className="container p-3">
      <div className="row pb-1">
        <div className="col">
          <form onSubmit={postComment} autoComplete="off">
            <div className="form-group">
              <input
                value={text}
                onChange={(e) => setText(e.target.value)}
                type="text"
                className="form-control"
                id="exampleInputPassword1"
                placeholder="Leave a comment..."
              />
            </div>
          </form>
        </div>
      </div>
      {comments.map((comment, index) => {
        const { commentBy, commentText, _id: commentId } = comment;
        const isMyComment = commentBy._id === currentUser._id;
        return (
          <div className="container py-1" key={index}>
            <div
              className="row py-2 bg-secondary-subtle border border-secondary-subtle rounded-3"
              key={index}
            >
              <div className="col-auto">
                <Link
                  to={`/${commentBy._id}`}
                  className="text-primary text-decoration-none m-0 p-0"
                >
                  @{commentBy.username}
                </Link>
              </div>
              <div className="col">
                <p className="m-0">{commentText}</p>
              </div>
              <div className="col-auto">
                {isMyPost || isMyComment ? (
                  <div className="dropdown">
                    <button
                      className="btn border-0 p-0"
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
                        className="bi bi-three-dots"
                        viewBox="0 0 16 16"
                      >
                        <path d="M3 9.5a1.5 1.5 0 1 1 0-3 1.5 1.5 0 0 1 0 3zm5 0a1.5 1.5 0 1 1 0-3 1.5 1.5 0 0 1 0 3zm5 0a1.5 1.5 0 1 1 0-3 1.5 1.5 0 0 1 0 3z" />
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
                        onClick={() => deleteComment(commentId)}
                      >
                        Delete
                      </button>
                    </div>
                  </div>
                ) : null}
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default CommentSection;
