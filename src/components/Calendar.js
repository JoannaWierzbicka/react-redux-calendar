import React from "react";
import { useDispatch, useSelector } from "react-redux";

import CalendarList from "./CalendarList";
import CalendarForm from "./CalendarForm";
import DataApi from "../api/DataApi";
import { loadMeetingsAction, saveMeetingAction, removeMeetingAction } from '../actions/calendar'

import StyledSection from "../styled/StyledSection";

const Calendar = () => {
  const dispatch = useDispatch();
  const meetings = useSelector((state) => state.meetings);

  const dataAPI = new DataApi();

  React.useEffect(() => {
    dataAPI.loadMeetings()
    .then(resp => dispatch(loadMeetingsAction(resp)))
  }, []);

  const saveMeeting = (data) => {
    dataAPI.sendMeeting(data)
    dispatch(saveMeetingAction(data))
  }

  const removeItem = (id) => {
    dataAPI.removeMeeting(id)
    dispatch(removeMeetingAction(id))
  }
  return (
    <StyledSection>
      <CalendarForm
        saveMeeting={(data) => saveMeeting(data)}
      />
      <CalendarList
        meetings={meetings}
        removeItem={(id) => removeItem(id)}
      />
    </StyledSection>
  );
};

export default Calendar;
