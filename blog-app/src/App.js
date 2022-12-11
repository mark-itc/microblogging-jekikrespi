import React, { useState } from "react";
import "./App.css";
import FormList from "./components/FormList";
import TweetList from "./components/TweetList";
import { getStorage, setStorage } from "./services/storage";

function App() {
  const [tweets, setTweets] = React.useState(getStorage());

  const saveTweets = (content) => {
    const newTweet = {
      content,
      name: "jeki",
      date: new Date().toISOString(),
    };
    setTweets([...tweets, newTweet]);
    setStorage([...tweets, newTweet]);
  };
  return (
    <div className="App">
      <FormList saveTweets={saveTweets} />
      <TweetList tweets={tweets} />
    </div>
  );
}

export default App;
