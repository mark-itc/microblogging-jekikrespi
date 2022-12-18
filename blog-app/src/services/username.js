const getUserName = () => {
  return localStorage.getItem("username");
};

const setUserName = (username) => {
  localStorage.setItem("username", username);
};

const setUserId = (username) => {
  localStorage.setItem("userid", username);
};


const getUserId = (username) => {
  return localStorage.getItem("userid");
};
export { getUserName, setUserName, setUserId, getUserId };
