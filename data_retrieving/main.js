const demo = new autoComplete({
    selector: '#auto-complete',
    minChars: 1,
    source: function(term, suggest){
        term = term.toLowerCase();
        var suggestions = [];
        for (i=0; i < data.length; i++) {
              if (data[i].code.toLowerCase().slice(0, term.length) === term) {
               suggestions.push(data[i].code);
              }
               if (~data[i].description.toLowerCase().indexOf(term)) {
               suggestions.push(data[i].description);
              }
          }
        suggest(suggestions);
    }
});

const countries_table1 = [
  'EU','Belgium','Bulgaria','Czech Republic','Denmark','Germany','Estonia','Ireland','Greece','Spain','France','Croatia','Italy','Cyprus','Latvia','Lithuania','Luxembourg','Hungary','Malta','the Netherlands','Austria','Poland','Portugal','Romania','Slovenia','Slovakia','Finland','Sweden','United Kingdom of Great Britain and Northern Ireland'
];
const countries_table2 = ['Canada'];
const countries_table3 = ['Iceland', 'Liechtenstein', 'Norway', 'Switzerland'];

const countries_dropdown_population = function () {
    const select = document.getElementById("selectCountry"); 
    const options = countries_table1.concat(countries_table2).concat(countries_table3); 

    for(var i = 0; i < options.length; i++) {
        let opt = options[i];
        let element = document.createElement("option");
        element.textContent = opt;
        element.value = opt;
        select.appendChild(element);
    }
}
countries_dropdown_population();

getTableFromInput = () => {
  const searchValue = document.getElementById("auto-complete").value;
  var validatedItems = data.filter((item) => {
    let code = item.code;
    let description = item.description;
     if(description.indexOf(searchValue) !== -1 || code.indexOf(searchValue) !== -1){
        return true;
      } 
  });

   const table = document.getElementById('code_table');
   const tblBody = document.createElement("tbody");

   const tHead = document.createElement("thead");
   const headerRow = document.createElement("tr");
   let headerColumn = document.createElement("th");
   let cellText = document.createTextNode("CN code");
   headerColumn.appendChild(cellText);
   headerRow.appendChild(headerColumn);

   headerColumn = document.createElement("th");
   cellText = document.createTextNode("Description");
   headerColumn.appendChild(cellText);
   headerRow.appendChild(headerColumn);

   tHead.appendChild(headerRow);
   table.appendChild(tHead);
   
   for (var i = 0; i < validatedItems.length; i++) {
    // creates a table row
    const row = document.createElement("tr");
 
    let cell = document.createElement("td");
    let cellText = document.createTextNode(validatedItems[i].code);
    cell.appendChild(cellText);
    row.appendChild(cell);

    cell = document.createElement("td");
    cellText = document.createTextNode(validatedItems[i].description);
    cell.appendChild(cellText);
    row.appendChild(cell);
 
    // add the row to the end of the table body
    tblBody.appendChild(row);
   }

  // put the <tbody> in the <table>
  table.appendChild(tblBody);
  table.className = 'table table-hover table-bordered';
  // document.getElementById("code_table").appendChild(table);
  document.getElementById("code_table").style["display"] = "inline";
  }

// proceed information from user input
document.getElementById("search-button").addEventListener("click", getTableFromInput);