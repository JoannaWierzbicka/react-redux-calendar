import React from "react";
import {
  saveMeetingAction,
  removeMeeting,
} from "../actions/calendar";

export class DataApi extends React.Component {
  apiUrl = "http://localhost:3005/meetings";

  loadMeetings = () => {
    return fetch(this.apiUrl)
      .then((resp) => {
        if (resp.ok) {
          return resp.json();
        }
        throw new Error("Network error!");
      })
      .catch((error) => {
        console.error(error);
      });
  };

  sendMeeting = (meetingData) => {
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
      .catch((err) => {
        console.log(err);
      });
  };

  removeMeeting = (id) => {
    fetch(`${this.apiUrl}/${id}`, {
      method: "DELETE",
    })
      .then((resp) => {
        if (resp.ok) {
          return resp.json();
        }
        throw new Error("Network error!");
      })
      .catch((err) => {
        console.log(err);
      });
  };
}

export default DataApi;
