import {h, patch} from 'picodom/dist/picodom';
import {observable, autorun} from 'mobx';
import bind from 'lodash-decorators/bind';
import debounce from 'lodash-decorators/debounce';
import cond from 'lodash/cond';
import conforms from 'lodash/conforms';
import stubTrue from 'lodash/stubTrue';
import todoStyle from './todo-style';

export default class App {
  static isDetail(hash) {
    return /#\/task\/\d+$/.test(hash);
  }

  static getIdFromUrl() {
    return Number(location.hash.match(/\d+$/)[0]);
  }

  static formType = {
    TITLE: 0,
    DESCRIPTION: 1
  };

  constructor(store) {
    this.store = store;
    this._element = null;
    this._oldNode = null;
  }

  @bind()
  @debounce(150)
  _handleChangeInput(ev) {
    if (this.store.inputting) {
      return;
    }

    const title = ev.target.value;
    if (title === '') {
      this.store.textareaInputEnd();
      return;
    }
    this.store.textareaInputStart();
  }

  @bind()
  _handleAddTask(ev) {
    ev.preventDefault();

    const titleInput = ev.target[App.formType.TITLE];
    const title = titleInput.value;
    const descriptionInput = ev.target[App.formType.DESCRIPTION];
    const description = descriptionInput.value;
    if (title === '') {
      return;
    }
    titleInput.value = '';
    descriptionInput.value = '';

    const task = {
      id: this.store.last === null ? 1 : this.store.last.id + 1,
      title,
      completed: false
    }
    this.store.addTask(task);
    this.store.textareaInputEnd();
  }

  _handleDeleteTask(task) {
    return () => {
      this.store.deleteTask(task);
    }
  }

  _handleToggleState(task) {
    return () => {
      this.store.toggleState(task);
    }
  }

  @bind()
  _formElement() {
    return (
      <form class={todoStyle.form} onsubmit={this._handleAddTask}>
        <input
          class={todoStyle.input}
          onkeydown={this._handleChangeInput}
          placeholder="New Task"/>
        <textarea class={[
          todoStyle.textarea,
          this.store.inputting && todoStyle.textareaActive
          ].join(' ')}
          placeholder="Description"/>
        <button class={todoStyle.button} type="submit">+</button>
      </form>
    );
  }

  @bind()
  _taskListElement() {
    return (
      <ul class={todoStyle.taskList}>
        {
          this.store.tasks.length > 0 &&
          this.store.tasks.map(task => (
            <this._taskElement task={task}/>
          ))
        }
      </ul>
    );
  }

  @bind()
  _taskElement({task}) {
    return (
      <li class={todoStyle.taskItem}>
        <div class={todoStyle.taskButtons}>
          <button
            class={[
              todoStyle.taskCheck,
              task.completed && todoStyle.taskCheckActive
              ].join(' ')}
            onclick={this._handleToggleState(task)}/>
        </div>
        <a class={[
          todoStyle.taskTitle,
          task.completed && todoStyle.taskTitleActive
          ].join(' ')} href={`#/task/${task.id}`}>
          <label>{task.title}</label>
        </a>
        <div class={todoStyle.taskButtons}>
          <button
            class={todoStyle.deleteButton}
            onclick={this._handleDeleteTask(task)}>X</button>
        </div>
      </li>
    )
  }

  _createIndexView() {
    return (
      <div class={todoStyle.body}>
        <div class={todoStyle.app}>
          <this._formElement/>
          <this._taskListElement/>
          <footer class={todoStyle.footer}>{this.store.completedLength + ' / ' + this.store.tasks.length}</footer>
        </div>
      </div>
    );
  }

  _createDetailView(task) {
    return (
      <div class={todoStyle.body}>
        <div class={todoStyle.app}>
          <section class={todoStyle.detail}>
            <a href="#/" class={todoStyle.detailBack}>{'« Back'}</a>
            <h2>{task.title}</h2>
            <p>{task.description}</p>
          </section>
        </div>
      </div>
    );
  }

  render(router) {
    this.store.addTasksChangeListener(() => {
      const newNode = this._nextNode(this.store.location);
      this._element = patch(
        document.body,
        this._element,
        this._oldNode,
        newNode
      );
      this._oldNode = newNode;
    });
  }
}

App.prototype._nextNode = cond([
  [conforms({hash: App.isDetail}), function () {
    const targetId = App.getIdFromUrl();
    const targetTask = this.store.tasks.find(t => t.id === targetId);
    if (typeof targetTask === 'undefined') {
      location.hash = '/';
      return;
    }
    return this._createDetailView(targetTask);
  }],
  [stubTrue, function () {
    return this._createIndexView();
  }],
]);
