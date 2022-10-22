import { LOAD, SAVE, REMOVE } from "../actions/calendar";

const initialState = {
  meetings: [],
};

export const reducer = (state = initialState, action) => {
  switch (action.type) {
    case LOAD:
      return {
        ...state,
        meetings: action.payload,
      };
    case SAVE:
      return {
        ...state,
        meetings: [...state.meetings, action.payload],
      };
    case REMOVE:
      return {
        ...state,
        meetings: state.meetings.filter(
          (meeting) => meeting.id !== action.payload.id
        ),
      };
    default:
      return state;
  }
};

export default reducer;
