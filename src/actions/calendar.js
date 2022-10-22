export const LOAD = "calendar/LOAD";
export const SAVE = "calendar/save";
export const REMOVE = "calendar/remove";

export const loadMeetingsAction = (dataFromAPI) => ({
  type: LOAD,
  payload: dataFromAPI,
});

export const saveMeetingAction = (newMeeting) => ({
  type: SAVE,
  payload: newMeeting,
});

export const removeMeeting = (id) => ({
  type: REMOVE,
  payload: { id },
});
