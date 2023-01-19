import React, { useState } from "react";
import axios from "axios";
import { useGlobalContext } from "../context/context";
import authFetch from "../axios/global";
const Modal = () => {
  const [text, setText] = useState("");
  const { posts, setPosts } = useGlobalContext();
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (text.trim()) {
        const { data } = await authFetch.post("/posts", {
          body: text,
        });
        posts.unshift(data.post);
        setText("");
        setPosts(posts);
      }
    } catch (error) {
      console.error(error.message);
    }
  };
  return (
    <>
      <div
        className="modal fade"
        id="exampleModal"
        tabIndex="-1"
        aria-labelledby="exampleModalLabel"
        aria-hidden="true"
      >
        <div className="modal-dialog">
          <div className="modal-content">
            <div className="modal-header">
              <h1 className="modal-title fs-5" id="exampleModalLabel">
                Share your thoughts!
              </h1>
              <button
                type="button"
                className="btn-close"
                data-bs-dismiss="modal"
                aria-label="Close"
              ></button>
            </div>

            <form onSubmit={handleSubmit} autoComplete="off">
              <div className="modal-body">
                <div className="mb-3">
                  <div className="form-floating">
                    <textarea
                      id="post-body"
                      className="form-control"
                      placeholder="write your post"
                      maxLength="600"
                      style={{ height: "240px" }}
                      value={text}
                      onChange={(e) => setText(e.target.value)}
                    ></textarea>
                    <label htmlFor="post-body">Write your post!</label>
                  </div>
                </div>
              </div>
              <div className="modal-footer">
                {text.trim() ? (
                  <button
                    type="submit"
                    className="btn btn-primary"
                    data-bs-dismiss="modal"
                  >
                    Post!
                  </button>
                ) : (
                  <button type="submit" disabled className="btn btn-primary">
                    Post!
                  </button>
                )}

                <button
                  type="button"
                  className="btn btn-secondary"
                  data-bs-dismiss="modal"
                >
                  Close
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </>
  );
};

export default Modal;
