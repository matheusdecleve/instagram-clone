import React, { useState, useEffect } from "react";
import "./global.scss";
import Logo from "./assets/images/logo.png";

import Modal from "@material-ui/core/Modal";
import Post from "./components/Post";
import ImageUpload from "./components/ImageUpload";

import { db, auth } from "./firebase";

function App() {
  const [posts, setPosts] = useState([]);
  const [openSignUp, setOpenSignUp] = useState(false);
  const [openSignIn, setOpenSignIn] = useState(false);

  const [user, setUser] = useState(null);
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [email, setEmail] = useState("");

  useEffect(() => {
    auth.onAuthStateChanged((authUser) => {
      if (authUser) {
        // user has logged in
        console.log(authUser);
        setUser(authUser);

        if (authUser.displayName) {
          // dont update username
        } else {
          return authUser.updateProfile({
            displayName: username,
          });
        }
      } else {
        // user hast logged out
        setUser(null);
      }
    });

    return () => {
      // perform some cleanup actions
    };
  }, [user, username]);

  useEffect(() => {
    db.collection("posts").onSnapshot((snapshot) => {
      setPosts(
        snapshot.docs.map((doc) => ({
          id: doc.id,
          post: doc.data(),
        }))
      );
    });
  }, []);

  function changeSignUpModalState() {
    setOpenSignUp(!openSignUp);
  }
  function changeSignInModalState() {
    setOpenSignIn(!openSignIn);
  }

  const signUp = (e) => {
    e.preventDefault();
    auth
      .createUserWithEmailAndPassword(email, password)
      .then((authUser) => {
        return authUser.user.updateProfile({
          displayName: username,
        });
      })
      .catch((error) => alert(error.message));
    setOpenSignUp(false);
  };

  const signIn = (e) => {
    e.preventDefault();
    auth
      .signInWithEmailAndPassword(email, password)
      .catch((error) => alert(error.message));
    setOpenSignIn(false);
  };

  return (
    <div className="app">
      <div className="navbar">
        <img className="logo" src={Logo} alt="" />
        {user ? (
          <button onClick={() => auth.signOut()}>Logout</button>
        ) : (
          <div>
            <button onClick={changeSignUpModalState}>Sign Up</button>
            <button onClick={changeSignInModalState}>Sign In</button>
          </div>
        )}
      </div>
      {posts.map(({ id, post }) => (
        <Post
          key={id}
          username={post.username}
          caption={post.caption}
          imgUrl={post.imgUrl}
        />
      ))}
      <Modal open={openSignUp} onClose={changeSignUpModalState}>
        <div className="modal">
          <div className="modal__content">
            <img className="logo" src={Logo} alt="" />
            <form className="SignUp">
              <input
                type="text"
                placeholder="username"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
              />
              <input
                type="password"
                placeholder="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
              <input
                type="email"
                placeholder="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
              <button type="submit" onClick={signUp}>
                Sign Up
              </button>
            </form>
          </div>
        </div>
      </Modal>

      <Modal open={openSignIn} onClose={changeSignInModalState}>
        <div className="modal">
          <div className="modal__content">
            <img className="logo" src={Logo} alt="" />
            <form className="SignUp">
              <input
                type="email"
                placeholder="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
              <input
                type="password"
                placeholder="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
              <button type="submit" onClick={signIn}>
                Sign In
              </button>
            </form>
          </div>
        </div>
      </Modal>

      <ImageUpload />
    </div>
  );
}

export default App;
