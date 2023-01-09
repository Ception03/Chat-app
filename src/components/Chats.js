import React, { useRef, useState, useEffect } from "react"
import logo from '../logo/scrimchat.png'

import axios from 'axios'
import { useHistory } from "react-router-dom"
import { ChatEngine } from 'react-chat-engine'


import { useAuth } from "../context/AuthContext"

import { auth } from "../components/firebase"

export default function Chats() {
  const didMountRef = useRef(false)
  const [ loading, setLoading ] = useState(true)
  const { user } = useAuth()
  const history = useHistory()

  async function handleLogout() {
    await auth.signOut()
    history.push("/")
  }

  async function getFile(url) {
    let response = await fetch(url);
    let data = await response.blob();
    return new File([data], "test.jpg", { type: 'image/jpeg' });
  }

  useEffect(() => {
    if (!didMountRef.current) {
      didMountRef.current = true

      if (!user || user === null) {
        history.push("/")
        return
      }
      
      // Get-or-Create should be in a Firebase Function
      axios.get(
        'https://api.chatengine.io/users/me',
        { headers: { 
          "project-id": process.env.REACT_APP_CHAT_ENGINE_ID,
          "user-name": user.email,
          "user-secret": user.uid
        }}
      )

      .then(() => setLoading(false))

      .catch(e => {
        let formdata = new FormData()
        formdata.append('email', user.email)
        formdata.append('username', user.email)
        formdata.append('secret', user.uid)

        getFile(user.photoURL)
        .then(avatar => {
          formdata.append('avatar', avatar, avatar.name)

          axios.post(
            'https://api.chatengine.io/users/',
            formdata,
            { headers: { "private-key": process.env.REACT_APP_CHAT_ENGINE_KEY }}
          )
          .then(() => setLoading(false))
          .catch(e => console.log('e', e.response))
        })
      })
      // ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

    }
  }, [user, history])
  

  if (!user || loading) return <div />

  return (
    <div className='chats-page'>
      <div className='nav-bar'>
      <img className="logo-scrim" src={logo} alt=""/>
        <div className='logo-tab'>
          
        </div>

        <div onClick={handleLogout} className='logout-tab'>
         <button className="bt-logout">Logout</button>
        </div>
      </div>

      <ChatEngine 
        height='calc(100vh - 66px)'
        projectID={process.env.REACT_APP_CHAT_ENGINE_ID}
        userName={user.email}
        userSecret={user.uid}
        
        
      />

    </div>
  )
}




// import React, { useRef, useState, useEffect} from "react";
// import { useHistory } from "react-router-dom";
// import { ChatEngine } from "react-chat-engine";
// import { auth } from "../components/firebase";
// import axios from 'axios';

// import { useAuth } from "../context/AuthContext";

// const Chats = () => {

//     const history = useHistory();

//     const { user } = useAuth();
//     const [loading, setLoading] = useState(true);


//     const handleLogout = async () => {
//         await auth.signOut();
//         history.push('/');
//     }

//     const getFile = async (url) => {
//         const response = await fetch(url);
//         const data = await response.blob();

//         return new File([data], "userPhoto.jpg", { type: 'image/jpeg'})

//     }


//     useEffect(() => {
//         if(!user){
//         history.push('/');
//         return;
//         }

//         axios.get('https://api.chatengine.io/users/me/', {
//             headers: {
//                 "project-id":"e66ce374-d2c3-430c-847e-1dbc10364349",
//                 "user-name": user.email,
//                 "user-secret": user.uid,
//             }
//         })
//         .then(() => {
//             setLoading(false);
//         })
//         .catch (()=> {
//             let formdata = new FormData();
//             formdata.append('email', user.email);
//             formdata.append('username', user.email);
//             formdata.append('secret', user.uid);

//             getFile(user.photoURL)
//             .then((avatar)=>{
//                 formdata.append('avatar', avatar, avatar.name)
//                 axios.post('https://api.chatengine.io/users/',
//                 formdata,
//                 {headers:{ "private-key":"4b1418a2-94c2-4382-a113-68c32bb327d6" }}
//                 )
//                 .then(() => setLoading(false))
//                 .catch((error)=> console.log(error))
//             })
//         })
//     }, [user, history]);


//     if(!user || loading) return 'Loading...';

//     return (
//         <div className="chats-page">
//             <div className="nav-bar">
//                 <div className="logo-tab">
//                     Scrim Chat
//                 </div>
//                 <div onClick={handleLogout} className="logout-tab">
//                     Logout
//                 </div>
//             </div>
//             <ChatEngine
//             height="calc(100vh - 66px)"
//             projectID="e66ce374-d2c3-430c-847e-1dbc10364349"
//             userName={user.email}
//             userSecret={user.uid}/>

//         </div>
//     );
// }

// export default Chats;