import React from "react";
import StyledLi from "../styled/StyledLi";
import StyledUl from "../styled/StyledUl";
import StyledLink from "../styled/StyledLink";
import StyledDiv from "../styled/StyledDiv";
import StyledButton from "../styled/StyledButton";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCalendarDays, faClock } from "@fortawesome/free-solid-svg-icons";

class CalendarList extends React.Component {
  render() {
    return <StyledUl>{this.renderMeetingsList()}</StyledUl>;
  }

  renderMeetingsList() {
    return this.props.meetings
      .sort((a, b) => new Date(b.date) - new Date(a.date))
      .map((item) => this.renderMeetingsItem(item));
  }

  renderMeetingsItem(itemData) {
    return (
      <StyledLi key={itemData.id}>
        <StyledDiv className={"meeting-info-container"}>
          git
          <StyledLink href={`mailto: ${itemData.email}`}>
            {itemData.firstName} {itemData.lastName}
          </StyledLink>
          <p>
            <FontAwesomeIcon icon={faCalendarDays} /> {itemData.date}
          </p>
          <p>
            <FontAwesomeIcon icon={faClock} /> {itemData.time}
          </p>
          <StyledButton onClick={() => this.props.removeItem(itemData.id)}>
            DELETE
          </StyledButton>
        </StyledDiv>
      </StyledLi>
    );
  }
}

export default CalendarList;
