const setStorage = (tweets) => {
  const tweetString = JSON.stringify(tweets);
  localStorage.setItem("Tweets", tweetString);
};

const getStorage = () => {
  const tweets = JSON.parse(localStorage.getItem("Tweets")) || [];
  return tweets;
};

export { setStorage, getStorage };
