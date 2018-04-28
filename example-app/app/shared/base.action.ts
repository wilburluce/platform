import { Action } from '@ngrx/store';

/*
 *  BaseAction
 *  This is the base class for Actions. It implements the ngrx Action interface.
 *
 *  Each subclass of BaseAction must add a static property type whose value is set by calling registerType.
 *  This method ensures there are no duplicate action type strings.
 */
export class BaseAction implements Action {
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

  static dumpTypes() {
    BaseAction.actionTypes.forEach(v => console.log(v));
  }

  constructor(type: string) {
    this.type = type;
  }
}

/*
 *  These 2 enums are used to compose actions for async service calls
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

interface ActionConfigInterface {
  makeTypeString(): string;
}

/**
 *  This class is for creating config for service actions.
 */
export class ServiceActionConfig implements ActionConfigInterface {
  makeTypeString() {
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

export class ActionConfig implements ActionConfigInterface {
  public config: string[];
  makeTypeString() {
    return this.config.join(' ');
  }
  constructor(...config: string[]) {
    this.config = config;
  }
}

/*  BaseServiceAction
 *  The base class for all actions that are async (typically services).
 */
export abstract class BaseServiceAction extends BaseAction {
  constructor(readonly type: string) {
    super(type);
  }
}
