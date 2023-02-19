import { useContext } from "react";
import RegisterAndLoginForm from "./RegisterAndLoginForm";
import { UserContext } from "./UserContext";

export default function Routes(){
    const {userName,id} = useContext(UserContext)
    console.log(userName)
    if(userName){
        return 'logged in!'+userName
    }
     return(
        <RegisterAndLoginForm/>
     )
}