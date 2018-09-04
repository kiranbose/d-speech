import { voiceGraphConstants } from '../_actions';

export function voiceGraph(state = {}, action) {
  switch (action.type) {
    case voiceGraphConstants.getFileData:
      state.voiceGraph = action.data;
      return state;
   
    default:
      return state
  }
}