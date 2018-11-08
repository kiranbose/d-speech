import { audiFilesConstants } from '../_actions';

export function audioFiles(state = {}, action) {
  switch (action.type) {
    case audiFilesConstants.getUserAudioFiles:
      state.audioFiles = action.data;
      return state;
    case audiFilesConstants.getMetaData:
      state.metaData = action.data;
      return state;
    default:
      return state
  }
}