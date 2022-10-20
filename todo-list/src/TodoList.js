import { LitElement, html, css } from 'lit';


export class TodoList extends LitElement {
  static get properties() {
    return {
      tasks: { type: Array },
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

      .app-footer {
        font-size: 25px;
        align-items: center;
        margin: 30px;
      }

      #contacts a {
        margin-left: 35px;
      }
    `;
  }

  constructor() {
    super();
    this.tasks = [
      {text: "create a component", completed: true},
      {text: "render it", completed: false}
    ];
  }

  get input(){
    return this.renderRoot?.querySelector("#newtask") ?? null;
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

  render() {
    return html`
      <main>
        <h1>Things to do: </h1>
        <ul>
          ${this.tasks.map((task)=> html`<li class=${task.completed ? "completed" : ""} @click=${()=>this.completeTask(task)}>${task.text}</li>`)}
        </ul>
        <input type="text" placeHolder="New task" id="newtask"/>
        <button @click=${this.addTask}>Add</button>
      </main>
      <footer class="app-footer">
        <hr/>
        <p>Code by Arturo Vidal</p> 
        <p>Contact:</p>
        <div id="contacts">
          <a className="contact-link" target="_blank" href="https://codepen.io/arturo_vidal"><i class="fa-brands fa-codepen"></i> Code Pen</a>

          <a className="contact-link" target="_blank" href="https://www.linkedin.com/in/garturovidal/"><i class="fa-brands fa-linkedin"></i> Linkedin</a>

          <a className="contact-link" target="_blank" href="https://github.com/arturo-vidal"><i class="fa-brands fa-github"></i> Github</a>

        </div>
      </footer>
    `;
  }
}
