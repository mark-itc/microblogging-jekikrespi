import React, { useState, useEffect, useContext } from "react";
import FormList from "../components/FormList";
import TweetList from "../components/TweetList";
import { getStorage, setStorage } from "../services/storage";
import { getUserName } from "../services/username";
import TweetContext from "../contexts/TweetContext";

export default function Home() {
  const { tweets, setTweets } = useContext(TweetContext);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    const initTweets = async () => {
      setLoading(true);
      await getFetch();
      setLoading(false);
    };

    const getFetch = async () => {
      const data = await getStorage();
      setTweets(data);
    };
    initTweets();
    const tweetInterval = setInterval(getFetch, 2000);
    return () => {
      clearInterval(tweetInterval);
    };
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
      {loading ? (
        <h2 style={{ color: "white" }}>loading...</h2>
      ) : (
        <TweetList tweets={tweets} />
      )}
    </div>
  );
}
