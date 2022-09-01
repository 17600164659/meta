import React from "react";
import PropTypes from "prop-types";
import "./NewRoomEntryModalMobile.scss";

export function NewRoomEntryModalMobile({
    className,
    roomName,
    showJoinRoom,
    onJoinRoom,
    showEnterOnDevice,
    onEnterOnDevice,
    showSpectate,
    onSpectate,
    showOptions,
    onOptions,
    ...rest
}) {
    return (
        <div className="roomEntryModalMobile">
            <div className="room-entry-modal-content">
                <div className="room-name">{window.APP.hub.name}</div>
                <div className="room-introduction">{window.RoomDetail.introduction}</div>
                <div className="room-entry-ui">
                    <div onClick={onJoinRoom} className="entry-room-button black">进入</div>
                    <div onClick={onSpectate} className="entry-room-button line">旁观</div>
                </div>
            </div>
        </div>
    );
}

NewRoomEntryModalMobile.propTypes = {
    className: PropTypes.string,
    roomName: PropTypes.string.isRequired,
    showJoinRoom: PropTypes.bool,
    onJoinRoom: PropTypes.func,
    showEnterOnDevice: PropTypes.bool,
    onEnterOnDevice: PropTypes.func,
    showSpectate: PropTypes.bool,
    onSpectate: PropTypes.func,
    showOptions: PropTypes.bool,
    onOptions: PropTypes.func
};

NewRoomEntryModalMobile.defaultProps = {
    showJoinRoom: true,
    showEnterOnDevice: true,
    showSpectate: true,
    showOptions: true
};
