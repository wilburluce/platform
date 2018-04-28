import { Action } from '@ngrx/store';
import { Book } from '../models/book';
import {
  BaseAction,
  BaseServiceAction,
  ServiceActionConfig,
  ServiceOperation,
  ServicePhase,
} from '../../shared/base.action';

export enum BookActionTypes {
  Load = '[Book] Load',
  Select = '[Book] Select',
}

/**
 * Every action is comprised of at least a type and an optional
 * payload. Expressing actions as classes enables powerful
 * type checking in reducer functions.
 *
 * See Discriminated Unions: https://www.typescriptlang.org/docs/handbook/advanced-types.html#discriminated-unions
 */
const book = '[Book]';
export class BookSearchRequest extends BaseServiceAction {
  static readonly type = BaseAction.registerType(
    new ServiceActionConfig(book, ServiceOperation.search, ServicePhase.request)
  );
  constructor(public payload: string) {
    super(BookSearchRequest.type);
  }
}

export class BookSearchComplete extends BaseServiceAction {
  static readonly type = BaseAction.registerType(
    new ServiceActionConfig(
      book,
      ServiceOperation.search,
      ServicePhase.complete
    )
  );
  constructor(public payload: Book[]) {
    super(BookSearchComplete.type);
  }
}

export class BookSearchError extends BaseServiceAction {
  static readonly type = BaseAction.registerType(
    new ServiceActionConfig(book, ServiceOperation.search, ServicePhase.error)
  );
  constructor(public payload: string) {
    super(BookSearchError.type);
  }
}

export class Load implements Action {
  readonly type = BookActionTypes.Load;

  constructor(public payload: Book) {}
}

export class Select implements Action {
  readonly type = BookActionTypes.Select;

  constructor(public payload: string) {}
}

/**
 * Export a type alias of all actions in this action group
 * so that reducers can easily compose action types
 */
export type BookActionsUnion =
  | BookSearchRequest
  | BookSearchComplete
  | BookSearchError
  | Load
  | Select;
