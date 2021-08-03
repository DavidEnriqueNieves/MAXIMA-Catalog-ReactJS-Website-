import React, { useState } from 'react';
//https://medium.com/@mikjailsalazar/just-another-searchbar-react-axios-lodash-340efec6933d
// https://github.com/TarekRaafat/autoComplete.js
const SearchBarComponent = () => {
  const [query, setQuery] = useState('');
  const [searchQuery, setSearchQuery] = useState({});
  const [dataList, setDataList] = useState([]);
  const [errorMssg, setErrorMssg] = useState('');
  var lastTimeUpdated = 0;
  var debounce = 1000;
  /**
   * This will be called every time there is
   * a change in the input
   * @param {*} { target: { value } }
   */
  const onChange = ({ target: { value } }) => {
    setQuery(value);

    console.log("Changed input");
    const search = ()=>{ if(Date.now() - lastTimeUpdated > 1000){return sendQuery}};
    // const search = "lol";

    setSearchQuery(prevSearch => {
      if (prevSearch.cancel) {
        prevSearch.cancel();
      }
      return search;
    });
    
    // search(value);
  };

  
  const sendQuery = async value => {
    const response = await fetch('http://192.168.0.10:3000/articulos');
    const data = await response.json();
    console.log("Articulos data is " + data);
    return data;
  };

  return (
    <div>
      <div>
        <p>Type to search!</p>
        <input type="text" value={query} placeholder="Enter Movie Title" onChange={onChange} />
      </div>
      <div>
        {/* <ResultListComponent items={dataList} /> */}
        {errorMssg}
      </div>
    </div>
  );
};

export default SearchBarComponent;