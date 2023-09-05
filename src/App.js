import React, { useState ,useEffect} from "react";
import "./App.css";


import { getDatabase ,ref,push,set,onChildAdded } from "firebase/database";
import { GoogleAuthProvider, getAuth, signInWithPopup } from "firebase/auth";


const App = () => {

  const provider = new GoogleAuthProvider();
  const auth = getAuth();

  const googleLogin = () =>{
    signInWithPopup(auth, provider)
  .then((result) => {
    
    const credential = GoogleAuthProvider.credentialFromResult(result);
    const token = credential.accessToken;
  
    const user = result.user;
    setUser({name:result.user.displayName, email: result.user.email})
    console.log(token, user);

  }).catch((error) => {
  
    const errorCode = error.code;
    const errorMessage = error.message;

    const email = error.email;
    
    const credential = GoogleAuthProvider.credentialFromError(error);
    // ...
  });
  }

  const [user, setUser] = useState('');
  const [chats, setChats] = useState([]);
  const [msg, setMsg] = useState('');

  const db = getDatabase();
  const chatListRef = ref(db, 'chats');



  const updateHeight=()=>{
    const el = document.getElementById('chat');
    if(el){
      el.scrollTop = el.scrollHeight;
    }
  }

  useEffect(()=>{
    onChildAdded(chatListRef, (data) => {
      setChats(chats=>[...chats,data.val()])
      setTimeout(()=>{
        updateHeight()

      },100)
    });
  },[])


  const sendChat = () => {

    const chatRef = push(chatListRef);
    set(chatRef, {
      user, message: msg
    });
    setMsg('');
  };
  return (
    <>
    <section className="main-container">
       <div className="">
      {user.email? null: <div className="btn-primary">
       
        <button onClick={e=>{googleLogin()}} className="btn b">Google SignIn</button>
      </div>}
   { user.email? <div>
    <div className="d_flex">
    <div className="user">
    <h2>Online Friends</h2>
      <h3 >User: {user.name}</h3></div>
      <div id='chat' className="chat-container">
        {chats.map((c,i) => (
          <div key={i} className={`container ${c.user.email === user.email ? 'me' : ''}`}>
            <p className="chatbox">
              <strong>{c.user.name}: </strong>
              <span>{c.message}</span>
            </p>
          </div>
        ))}
      </div>
    </div>
   
      <div className="btm messagebx">
        <div className="nestedbx
        "><input
          type="text"
          onInput={(e) => setMsg(e.target.value)}
          value={msg}
          placeholder="enter your chat"
        ></input>
        <button onClick={(e) => sendChat()} >Sends</button>
        
        </div>
      </div>
      </div> : null}
      </div>
      </section>
    </>
  );
};

export default App;