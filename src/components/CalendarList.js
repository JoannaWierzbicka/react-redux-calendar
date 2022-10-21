import React from "react";
import StyledLi from "../styled/StyledLi";
import StyledUl from "../styled/StyledUl";
import StyledLink from "../styled/StyledLink";
// import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
// import {fa-calendar-days, fa-timer} from "@fortawesome/free-solid-svg-icons";

class CalendarList extends React.Component {
  render() {
    return <StyledUl>{this.renderMeetingsList()}</StyledUl>;
  }

  renderMeetingsList() {
    return this.props.meetings.map((item) => this.renderMeetingsItem(item));
  }

  renderMeetingsItem(itemData) {
    return (
      <StyledLi key={itemData.id}>
        <div>
          <StyledLink href={`mailto: ${itemData.email}`}>
            {itemData.firstName} {itemData.lastName}
          </StyledLink>
          <p>{itemData.date}</p>
          <p>{itemData.time}</p>
        </div>
      </StyledLi>
    );
  }
}

export default CalendarList;
