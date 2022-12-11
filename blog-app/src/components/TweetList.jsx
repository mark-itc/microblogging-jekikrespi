import React from "react";
import Tweet from "./Tweet";

export default function TweetList({ tweets }) {
  const sortTweets = (tweets) => {
    return tweets.sort((a, b) => {
      return new Date(b.date) - new Date(a.date);
    });
  };

  return (
    <div>
      {sortTweets(tweets).map((tweet, index) => {
        return <Tweet key={index} tweet={tweet} />;
      })}
    </div>
  );
}
