import { audiFilesConstants } from '../_actions';

export function audioFiles(state = {}, action) {
  switch (action.type) {
    case audiFilesConstants.getUserAudioFiles:
      state.audioFiles = action.data;
      return state;
   
    default:
      return state
  }
}