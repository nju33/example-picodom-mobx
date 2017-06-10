import {h, patch} from 'picodom/dist/picodom';
import TodoStore from './todo-store';
import App from './app';

const todoStore = new TodoStore();
todoStore.addHashChangeListener();
const app = new App(todoStore);
app.render();
