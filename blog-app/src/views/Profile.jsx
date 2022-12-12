import React from "react";
import { getUserName, setUserName } from "../services/username";
export default function Profile({ saveTweets }) {
  const [userNameProfile, setUserNameProfile] = React.useState([""]);

  const saveUserName = () => {
    setUserName(userNameProfile);
  };

  React.useEffect(() => {
    const username = getUserName();
    setUserNameProfile(username);
  }, []);

  return (
    <div>
      <h1 className="profileHeader"> Profile</h1>
      <h4 className="userHeader"> User Name</h4>

      <input
        className="userNameText"
        type="text"
        value={userNameProfile}
        onChange={(e) => {
          setUserNameProfile(e.target.value);
        }}
      />
      <button className="SaveButton" onClick={saveUserName}>
        Save
      </button>
    </div>
  );
}
