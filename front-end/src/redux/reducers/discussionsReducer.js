import { fromJS } from 'immutable';

export const initialState = fromJS({
  lecturesDiscussions: [],
  isLoading: false,
  discussionsError: null,
});

export const discussionsReducer = (state = initialState, action = {}) => {
  switch (action.type) {
    default: {
      return state;
    }
  }
};
