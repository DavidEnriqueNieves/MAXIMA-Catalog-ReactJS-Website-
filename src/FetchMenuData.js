import React from "react";
import BBox from "./BBox";
import { AgGridColumn, AgGridReact } from 'ag-grid-react';
import DistribCellRenderer from './distribCellRenderer.jsx';
import CheckoutCellRenderer from './checkoutCellRenderer.js';
import SearchBarComponent from './searchBar.jsx';
import ArrowRightAltIcon from '@material-ui/icons/ArrowRightAlt';
import ArrowLeft from '@material-ui/icons/ArrowLeft';
//https://stackoverflow.com/questions/46816869/module-not-found-cant-resolve-material-ui-autocomplete
import Autocomplete from '@material-ui/lab/Autocomplete';
import TextField from '@material-ui/core/TextField';
import { ReactSearchAutocomplete } from 'react-search-autocomplete'



import 'ag-grid-community/dist/styles/ag-grid.css';
import 'ag-grid-community/dist/styles/ag-theme-alpine.css';
import { keys } from "@material-ui/core/styles/createBreakpoints";
import { Backdrop } from "@material-ui/core";

export default class FetchMenuData extends React.Component {



  state = {
    loading: "menu",
    redrawing: "true",
    //possible values are true, false, and leaf
    data: null,
    tableData: [],
    keys: [],
    searchTerm: "",
    leafData: [],
    manyItems: []
  };


  constructor(props) {
    super(props);
    this.state = {
      loading: "menu",
      data: null,
      tableData: [],
      redrawing: "true",
      tree: null,
      keys: [],
      searchTerm: "",
      lastTimeUpdated: 0,
      leafData: [],
      manyItems: [...new Array(10000)].map((_, i) => ({
        id: i,
        name: `something${i}`,
        description:
          "Some description text, where the search will be performed too.",
      }))

      //keys will have a two variable array inside 
      //[code, proper_name]
      //ie. [3, Ferreteria]
    };
    this.getData();

  }

  async getData() {
    var response = await fetch('http://192.168.0.10:3000/sql_tree');
    var treeData = await response.json();
    // console.log("Data is " + treeData);

    response = await fetch('http://192.168.0.10:3000/articulos');
    var leafData = await response.json();
    console.log("Leaf Data is ");
    console.log(leafData);
    console.log("ManyItems  is ");
    console.log(this.state.manyItems);
    this.setState({ tree: treeData, loading: "false", leafData: leafData });
  }

  async getTableData() {
    var prodName = this.state.keys;
    prodName = String(prodName[prodName.length - 1][1]);
    console.log("prodNameucto is " + String(prodName));
    var requestDict = { prod: prodName };
    console.log("prodNameucto is " + String(prodName));
    console.log("Body is " + JSON.stringify(requestDict));
    const response = await fetch('http://192.168.0.10:3000/data2?prod=' + prodName);

    const tableData = await response.json();
    console.log("Data is " + tableData);
    this.setState({ tableData: tableData, loading: "leaf" });

  }

  drawBranch() {
    console.log("UPDATING MAP");
    this.state.data = [];
    var treeBranch = this.state.tree;

    console.log("Keys are " + this.state.keys);
    for (let p = 0; p < this.state.keys.length; p++) {
      console.log("Key entry is " + this.state.keys[p]);
      treeBranch = treeBranch[this.state.keys[p][0]];
    }
    // console.
    for (const [key, value] in Object.entries(treeBranch)) {
      console.log("Key = " + key + " Value = " + treeBranch[key].proper_name);
    }
    treeBranch.map((entry) => { console.log(entry); this.state.data.push(<BBox title={entry.proper_name} img={entry.img_link} code={entry.code} tree={treeBranch} keys={[]} father={this} />) });
    this.setState({ redrawing: "false" });
  }

  drawLeaf() {
    var leaf = this.state.keys[this.state.keys.length - 1];
    console.log("Leaf is " + leaf);
    console.log("Leaf Name is " + leaf[1]);
    this.setState({ loading: "waiting for leaf data" });
  }

  searchUpdate(lastTimeUpdated) {
    if (Date.now() - lastTimeUpdated > 500) {
      console.log("Search Update!");
    }

  }


  back() {
    var temp = this.state.keys;
    
    if(this.state.loading == "leaf")
    {
      temp.pop();
      this.setState({ redrawing: "true", keys: temp, loading: false});
    }
    else
    {
      temp.pop();
      temp.pop();
      this.setState({ redrawing: "true", keys: temp });
    }
    

  }
  render() {

    var headerType  = ((this.state.keys.length>1)?"Maxima-Short" : "Maxima");
    var header = [
    
      <div className={headerType}>
        <h1 className="MaximaTitle">MAXIMA</h1>
      </div>,
      <ReactSearchAutocomplete className="SearchBar"
        resultStringKeyName="Articulo" // String to display in the results
        fuseOptions={{ keys: ["Articulo", "Giro"] }}
        items={this.state.leafData}
        onSearch={(string, results) => { console.log(string, results) }}
        onHover={console.log("Hovering!")}
        onSelect={(item) => {  
          // console.log("Results are !!");
          // console.log(item);
          var temp = this.state.tree;
          this.setState({ loading: "waiting for leaf data", keys: [[item["Giro"], String(this.state.tree[item["Giro"]].proper_name)], ["_children", ""], [item["Genero"], String(this.state.tree[item["Giro"]]["_children"][item["Genero"]].proper_name)], ["_children", ""], ["", item["Articulo"]]] });
          this.render();
  
        }}
        onFocus={console.log("Focusing!")}
        formatResult={(item) => {
          // console.log("Format result item is: ");
          // console.log(item);
          return String(item).toLowerCase();
        }
          // return (<p dangerouslySetInnerHTML={{__html: '<strong>'+item+'</strong>'}}></p>); //To format result as html
        }
  
        autoFocus
      />];

    var pathString = [];
    // console.log("Keys are " + this.state.keys);
    for (let i = 0; i < this.state.keys.length; i++) {
      console.log(this.state.keys[i]);
      if (this.state.keys[i][0] != "_children") {
        if (i != 0) {
          pathString.push(<ArrowRightAltIcon></ArrowRightAltIcon>);
        }
        pathString.push(<a>{this.state.keys[i][1]}</a>);
      }
    }

    if(this.state.keys !== [])
    {
      header.push(
        <div className="path">
          <button id="backButton" className="backButton" onClick={() => { this.back(); }}><ArrowLeft></ArrowLeft></button>
          {pathString}
        </div>);
    }

    console.log(this.state.loading);
    console.log("Now Loading!");
    if (this.state.loading == "menu") {

      return <div>loading...</div>;
    }
    if (this.state.loading == "waiting for leaf data") {
      this.getTableData()
      return <div>loading leaf...</div>;
    }
    if (this.state.loading == "leaf") {
      return ([
          header,
          <div>
          <div className="ag-theme-alpine" style={{ height: 400, width: "100%" }}>
            <AgGridReact
              frameworkComponents={{
                distribCellRenderer: DistribCellRenderer,
                checkoutCellRenderer: (params) => { return <CheckoutCellRenderer data={params.data} /> }
              }}
              defaultColDef={{
                editable: false,
                sortable: true,
                flex: 1,
                minWidth: 100,
                filter: true,
                resizable: true,
              }}
              rowData={this.state.tableData}>
              <AgGridColumn field="Checkout" cellRenderer="checkoutCellRenderer"></AgGridColumn>
              <AgGridColumn field="Material_o_Especificaciones"></AgGridColumn>
              <AgGridColumn field="Attr_o_Gauge"></AgGridColumn>
              <AgGridColumn field="Medida"></AgGridColumn>
              <AgGridColumn field="MedidaAd"></AgGridColumn>
              <AgGridColumn field="Distribuidora" cellRenderer="distribCellRenderer"></AgGridColumn>
            </AgGridReact>
          </div>
        </div>

            ]

      );

    }
    else if (!this.state.tree) {
      return <div>didn't get data</div>;
    }
    else if (this.state.redrawing == "true") {
      this.drawBranch();
    }
    else if (this.state.redrawing == "leaf") {
      console.log("Redrawing As Leaf");
      this.drawLeaf();
    }


    





    return ([
      header,
      <div className="grid">
      {this.state.data}
    </div>
      ]
    );
  }

  drawLevel(param) {
    console.log("DrawLevel Param!");
  }


  // checkStatus = () => {
  //   // console.log("Loading state!");
  //   this.setState({		// use this function
  //       'loading' : !this.state.loading,
  //   });
  // }


}
