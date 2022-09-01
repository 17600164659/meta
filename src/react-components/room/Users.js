import React from "react";
import "./Users.scss";

import close from "../../assets/mobile-ui/close.png";

function User(props) {
    return (
        <div className="user-item">
            <img />
            用户
        </div>
    )
}

const mock = [1, 2, 3, 4, 5, 6, 7, 8, 9];

export default function Users(props) {
    return (
        <div className="mobile-users-container">
            <div className="users-title">
                <img src={close} className="users-close-btn" />
                <div>房间人员</div>
                <div className="users-muteall-btn">全部静音</div>
            </div>
            <div className="users-list-container">
                {
                    mock.map(u => <User />)
                }
            </div>
        </div>
    );
}
