 let fs = require('fs'),
    PDFParser = require("pdf2json");
 
    let pdfParser = new PDFParser();
 
    pdfParser.on("pdfParser_dataError", errData => console.error(errData.parserError) );
    pdfParser.on("pdfParser_dataReady", pdfData => {
        fs.writeFile("./data_tables/table2.json", JSON.stringify(pdfData));
    });
 
    pdfParser.loadPDF("./data_tables/DCFTA rates_applied_2018.pdf");