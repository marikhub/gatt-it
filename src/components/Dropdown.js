import React from 'react';

  const countries_table1 = [
    'EU','Belgium','Bulgaria','Czech Republic','Denmark','Germany','Estonia','Ireland','Greece','Spain','France','Croatia','Italy','Cyprus','Latvia','Lithuania','Luxembourg','Hungary','Malta','the Netherlands','Austria','Poland','Portugal','Romania','Slovenia','Slovakia','Finland','Sweden','United Kingdom of Great Britain and Northern Ireland'
  ];
  const countries_table2 = ['Canada'];
  const countries_table3 = ['Iceland', 'Liechtenstein', 'Norway', 'Switzerland'];
  const countries = countries_table1.concat(countries_table2).concat(countries_table3); 

  const renderCountriesDropDown = countries.map((item) => {
  	return <option value={item}>{item}</option>
  });

const Dropdown = () => {
		return (
	     <div class="form-group">
	      <label for="countries">Country of origin</label>
		  <select class="form-control" id="selectCountry">
		  	{renderCountriesDropDown}
		  </select>
		 </div>
		);
}

export default Dropdown;