// http://superguides.netlify.com/react/jiffy/#jiffy-introduction

import React, { Component } from 'react';
// here we import in our loader spinner as an image
import loader from './images/loader.svg';
import clearButton from './images/close-icon.svg';
import Gif from './Gif';

const randomChoice = arr => {
  const randIndex = Math.floor(Math.random() * arr.length);
  return arr[randIndex];
};

// we pick out our props inside the header components
// we can pass down functions as props as well as things
// like numbers, strings, arrays or objects
const Header = ({clearSearch, hasResults}) => (
  <div className="header grid">
    {/* if we have results, show the clear button, otherwise show the title */}
    {hasResults ? (
      <button onClick={clearSearch}>
        <img src={clearButton} />
      </button>
    ) : (
      <h1 className="title">Jiffy</h1>
    )}
  </div>
);

const UserHint = ({loading, hintText}) => (
  <div className="user-hint">
    {/* here we Check whether we have a loading state and render out
        eitehr our spinner or hintText based on that, using a ternary operator */}
    {loading ? <img src={loader} className="block mx-auto" /> : hintText}
  </div>
)

class App extends Component {

  constructor(props) {
    super(props)
    this.state = {
      searchTerm: '',
      hintText: 'Hit enter to search',
      //gif: null,
      // we have an array of gifs
      gifs:[]
    }
  }

  // we want a function that searches the giphy API using fetch and
  // puts the search term into the query url and then we can do something withe the results

  // we can also write async methods into our components that let us use the
  // async/await style of function
  searchGiphy = async searchTerm => {
    //first we tru our fetch
    this.setState({
      // here we set our loading state to be true
      // and this will show the spinner at the bottom
      loading: true
    })
    try{
      // here we use the await keyword to wait for our respnse to come back
      const response = await fetch(
        `https://api.giphy.com/v1/gifs/search?api_key=o7IyuSKkLiR728rSCOE3Pov4refIv10F&q=${searchTerm}&limit=25&offset=0&rating=PG&lang=en`
      );
      // here we convert our raw response into json data
      const {data} = await response.json();
      // const {data} gets the .data part of our response
      // const data.data = await response.json();

      // console.log(data);

      // here we check if the array of results is empty
      // is it is, we throw an error which will stop the code here
      // and handle it in the catch area
      if(!data.length){
        throw `Nothing found for ${searchTerm}`
      }

      // here we grab a random result from our images
      const randomGif = randomChoice(data);

      this.setState((preState, props) => ({
        ...preState,
        // get the first result and put it in the state
        // gif: data[0]
        //gif: randomGif,
        // here we use our spread to take the previous gifs and spread them out,
        // and then add our new random gif onto the end
        gifs: [...preState.gifs, randomGif],
        // we turn off our loading spinner again
        loading: false,
        hintText: `Hit enter to see more ${searchTerm}`
      }));

    // if our fetch fails, we catch it down here
    }catch (error) {
      this.setState((prevState, props) => ({
        ...prevState,
        hintText: error,
        loading: false
      }))
      console.log(error);
    }
  };


  // with create react app we can write our methods as arrow functions,
  // meaning we don't need the constructor and bind
  // constructor(props) {
  //   super(props)
  //   this.handleChange = this.handleChange.bind(this)
  // }
  handleChange = event => {
    //const value = event.target.value;
    const {value} = event.target;
    // by setting the searchTerm in our state and also using that on the input as the value,
    // we have created what is called a controlled input
    this.setState((preState, props) => ({
      // we take our old props and spread them out here
      ...preState,
      // and then we overwrite the ones we want after
      searchTerm: value,
      hintText: value.length > 2 ? `Hit enter to search ${value}` : ''
    }));
    //console.log(event.target.value);
    //console.log(value);
  }

  handleKeyPress = event => {
    const {value} = event.target;
    // when we have two or more characters in our sesrch box
    // and we have also pressed enter, we then want to run a search
    if(value.length > 2 && event.key === 'Enter'){
      //alert(`search for ${value}`);
      // here we call our searchGiphy function using the search term
      this.searchGiphy(value);
    }
    //console.log(event.key);
  };

  // here we reset our state by clearing everything out and
  // making it default again (like in our original state)
  clearSearch = () => {
    this.setState((prevState, props) => ({
      ...prevState,
      searchTerm: '',
      hintText: '',
      gifs:[]
    }))
    // here we grab the input and then focus the cursor back into it
    this.textInput.focus();
    // https://reactjs.org/docs/refs-and-the-dom.html
  };

  render() {
    // const searchTerm = this.state.searchTerm;
    const {searchTerm, gifs} = this.state;
    // here we set a variable to see if we have any gifs
    const hasResults = gifs.length;

    return (
      <div className="page">
        <Header clearSearch={this.clearSearch} hasResults={hasResults} />

        <div className="search grid">
          {/* our stack of gif images */}

          {/* here we loop over our array of gif images from our state
          and we create multiple viseos from it */}

          {this.state.gifs.map(gif => (
            // we spread out all of our properties onto our Gif component
            <Gif {...gif} />
          ))}

          <input
            className="input grid-item"
            placeholder="Type something"
            onChange={this.handleChange}
            onKeyPress={this.handleKeyPress}
            value = {searchTerm}
            ref = {input => {
              this.textInput = input;
            }}
          />
        </div>

        {/* here we pass our userHint all of our state using a spread */}
        <UserHint {...this.state} />

      </div>
    );
  }
}

export default App;
