import { doc, getDoc } from "firebase/firestore";
import { useEffect } from "react";
import { createContext,useState } from "react";
import { db } from "../firebase";

export const UserContext = createContext({
    currentUser:null,
    setCurrentUser:()=>null,
})

export const UserProvider = ({children})=>{
    const [currentUser,setCurrentUser]=useState(null);
    const [userDB,setUserDB]=useState(null);
    const [afk,setAFK] = useState(false);
    const value={currentUser,setCurrentUser,userDB,setUserDB,afk,setAFK};
    
    const getUserData=async()=>{
        const docRef = doc(db,"users",currentUser.uid)
        const docSnap = await getDoc(docRef);
        if (docSnap.exists()) {
          setUserDB(docSnap.data());
        } else {
          console.log("No such document!");
        }
    }

    useEffect(()=>{
        getUserData()
    },[currentUser])

    useEffect(()=>{
        console.log(userDB)
    },[userDB])

    return(
        <UserContext.Provider value={value}>
            {children}
        </UserContext.Provider>
    )
}
