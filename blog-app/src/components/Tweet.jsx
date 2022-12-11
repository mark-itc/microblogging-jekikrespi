import React from "react";
import "./Tweet.css";

export default function Tweet({ tweet }) {
  const { userName, date, content } = tweet;

  return (
    <div className="TweetBox">
      <div className="TweetHeader">
        {userName}
        <div> {date}</div>
      </div>
      <br />
      {content}
      <br />
      <br />
    </div>
  );
}
