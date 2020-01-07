import React,{Component} from 'react';
import './people-page.css';
import ItemList from '../item-list';
import ItemDetails from '../item-details';
import ErrorIndicator from '../error-indicator';
import ErrorButton from '../error-button';
import SwapiService from '../../services/swapi-service';
import Row from '../row/row';



class ErrorBoundry extends Component{
    state={
        hasError:false
    }
    componentDidCatch(){
        this.setState({
            hasError:true
        })
    }
    render(){
        if(this.state.hasError){
            return <ErrorIndicator/>
        }
        return this.props.children;
    }

}

export default class PeoplePage extends Component{

    swapiService = new SwapiService();
    
    state={
        selectedPerson:2,
        hasError:false
    }

    


    onPersonSelected=(id)=>{
        console.log('You choose'+id);
        this.setState({
          selectedPerson:id
        })
      }
    render(){

        if(this.state.hasError){
            return <ErrorIndicator/>
        }
        
        const itemList = (
            <ItemList
              onItemSelected={this.onPersonSelected}
              getData={this.swapiService.getAllPeople}>
      
              {(i) => (
                `${i.name} (${i.birthYear})`
              )}
      
            </ItemList>
          );
        const personDetails = (
            <ErrorBoundry>    
            <ItemDetails personId={this.state.selectedPerson}/>
            </ErrorBoundry>
        );

        return (
            <ErrorBoundry>
                <Row left={itemList} right={personDetails}/>
            </ErrorBoundry>
        )
    }

}
