import { alertConstants } from '../_constants';
import config from 'config';

export function alert(state = {}, action) {
  config.showAlert = true;
  switch (action.type) {
    case alertConstants.SUCCESS:
      return {
        type: 'success',
        message: action.message
      };
    case alertConstants.ERROR:
      return {
        type: 'warning',
        message: action.message
      };
    case alertConstants.CLEAR:
      return {};
    default:
      return state
  }
}