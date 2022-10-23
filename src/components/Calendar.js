import React from "react";
import { useDispatch, useSelector } from "react-redux";

import CalendarList from "./CalendarList";
import CalendarForm from "./CalendarForm";
import CalendarApi from "../api/CalendarApi";

import StyledSection from "../styled/StyledSection";

const Calendar = () => {
  const dispatch = useDispatch();
  const meetings = useSelector((state) => state.meetings);

  const dataAPI = new CalendarApi();

  React.useEffect(() => {
    dataAPI.loadMeetingsFromApi(dispatch);
  }, []);

  return (
    <StyledSection>
      <CalendarForm
        saveMeeting={(data) => dataAPI.sendMeetingToApi(data, dispatch)}
      />
      <CalendarList meetings={meetings} removeItem={(id) => dataAPI.removeMeetingFromApi(id, dispatch)} />
      
    </StyledSection>
  );
};

export default Calendar;
