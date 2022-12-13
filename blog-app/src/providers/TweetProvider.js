import React, { Children } from "react";
import TweetContext from "../contexts/TweetContext";

export default function TweetProvider({ children }) {
  const [tweets, setTweets] = React.useState([]);

  return (
    <TweetContext.Provider value={{ tweets, setTweets }}>
      {children}
    </TweetContext.Provider>
  );
}
