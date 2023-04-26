export default class LoadMoreBtn {
    constructor({ selector, hidden = false }) {
      this.refs = this.getRefs(selector);
  
      if (hidden) {
        this.hide();
      }
    }
  
    getRefs(selector) {
      const refs = {
        buttonEl: document.querySelector(selector),
        label: document.querySelector(`${selector} .label`)
      };
  
      return refs;
    }
  
    disabled() {
      this.refs.buttonEl.disabled = true;
      this.refs.label.textContent = 'Loading...';
    }
    enable() {
      this.refs.buttonEl.disabled = false;
      this.refs.label.textContent = 'Load more';
    }
  
    show() {
      this.refs.buttonEl.classList.remove('is-hidden');
    }
  
    hide() {
      this.refs.buttonEl.classList.add('is-hidden');
    }
  }
  