import React, { useCallback, useEffect, useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import EditorJS from "@editorjs/editorjs";
import "./post.scss";
import axios from "axios";
import { Config } from "./tools";
import { userState$, postState$ } from "../../redux/selectors";
import { useSelector } from "react-redux";
const Post = () => {
  const navigate = useNavigate();
  const post = useSelector(postState$);
  const [isSuccess, setIsSuccess] = useState(null);
  const currentUser = useSelector(userState$);
  const location = useLocation();
  const [isUser, setIsUser] = useState(false);
  const [visiable, setVisiable] = useState(false);
  const [dataPost, setDataPost] = useState({});
  const [categoryPost, setCategoryPost] = useState({});
  const [authPost, setAuthPost] = useState({});
  const [content, setContent] = useState("");
  const [response, setResponse] = useState(null);
  useEffect(() => {
    if (post.post) {
      if (post.post.data) {
        setIsSuccess(post.post.data.status);
      }
    }
  }, [post]);
  const path = location.pathname.split("/")[2];
  const getPost = useCallback(async () => {
    const res = await axios.get(`/api/v1/posts/${path}`);
    setDataPost(res.data.post);
    setAuthPost(res.data.post.author);
    setCategoryPost(res.data.post.category);
  }, [path]);
  useEffect(() => {
    getPost();
  }, [getPost]);
  useEffect(() => {
    if (dataPost.content) {
      dataPost.content.map((e) => setContent(e));
    }
  }, [dataPost]);
  useEffect(() => {
    if (content) {
      const editor = new EditorJS({
        holder: "editorjs",
        readOnly: true,
        tools: Config,
        data: content,
      });
    }
  }, [dataPost, content]);
  useEffect(() => {
    if (currentUser.currentUser) {
      if (authPost._id === currentUser.currentUser._id) {
        setIsUser(true);
      }
    }
  }, [authPost, currentUser]);
  const handleClickDelete = () => setVisiable(!visiable);
  const handleDelete = useCallback(
    async (e) => {
      e.preventDefault();
      const token = localStorage.getItem("token");
      const option = {
        method: "delete",
        url: `/api/v1/posts/${dataPost._id}`,
        headers: {
          authorization: `Bearer ${token}`,
        },
      };
      const res = await axios(option);
      setResponse(res.data);
    },
    [dataPost._id]
  );
  useEffect(() => {
    if (response) {
      if (response.message) {
        window.location.href = "http://localhost:3000/";
      }
    }
  }, [navigate, response]);
  return (
    <div className="mt-80">
      <div className="post__details-container">
        {isSuccess ? (
          <div class="toast-mess-container">
            <button class={`alert-toast-message success`}>{isSuccess}</button>
          </div>
        ) : (
          ""
        )}
        <div className="post__details-auth">
          <div className="post__details-category">
            <Link to={`/category/${categoryPost.slug}`}>
              <span className="post__details-category-name">
                {categoryPost.name}
              </span>
            </Link>
          </div>
          <div className="post__details-title">
            <h1>{dataPost.title}</h1>
          </div>
          <div className="post__details-desc">
            <p>{dataPost.description}</p>
          </div>
          <div className="post__details mt-20 flex-box">
            <div className="flex-align-gap-10">
              <div className="post-avt-div">
                <Link to={`/user/${authPost.userName}`}>
                  <img
                    src={
                      authPost.avatar
                        ? authPost.avatar
                        : "https://www.gravatar.com/avatar/262cfa0997548c39953a9607a56f27da?d=wavatar&f=y"
                    }
                    alt=""
                  />
                </Link>
              </div>
              <div>
                <Link to={`/user/${authPost.userName}`}>
                  <p className="post-username">
                    {authPost.displayName
                      ? authPost.displayName
                      : authPost.userName}
                  </p>
                </Link>
                <span className="time-read">52 phút trước</span>
              </div>
            </div>
            {isUser ? (
              <div className="flex-align-gap-10">
                <Link to={`/post/update/${path}`}>
                  <span className="button-data edit">Sửa</span>
                </Link>
                <button onClick={handleClickDelete}>
                  <span className="button-data delete">Xóa</span>
                </button>
              </div>
            ) : (
              ""
            )}
          </div>
        </div>
        <div className="post__details-content">
          <div className="post__details-content-container">
            <div id="editorjs" />
          </div>
          <div className="sticky-bar"></div>
        </div>
        <div className="post__tool-bar">
          <div className="pull-left">
            <div className="vote">
              <div className="upvote">
                <div>
                  <i className="vote-icon bx bx-up-arrow"></i>
                </div>
              </div>
              <span className="value">69</span>
              <div className="downvote">
                <div className="vote-icon">
                  <i class="bx bx-down-arrow"></i>
                </div>
              </div>
            </div>
            <div className="view-count">700 lượt xem</div>
          </div>
          <div className="pull-right">
            <div className="right-tools">
              <Link to="/" className="tool">
                <i class="bx bxl-facebook-circle"></i>
              </Link>
              <div className="bookmark">
                <Link to="/" title="Click để lưu bài viết">
                  <i class="bx bx-bookmarks"></i>
                </Link>
              </div>
            </div>
          </div>
        </div>
        <div className="post__subscription">
          <div className="post__author">
            <div className="post__author-container">
              <div className="post__author-infos">
                <div className="post__author-avt">
                  <Link to="/">
                    <img
                      src="https://s3-ap-southeast-1.amazonaws.com/images.spiderum.com/sp-xs-avatar/d5bfdc4072c411ec85fc41a2f5147a1f.jpeg"
                      alt=""
                    />
                  </Link>
                </div>
                <div className="name">
                  <Link to="/" className="name-main">
                    Minh Tu Le
                  </Link>
                  <p>@tikhung01</p>
                </div>
              </div>
              <div className="sub-container">
                <button className="btn-fl">Follow</button>
              </div>
            </div>
            <div className="user-desc">Tại sao? Phải, tại sao.</div>
          </div>
          <div className="category__item">
            <div className="catergory__info">
              <Link className="name-main" to="/">
                <span>Phim</span>
              </Link>
              <p>/phim</p>
            </div>
            <button className="btn-fl">Follow</button>
          </div>
        </div>
        <div className="comment__container">
          <section className="comment__section">
            <div>
              <div className="comment__form-container">
                <form action="" className="comment__form">
                  <div
                    className="comment__form-data"
                    suppressContentEditableWarning
                    placeholder="Hãy chia sẻ cảm nghĩ của bạn về bài viết"
                  ></div>
                  <div className="comment__form-actions">
                    <div className="comment__form-actions-submit">Gửi</div>
                  </div>
                </form>
              </div>
            </div>
            <div className="comment__nav-tab">
              <div className="separator"></div>
              <ul className="comment__nav-list">
                <li className="comment__nav-item active">
                  <Link to="/">Hot nhất</Link>
                </li>
                <li className="comment__nav-item">
                  <Link to="/">Mới nhất</Link>
                </li>
              </ul>
            </div>
            <div className="comment__tree-view">
              <div className="comments">
                <div className="comments__node">
                  <div className="comment__child">
                    <div className="comment__child-avt">
                      <Link to="/">
                        <img
                          src="https://s3-ap-southeast-1.amazonaws.com/images.spiderum.com/sp-xs-avatar/36462660c77911ec91a38d378d083ff6.jpeg"
                          alt="nguyenlong266"
                        />
                      </Link>
                    </div>
                    <div className="comment__child-body">
                      <div className="creator-info">
                        <Link to="/">
                          <span className="name-main">Nguyn Long</span>
                        </Link>
                        <div className="metadata">
                          <span className="date">Hôm qua</span>
                        </div>
                        <div className="comment__child-content">mê tú linh</div>
                        <div className="comment__child-actions">
                          <div className="vote">
                            <div className="upvote">
                              <div>
                                <i className="vote-icon bx bx-up-arrow"></i>
                              </div>
                            </div>
                            <span className="value">69</span>
                            <div className="downvote">
                              <div className="vote-icon">
                                <i class="bx bx-down-arrow"></i>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </section>
        </div>
      </div>
      {visiable ? (
        <div className="modal__delete">
          <div className="modal__delete-container">
            <div className="modal__delete-main">
              <header className="modal__delete-header">Xóa</header>
              <main className="modal__delete-content">
                Sẽ không có cách nào hoàn tác lại hành động này. Bạn có chắc
                chắn muốn xóa bài viết?
              </main>
              <footer className="modal__delete-footer">
                <button
                  onClick={handleDelete}
                  className="modal__delete-button delete"
                >
                  XÓA
                </button>
                <button
                  onClick={handleClickDelete}
                  className="modal__delete-button cancle"
                >
                  Hủy
                </button>
              </footer>
            </div>
          </div>
        </div>
      ) : (
        ""
      )}
    </div>
  );
};

export default Post;
