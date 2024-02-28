import ParentView from './parentView';
import icons from '../../img/icons.svg';
import siblingView from './siblingView';
class Resultview extends ParentView {
  _parentElement = document.querySelector('.results');
  _message = 'No recipes found for your query. Please try again!';
  renderMarkup() {
    console.log(this._data);

    return this._data
      .map(results => siblingView.render(results, false))
      .join('');
  }
}

export default new Resultview();
