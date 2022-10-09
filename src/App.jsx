import { useEffect, useState } from 'react'
import './App.css'
import { initializeApp } from "firebase/app";
// import { getAnalytics } from "firebase/analytics";
import { useAuthState } from 'react-firebase-hooks/auth';
import {
  GoogleAuthProvider,
  getAuth,
  signInWithPopup,
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  sendPasswordResetEmail,
  signOut,
  onAuthStateChanged
} from "firebase/auth";


// FIREBASE CONFIGURATION
const firebaseConfig = {
  apiKey: "AIzaSyDD3oj7MJ31rJyrAl51MP45fXmpmyaYW58",
  authDomain: "react-todo-89d05.firebaseapp.com",
  projectId: "react-todo-89d05",
  storageBucket: "react-todo-89d05.appspot.com",
  messagingSenderId: "536355323854",
  appId: "1:536355323854:web:870523103c2ea1fa0af59f",
  measurementId: "G-HKB18HQ45V"
};

const fbApp = initializeApp(firebaseConfig);
const auth = getAuth(fbApp);

const googleProvider = new GoogleAuthProvider();
const signInWithGoogle = async () => {
  try {
    const res = await signInWithPopup(auth, googleProvider);
    const user = res.user;
  } catch (err) {
    console.error(err);
    alert(err.message);
  }
};

const logInWithEmailAndPassword = async (email, password) => {
  try {
    await signInWithEmailAndPassword(auth, email, password);
  } catch (err) {
    console.error(err);
    alert(err.message);
  }
};

const logout = () => {
  signOut(auth);
};

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [user, loading, error] = useAuthState(auth);
  const [username, setUsername] = useState("");

  useEffect(() => {
    onAuthStateChanged(auth, (user) => {
      if (user) {
        // User is signed in, see docs for a list of available properties
        // https://firebase.google.com/docs/reference/js/firebase.User
        setUsername(user.uid);
        // ...
      } else {
        // User is signed out
        // ...
        setUsername("");
      }
    });
  }, []);


  return (
    <>
      <input
        type="email"
        className="login_email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        placeholder="Email"
      />
      <input
        type="password"
        className="login__textBox"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        placeholder="Password"
      />
      <button
        className="login__btn"
        onClick={() => {logInWithEmailAndPassword(email, password); setEmail(""); setPassword("");}}
      >Login</button>
      <button
        className="signInGoogle"
        onClick={() => signInWithGoogle()}
      >Google</button>

      <button
        className='signOut'
        onClick={() => logout()}
        >LOGOUT</button>
      <br></br>
      <p>{username}</p>
    </>
  );
}


function App() {
  return (
    <div className="App">

      <div className='authSection'>
        <p>AUTH HERE</p>
        <Login />
      </div>

      <div className='titleSection'>
        <h1 className='title'>Reactive To-Do</h1>
        <h4 className='byline'>A Harvey Project</h4>
      </div>


      <div className='inputSection'>
        <p>Input here</p>
      </div>

      <div className='listSection'>
        <p>LIST</p>
      </div>

    </div>
  )
}

export default App
