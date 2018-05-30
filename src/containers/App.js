import React, { Component } from 'react';
import ReactDOM, {render} from 'react-dom';
import swal from 'sweetalert';
import data from '../data_tables/table1.json';
import rates from '../data_tables/table2.json';
import AutoComplete from '../components/AutoComplete';
import AutoComplete2 from '../components/AutoComplete2';
import RateComponent from '../components/RateComponent';
import Dropdown from '../components/Dropdown';
import Table from '../components/Table';
import Navigation from '../components/Navigation';
import Footer from '../components/Footer';
import './App.css';

class App extends Component {
constructor(props) {
		super(props);
		this.state = {
			data: [],
      rates: [],
			searchfield: ' ',  
			showtable: false,
      showresult: false,
			filteredcodes:[],
      chosencode: 0,
      country: "EU"
		}	
  	this.handleClick = this.handleClick.bind(this);
  	this.onSearchChange = this.onSearchChange.bind(this);
  	this.enterPress = this.enterPress.bind(this);
    this.rowOnSelect = this.rowOnSelect.bind(this);
    this.showResult = this.showResult.bind(this);
	}

	componentDidMount() {
		this.setState({data: JSON.stringify(data) })
    this.setState({rates: JSON.stringify(rates) })
	}

  onSearchChange = (event) => {
	  this.setState({searchfield: event.target.value})
	}

	enterPress = (event) => {		
		 if(event.keyCode === 13 && event.shiftKey === false) {
			 this.handleClick();
		  }
	}

 showResult() {
    if(this.state.chosencode === 0) {
      swal("Information","Please choose one of the item from the table", "info");
    }
    else {
      this.setState({showresult: true});
    }
 }

  handleClick() {
  	const searchfield = this.state.searchfield;
    this.setState({filteredcodes: data.filter((item) => {
      let code = item.code;
      let description = item.description;
      if(description.indexOf(searchfield) !== -1 ||
       	code.toLowerCase().slice(0, searchfield.length) === searchfield){
        return true;
      } 
 	  })});
    this.setState({showtable: true});
  }
  
  rowOnSelect = (row, isSelected, e) => {
    if(isSelected) { 
      if(row.code.length < 8) {
       swal('Bad CN Code', `You should choose item with code length at least 8 numbers`, "info");
       return false;
      }
      else {
        this.setState({chosencode: row.code});
        return true;
      }
    }
  }

  render() {
    const {chosencode, searchfield, showtable, filteredcodes, showresult} = this.state;
    const rate = rates.find(x => x.code.slice(0, 8) === chosencode);
    return (
      <div>
        <Navigation/>
        <div className = 'container' id = 'main-container'>
  	      <div className="row">
  	        <h2 className="mt-4">Start your business here</h2>
  	      </div>
  	      <div className="row">
            <AutoComplete
             searchField = {searchfield}
             //options = {this.state.data.map((item) => { return item.description })}
             onChange = {this.onSearchChange}
             onKeyDown={this.enterPress} />
            <button
              className="btn btn-primary btn-sm pa2  mb4 col-sm-5 col-lg-2"
              id="search-button"
          	  onClick={this.handleClick}>
          	  Search
            </button> 
  	      </div>
          { this.state.showtable &&
            <div>
              <Table
                filteredcodes = {filteredcodes}
                rowOnSelect = {this.rowOnSelect}
              />
              <div className="row">
                <Dropdown className="col-sm-4 col-lg-4 pa3 ma2"/>
                <div className="col-sm-5 col-lg-4">
                  <button className="btn btn-primary btn-sm pa3 ma2"
                    id="search-button"
                    onClick={this.showResult}>
                    Results
                  </button>
                </div>
              </div>
              { showresult &&
                <RateComponent rate = {rate}/>
              }
            </div>
          }	
        </div>
        <Footer/>
      </div>
		);
  }  
}

export default App;