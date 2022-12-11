const url =
  "https://micro-blogging-dot-full-stack-course-services.ew.r.appspot.com/tweet";

const setStorage = async (tweet) => {
  const sentTweet = {
    content: tweet.content,
    userName: tweet.userName,
    date: tweet.date,
  };
  const response = await fetch(url, {
    method: "POST",
    body: JSON.stringify(sentTweet),
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
    },
  });

  if (response.status === 200) return response;
  else {
    throw Error();
  }
};

const getStorage = async () => {
  const response = await fetch(url, {
    method: "GET",
    headers: { "Content-Type": "application/json" },
  });
  console.log(response);
  const data = await response.json();

  return data.tweets;
};

export { setStorage, getStorage };
