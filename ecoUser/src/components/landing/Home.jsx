import React from "react";
import { useState, useEffect } from "react";
import "./home.css";
import Profile from "./Profile";
import axios from "axios";
import { getAdminUser } from "../../apis/admin";
import { getAllUsers } from "../../apis/user";

const Home = () => {
  let URL = getAdminUser;
  let [data, setData] = useState([]);
  let [user, setUser] = useState([]);

  useEffect(() => {
    const fetchUser = async () => {
      let res = await axios.get(URL)
      setData(res.data.users);
      let user = await axios.get(`${getAllUsers}?skip=0&limit=0&getCount=false`)
      setUser(user.data.users.users);

    };
    fetchUser();
  }, [URL]);

  return (
    <div className="home">
      {data.map((a,i) => (
        <Profile data={a} key={i} />
      ))}
      {user.map((a,i) => (
        <Profile data={a} key={i} />
      ))}
    </div>
  );
};

export default Home;
