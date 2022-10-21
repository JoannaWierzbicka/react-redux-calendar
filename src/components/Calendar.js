import React from "react";

import CalendarList from "./CalendarList";
import CalendarForm from "./CalendarForm";
import { useDispatch, useSelector } from "react-redux";

import StyledSection from "../styled/StyledSection";

import { loadMeetingsAction, saveMeetingAction } from "../actions/calendar";

const Calendar = () => {
  const apiUrl = "http://localhost:3005/meetings";

  const dispatch = useDispatch();
  const meetings = useSelector((state) => state.meetings);

  const loadMeetingsFromApi = () => {
    fetch(apiUrl)
      .then((resp) => {
        if (resp.ok) {
          return resp.json();
        }
        throw new Error("Network error!");
      })
      .then((data) => {
        dispatch(loadMeetingsAction(data));
      })
      .catch((error) => {
        console.error(error);
      });
  };

  const sendMeetingToApi = (meetingData) => {
    fetch(apiUrl, {
      method: "POST",
      body: JSON.stringify(meetingData),
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((resp) => {
        if (resp.ok) {
          return resp.json();
        }

        throw new Error("Network error!");
      })
      .then((meetingData) => {
        dispatch(saveMeetingAction(meetingData));
      })
      .catch((err) => {
        console.log(err);
      });
  };

  React.useEffect(() => {
    loadMeetingsFromApi();
  }, []);

  return (
    <StyledSection>
      <CalendarList meetings={meetings} />
      <CalendarForm saveMeeting={sendMeetingToApi} />
    </StyledSection>
  );
};

export default Calendar;
