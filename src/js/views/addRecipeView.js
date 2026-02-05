import View from './View';
import icons from 'url:../../img/icons.svg';

class addRecipeView extends View {
  _parentElement = document.querySelector('.upload');
  _window = document.querySelector('.add-recipe-window');
  _overlay = document.querySelector('.overlay');
  _btnOpen = document.querySelector('.nav__btn--add-recipe');
  _btnClose = document.querySelector('.btn--close-modal');

  constructor() {
    super();
    this._addHandlerShowWindow();
    this._addHandlerWindow();
  }

  toggleWindow() {
    this._overlay.classList.toggle('hidden');
    this._window.classList.toggle('hidden');
  }

  _addHandlerShowWindow() {
    this._btnOpen.addEventListener('click', this.toggleWindow.bind(this));
  }

  _addHandlerWindow() {
    this._btnClose.addEventListener('click', this.toggleWindow.bind(this));
    this._overlay.addEventListener('click', this.toggleWindow.bind(this));
  }

  addHandlerUpload(handler) {
    this._parentElement.addEventListener('submit', function (e) {
      e.preventDefault();
      const dataArr = [...new FormData(this)];
      const data = Object.fromEntries(dataArr);
      handler(data);
    });
  }

  _generateMarkup() {
    const currentpage = this._data.page;

    const numPages = Math.ceil(
      this._data.results.length / this._data.resultsPerPage,
    );

    // Page 1, there other pages  = 1....5
    if (currentpage === 1 && numPages > 1) {
      return this._generateMarkupButton(currentpage, 'next');
    }

    //Last page
    if (currentpage === numPages && numPages > 1) {
      return this._generateMarkupButton(currentpage, 'prev');
    }
    //Other page
    if (currentpage < numPages) {
      return (
        this._generateMarkupButton(currentpage, 'prev') +
        this._generateMarkupButton(currentpage, 'next')
      );
    }

    // Page 1, there no other pages  = 1
    return '';
  }
}

export default new addRecipeView();
