import React, { Component } from "react";
import MembAddIcon from "../../assets/custom-assets/new-ui/memb_add_nor@2x.png";
import toast from "../../utils/toast";
import { hubUrl } from "../../utils/phoenix-utils";
import { EventBus } from '../../utils/event-bus';
import { usePeopleList } from "../../react-components/room/PeopleSidebarContainer";
import "./PepolsDrawer.scss";

export class PepolsDrawerComponent extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  componentDidMount() {
    const { hub } = this.props;
    const embedUrl = hubUrl(hub.hub_id, { embed_token: hub.embed_token });
    this.setState({ embedUrl: `https://home.metaio.cc/#/join/${window.APP.hub.hub_id}?uid=${window.APP.store.state.profile.uid}` });
    EventBus.listen('document_clicked', this.closeSelf)
  }

  closeSelf = () => {
    this.props.closeHandle();
  }

  componentWillUnmount() {
    EventBus.remove('document_clicked');
  }


  muteUser = id => {
    const { hubChannel } = this.props;
    hubChannel.mute(id);
  };

  iAmeOwner() {
    try {
      const { peoples } = this.props;
      let isOwner = false;
      if (peoples.length) {
        let p;
        peoples.map(pe => {
          if (pe.isMe) p = pe;
        });
        isOwner = p.roles.owner;
      }
      return isOwner;
    } catch (e) {
      console.log(e);
      return false;
    }
  }

  openShare = () => {
    this.setState({
      openShare: !this.state.openShare
    });
  };

  copyRoomLink = () => {
    const { embedUrl } = this.state;
    window.navigator.clipboard
      .writeText(embedUrl)
      .then(() => {
        toast.success("复制成功!");
      })
      .catch(e => {
        console.log(e);
        toast.error("复制失败, 请尝试手动复制");
      });
  };

  render() {
    const { openShare, embedUrl } = this.state;
    const { peoples, headsForId, isMobile } = this.props;
    const iAmOwner = this.iAmeOwner();
    return (
      <>
        <div className={"pepols-draw-container" + (openShare ? " open-right" : "")}>
          <div className="pepols-draw-title">
            <div className="pepols-draw-title-text">房间成员</div>
            <img src={MembAddIcon} className="pepols-draw-title-icon" onClick={this.openShare} />
          </div>
          <div className="pepols-draw-items">
            {peoples.map(people => {
              const { isMe, micPresence } = people;
              return (
                <div key={people.id} className="pepols-draw-pepolinfo">
                  <img src={`https://cdn.yuanyuxr.com/api/avatar/${people.profile?.avatarId}`} className="pepols-info-head" />
                  <div className="pepols-info-name">{people.profile?.displayName}</div>
                  {iAmOwner &&
                    !isMe &&
                    micPresence &&
                    !micPresence.muted && (
                      <button onClick={() => this.muteUser(people.id)} className="pepols-info-mute">
                        <img src="../../assets/custom-assets/new-ui/memb_voice_open_nor@2x.png" />静音
                      </button>
                    )}
                  {/* {micPresence && micPresence.muted ? (
                  <button className="pepols-info-mute unmute">
                    <img src="../../assets/custom-assets/new-ui/memb_voice_open_nor@2x.png" />取消静音
                  </button>
                ) : (
                  <button onClick={() => this.muteUser(id)} className="pepols-info-mute">
                    <img src="../../assets/custom-assets/new-ui/memb_voice_open_nor@2x.png" />静音
                  </button>
                )} */}
                  <div className="pepols-info-line" />
                </div>
              );
            })}
          </div>
        </div>
        {openShare ? (
          <div className={`right-draw ${isMobile ? "mobile" : ""}`}>
            <div className="hub-link-container">
              <div className="right-draw-title">分享当前房间</div>
              <textarea className="hub-link" id="embedUrl">
                {`https://home.metaio.cc/#/join/${window.APP.hub.hub_id}?uid=${window.APP.store.state.profile.uid}`}
                {/* {embedUrl && embedUrl.href} */}
              </textarea>
            </div>
            <div className="share-bub-button" onClick={this.copyRoomLink}>
              复制链接
            </div>
          </div>
        ) : null}
      </>
    );
  }
}

export const PepolsDrawer = function (props) {
  const { presences, mySessionId } = props;
  const peoples = usePeopleList(presences, mySessionId);
  return <PepolsDrawerComponent {...props} peoples={peoples} />;
};
