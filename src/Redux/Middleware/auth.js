

const authInterceptor = ({ dispatch }) => (next) => (action) => {
  if (action.status === 401) {
    dispatch(action.removeJwt());
  } else {
    next(action);
  }
};

export default authInterceptor