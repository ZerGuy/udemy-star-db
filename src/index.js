class SwapiService {
    _apiBase = 'https://swapi.co/api';

    async getResource(url) {
        const res = await fetch(url);
        if (!res.ok) {
            throw new Error(`Could not fetch ${url}, received ${res.status}`)
        }

        const body = await res.json();
        return body;
    }

    async getAllPeople() {
        const res = await this.getResource(`${this._apiBase}/people/`);
        return res.results;
    }

    getPerson(id) {
        return this.getResource(`${this._apiBase}/people/${id}`);
    }

    async getPlanets() {
        const res = await this.getResource(`${this._apiBase}/planets/`);
        return res.results;
    }

    getPlanet(id) {
        return this.getResource(`${this._apiBase}/planets/${id}`);
    }

    async getAllStarships() {
        const res = await this.getResource(`${this._apiBase}/starships/`);
        return res.results;
    }

    getStarship(id) {
        return this.getResource(`${this._apiBase}/starships/${id}`);
    }
}

const swapi = new SwapiService();

swapi.getAllPeople().then(p => {
    console.log(p);
});

swapi.getPerson(3).then(p => {
    console.log(p);
});
