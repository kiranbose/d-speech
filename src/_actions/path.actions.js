export const pathActions = {
    pathChange,
    path
};

function pathChange(path) {
    return { type: 'path-change', path };
}

export function path(state = {}, action) {
    switch (action.type) {
      case 'path-change':
        return {
          type: 'path-change',
          path: action.path.pathname
        };
      default:
        return state
    }
  }