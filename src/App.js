// import logo from './logo.svg';
import './App.css';
import React from 'react';
// import ReactDOM from 'react-dom';
// import Post from './Post';
import FetchMenuData from './FetchMenuData';


   
function App() {

  

    // ReactDOM.render(
    //   <div className="App">
    //     <div className="grid">
    //     <FetchMenuData />
    //     </div>
    //   <h1>hello from </h1>
    //   </div>, document.getElementById("root"));

    return (
      <div className="App">
      
        <FetchMenuData />
      </div>
    );
}

export default App;
