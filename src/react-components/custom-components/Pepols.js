/* eslint-disable prettier/prettier */
/* eslint-disable react/prop-types */

import React, { Component } from "react";
import { usePeopleList } from "../../react-components/room/PeopleSidebarContainer";
import "./Pepols.scss";

class PepolsContainer extends Component {
  constructor(props) {
    super(props);
    this.state = {
      pepols: [2, 26, 50, 74],
      widths: [40, 64, 88, 112],
    };
  }

  clickBar = () => {
    if (this.props.onClick) {
      this.props.onClick();
    }
  };

  render() {
    const { widths } = this.state;
    const peIndex = [2, 26, 50, 74];
    // const { peoples } = this.props;
    return (
      <div
        className="pepols-container"
        onClick={this.clickBar}
        style={{
          width: widths[0]
          // width: peoples.length >= 4 ? widths[3] : widths[peoples.length - 1]
        }}
      // style={{
      //   width: peoples.length >= 4 ? widths[3] : widths[peoples.length - 1]
      // }}
      >
        <img src="https://assets.metaio.cc/assets/images/12371655038025_.pic_thumb.jpg" style={{ left: peIndex[0] }} className="pepols-head" />
        {/* {peoples.length >= 4
          ? peoples.map((pepol, index) => (
            // <img src={`https://cdn.yuanyuxr.com/api/avatar/${pepol.profile.avatarId}`} style={{ left: peIndex[index] }} className="pepols-head" key={peIndex[index]} />
            <img src="https://assets.metaio.cc/assets/images/12371655038025_.pic_thumb.jpg" style={{ left: peIndex[index] }} className="pepols-head" key={peIndex[index]} />
          ))
          : peoples.map((pepol, index) => (
            // <img src={`https://cdn.yuanyuxr.com/api/avatar/${pepol.profile.avatarId}`} style={{ left: peIndex[index] }} className="pepols-head" key={peIndex[index]} />
            <img src="https://assets.metaio.cc/assets/images/12371655038025_.pic_thumb.jpg" style={{ left: peIndex[index] }} className="pepols-head" key={peIndex[index]} />
          ))} */}
        {/* <div className="pepols-count">{peoples.length}</div> */}
      </div>
    );
  }
}

export const Pepols = function (props) {
  const { presences, mySessionId } = props;
  const peoples = usePeopleList(presences, mySessionId);
  peoples.map(people => {
    props.addHeadFromPeople(people);
  })
  return <PepolsContainer {...props} peoples={peoples} />;
};
