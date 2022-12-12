import React, { useState, useEffect } from "react";
import FormList from "../components/FormList";
import TweetList from "../components/TweetList";
import { getStorage, setStorage } from "../services/storage";
import { getUserName } from "../services/username";

export default function Home() {
  const [tweets, setTweets] = React.useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    const getFecth = async () => {
      setLoading(true);
      const data = await getStorage();
      setLoading(false);
      setTweets(data);
    };
    getFecth();
  }, []);

  const saveTweets = async (content) => {
    const newTweet = {
      content,
      userName: getUserName(),
      date: new Date().toISOString(),
    };

    try {
      await setStorage(newTweet);
      setTweets([...tweets, newTweet]);
      setError("");
    } catch (e) {
      setError("Cant save tweet");
    }
  };
  return (
    <div>
      <FormList saveTweets={saveTweets} />
      <h5 style={{ color: "red" }}>{error}</h5>
      {loading ? "loading..." : <TweetList tweets={tweets} />}
    </div>
  );
}
