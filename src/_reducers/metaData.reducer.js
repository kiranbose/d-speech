import { metaDataConstants } from '../_actions';

export function metaData(state = {}, action) {
  switch (action.type) {
    case metaDataConstants.getMetaData:
      return action.data
    default:
      return state
  }
}