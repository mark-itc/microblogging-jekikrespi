import React, { useState, useEffect, useContext } from "react";
import FormList from "../components/FormList";
import TweetList from "../components/TweetList";
import { setTweet } from "../services/storage";
import { getUserName, setUserName, setUserId } from "../services/username";
import TweetContext from "../contexts/TweetContext";
import { auth, db, logout } from "../firebase";
import { useAuthState } from "react-firebase-hooks/auth";
import { 
  query, 
  collection, 
  getDocs, 
  where, 
  onSnapshot,  
} from "firebase/firestore";
import { useNavigate } from "react-router-dom";



export default function Home() {
  const { tweets, setTweets } = useContext(TweetContext);
  const [user, loading, error] = useAuthState(auth);
  const [profileImage, setProfileImage] = useState("");
  const [name, setName] = useState("");
  const navigate = useNavigate();
  const [errorMsg, setErrorMsg] = useState("");

  const fetchUserName = async () => {
    try {
      const q = query(collection(db, "users"), where("uid", "==", user?.uid));
      const doc = await getDocs(q);
      const data = doc.docs[0].data();
      setName(data.name);
      setProfileImage(data.profileImage);
      setUserName(data.name);
      setUserId(user?.uid);
    } catch (err) {
      console.error(err);
      alert("An error occured while fetching user data");
    }
  };


  useEffect(() => {
    const unsubscribe = onSnapshot(collection(db ,"TweetCollection"), (snapshot) => {
        if (snapshot.size) {
          const newData = snapshot.docs.map((doc) => ({
            ...doc.data(),
            id: doc.id,
          }));
          setTweets(newData);
        } else {
        }
      });
    return () => {
      unsubscribe();
    };
  }, []);

  useEffect(() => {
    if (loading) return;
    if (!user) return navigate("/");
    fetchUserName();
  }, [user, loading]);

  const saveTweets = async (content) => {
    const newTweet = {
      content,
      userName: user?.uid,
      date: new Date().toISOString(),
    };

    try {
      await setTweet(newTweet);
      setTweets([...tweets, newTweet]);
      setErrorMsg("");
    } catch (e) {
      setErrorMsg("Cant save tweet");
    }
  };
  return (
    <div>
      <div style={{ color: "white" }}>Name: {name}</div>
      <div style={{ color: "white" }}>Email: {user?.email}</div>
      <img src={profileImage} alt="profile" style={{width: "100px", height: "100px"}} />
      <button className="dashboard__btn" onClick={logout}>
        Logout
      </button>
      <FormList saveTweets={saveTweets} />
      <h5 style={{ color: "red" }}>{errorMsg}</h5>
      {tweets.length > 0 && <TweetList tweets={tweets} />}
    </div>
  );
}
