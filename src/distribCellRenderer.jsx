import React from 'react';

export default (props) => {
  const cellValue = props.valueFormatted ? props.valueFormatted : props.value;

  var distribDict = {
    "Serafin" : {
      "img_link" : "https://images.squarespace-cdn.com/content/v1/5db9ec662bc2191eef1fae9e/1572465802488-YFKS5UA8QZTKK1ZAQ2EG/LOGO.jpg?format=1500w",
      "link" : "https://www.serafinwholesalepr.com/contacto" 
    }
  };

  var padding = 10;
  return (
    <span>
      <a href={distribDict[cellValue].link} >{cellValue}</a>
      <img src={distribDict[cellValue].img_link} height="20" width="auto" style={{"padding-left" : 10}}></img>
    </span>
  );
};
