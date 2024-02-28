class Search {
  _parentElement = document.querySelector('.search');
  getQurey() {
    const qurey = this._parentElement.querySelector('.search__field').value;
    this._clear();
    return qurey;
  }
  _clear() {
    this._parentElement.querySelector('.search__field').value = '';
  }
  addSearchHandler(handler) {
    this._parentElement.addEventListener('submit', function (e) {
      e.preventDefault();
      handler();
    });
  }
}
export default new Search();
