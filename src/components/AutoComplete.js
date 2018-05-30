import React from 'react';
import {Typeahead} from 'react-bootstrap-typeahead';
import '../../node_modules/react-bootstrap-typeahead/css/Typeahead.css';

const AutoComplete = ({searchField, onChange, enterPress}) => {
		const options = ["C#","C++", "Python"];
		return (
		   /* <Typeahead
		      clearButton
		      allowNew
	          labelKey="name"
	          options={options}
	          placeholder="Search..."
	          paginate = {true}
	          minLength = {2}
	          onChange = {onChange}
	          value = {searchField}
    		/>*/
	        <input type="text"
	         value = {searchField}
	         onChange = {onChange}
	         onKeyDown={enterPress}
	         className="form-control input-sm pa2 mt2 ma2 col-sm-5 col-lg-3"
	         id="auto-complete"
	         placeholder="Search..." 
	         aria-label="Search" />   
		);
}

export default AutoComplete;