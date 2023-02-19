import { useContext } from "react";
import Chat from "./Chat";
import RegisterAndLoginForm from "./RegisterAndLoginForm";
import { UserContext } from "./UserContext";

export default function Routes(){
    const {userName,id} = useContext(UserContext)
    if(userName){
        return <Chat/>
    }
     return(
        <RegisterAndLoginForm/>
     )
}