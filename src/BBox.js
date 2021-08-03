import React from "react";
// https://css-tricks.com/a-grid-of-logos-in-squares/
export default class BBox extends React.Component
{
    state =  {
        loading : true,
        data : null,
        keys : this.props.keys
    };


    drawLevel()
    {
        console.log("DRAW LEVEL");
        console.log("Name is " + this.props.title);
        console.log("Code is  is " + this.props.code);
        console.log(this.props.tree);
        this.state.data  = this.props.tree;
        console.log(this.props.father.state.keys);
        this.props.father.state.keys.push([String(parseInt(this.props.code)), this.props.title]);
        this.state.data = this.state.data[this.props.code];
        console.log("TreeBranch is ");
        console.log(this.state.data);
        if(this.state.data != undefined )//|| this.state.data.hasOwnProperty("_children")
        {
            this.props.father.state.keys.push(["_children",""]);
            console.log("Keys are!" + this.props.father.state.keys);
            this.props.father.state.redrawing = "true";
            this.props.father.render();
        }   
        else
        {
            console.log("Redrawing As Leaf");
            this.props.father.state.redrawing = "leaf";
            this.props.father.render();
        }
         
        

    }
    constructor(props)
    {
        super(props);
    }

    render() {
        return (
            //https://www.w3schools.com/react/react_events.asp
            <div onClick={() => {this.drawLevel("Name")}}>
            <img className="cardImg" src={this.props.img}></img>
            <div style={{"width" : "100%","height" : "100%"}}>
            {/* <hr width="100%"></hr> */}
            <div className="box-title">{this.props.title} </div>
            </div>
            </div>);
        
    }


}