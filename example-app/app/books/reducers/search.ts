import {
  BookActionTypes,
  BookActionsUnion,
  Search,
  SearchComplete,
  SearchError,
} from '../actions/book';

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

export function reducer(state = initialState, action: BookActionsUnion): State {
  switch (action.type) {
    case Search.type: {
      const query = action.payload;

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

    case SearchComplete.type: {
      return {
        ids: action.payload.map(book => book.id),
        loading: false,
        error: '',
        query: state.query,
      };
    }

    case SearchError.type: {
      return {
        ...state,
        loading: false,
        error: action.payload,
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
