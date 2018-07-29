import React from 'react';

  
const Dropdown = ({data, onChange}) => {

  const renderCountriesDropDown = data.map((item) => {
    return <option value={item}>{item}</option>
  });

	return (
     <div class="form-group ">
      <label for="countries">Country of origin:</label>
	    <select 
       class="form-control ml10 mr3"
       id="selectCountry"
       onChange={onChange}
       >
	  	{renderCountriesDropDown}
	  </select>
	 </div>
	);
}

export default Dropdown;