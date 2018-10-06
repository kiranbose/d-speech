import { voiceGraphConstants } from '../_actions';

export function voiceGraph(state = {}, action) {
  switch (action.type) {
    case voiceGraphConstants.getFileData:
      return action.data;
   
    default:
      return state
  }
}