import React from "react";
import {
  loadMeetingsAction,
  saveMeetingAction,
  removeMeeting,
} from "../actions/calendar";

export class CalendarApi extends React.Component {
  apiUrl = "http://localhost:3005/meetings";

  loadMeetingsFromApi = (callback) => {
    fetch(this.apiUrl)
      .then((resp) => {
        if (resp.ok) {
          return resp.json();
        }
        throw new Error("Network error!");
      })
      .then((data) => callback(loadMeetingsAction(data)))
      .catch((error) => {
        console.error(error);
      });
  };

  sendMeetingToApi = (meetingData, callback) => {
    fetch(this.apiUrl, {
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
      .then((data) => callback(saveMeetingAction(data)))
      .catch((err) => {
        console.log(err);
      });
  };

  removeMeetingFromApi = (id, callback) => {
    fetch(`${this.apiUrl}/${id}`, {
      method: "DELETE",
    })
      .then((resp) => {
        if (resp.ok) {
          return resp.json();
        }
        throw new Error("Network error!");
      })
      .then(() => {
        callback(removeMeeting(id));
      })
      .catch((err) => {
        console.log(err);
      });
  };
}

export default CalendarApi;
