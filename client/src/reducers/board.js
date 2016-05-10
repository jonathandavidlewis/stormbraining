import {
  NEW_IDEA,
  GET_ONE_BOARD,
  UP_VOTE,
  DELETE_IDEA,
  CLEAR_BOARD_VIEW,
  REFRESH_BOARD_VIEW,
  SHUFFLE_IDEAS,
  SORT_IDEAS_BY_VOTES,
  SORT_IDEAS_BY_CONTENT,
} from '../actions/action_types';

const INITIAL_STATE = { id: '', title: '', ideas: [] };

export default function (state = INITIAL_STATE, action) {
  switch (action.type) {
    case NEW_IDEA:
      return state;

    case GET_ONE_BOARD:
      return action.payload.data.board;

    case UP_VOTE:
      return state;

    case DELETE_IDEA:
      return state;

    case CLEAR_BOARD_VIEW:
      return INITIAL_STATE;

    case REFRESH_BOARD_VIEW:
      const changedIdea = action.payload;
      let updateComplete = false;
      // Update idea based on whether or not it is marked toBeDeleted and by matching ids
      const updatedIdeas = state.ideas.reduce((memo, idea) => {
        if (idea.id === changedIdea.id) {
          if (!changedIdea.toBeDeleted) {
            memo.push(changedIdea);
          }
          updateComplete = true;
        } else {
          memo.push(idea);
        }
        return memo;
      }, []);
      // Add new idea if changedIdea id did not matching existing ids
      if (!updateComplete && !changedIdea.toBeDeleted) {
        updatedIdeas.push(changedIdea);
      }
      return { ...state, ideas: updatedIdeas };

    case SHUFFLE_IDEAS:
      let i = 0;
      let j = 0;
      let temp = null;
      const ideasArray = state.ideas.slice();

      for (i = ideasArray.length - 1; i > 0; i -= 1) {
        j = Math.floor(Math.random() * (i + 1));
        temp = ideasArray[i];
        ideasArray[i] = ideasArray[j];
        ideasArray[j] = temp;
      }

      return { ...state, ideas: ideasArray };

    case SORT_IDEAS_BY_VOTES:
      const array = state.ideas.slice();
      const order = action.order;

      array.sort((a, b) => {
        if (order === 1) { return b.upvotes.length - a.upvotes.length; }
        if (order === 2) { return a.upvotes.length - b.upvotes.length; }
        return new Date(a.createdAt) - new Date(b.createdAt);
      });

      return { ...state, ideas: array };

    default:
      return state;
  }
}
