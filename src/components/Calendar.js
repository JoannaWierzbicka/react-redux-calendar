import React from "react";

import CalendarList from "./CalendarList";
import CalendarForm from "./CalendarForm";
import { useDispatch, useSelector } from "react-redux";

import { removeMeeting } from "../actions/calendar";

import StyledSection from "../styled/StyledSection";

import CalendarApi from "../api/CalendarApi";

const Calendar = () => {
  const dispatch = useDispatch();
  const meetings = useSelector((state) => state.meetings);

  const dataAPI = new CalendarApi();

  React.useEffect(() => {
    dataAPI.loadMeetingsFromApi(dispatch);
  }, []);

  const removeItem = (id) => {
    dataAPI.removeMeetingFromApi(id, dispatch);
  };

  return (
    <StyledSection>
      <CalendarList meetings={meetings} removeItem={removeItem} />
      <CalendarForm
        saveMeeting={dataAPI.sendMeetingToApi}
        dispatch={dispatch}
      />
    </StyledSection>
  );
};

export default Calendar;
