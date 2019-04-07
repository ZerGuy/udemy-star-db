import React from 'react';

import Header from '../header';
import RandomPlanet from '../random-planet';
import ItemList from '../item-list';
import PersonDetails from '../person-details';

import './app.css';
import ErrorIndicator from '../error-indicator';
import ErrorButton from '../error-button';
import PeoplePage from '../people-page/people-page';
import SwapiService from '../../services/swapi-service';

class App extends React.Component {

    swapiService = new SwapiService();

    state = {
        showRandomPlanet: true,
        hasError: false
    };

    componentDidCatch() {
        console.log('componentDidCatch()');
        this.setState({hasError: true});        
    }

    toggleRandomPlanet = () => {
        this.setState((state) => {
            return {
                showRandomPlanet: !state.showRandomPlanet
            }
        });
    };

    throwError() {
        throw new Error();
    }

    render() {
        if (this.state.hasError) {
            return <ErrorIndicator />;
        }

        const planet = this.state.showRandomPlanet ? <RandomPlanet/> : null;

        return (
            <div className="stardb-app">
                <Header />
                { planet }

                <button
                    className="toggle-planet btn btn-warning btn-lg"
                    onClick={this.toggleRandomPlanet}>
                    Toggle Random Planet
                </button>

                <ErrorButton />

                <PeoplePage />

                <div className="row mb2">
                    <div className="col-md-6">
                    <ItemList
                        onItemSelected={this.onPersonSelected}
                        getData={this.swapiService.getAllPlanets}
                        renderItem={(item) => (<span>{item.name} </span>)}/>
                    </div>
                    <div className="col-md-6">
                    <PersonDetails personId={this.state.selectedPerson} />
                    </div>
                </div>
            </div>
        );
    }
}

export default App;
