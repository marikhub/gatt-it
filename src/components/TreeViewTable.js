import React, { Component } from 'react';
import '../../node_modules/react-bootstrap-table/dist/react-bootstrap-table-all.min.css';
import { BootstrapTable, TableHeaderColumn } from 'react-bootstrap-table';

const options = {
  noDataText: 'There is no result for current search. Please try again.',
  expanding: [1]
}

function addChild(currentIndex, data) {
  let subTree = [];
  const currentCode = data[currentIndex].code.trim();
  let isSameLevel = true;
  // put while loop here for the same level codes
  let newIndex = currentIndex + 1;
  while(true) {
    if(newIndex < data.length) {
      const nextCode = data[newIndex].code.trim();
      if(nextCode.length >= currentCode.length &&
         nextCode.slice(0, currentCode.length) == currentCode)
      {
        let element = addChild(newIndex, data);
        subTree.push({
          code: data[newIndex].code,
          description: data[newIndex].description,
          isCollapsed: false,
          expand: element[1]
        });
        newIndex = element[0];
      }
      else {
        return [newIndex, subTree];
      }
    }
    else {
      return [newIndex, subTree];
    }
  }
  return [newIndex, subTree];
}

function createTree(searchedWord, data) {
  let treeCodes = [];
  let i = 0;
  while(i < data.length) {
    let child = addChild(i, data);
    treeCodes.push({
      code: data[i].code,
      description: data[i].description,
      isCollapsed: false,
      expand: child[1]
    });
    i = child[0];
  }
  return treeCodes;
}

class BSTable extends React.Component {
 
  constructor(props) {
    super(props);
    this.rowOnSelect = this.rowOnSelect.bind(this);
  }

  rowOnSelect(row, isSelected, e) {
    return this.props.rowOnSelect(row, isSelected, e);
  }

  isExpandableRow(row) {
    if(row.code.trim().length < 8) {
      return true;
    }
    return false;
  }

  expandComponent(row) {
    return (
      <BSTable data={ row.expand }
        rowOnSelect={ this.selectRow.onSelect }
       />
    );
  }

  render() {
    if (this.props.data) {
      return (
        <BootstrapTable  
          className="pa2"
          data={this.props.data}
          options={options}
          expandableRow={ this.isExpandableRow }
          expandComponent={ this.expandComponent }
          expandColumnOptions={ { expandColumnVisible: true, columnWidth: 50 } }
          selectRow={{
          onSelect: this.rowOnSelect,
          mode: 'radio',
          clickToSelect: false, 
          clickToExpand: true, // enable click to select
          }}
          hover
          condensed>
          <TableHeaderColumn dataField='code' isKey={ true }>CN code</TableHeaderColumn>
          <TableHeaderColumn dataField='description'>Description</TableHeaderColumn>
        </BootstrapTable>);
    } else {
      return (<p></p>);
    }
  }
}

class TreeViewTable extends Component {

  constructor(props) {
      super(props);
      this.rowOnSelect = this.rowOnSelect.bind(this);
    }

  isExpandableRow(row) {
     return true;
  }

  rowOnSelect(row, isSelected, e) {
    return this.props.rowOnSelect(row, isSelected, e);
  }

  expandComponent(row) {
    return (
      <BSTable
       data={ row.expand }
       rowOnSelect={ this.selectRow.onSelect }
      />
    );
  }

  render()
  {
    return (
      <BootstrapTable
        className="pa2"
        data={ createTree(this.props.searchfield ,this.props.filteredcodes)}
        options={options}
        expandableRow={ this.isExpandableRow }
        expandComponent={ this.expandComponent }
        selectRow={{
          onSelect: this.rowOnSelect,
          mode: 'radio',
          clickToSelect: false, 
          clickToExpand: true,  // enable click to select
          }}
        hover
        condensed 
        pagination>
        <TableHeaderColumn  dataField='code' isKey={ true }>CN code</TableHeaderColumn>
        <TableHeaderColumn dataField='description'>Description</TableHeaderColumn>
      </BootstrapTable>
    );
  }
}

export default TreeViewTable;