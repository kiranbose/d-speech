import { history } from '../_helpers';

export const pathActions = {
  pathChange,
  path,
  navigateToPage
};

function pathChange(path) {
  return {
    type: 'path-change',
    path
  };
}

export function path(state = {}, action) {
  switch (action.type) {
    case 'path-change':
      return {
        type: 'path-change',
        page: action.path.pathname
      };
    default:
      return state
  }
}

function navigateToPage(path) {
  history.push(path);
}