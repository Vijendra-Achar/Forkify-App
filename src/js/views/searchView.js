// Imports
import { elements } from './base';

// Exports
export const getInput = () => elements.searchInput.value;

export const clearInput = () => {
    elements.searchInput.value = '';
};

export const clearResults = () => {
    elements.searchResultList.innerHTML = '';
    elements.pageButtonsResults.innerHTML = '';
}

export const renderResults = (recipes, page = 1, resPerPage = 10) => {
    const start = (page - 1) * resPerPage;
    const end = page * resPerPage;
    recipes.slice(start, end).forEach(renderRecipe);

    // create the Buttons
    renderPageButtons(page, recipes.length, resPerPage);
}

// Private methods and statements
const renderRecipe = recipe => {
    const markup = `
    <li>
        <a class="results__link" href="#${recipe.recipe_id}">
            <figure class="results__fig">
                <img src="${recipe.image_url}" alt="Test">
            </figure>
            <div class="results__data">
                <h4 class="results__name">${recipe.title}</h4>
                <p class="results__author">${recipe.publisher}</p>
            </div>
        </a>
    </li>`;
    elements.searchResultList.insertAdjacentHTML('beforeend', markup);
};

const renderPageButtons = (page, numRes, resPerPage) => {
    const pages = Math.ceil(numRes / resPerPage);
    let button;
    if (page === 1 && pages > 1) {
        // Show Only the Button to go to the next page
        button = createButtons(page, 'next');

    } else if (page < pages) {
        // Show both buttons Next and Previous
        button = `
                ${createButtons(page, 'next')}
                ${createButtons(page, 'prev')}`;

    } else if (page === pages && pages > 1) {
        // Show Only the Button to go to the previous page
        button = createButtons(page, 'prev');
    }

    elements.pageButtonsResults.insertAdjacentHTML('afterbegin', button);
};

const createButtons = (page, type) => `
    <button class="btn-inline results__btn--${type}" data-goto=${type === 'prev' ? page - 1 : page + 1}>
    <span>Page ${type === 'prev' ? page - 1 : page + 1}</span>
        <svg class="search__icon">
            <use href="img/icons.svg#icon-triangle-${type === 'prev' ? 'left' : 'right'}"></use>
        </svg>
    </button>
`;





