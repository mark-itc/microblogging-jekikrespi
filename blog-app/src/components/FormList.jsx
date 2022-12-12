import React from "react";
import "./FormList.css";

export default function FormList({ saveTweets }) {
  const [content, setContent] = React.useState([""]);
  const [disable, setdisable] = React.useState(false);

  return (
    <div>
      <textarea
        className="TextInput"
        type="textarea"
        value={content}
        onChange={(e) => {
          if (e.target.value.length > 140) {
            setdisable(true);
          } else {
            setdisable(false);
            setContent(e.target.value);
          }
        }}
        placeholder="What you have in mind..."
      ></textarea>
      <div className="textArea">
        {disable && (
          <p className="alert">
            {" "}
            "The Tweet can't contian more than 140 chars"
          </p>
        )}
        <button
          className="TweetButton"
          disabled={disable}
          onClick={() => saveTweets(content)}
        >
          Tweet
        </button>
      </div>
    </div>
  );
}
