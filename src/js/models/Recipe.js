import axios from 'axios';

// https://forkify-api.herokuapp.com/api/get?rId=47746

export default class Recipe {
    constructor(id) {
        this.id = id;
    }

    async getRecipe() {
        try {
            const res = await axios(`https://forkify-api.herokuapp.com/api/get?rId=${this.id}`);
            this.title = res.data.recipe.title;
            this.author = res.data.recipe.publisher;
            this.img = res.data.recipe.image_url;
            this.url = res.data.recipe.publisher_url;
            this.ingredients = res.data.recipe.ingredients;
        } catch (error) {
            console.log(error);
        }
    }

    calcCookingTime() {
        // For every 3 Items we assme that it takes 15 Minutes to cook

        const numIngs = this.ingredients.length;
        const periods = Math.ceil(numIngs / 3);
        this.cookingTime = periods * numIngs;
    }

    calcServes() {
        this.serves = 4;
    }

    parseIngredients() {

        const unitLong = ['tablespoons', 'tablespoon', 'ounces', 'ounce', 'teaspoons', 'teaspoon', 'cups', 'pound'];
        const unitShort = ['tbsp', 'tbsp', 'oz', 'oz', 'tsp', 'tsp', 'cup', 'pound'];

        const newInredients = this.ingredients.map(ele => {

            // 1. Uniform Units
            let ingredient = ele.toLowerCase();
            unitLong.forEach((unit, i) => {
                ingredient = ingredient.replace(unit, unitShort[i]);
            });

            // 2. Remove Brackets
            ingredient = ingredient.replace(/ *\([^)]*\) */g, ' ');

            // 3. Parse ingredients into count, unit and ingredient
            return ingredient;

        });
        this.ingredients = newInredients;
    }
}

