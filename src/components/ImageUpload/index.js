import React, { useState } from "react";
import { db, storage } from "./../../firebase";

function ImageUpload() {
  const [image, setImage] = useState(null);
  const [caption, setCaption] = useState("");
  const [progress, setProgress] = useState("");

  const handleChange = (e) => {
    if (e.target.files[0]) {
      setImage(e.target.files[0]);
    }
  };

  const handleUpload = () => {
    const uploadTask = storage.ref(`images/${image.name}`).put(image);
    uploadTask.on(
      "state_changed",
      (snapshot) => {
        // progress function
        const progress = Math.round(
          (snapshot.bytesTransferred / snapshot.totalBytes) * 100
        );
        setProgress(progress);
      },
      (error) => {
        // error function
        console.log(error);
        alert(error.message);
      },
      () => {
        // success function
        storage
          .ref("images")
          .child(image.name)
          .getDownloadURL()
          .then((url) => {
            // post image inside db
            // db.collection("posts").add({
            //   timestamp: firebase.firestore.FieldValue.serverTimestamp(),
            //   caption: caption,
            //   imgUrl: url,
            //   username: username,
            // });
          });
      }
    );
  };

  return (
    <div>
      <input
        type="text"
        onChange={(e) => setCaption(e.target.value)}
        value={caption}
        placeholder="Type something ..."
      />
      <input type="file" onChange={handleChange} />
      <button onClick={handleUpload}>Upload</button>
    </div>
  );
}

export default ImageUpload;
