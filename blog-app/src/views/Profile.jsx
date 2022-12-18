import React, {useState} from "react";
import { getUserId, getUserName, setUserName } from "../services/username";
import { db, storage } from "../firebase";
import { ref, getDownloadURL, uploadBytes } from "firebase/storage"
import { query, collection, getDocs, where, onSnapshot, addDoc, doc, updateDoc } from "firebase/firestore";

export default function Profile({ saveTweets }) {
  const [userNameProfile, setUserNameProfile] = useState([""]);
  const allInputs = {imgUrl: ''}
  const [imageAsFile, setImageAsFile] = useState('')
  const [imageAsUrl, setImageAsUrl] = useState(allInputs);

  const saveUserName = () => {
    setUserName(userNameProfile);
  };

  React.useEffect(() => {
    const username = getUserName();
    setUserNameProfile(username);
  }, []);

  const handleImageAsFile = (e) => {
    const image = e.target.files[0]
    setImageAsFile(imageFile => (image))
  }

  const handleFireBaseUpload = e => {
    e.preventDefault()
    console.log('start of upload')
    const file = e.target[0]?.files[0]

    if (!file) return null;
    const storageRef = ref(storage, `files/${file.name}`)
    uploadBytes(storageRef, file)
    .then((snapshot) => {
      e.target[0].value = ''
      getDownloadURL(snapshot.ref).then(async(downloadURL) => {
        console.log(downloadURL)
        setImageAsUrl({imgUrl: downloadURL});

        const q = query(collection(db, "users"), where("uid", "==", getUserId()));
        const userid = await getDocs(q);
        const data = userid.docs[0].data();

        const userRef = doc(db, "users", userid.docs[0].id);
        await updateDoc(userRef, {
          profileImage: downloadURL,
        });


      })
    })
  }

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

      <h4 className="userHeader"> Profile image</h4>
      { imageAsUrl.imgUrl ? <img src={imageAsUrl.imgUrl} alt="profile image" /> : null }
      <form onSubmit={handleFireBaseUpload} className='form'>
        <input type='file' onChange={handleImageAsFile} />
        <button type='submit'>Upload</button>
      </form>
    </div>
  );
}
