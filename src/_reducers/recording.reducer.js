import { recordingConstants } from '../_actions';

export function recordings(state = {}, action) {
  switch (action.type) {
    case recordingConstants.start:
      state.recordings = action.data;
      return state;
    case recordingConstants.stop:
      state.recordings = action.data;
      return state;
    case recordingConstants.clear:
      state.recordings = action.data;
      return state;
    case recordingConstants.send:
      return { 
        ...state,
        recordings: action.data
      };
    case recordingConstants.send_success:
      // add 'deleting:true' property to user being deleted
      return {
        ...state,
        recordings: { success: action.data.result }
      };
   
    default:
      return state
  }
}