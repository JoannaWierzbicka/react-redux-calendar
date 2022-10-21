export const LOAD = 'calendar/LOAD'
export const SAVE = 'calendar/save'

export const loadMeetingsAction = (dataFromAPI) => ({
    type: LOAD,
    payload: dataFromAPI
}) 

export const saveMeetingAction = (newMeeting) => ({
  type: SAVE,
  payload: newMeeting,
});