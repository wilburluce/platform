import { Action } from '@ngrx/store';

/**
 *
*export enum CollectionActionTypes {
  AddBook = '[Collection] Add Book',
  AddBookSuccess = '[Collection] Add Book Success',
  AddBookFail = '[Collection] Add Book Fail',
  RemoveBook = '[Collection] Remove Book',
  RemoveBookSuccess = '[Collection] Remove Book Success',
  RemoveBookFail = '[Collection] Remove Book Fail',
  Load = '[Collection] Load',
  LoadSuccess = '[Collection] Load Success',
  LoadFail = '[Collection] Load Fail',
}
 */

/*
 *  BaseAction
 *  This is the base class for Actions. It implements the ngrx Action interface.
 *
 *  Each subclass of BaseAction must add a static property (by convention: type) whose value is set by calling registerType.
 *  which creates the type string and ensures no dups. Putting the type as static property eliminates the
 *  need for separate action type enums. I felt there was a code smell there because we were composing namespaces by hand
 *  i.e. there is a hierarchy [type] (e.g. Book) -> action (e.g. Add, Remove) -> status (Request, Complete, Error)
 *  that could be done with composition vs strings like '[Collection] Remove Book Fail'. See ServiceActionConfig for
 *  more info.
 */
export abstract class BaseAction implements Action {
  static actionTypes = new Set<string>();
  readonly type: string;

  static registerType(config: ActionConfigInterface): string {
    const typeStr = config.makeTypeString();
    if (BaseAction.actionTypes.has(typeStr)) {
      throw new Error(`Duplicate action type: '${typeStr}'`);
    }
    BaseAction.actionTypes.add(typeStr);
    return typeStr;
  }

  constructor(type: string) {
    this.type = type;
  }
}

/**
 *  Action configurations need to implement makeTypeString(). This is to allow arbitrary action creation
 *  types (and not just strings)
 */
interface ActionConfigInterface {
  makeTypeString(): string;
}

/**
 *  This is for creating config for basic actions -- takes a list of strings
 */
export class ActionConfig implements ActionConfigInterface {
  public config: string[];
  public makeTypeString() {
    return this.config.join(' ');
  }
  constructor(...config: string[]) {
    this.config = config;
  }
}
/*
 *  These 2 enums are used to help compose actions for async service calls
 */
export enum ServiceOperation {
  delete,
  fetch,
  save,
  search,
}
export enum ServicePhase {
  request,
  complete,
  error,
}

/**
 *  This is for service action configuration
 */
export class ServiceActionConfig implements ActionConfigInterface {
  public makeTypeString() {
    return `${this.entity} ${ServiceOperation[this.operation]} ${
      ServicePhase[this.phase]
    }`;
  }
  constructor(
    public entity: string,
    public operation: ServiceOperation,
    public phase: ServicePhase
  ) {}
}
