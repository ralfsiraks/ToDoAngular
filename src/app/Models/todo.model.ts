import { Todo } from '../ToDo/interfaces/todo';

export class TodoModel {
  private _name: string;
  private _note: string;
  private _src: string;
  private _alt: string;

  constructor(name: string, note: string, src: string, alt: string) {
    this._name = name;
    this._note = note;
    this._src = src;
    this._alt = alt;
  }

  get getTodo(): Todo {
    return {
      name: this._name,
      note: this._note,
      imgSrc: {
        src: this._src,
        alt: this._alt,
      },
    };
  }
}
