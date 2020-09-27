import axios from 'axios';

// The Search API URL- https://forkify-api.herokuapp.com/api/search?q='pizza'

export default class Search {
    constructor(query) {
        this.query = query;
    }

    async getResults() {
        try {
            let res = await axios(`https://forkify-api.herokuapp.com/api/search?q=${this.query}`);
            this.result = res.data.recipes;
            //console.log(this.result);
        } catch (error) {
            console.log(error);
        }
    }
}