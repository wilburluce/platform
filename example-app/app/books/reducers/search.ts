import * as book from '../actions/book';

export interface State {
  ids: string[];
  loading: boolean;
  error: string;
  query: string;
}

const initialState: State = {
  ids: [],
  loading: false,
  error: '',
  query: '',
};

export function reducer(state = initialState, action: book.BookActionsUnion): State {
  switch (action.type) {
    case book.Search.type: {
      const query = (<book.Search>action).payload;

      if (query === '') {
        return {
          ids: [],
          loading: false,
          error: '',
          query,
        };
      }

      return {
        ...state,
        loading: true,
        error: '',
        query,
      };
    }

    case book.SearchComplete.type: {
      return {
        ids: (<book.SearchComplete>action).payload.map(book => book.id),
        loading: false,
        error: '',
        query: state.query,
      };
    }

    case book.SearchError.type: {
      return {
        ...state,
        loading: false,
        error: (<book.SearchError>action).payload,
      };
    }

    default: {
      return state;
    }
  }
}

export const getIds = (state: State) => state.ids;

export const getQuery = (state: State) => state.query;

export const getLoading = (state: State) => state.loading;

export const getError = (state: State) => state.error;
