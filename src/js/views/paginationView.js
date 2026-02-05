import View from './View';
import icons from 'url:../../img/icons.svg';

class PaginationView extends View {
  _parentElement = document.querySelector('.pagination');

  addHandlerClick(handler) {
    this._parentElement.addEventListener('click', e => {
      const btn = e.target.closest('.btn--inline');

      if (!btn) return;

      const gotoPage = +btn.dataset.goto;
      handler(gotoPage);
    });
  }

  _generateMarkupButton(currentpage, type) {
    if (type === 'next') {
      return `
        <button data-goto="${
          currentpage + 1
        }" class="btn--inline pagination__btn--next">
            <span>Page ${currentpage + 1}</span>
            <svg class="search__icon">
            <use href="${icons}#icon-arrow-right"></use>
            </svg>
        </button>
            `;
    }

    if (type === 'prev') {
      return `
        <button  <button data-goto="${
          currentpage - 1
        }" class="btn--inline pagination__btn--prev">
            <svg class="search__icon">
            <use href="${icons}#icon-arrow-left"></use>
            </svg>
            <span>Page ${currentpage - 1}</span>
        </button>`;
    }
  }

  _generateMarkup() {
    const currentpage = this._data.page;

    const numPages = Math.ceil(
      this._data.results.length / this._data.resultsPerPage
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

export default new PaginationView();
