import "./profile.css";
import Sidebar from "../../components/sidebar/Sidebar";
import Topbar from "../../components/topbar/Topbar";
import Feed from "../../components/feed/Feed";
import { useEffect, useState } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";

import getConfig from "../../config";
import { useAuth } from "../../context/AuthContext";
import ProfileRightBar from "../../components/rightbar/ProfileRightBar";
import { CircularProgress } from "@mui/material";
import ProfilePic from "./ProfilePic";
const { SERVER_URI } = getConfig();

export default function Profile() {
  const { token } = useAuth();
  const [user, setUser] = useState(false);
  const username = useParams().username;
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchUser = async () => {
      const res = await axios.get(`${SERVER_URI}/api/users/user/${username}`, {
        headers: { Authorization: token },
      });
      setUser(res.data);
      setIsLoading(false);
    };

    setIsLoading(true);
    fetchUser();
  }, [username, token]);

  if (isLoading)
    return (
      <div>
        <Topbar />
        <div
          className="profileContainer"
          style={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            height: "100vh",
          }}
        >
          <CircularProgress sx={{ color: "blue" }} />
        </div>
      </div>
    );

  const { coverPicture, profilePicture, description } = user;

  return (
    <>
      <Topbar />
      <div className="profileContainer">
        <Sidebar />
        <div className="profileRight">
          <div className="profileRightTop">
            <div className="profileCover">
              <img
                src={coverPicture}
                className="profileCoverImg"
                alt="cover"
                loading="lazy"
              />

              <ProfilePic user={user} />
            </div>
            <div className="profileInfo">
              <h4 className="profileInfoName">{username}</h4>
              <h4 className="profileInfoDesc">{description}</h4>
            </div>
          </div>
          <div className="profileRightBottom">
            <Feed username={username} isProfile={true} />
            <ProfileRightBar user={user} />
          </div>
        </div>
      </div>
    </>
  );
}
