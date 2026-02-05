import 'core-js/stable';
import 'regenerator-runtime/runtime';

import * as model from './model.js';
import recipeView from './views/recipeView.js';
import searchView from './views/searchView.js';
import resultsView from './views/resultsView.js';
import paginationView from './views/paginationView.js';
import bookmarksView from './views/bookmarksView.js';
import addRecipeView from './views/addRecipeView.js';

// if (module.hot){
//   module.hot.accept()
// }

const controlRecipe = async function () {
  try {
    const id = window.location.hash.slice(1);
    if (!id) return;

    recipeView.renderSpinner();

    // 0. Update result view to mark selected search result
    resultsView.update(model.getSearchResultsPage());

    // 1. Updating bookmarks
    bookmarksView.update(model.state.bookmarks);

    // 2. Load recipe
    await model.loadRecipe(id);

    // 3. Render recipe
    recipeView.render(model.state.recipe);
  } catch (err) {
    recipeView.renderError();
  }
};

const controllSearchResults = async function () {
  try {
    // 1. Get search query
    const query = searchView.getQuery();
    if (!query) return;

    resultsView.renderSpinner();

    // 2. Load sarch results
    await model.loadSearchResults(query);

    // 3. Render search results
    // resultsView.render(model.state.search.results);
    resultsView.render(model.getSearchResultsPage());

    // 4. Render pagination buttons
    paginationView.render(model.state.search);
  } catch (err) {
    console.log(err);
  }
};

const controllPagination = function (gotoPage) {
  resultsView.render(model.getSearchResultsPage(gotoPage));
  paginationView.render(model.state.search);
};

const controlServings = function (newServings) {
  // Update recipe servings ( in state )
  model.updateServings(newServings);

  // Update recipe View
  // recipeView.render(model.state.recipe);
  recipeView.update(model.state.recipe);
};

const controlAddBookmar = function () {
  // 1. Add/remove bookmark
  if (!model.state.recipe.bookmarked) model.addBookmark(model.state.recipe);
  else model.deleteBookmark(model.state.recipe.id);

  // 2. Update recipe view
  recipeView.update(model.state.recipe);

  // 3. Render bookmarks
  bookmarksView.render(model.state.bookmarks);
};

const controlBookmarks = function () {
  bookmarksView.render(model.state.bookmarks);
};

const controlAddRecipe = function (newRecipe) {
  console.log(newRecipe);

  //Upload new recipe
};

const init = function () {
  bookmarksView.addHandlerRender(controlBookmarks);
  searchView.addHandlerSearch(controllSearchResults);
  recipeView.addHandlerRender(controlRecipe);
  recipeView.addHandlerUpdateServings(controlServings);
  recipeView.addHandlerAddBookmark(controlAddBookmar);
  paginationView.addHandlerClick(controllPagination);
  addRecipeView.addHandlerUpload(controlAddRecipe);
};
init();
