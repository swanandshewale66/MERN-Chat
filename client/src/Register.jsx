import axios from "axios";
import { useContext, useState } from "react";
import { UserContext } from "./UserContext";

export default function Register() {
  const [username, setUserName] = useState("");
  const [password, setPassword] = useState("");
  const { setUserName: setLoggedInUserName, setId } = useContext(UserContext);
  async function register(ev) {
    ev.preventDefault();
    const { data } = await axios.post("/register", { username, password });
    setLoggedInUserName(username);
    setId(data.id);
  }
  return (
    <div className="bg-blue-50 h-screen flex items-center">
      <form className="w-64 mx-auto mb-12" onSubmit={register}>
        <input
          value={username}
          onChange={(ev) => setUserName(ev.target.value)}
          type="text"
          placeholder="username"
          className="block w-full rounded-sm p-2 mb-2 border"
        />
        <input
          value={password}
          onChange={(ev) => {
            setPassword(ev.target.value);
          }}
          type="password"
          placeholder="password"
          className="block w-full rounded-sm p-2 mb-2 border"
        />
        <button className="bg-blue-500 text-white block w-full rounded-sm p-2">
          Register
        </button>
      </form>
    </div>
  );
}
