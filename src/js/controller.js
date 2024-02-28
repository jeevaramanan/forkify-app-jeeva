import icons from '../img/icons.svg';
import * as model from './model.js';
import RecipeView from './views/recipeView.js';
import Search from './views/searchResult.js';
import Resultview from './views/resultView.js';
import paginationView from './views/paginationView.js';
import recipeView from './views/recipeView.js';
import bookmarView from './views/bookmarView.js';
import uploadView from './views/uploadView.js';

console.log(icons);

// https://forkify-api.herokuapp.com/v2

///////////////////////////////////////

const controlRecipe = async function () {
  try {
    // 1 loading recipe

    const id = window.location.hash.slice(1);

    console.log(id);
    if (!id) return;

    RecipeView.renderSpinner();
    Resultview.update(model.pagination());

    // paginationView.render(model.state);
    // const res = await fetch(
    //   `https://forkify-api.herokuapp.com/api/v2/recipes/${id}?key=2ec25b5d-bf5d-46d3-bf1e-7637451e3efa`
    // );
    // console.log(res);

    // const data = await res.json();
    await model.loadRecipe(id);
    // console.log(data);
    // const { recipe } = model.state;
    // console.log(recipe);

    //2 rendering recipe

    RecipeView.render(model.state.recipe);
    bookmarView.update(model.state.bookmarks);
  } catch (err) {
    console.error(err);
    RecipeView.renderErrorMsg(err);
  }
};

const controllSearchResult = async function () {
  try {
    const querydata = Search.getQurey();
    Resultview.renderSpinner();
    if (!querydata) return;
    await model.searchResultData(querydata);
    // console.log(model.state);
    // console.log(model.state.search.results);

    // Resultview.render(model.state.search.results);

    // console.log(model.pagination(1));

    Resultview.render(model.pagination());

    paginationView.render(model.state);
  } catch (err) {
    console.log(err);
    Resultview.renderErrorMsg(err);
  }
};

const controllPage = function (inp) {
  Resultview.render(model.pagination(inp));
  paginationView.render(model.state);
};
//3 #change and load event

const controlServings = function (inp) {
  model.updateServings(inp);
  // RecipeView.render(model.state.recipe);
  recipeView.update(model.state.recipe);
};

const controlbookmark = function () {
  if (!model.state.recipe.bookmr) {
    model.addBookmark(model.state.recipe);
  } else {
    model.deleteboomark(model.state.recipe.id);
  }
  console.log(model.state.recipe);
  recipeView.update(model.state.recipe);
  bookmarView.render(model.state.bookmarks);
};
const renderBokmarks = function () {
  bookmarView.render(model.state.bookmarks);
};

const uploadRecipeControler = async function (formdata) {
  try {
    uploadView.renderSpinner();
    await model.upLoadData(formdata);
    recipeView.render(model.state.recipe);
    uploadView.renderSuccessMsg('Upload SucessFull 👌 ');
    setTimeout(function () {
      uploadView.toggle();
    }, 2000);
    bookmarView.render(model.state.bookmarks);
    window.history.pushState(null, '', `#${model.state.recipe.id}`);
  } catch (err) {
    console.log(err);
    uploadView.renderErrorMsg(err);
  }
};
const init = function () {
  RecipeView.addhandlerRender(controlRecipe);
  Search.addSearchHandler(controllSearchResult);

  paginationView.addpageRenderhandler(controllPage);
  recipeView.adhandleServings(controlServings);
  recipeView.addBookmarhandler(controlbookmark);
  bookmarView.adbookmarkHandler(renderBokmarks);
  uploadView.addUploadRecipe(uploadRecipeControler);
  console.log('welcome');
};
init();
// console.log(RecipeView);
