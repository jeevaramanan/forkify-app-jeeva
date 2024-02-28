import ParentView from './parentView';
import icons from '../../img/icons.svg';

class Pagination extends ParentView {
  _parentElement = document.querySelector('.pagination');

  renderMarkup() {
    const curPage = this._data.search.pageNumber;

    const numPage = Math.ceil(
      Number(this._data.search.results.length / this._data.search.resPerpage)
    );

    // console.log(numPage);
    if (curPage === 1 && numPage > curPage) {
      return `<button  data-num='${
        curPage + 1
      }' class="btn--inline pagination__btn--next">
      <span>page ${curPage + 1}</span>
      <svg class="search__icon">
        <use href="${icons}#icon-arrow-right"></use>
      </svg>
    </button>`;
    }
    if (curPage === numPage && numPage > 1) {
      return `<button data-num='${
        curPage - 1
      }' class="btn--inline pagination__btn--prev">
      <svg class="search__icon">
        <use href="${icons}#icon-arrow-left"></use>
      </svg>
      <span>Page ${curPage - 1}</span>
    </button>`;
    }
    if (curPage < numPage) {
      return `<button data-num='${
        curPage - 1
      }' class="btn--inline pagination__btn--prev">
      <svg class="search__icon">
        <use href="${icons}#icon-arrow-left"></use>
      </svg>
      <span>Page ${curPage - 1}</span>
    </button>
    <button  data-num='${
      curPage + 1
    }' class="btn--inline pagination__btn--next">
      <span>Page ${curPage + 1}</span>
      <svg class="search__icon">
        <use href="${icons}#icon-arrow-right"></use>
      </svg>
    </button>`;
    }
  }
  addpageRenderhandler(handler) {
    this._parentElement.addEventListener('click', function (e) {
      const btn = e.target.closest('.btn--inline');
      const goTopage = Number(btn.dataset.num);
      if (!btn) return;
      handler(goTopage);
    });
  }
}

export default new Pagination();
