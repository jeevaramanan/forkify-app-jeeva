import ParentView from './parentView';
import icons from '../../img/icons.svg';
import siblingView from './siblingView';
class BookmarkView extends ParentView {
  _parentElement = document.querySelector('.bookmarks__list');
  _message = ' No bookmarks yet. Find a nice recipe and bookmark it :)';

  renderMarkup() {
    return this._data
      .map(results => siblingView.render(results, false))
      .join('');
  }
  adbookmarkHandler(handler) {
    window.addEventListener('load', handler);
  }
}

export default new BookmarkView();
