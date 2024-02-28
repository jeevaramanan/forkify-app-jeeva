import ParentView from './parentView';
import icons from '../../img/icons.svg';
class UploadView extends ParentView {
  _parentElement = document.querySelector('.upload');
  _window = document.querySelector('.add-recipe-window');
  _overlay = document.querySelector('.overlay');
  btnOpen = document.querySelector('.nav__btn--add-recipe');
  btnClose = document.querySelector('.btn--close-modal');
  constructor() {
    super();
    this.formOpen();
    // this.addUploadRecipe();
  }
  toggle() {
    this._window.classList.toggle('hidden');
    this._overlay.classList.toggle('hidden');
  }

  formOpen() {
    this.btnOpen.addEventListener('click', this.toggle.bind(this));
    this.btnClose.addEventListener('click', this.toggle.bind(this));
    this._overlay.addEventListener('click', this.toggle.bind(this));
  }
  addUploadRecipe(handler) {
    this._parentElement.addEventListener('submit', function (e) {
      e.preventDefault();
      const uploadData = [...new FormData(this)];
      const uploadRecipe = Object.fromEntries(uploadData);
      console.log(uploadRecipe);
      handler(uploadRecipe);
    });
  }
  renderMarkup() {}
}

export default new UploadView();
