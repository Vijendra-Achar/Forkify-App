import Search from './models/Search';
import Recipe from './models/Recipe';
import { elements, renderLoader, clearLoader } from './views/base';
import * as searchView from './views/searchView';

/** Global State of the app
 * - Search Object
 * - Current Recipe
 * - Shopping List Object
 * - Liked Recipes
*/

const state = {};

/** The Search Controller */

const controlSearch = async () => {
    // 1. Get the Query from the View
    // const query = searchView.getInput();
    const query = 'pizza';

    if (query) {
        // 2. New Search Object and the current object to the State Object
        state.search = new Search(query);

        // 3. Prepare the UI For Results. Clear the field and the Result List
        searchView.clearInput();
        searchView.clearResults();
        renderLoader(elements.searchResMain);

        try {
            // 4. Search for Recipes
            await state.search.getResults();

            // 5. Render the Results on UI
            clearLoader();
            searchView.renderResults(state.search.result);

        } catch (error) {
            clearLoader();
            alert('The Recipe does not exist. Please Try SomeThing else. 🍻🍽');
        }
    }
};

elements.searchForm.addEventListener('submit', e => {
    e.preventDefault();
    controlSearch();
});

/** TESTING ONLY */
window.addEventListener('load', e => {
    e.preventDefault();
    controlSearch();
});

elements.pageButtonsResults.addEventListener('click', e => {
    let btn = e.target.closest('.btn-inline');

    if (btn) {
        const goToPage = parseInt(btn.dataset.goto);
        searchView.clearResults();
        searchView.renderResults(state.search.result, goToPage);
    }
});

/** The Recipe Controller */

const controlRecipe = async () => {
    // Get the ID from the URL and add an event listener
    let id = window.location.hash.replace('#', '');
    //console.log(id);

    if (id) {
        // 1. Prepare the UI For Changes

        // 2. Create New Object 
        state.recipe = new Recipe(id);

        /** TESTING ONlY */
        window.r = state.recipe;
        try {
            // 3. Get the Recipe Data
            await state.recipe.getRecipe();

            // 4. Calculate the Serving time and No. of Serves
            state.recipe.calcCookingTime();
            state.recipe.calcServes();

            // 5. Render the Recipe to the UI
            console.log(state.recipe);
        } catch (error) {
            alert('Something Went Wrong🤕😵');
        }
    }
}

//window.addEventListener('hashchange', controlRecipe);

['hashchange', 'load'].forEach(event => window.addEventListener(event, controlRecipe));