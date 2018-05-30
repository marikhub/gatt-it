var http = require('request');
var fs = require('fs');
 
function getHTML(){
        http.get({
            url: "http://eur-lex.europa.eu/legal-content/EN/TXT/HTML/?uri=OJ%3AL%3A2016%3A294%3AFULL&from=EN"
        }, function(error, resp, body){
            // console.log(body)
        })
            .pipe(fs.createWriteStream('file.html'));
    }
 
var result = getHTML();
