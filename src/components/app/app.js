import React,{Component} from 'react';

import Header from '../header';
import RandomPlanet from '../random-planet';
import ItemList from '../item-list';


import './app.css';
import ErrorButton from '../error-button';
import ErrorIndicator from '../error-indicator';
import PeoplePage from '../people-page/people-page';
import SwapiService from '../../services/swapi-service';
import Row from "../row/row";
import ItemDetails from "../item-details/item-details";

export default class App extends Component {

  swapiService = new SwapiService();

	state = {
    showRandomPlanet: true,
    hasError:false
  };


  componentDidCatch(){
    console.log('componnent did catch');
    this.setState({hasError:true});
  }

  toggleRandomPlanet = () => {
    this.setState((state) => {
      return {
        showRandomPlanet: !state.showRandomPlanet
      }
    });
  };
  

	render(){

    if(this.state.hasError){
      return <ErrorIndicator/>
    }

		const planet = this.state.showRandomPlanet ?
      <RandomPlanet/> :
      null;

      const {getPerson,getStarship,getPersonImage,getStarshipImage} = this.swapiService;

      const personDetails = (
        <ItemDetails itemId={11} getData={getPerson} getImageUrl={getPersonImage}/>
         
      );
  
      const starshipDetails = (
        <ItemDetails itemId={9} getData={getStarship} getImageUrl={getStarshipImage}/>
         
      );
		return (
    <div>
      <Header />
      { planet }
      <Row left={personDetails} right={starshipDetails}/>
			{/* <button
          className="toggle-planet btn btn-warning btn-lg"
          onClick={this.toggleRandomPlanet}>
          Toggle Random Planet
      </button>
      <ErrorButton />
      <PeoplePage/>
      <br/>
      <div className="row mb2">
        <div className="col-md-6">
            <ItemList onItemSelected={this.onPersonSelected} 
            getData={this.swapiService.getAllPlanets}>
            {(i) => (
                `${i.name}`
            )}
            </ItemList>  
        </div>
        <div className="col-md-6">
            <ItemDetails personId={this.state.selectedPerson}/>
        </div>
      </div>
      <br/>
      <div className="row mb2">
        <div className="col-md-6">
            <ItemList onItemSelected={this.onPersonSelected} 
            getData={this.swapiService.getAllStarships}>
            {(i) => (
              `${i.name}`
            )}
            </ItemList>
        </div>
        <div className="col-md-6">
            <ItemDetails personId={this.state.selectedPerson}/>
        </div>
      </div> */}
    </div>
  );
	}
};
