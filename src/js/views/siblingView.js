import ParentView from './parentView';
import icons from '../../img/icons.svg';
class SiblingView extends ParentView {
  _parentElement = '';

  renderMarkup() {
    // console.log(this._data);
    const id = window.location.hash.slice(1);
    console.log(id === this._data.id);

    return `
    <li class="preview">
    <a class="preview__link  ${
      this._data.id === id ? 'preview__link--active' : ''
    }" href="#${this._data.id}">
      <figure class="preview__fig">
        <img src="${this._data.image}" alt="Test" />
      </figure>
      <div class="preview__data">
        <h4 class="preview__title">P${this._data.title}</h4>
        <p class="preview__publisher">${this._data.publisher}</p>
        <div class="preview__user-generated ${this._data.key ? '' : 'hidden'}">
          <svg>
            <use href="${icons}#icon-user"></use>
          </svg>
        </div>
      </div>
    </a>
  </li> `;
  }
}

export default new SiblingView();
