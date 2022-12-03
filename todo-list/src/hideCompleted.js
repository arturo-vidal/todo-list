import { LitElement, html, css } from "lit";

export class HideCompletedCheckbox extends LitElement{
  render(){
    return html`
    <br/>
        <label id="hideButton">
          <input type="checkbox" @change=${this.hideButton} ?checked=${this.hideCompleted}> Hide completed tasks
        </label>
        `;
  }

  
}

customElements.define("hide-completed", HideCompletedCheckbox);