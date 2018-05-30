bigTable = function ()
{
    console.log("Start of parsing");
    let grid = [];
    const table = document.getElementsByClassName("borderOj");
    for (i = 1; i < table.length; i++){
        let rowLength = table[i].rows.length;
        //loops through rows    
        for (j = 1; j < rowLength; j++){
           //gets cells of current row
           let oCells = table[i].rows.item(j).cells;

           if(oCells.length < 2)
           {
            continue;
           }
           let code = oCells.item(0).getElementsByClassName("normal").item(0);
           let description = oCells.item(1).getElementsByClassName("normal").item(0);

           if(code !== null && description != null)
           {
               grid.push({code: code.innerHTML, description: description.innerHTML})
           }   
        }
    }
    console.log("Parsing finished");
    return grid.map((element, index) => {
            let code = element.code.replace(/&nbsp;/g,'');
            let description = element.description.replace(/&nbsp;/g,'').replace(/<span class="italic">/g,'')
            .replace(/\/span>/g,'');
            if(description.indexOf('<a') !== -1){
              description = description.slice(0,description.indexOf('<a'));
            }
            if(code === '') {
              code = grid[index - 1].code.replace(/&nbsp;/g,'');
            }
             return {code: code, description: description};
            });
}

 var table = bigTable();

 function download(text, name, type) {
    var a = document.createElement("a");
    var file = new Blob([text], {type: type});
    a.href = URL.createObjectURL(file);
    a.download = name;
    a.click();
}
download(JSON.stringify(table), '../data_tables/table1.json', 'text/plain');