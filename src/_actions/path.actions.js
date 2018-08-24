export const pathActions = {
    pathChange,
    path
};

function pathChange(path) {
    return { type: 'Path-change', path };
}

export function path(state = {}, action) {
    switch (action.type) {
      case 'Path change':
        return {
          type: 'Path-change',
          message: action.path
        };
      default:
        return state
    }
  }