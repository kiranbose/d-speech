
export function loadingBar(state = {loading: false}, action) {
  switch (action.type) {
    case 'start_loading':
      state.loading = action.loading;
      return state;
    case 'stop_loading':
      state.loading = action.loading;
      return state;
    default:
      return state
  }
}