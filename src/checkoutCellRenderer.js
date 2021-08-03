import React, { useState } from 'react';
import ReactDOM from 'react-dom';
import AddShoppingCartIcon from '@material-ui/icons/AddShoppingCart';
import Modal from 'react-modal';

Modal.setAppElement('#root')
export default class CheckoutCellRenderer extends React.Component {
  // cellValue = props.valueFormatted ? props.valueFormatted : props.value;

  state = 
  {
    open : false,
    outHTML : []
  }
  setOpen = () => {this.open = true;}
  // const [open, setOpen] = useState(false);

  // var checkoutInfo = [];

  


  buttonClicked = () => {
    alert(` medals won!`);
  };

  retCheckoutInfo = ()=>
  {
  };

  handleOpen() {
    console.log("Drawing box as OPEN!!");
    // console.log(this.props.data);
    // console.log(this.props.data["Medida"]);

    this.state.outHTML = [];
    Object.entries(this.props.data).forEach(([key, value]) => {
      console.log(key, value);
      this.state.outHTML.push(<p><b>{key} : </b> {value}</p>)
    });
    this.state.outHTML = [<div className="checkoutInfo"><h1>{this.props.data["Distribuidora"]} - <b>0</b></h1>{this.state.outHTML}</div>];
    this.setState({open : true});
    this.render();
    // // this.setOpen(true);
  }

  handleClose() {
    this.setState({open : false});
    this.render();
  }



  padding = 10;

  customStyles = {
    content : {
      top                   : '50%',
      left                  : '50%',
      right                 : 'auto',
      bottom                : 'auto',
      marginRight           : '-50%',
      transform             : 'translate(-50%, -50%)'
    }
  };

  
  
  render()
  {
    if(this.state.open)
    {
      console.log("Rendeirng with Open !");
    }
    return (
        <div>
         <AddShoppingCartIcon onClick={()=>{this.handleOpen()}}></AddShoppingCartIcon>
        <Modal
          isOpen={this.state.open}
          style={this.state.customStyles}
          onRequestClose={()=>{this.handleClose()}}
          onClose={()=>{this.handleClose()}}
          aria-labelledby="simple-modal-title"
          aria-describedby="simple-modal-description"
        >
        <div className="checkoutInfo">
          <h2>Checkout:</h2>
          <h3>Distribuidoras disponibles:</h3>
          {this.state.outHTML}
        </div>
          

        </Modal>
      
    </div>
    );
  }
}
