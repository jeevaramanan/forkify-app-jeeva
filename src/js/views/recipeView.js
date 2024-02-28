import { Fraction } from 'fractional';
import icons from '../../img/icons.svg';
import ParentView from './parentView.js';

class Recipeview extends ParentView {
  _parentElement = document.querySelector('.recipe');
  _message = 'No recipes found for your query. Please try again!';
  // render(data) {
  //   this.#data = data;

  //   const markup = this.renderMarkup();
  //   this.clear();
  //   this.#parentElement.insertAdjacentHTML('afterbegin', markup);
  // }

  // renderSpinner() {
  //   const markup = `<div class="spinner">
  //   <svg>
  //     <use href="${icons}#icon-loader"></use>
  //   </svg>
  // </div>`;
  //   this.#parentElement.innerHTML = '';
  //   this.#parentElement.insertAdjacentHTML('afterbegin', markup);
  // }
  // clear() {
  //   this.#parentElement.innerHTML = '';
  // }
  addhandlerRender(handler) {
    ['hashchange', 'load'].forEach(el => {
      window.addEventListener(el, handler);
    });
  }
  adhandleServings(handler) {
    this._parentElement.addEventListener('click', function (e) {
      const btn = e.target.closest('.btn--increase-servings');
      if (!btn) return;
      const { ser } = btn.dataset;
      if (+ser > 0) handler(+ser);
    });
  }

  addBookmarhandler(handler) {
    this._parentElement.addEventListener('click', function (e) {
      const btn = e.target.closest('.btn--bookmark');
      // console.log(btn);
      if (!btn) return;
      handler();
    });
  }
  // renderErrorMsg(message = this.#message) {
  //   const markup = `<div class="error">
  //   <div>
  //     <svg>
  //       <use href="${icons}svg#icon-alert-triangle"></use>
  //     </svg>
  //   </div>
  //   <p>${message}</p>
  // </div>`;
  //   this.clear();
  //   this.#parentElement.insertAdjacentHTML('afterbegin', markup);
  // }
  // renderSuccessMsg(message = '') {
  //   const markup = `<div class="message">
  //   <div>
  //     <svg>
  //       <use href="${icons}svg#icon-alert-smile"></use>
  //     </svg>
  //   </div>
  //   <p>${message}</p>
  // </div>`;
  //   this.clear();
  //   this.#parentElement.insertAdjacentHTML('afterbegin', markup);
  // }
  renderMarkup() {
    // console.log(this._data);
    return ` <figure class="recipe__fig">
    <img src="${this._data.image}" alt="${
      this._data.title
    }" class="recipe__img" />
    <h1 class="recipe__title">
      <span>${this._data.title}</span>
    </h1>
  </figure>

  <div class="recipe__details">
    <div class="recipe__info">
      <svg class="recipe__info-icon">
        <use href="${icons}#icon-clock"></use>
      </svg>
      <span class="recipe__info-data recipe__info-data--minutes">${
        this._data.cookingTime
      }</span>
      <span class="recipe__info-text">minutes</span>
    </div>
    <div class="recipe__info">
      <svg class="recipe__info-icon">
        <use href="${icons}#icon-users"></use>
      </svg>
      <span class="recipe__info-data recipe__info-data--people">${
        this._data.servings
      }</span>
      <span class="recipe__info-text">servings</span>

      <div class="recipe__info-buttons">
        <button data-ser='${
          this._data.servings - 1
        }' class="btn--tiny btn--increase-servings">
          <svg>
            <use href="${icons}#icon-minus-circle"></use>
          </svg>
        </button>
        <button data-ser='${
          this._data.servings + 1
        }' class="btn--tiny btn--increase-servings">
          <svg>
            <use href="${icons}#icon-plus-circle"></use>
          </svg>
        </button>
      </div>
    </div>

    <div class="recipe__user-generated ${this._data.key ? '' : 'hidden'}">
      <svg>
        <use href="${icons}#icon-user"></use>
      </svg>
    </div>
    <button class="btn--round btn--bookmark">
      <svg class="">
        <use href="${icons}#icon-bookmark${
      this._data.bookmr ? '-fill' : ''
    }"></use>
      </svg>
    </button>
  </div>

  <div class="recipe__ingredients">
    <h2 class="heading--2">Recipe ingredients</h2>
    <ul class="recipe__ingredient-list">
    ${this._data.ingredients.map(this.ingredients).join('')}
      </ul>
  </div>

  <div class="recipe__directions">
    <h2 class="heading--2">How to cook it</h2>
    <p class="recipe__directions-text">
      This recipe was carefully designed and tested by
      <span class="recipe__publisher">${
        this._data.publisher
      }</span>. Please check out
      directions at their website.
    </p>
    <a
      class="btn--small recipe__btn"
      href="${this._data.sourceUrl}"
      target="_blank"
    >
      <span>Directions</span>
      <svg class="search__icon">
        <use href="${icons}#icon-arrow-right"></use>
      </svg>
    </a>
  </div>`;
  }

  ingredients(ing) {
    return `
      <li class="recipe__ingredient">
      <svg class="recipe__icon">
        <use href="${icons}#icon-check"></use>
      </svg>
      <div class="recipe__quantity">${
        ing.quantity ? new Fraction(ing.quantity).toString() : ''
      }</div>
      <div class="recipe__description">
      
        <span class="recipe__unit">${ing.unit}</span>
        ${ing.description}
      </div>
    </li>
      `;
  }
}

export default new Recipeview();
