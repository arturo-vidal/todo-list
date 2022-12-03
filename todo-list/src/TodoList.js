import { LitElement, html, css } from 'lit';
import { Footer } from './footer';
import { HideCompletedCheckbox } from './hideCompleted';


export class TodoList extends LitElement {
  static get properties() {
    return {
      tasks: { type: Array },
      hideCompleted: {}
    };
  }

  static get styles() {
    return css`
      :host {
        min-height: 100vh;
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: flex-start;
        font-size: calc(10px + 2vmin);
        color: #1a2b42;
        max-width: 100vw;
        margin: 0 auto;
        text-align: center;
        background-color: var(--todo-list-background-color);
      }

      main {
        flex-grow: 1;
      }

      ul {
        border: 5px solid black;
        border-radius: 10px;
        background-color: #e9e9f7;
      }

      li{
        text-align: left;
        max-width: 95vw;
        cursor: pointer;
      }

      .completed {
        text-decoration-line: line-through;
        color: #777;
      }
      
      #newtask {
        margin-bottom: 35px;
      }

      
    `;
  }

  constructor() {
    super();
    this.tasks = [
      {text: "create a component", completed: true},
      {text: "render it", completed: false}
    ];
    this.hideCompleted = false;
  }

  render() {

    const listItems = this.hideCompleted ? this.tasks.filter((item)=> !item.completed) : this.tasks;
    const list = html`<ul>
          ${listItems.map((task)=> html`<li class=${task.completed ? "completed" : ""} @click=${()=>this.completeTask(task)}>${task.text}</li>`)}
        </ul>`;

    return html`
      <main>
        <h1>Things to do: </h1>
        ${listItems.length > 0 ? list : html`<p>All tasks completed!!</p>`}
        <input type="text" placeHolder="New task" id="newtask"/>
        <button @click=${this.addTask}>Add</button>
        <br/>
        <label id="hideButton">
          <input type="checkbox" @change=${this.hideButton} ?checked=${this.hideCompleted}> Hide completed tasks
        </label>
      </main>
      <footer-template></footer-template>
    `;
  }

  get input(){
    return this.renderRoot.querySelector("#newtask");
  }
  addTask(){
    if(this.input.value !== ""){
      this.tasks= [...this.tasks, {text: this.input.value, completed: false}];
    this.input.value= "";
    }
  }
  completeTask(task){
    task.completed= !task.completed;
    this.requestUpdate();
  }
  hideButton(event){
    this.hideCompleted = event.target.checked;
  }
}
