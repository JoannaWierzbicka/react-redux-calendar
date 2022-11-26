export const LOAD = "calendar/LOAD";
export const SAVE = "calendar/save";
export const REMOVE = "calendar/remove";

export const loadMeetingsAction = (data) => ({
  type: LOAD,
  payload: data,
});

export const saveMeetingAction = (newMeeting) => ({
  type: SAVE,
  payload: newMeeting,
});

export const removeMeetingAction = (id) => ({
  type: REMOVE,
  payload: { id },
});
