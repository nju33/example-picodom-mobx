import bind from 'lodash-decorators/bind';
import {useStrict, observable, computed, action, autorun} from 'mobx';

useStrict(true);

export default class TodoStore {
  @observable location = {
    hash: location.hash
  };
  @observable tasks = [
    {
      id: 3,
      title: 'baz',
      description: 'piyo',
      completed: false
    },
    {
      id: 2,
      title: 'bar',
      description: 'fuga',
      completed: false
    },
    {
      id: 1,
      title: 'foo',
      description: 'hoge',
      completed: true
    }
  ];
  @observable inputting = false;

  @computed get last() {
    return this.tasks[0] || null;
  }

  @computed get completedLength() {
    return this.tasks.filter(t => t.completed).length;
  }

  constructor() {
    this._dispose = null;
  }

  @bind()
  @action
  _handleUpdateHash() {
    this.location.hash = location.hash;
  }

  @action
  textareaInputStart() {
    this.inputting = true;
  }

  @action
  textareaInputEnd() {
    this.inputting = false;
  }

  @action
  addTask(task) {
    this.tasks.unshift(task);
  }

  @action
  deleteTask(task) {
    const idx = this.tasks.findIndex(t => t === task);
    if (idx > -1) {
      this.tasks.splice(idx, 1);
    }
  }

  @action
  toggleState(task) {
    const target = this.tasks.find(t => t === task);
    if (typeof target === 'undefined') {
      return;
    }
    target.completed = !target.completed;
  }

  addHashChangeListener() {
    window.addEventListener('hashchange', this._handleUpdateHash);
  }

  addTasksChangeListener(cb) {
    this._dispose = autorun(cb);
  }

  removeTasksChangeListener() {
    if (typeof this._dispose === 'function') {
      this._dispose();
    }
  }
}
