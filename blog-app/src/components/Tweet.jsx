import React from "react";

export default function Tweet({ tweet }) {
  const { name, date, content } = tweet;

  return (
    <div>
      {name}
      <br />
      {date}
      <br />
      {content}
    </div>
  );
}
