import icons from '../../img/icons.svg';

export default class ParentView {
  _data;

  render(data, render = true) {
    if (!data || (Array.isArray(data) && data.length === 0))
      return this.renderErrorMsg();
    // console.log(data);
    this._data = data;

    const markup = this.renderMarkup();
    if (!render) return markup;
    this.clear();
    this._parentElement.insertAdjacentHTML('afterbegin', markup);
  }

  renderSpinner() {
    const markup = `<div class="spinner">
    <svg>
      <use href="${icons}#icon-loader"></use>
    </svg>
  </div>`;
    this._parentElement.innerHTML = '';
    this._parentElement.insertAdjacentHTML('afterbegin', markup);
  }
  clear() {
    this._parentElement.innerHTML = '';
  }
  renderErrorMsg(message = this._message) {
    const markup = `<div class="error">
    <div>
      <svg>
        <use href="${icons}svg#icon-alert-triangle"></use>
      </svg>
    </div>
    <p>${message}</p>
  </div>`;
    this.clear();
    this._parentElement.insertAdjacentHTML('afterbegin', markup);
  }
  renderSuccessMsg(message = '') {
    const markup = `<div class="message">
    <div>
      <svg>
        <use href="${icons}svg#icon-alert-smile"></use>
      </svg>
    </div>
    <p>${message}</p>
  </div>`;
    this.clear();
    this._parentElement.insertAdjacentHTML('afterbegin', markup);
  }
  addhandlerRender(handler) {
    ['hashchange', 'load'].forEach(el => {
      window.addEventListener(el, handler);
    });
  }

  update(data) {
    this._data = data;
    const newMarkup = this.renderMarkup();
    const newDOM = document.createRange().createContextualFragment(newMarkup);
    const newElements = Array.from(newDOM.querySelectorAll('*'));

    const cueElements = Array.from(this._parentElement.querySelectorAll('*'));
    // console.log(newElements, cueElements);
    newElements.forEach((el, i) => {
      const curEl = cueElements[i];
      // console.log(el.isEqualNode(curEl));
      // console.log(el.firstChild?.nodeValue);
      if (!el.isEqualNode(curEl) && el.firstChild?.nodeValue.trim() !== '') {
        curEl.textContent = el.textContent;
      }
      if (!el.isEqualNode(curEl)) {
        // console.log(el.attributes);
        Array.from(el.attributes).forEach(atr => {
          curEl.setAttribute(atr.name, atr.value);
        });
      }
    });
  }
}
