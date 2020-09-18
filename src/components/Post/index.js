import React from "react";
import Avatar from "@material-ui/core/Avatar";

function Post({ username, caption, imgUrl }) {
  return (
    <div className="post">
      <div className="post__header">
        <Avatar alt={username} src="/" />
        <h3>{username}</h3>
      </div>
      <div className="post__image">
        <img src={imgUrl} alt="" />
      </div>
      <div className="post__caption">
        <p>
          <strong>{username}: </strong>
          {caption}
        </p>
      </div>
    </div>
  );
}

export default Post;
