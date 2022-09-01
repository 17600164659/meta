import React, { useState } from "react";
// import PropTypes from "prop-types";
import "./NewMobileUi.scss";

import pen from "../../assets/mobile-ui/pen.png";
import camera from "../../assets/mobile-ui/camera.png";
import emoji from "../../assets/mobile-ui/emoji.png";
import voice from "../../assets/mobile-ui/voice.png";
import shop from "../../assets/mobile-ui/shop.png";
import pepeols from "../../assets/mobile-ui/pepeols.png";
import share from "../../assets/mobile-ui/share.png";
import more from "../../assets/mobile-ui/more.png";
import chat from "../../assets/mobile-ui/chat.png";

function Button({
    src,
    onClick,
    style,
    placeholder,
    iconWidth,
    ...restm
}) {
    return (
        <div style={style} onClick={onClick} className="mobile-ui-button">
            {src ? <img style={{ width: iconWidth ? iconWidth : 0 }} src={src} /> : null}
            {placeholder ? <div className="mobile-ui-placeholder">{placeholder}</div> : null}
        </div>
    )
}

export function NewMobileUi(props) {
    const { toggleSidebar } = props;
    const notState = props.history.location.state === undefined;
    let entry_step;
    if (!notState) {
        entry_step = props.history.location.state.entry_step;
    }

    const isVideoSelect = !notState && entry_step === 'audio';
    const hasShop = !notState && entry_step === undefined;
    const hasBottom = !notState && entry_step === undefined;

    const [showMoreMenu, setShowMoreMenu] = useState(false);

    function moreMenuClick() {
        setShowMoreMenu(!showMoreMenu);
    }

    return (
        <div className="NewMobileUiContainer">
            {!isVideoSelect && <div className="mobile-ui-lefttop">
                <Button iconWidth={14} src={pepeols} onClick={() => console.log('click', 23232323)} />
                <Button iconWidth={12} src={share} onClick={() => console.log('click', 23232323)} />
                {hasShop && <Button iconWidth={12} src={shop} onClick={() => console.log('click', 23232323)} />}
            </div>}
            {!isVideoSelect && <div className="mobile-ui-righttop">
                <Button iconWidth={3} src={more} onClick={() => moreMenuClick()} />
                {showMoreMenu && <Button iconWidth={3} src={more} onClick={() => console.log('click', 23232323)} />}
            </div>}
            {!isVideoSelect && <div className="mobile-ui-bottom">
                {!hasBottom && <Button iconWidth={12} src={chat} onClick={() => toggleSidebar('chat')} />}
                {
                    hasBottom && (
                        <>
                            <Button iconWidth={12} src={pen} onClick={() => console.log('click', 23232323)} />
                            <Button iconWidth={10} src={voice} onClick={() => console.log('click', 23232323)} />
                            <Button placeholder="说点什么" onClick={() => toggleSidebar('chat')} style={{ width: 158, justifyContent: 'flex-start', paddingLeft: 9 }} />
                            <Button iconWidth={12} src={emoji} onClick={() => console.log('click', 23232323)} />
                            <Button iconWidth={12} src={camera} onClick={() => console.log('click', 23232323)} />
                        </>
                    )
                }
            </div>}
        </div>
    );
}
