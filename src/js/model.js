import { getJSON, sendJSON } from './helper';
import { SRH_URL, API_URL, PAGECOUNT } from './config';

export const state = {
  recipe: {},
  search: {
    qurey: '',
    results: [],
    pageNumber: 1,
    resPerpage: PAGECOUNT,
  },
  bookmarks: [],
};

const modifyData = function (data) {
  const { recipe } = data.data;
  return {
    cookingTime: recipe.cooking_time,
    id: recipe.id,
    image: recipe.image_url,
    ingredients: recipe.ingredients,
    publisher: recipe.publisher,
    servings: recipe.servings,
    sourceUrl: recipe.source_url,
    title: recipe.title,
    ...(recipe.key && { key: recipe.key }),
  };
};
export const loadRecipe = async function (id) {
  try {
    const data = await getJSON(`${API_URL}${id}?`);

    state.recipe = modifyData(data);
    console.log(state.recipe);
    state.recipe.bookmr = state.bookmarks.some(boook => boook.id === id);
    console.log(state.recipe.bookmr);
  } catch (err) {
    // console.error(err);
    throw err;
  }
};

export const searchResultData = async function (qurey) {
  try {
    const qureString = qurey;
    state.search.qurey = qureString;
    const data = await getJSON(`${SRH_URL}${qurey}&`);

    state.search.results = data.data.recipes.map(res => {
      return {
        id: res.id,
        image: res.image_url,

        publisher: res.publisher,
        title: res.title,
        ...(res.key && { key: res.key }),
      };
    });

    state.search.pageNumber = 1;
  } catch (err) {
    throw err;
  }
};

export const pagination = function (page = state.search.pageNumber) {
  state.search.pageNumber = page;
  const start = (page - 1) * PAGECOUNT;
  const end = page * PAGECOUNT;
  // console.log(start, end);
  return state.search.results.slice(start, end);
};

export const updateServings = function (newservings) {
  state.recipe.ingredients.forEach(element => {
    element.quantity = (element.quantity / state.recipe.servings) * newservings;
  });
  state.recipe.servings = newservings;
};

const reload = function () {
  localStorage.setItem('bookmarks', JSON.stringify(state.bookmarks));
};
export const addBookmark = function (recipedata) {
  state.bookmarks.push(recipedata);
  if (recipedata.id === state.recipe.id) state.recipe.bookmr = true;
  reload();
};
export const deleteboomark = function (id) {
  const index = state.bookmarks.findIndex(el => el.id === id);
  state.bookmarks.splice(index, 1);
  if (id === state.recipe.id) state.recipe.bookmr = false;
  reload();
};

export const upLoadData = async function (datarecives) {
  try {
    console.log(datarecives);
    const ingred = Object.entries(datarecives);
    const ingredients = ingred
      .filter(entry => entry[0].startsWith('ingredient') && entry[1] !== '')
      .map(ing => {
        const ingArray = ing[1].split(',').map(el => el.trim());
        console.log(ing);
        if (ingArray.length !== 3)
          throw new Error('wrong format kindly enter data right format');
        const [quantity, unit, description] = ingArray;
        return { quantity: quantity ? +quantity : null, unit, description };
      });
    // console.log(datarecives);
    const recipe = {
      cooking_time: +datarecives.cookingTime,

      image_url: datarecives.image,
      publisher: datarecives.publisher,
      servings: +datarecives.servings,
      source_url: datarecives.sourceUrl,
      title: datarecives.title,
      ingredients,
    };
    // console.log(recipe);

    const data = await sendJSON(API_URL, recipe);
    console.log(modifyData(data));
    state.recipe = modifyData(data);

    addBookmark(modifyData(data));
    return true;
  } catch (err) {
    throw err;
  }
};
const init = function () {
  const storedata = localStorage.getItem('bookmarks');
  if (storedata) state.bookmarks = JSON.parse(storedata);
};
// init();
