import { db } from "../firebase";
import { collection, getDocs, addDoc } from "firebase/firestore";

const getTweets = async () => {
  try {
    const snapshot = await getDocs(collection(db, "TweetCollection"));

    const newData = snapshot.docs.map((doc) => ({
      ...doc.data(),
      id: doc.id,
    }));

    return newData;
  } catch (err) {
    console.log(err);
  }
};

const setTweet = async (tweet) => {
  try {
    await addDoc(collection(db, "TweetCollection"), tweet);
  } catch (err) {
    console.log(err);
  }
};


export { getTweets, setTweet };
