import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import { MdNotifications } from "react-icons/md";
import "./navbar.css";
import { clearNotification } from "../../redux/slice";

const Navbar = () => {
  const dispatch = useDispatch();
  const [toggle, setToggle] = useState(false);
  const user = useSelector((state) => state.reducer);
  const count = user.notification.length;
  const handleClick = () => {
    setToggle(!toggle);
  };
  return (
    <>
      <div id="navbarSection">
        <div>
          <span></span>
        </div>
        <div style={{ display: user.senderName == "" ? "none" : "block" }}>
          <ul>
            <li className="notificationIcon" onMouseEnter={handleClick}>
              <MdNotifications />
              <span className="notificationCount">{count ? count : 0}</span>
            </li>
            <li>
              <Link to={"/"}>{user?.senderName}</Link>
            </li>
            <li>
              <img src={user?.senderProfile} className="navProfileImg" />
            </li>
          </ul>
        </div>
      </div>
      <div
        className={toggle ? "NotificationSection" : "NotificationSectionNone"}
        style={{ display: toggle ? "block" : "none" }}
        onMouseLeave={() => {
          dispatch(clearNotification());
          setToggle(!toggle);
        }}
      >
        {user?.notification[0] != undefined ? (
          user?.notification?.map((x) => {
            return (
              <>
                <p>{x} send a Message to you...!</p>
              </>
            );
          })
        ) : (
          <p style={{ display: toggle ? "block" : "none" }}>
            No Recent Notifications
          </p>
        )}
      </div>
    </>
  );
};

export default Navbar;
