class App extends Component {

  constructor(props) {
    super(props)
    this.state = {
      searchTerm: '',
      hintText: 'Hit enter to search',
      gif: null,
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

      // here we grab a random result from our images
      const randomGif = randomChoice(data);

      this.setState((preState, props) => ({
        ...preState,
        // get the first result and put it in the state
        // gif: data[0]
        gif: randomGif,
        // here we use our spread to take the previous gifs and spread them out,
        // and then add our new random gif onto the end
        gifs: [...preState.gifs, randomGif]
      }));

    // if our fetch fails, we catch it down here
    }catch (error) {

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

  render() {
    // const searchTerm = this.state.searchTerm;
    const {searchTerm, gif} = this.state;
    return (
      <div className="page">
        <Header />
        <div className="search grid">
          {/* our stack of gif images */}

          {/* it's only going to render our video when we have a gif in the state
            we can test it using && */}
          {gif &&
            <video
              className = "grid-item video"
              autoPlay
              loop
              src={gif.images.original.mp4}
            />
          /* 本来应是 src={this.state.gif.images.original.mp4}
            前面的const searchTerm = this.state;改成了const {searchTerm, gif} = this.state;
            于是就可以在这里省略this.state.gif.images.original.mp4*/
          }

          <input
            className="input grid-item"
            placeholder="Type something"
            onChange={this.handleChange}
            onKeyPress={this.handleKeyPress}
            value = {searchTerm}
          />
        </div>

        {/* here we pass our userHint all of our state using a spread */}
        <UserHint {...this.state} />

      </div>
    );
  }
}

export default App;
