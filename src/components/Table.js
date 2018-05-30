import React from 'react';
import '../../node_modules/react-bootstrap-table/dist/react-bootstrap-table-all.min.css';
import { BootstrapTable, TableHeaderColumn } from 'react-bootstrap-table';

const options = {
  noDataText: 'There is no result for current search. Please try again.'
}

const Table = ({ filteredcodes, rowOnSelect }) => {
  const selectRowProp = {
    onSelect: rowOnSelect,
    mode: 'radio',
    clickToSelect: true,  // enable click to select
    bgColor: '#a5c7ff'
  };

  return (
    <BootstrapTable
    className="pa3 ma2"
    data={filteredcodes}
    options={options} 
    selectRow={selectRowProp}
    striped
    hover
    condensed 
    pagination>
      <TableHeaderColumn width="150px" dataField='code' isKey>CN code</TableHeaderColumn>
      <TableHeaderColumn dataField='description'>Description</TableHeaderColumn>
    </BootstrapTable>
  );
}

export default Table;