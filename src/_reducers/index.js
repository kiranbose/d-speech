import { combineReducers } from 'redux';

import { authentication } from './authentication.reducer';
import { registration } from './registration.reducer';
import { users } from './users.reducer';
import { alert } from './alert.reducer';
import { recordings } from './recording.reducer';
import { path } from '../_actions/path.actions';

const rootReducer = combineReducers({
  authentication,
  registration,
  users,
  alert,
  path,
  recordings
});

export default rootReducer;