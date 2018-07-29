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
import TreeViewTable from '../components/TreeViewTable';
import Navigation from '../components/Navigation';
import Footer from '../components/Footer';
import './App.css';

const countries_table1 = [
  'EU','Belgium','Bulgaria','Czech Republic','Denmark','Germany','Estonia','Ireland','Greece','Spain','France','Croatia','Italy',
  'Cyprus','Latvia','Lithuania','Luxembourg','Hungary','Malta','the Netherlands','Austria','Poland','Portugal','Romania',
  'Slovenia','Slovakia','Finland','Sweden','United Kingdom of Great Britain and Northern Ireland', 'Other'
];
const countries_table2 = ['Canada'];
const countries_table3 = ['Iceland', 'Liechtenstein', 'Norway', 'Switzerland'];
const countries = countries_table1.concat(countries_table2).concat(countries_table3); 

const eu_rates = [
  { code: '0101 21 00', base_rate: '0'},
  { code: '0101 29 10 ', base_rate: '5'},
  { code: '0101 29 90 ', base_rate: '5'},
  { code: '0101 30 00 ', base_rate: '5'},
  { code: '0101 90 00 ', base_rate: '5'},
  { code: '0102 21 10 ', base_rate: '0'},
  { code: '0102 21 30 ', base_rate: '0'},
  { code: '0102 21 90 ', base_rate: '0'},
];

const canada_rates = [
  { code: '0101 21 00', base_rate: '10'},
  { code: '0101 29 10 ', base_rate: '15'},
  { code: '0101 29 90 ', base_rate: '15'},
  { code: '0101 30 00 ', base_rate: '15'},
  { code: '0101 90 00 ', base_rate: '15'},
  { code: '0102 21 10 ', base_rate: '10'},
  { code: '0102 21 30 ', base_rate: '10'},
  { code: '0102 21 90 ', base_rate: '10'},
];

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
    this.checkCodeAndShowResult = this.checkCodeAndShowResult.bind(this);
    this.dropDownClick = this.dropDownClick.bind(this);
	}

	componentDidMount() {
		//this.setState({data: JSON.stringify(data) })
    this.setState({data:
      [
        { code:'0101', description:'Live horses, asses, mules and hinnies'},
        { code:'0101 21 00', description:'Pure-bred breeding animals'},
        { code:'0101 29', description:'Other'},
        { code:'0101 29 10', description:'For slaughter'},
        { code:'0101 29 90', description:'Other'},
        { code:'0101 30 00', description:'Asses'},
        { code:'0101 90 00', description:'Other'},
        { code:'0102', description:'Live bovine animals'},
        { code:'0102 21', description:'Pure-bred breeding animals'},
        { code:'0102 21 10', description:'Heifers (female bovines that have never calved)'},
        { code:'0102 21 30', description:'Cows'},
        { code:'0102 21 90', description:'Other'},
      ]})
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

  checkCodeAndShowResult(rate) {
    console.log(rate);
    if(rate === null) {
      swal("Information","We couldn't match the code chosen by you with one defined in the table", "info");
    }
    if(this.state.chosencode === 0) {
      swal("Information","Please choose one of the item from the table above", "info");
    }
    else {
      this.setState({showresult: true});
    }
  }

  dropDownClick(e) {
    console.log(e.target.value);
    this.setState({country: e.target.value});
  }

  handleClick() {
  	const searchfield = this.state.searchfield;
    let filteredcodes = [];
    let i = 0;
    while(i < this.state.data.length) {
      let current = this.state.data[i];
      if(current.description.indexOf(searchfield) !== -1 ||
         current.code.toLowerCase().slice(0, searchfield.length) === searchfield) {
        // backpropagation search
        let j = i;
        while(j >= 0)
        {
          let newCurrent = this.state.data[j];
          if(newCurrent.code.trim().length == 3) {
             newCurrent.code = "0" + newCurrent.code;
          }
          if(newCurrent.code.trim().slice(0, 4) === current.code.trim().slice(0,4)) {
            filteredcodes.push({
              code: newCurrent.code,
              description: newCurrent.description
            });
          }
          j--;
        }

        // forward search
        j = i + 1;
        while(j < this.state.data.length) {
          let newCurrent = this.state.data[j];
          if(newCurrent.code.trim().length == 3) {
             newCurrent.code = "0" + newCurrent.code;
          }
          if(newCurrent.code.trim().slice(0, 4) === current.code.trim().slice(0,4)) {
            filteredcodes.push({
              code: newCurrent.code,
              description: newCurrent.description
            });
          }
          j++;
        }
        i = j;
      }  
    }

    filteredcodes.sort((a,b) => {return (parseFloat(a.code.trim()) >= parseFloat(b.code.trim()))? -1: 1});
    console.log(filteredcodes);
    this.setState({filteredcodes: filteredcodes});// this.state.data.filter((item) => {
      //let code = item.code;
      //let description = item.description;
      //if(description.indexOf(searchfield) !== -1 ||
      // 	code.toLowerCase().slice(0, searchfield.length) === searchfield){
       // return true;
      //} 
 	 // })});
    this.setState({showtable: true});
  }
  
  rowOnSelect = (row, isSelected, e) => {
    console.log(row.code);
    if(isSelected) { 
      if(row.code.length < 6) {
       swal('Bad CN Code', `You should choose item with code length at least 8 numbers`, "info");
       return false;
      }
      else {
        this.setState({chosencode: row.code});
        return true;
      }
    }
  }

  findRate() {
    const {chosencode, country} = this.state;
    console.log(chosencode);
    console.log(country);
    if(countries_table1.includes(country)) {
      return eu_rates.find(x => x.code.slice(0, 10) === chosencode);
    }
    else if (countries_table2.includes(country)) {
      return canada_rates.find(x => x.code.slice(0, 10) === chosencode);
    }
    else if (countries_table3.includes(country)) {
      return eu_rates.find(x => x.code.slice(0, 10) === chosencode);
    }
  }

  render() {
    const {chosencode, searchfield, showtable, filteredcodes, showresult} = this.state;
    const rate = this.findRate();
    return (
      <div>
        <Navigation/>
        <div className ="container" id ="main-container">
  	      <div className="row">
  	        <h2 className="mt-4">Start your business here</h2>
  	      </div>
  	      <div className="row form-inline">
            <AutoComplete
             searchField = {searchfield}
             //options = {this.state.data.map((item) => { return item.description })}
             onChange = {this.onSearchChange}
             onKeyDown={this.enterPress} />
            <button
              className="btn btn-primary btn-sm pa2 mb4 col-md-2"
              id="search-button"
          	  onClick={this.handleClick}>
          	  Search
            </button> 
  	      </div>
          { this.state.showtable &&
            <div>
              <div class="row">
                {/*<Table
                  filteredcodes = {filteredcodes}
                  rowOnSelect = {this.rowOnSelect}
                />*/}
                <TreeViewTable
                  filteredcodes = {filteredcodes}
                  searchfield = { this.state.searchfield } 
                  rowOnSelect={this.rowOnSelect}
                />
              </div>
              <div className="row form-inline row-after-table">
                <Dropdown
                 className="col-lg-4 pa3 pl3 ma2"
                 data = { countries }
                 onChange={this.dropDownClick}
                />
                <div className="col-lg-4">
                  <button className="btn btn-primary btn-sm pa3 ma2"
                    id="search-button"
                    onClick={ ()=> {this.checkCodeAndShowResult(rate)}}>
                    Results
                  </button>
                </div>
              </div>
            </div>
          }
            { showresult &&
              <RateComponent rate = {rate}/>
            }	
        </div>
        <Footer/>
      </div>
		);
  }  
}

export default App;