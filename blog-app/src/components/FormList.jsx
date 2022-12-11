import React from "react";

export default function FormList({ saveTweets }) {
  const [content, setContent] = React.useState([""]);
  const [disable, setdisable] = React.useState(false);

  return (
    <div>
      <input
        type="text"
        value={content}
        onChange={(e) => {
          setdisable(e.target.value.length > 140);
          setContent(e.target.value);
        }}
        placeholder="What you have in mind..."
      />
      <button disabled={disable} onClick={() => saveTweets(content)}>
        Tweet
      </button>
    </div>
  );
}
