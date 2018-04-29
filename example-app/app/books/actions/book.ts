import { Book } from '../models/book';
import {
  ActionConfig,
  BaseAction,
  ServiceActionConfig,
  ServiceOperation,
  ServicePhase,
} from '../../shared/base.action';

/**
 * Every action is comprised of at least a type and an optional
 * payload. Expressing actions as classes enables powerful
 * type checking in reducer functions.
 *
 * See Discriminated Unions: https://www.typescriptlang.org/docs/handbook/advanced-types.html#discriminated-unions
 */
const actionGroupId = '[Book]';

export class Search extends BaseAction {
  static readonly type = BaseAction.registerType(
    new ServiceActionConfig(
      actionGroupId,
      ServiceOperation.search,
      ServicePhase.request
    )
  );
  constructor(public payload: string) {
    super(Search.type);
  }
}

export class SearchComplete extends BaseAction {
  static readonly type = BaseAction.registerType(
    new ServiceActionConfig(
      actionGroupId,
      ServiceOperation.search,
      ServicePhase.complete
    )
  );
  constructor(public payload: Book[]) {
    super(SearchComplete.type);
  }
}

export class SearchError extends BaseAction {
  static readonly type = BaseAction.registerType(
    new ServiceActionConfig(
      actionGroupId,
      ServiceOperation.search,
      ServicePhase.error
    )
  );
  constructor(public payload: string) {
    super(SearchError.type);
  }
}

export class Load extends BaseAction {
  static readonly type = BaseAction.registerType(
    new ActionConfig(actionGroupId, 'load')
  );
  constructor(public payload: Book) {
    super(Load.type);
  }
}

export class Select extends BaseAction {
  static readonly type = BaseAction.registerType(
    new ActionConfig(actionGroupId, 'select')
  );
  constructor(public payload: string) {
    super(Select.type);
  }
}

/**
 * Export a type alias of all actions in this action group
 * so that reducers can easily compose action types
 */
export type BookActionsUnion =
  | Search
  | SearchComplete
  | SearchError
  | Load
  | Select;
