/*global Mixcloud*/
import React, { Component } from 'react';
import { BrowserRouter as Router, Route} from "react-router-dom";

import FeaturedMix from './FeaturedMix';
import Header from './Header';
import Home from './Home';
import Archive from './Archive';
import About from './About';
import Show from './Show';

// we import our mix data
import mixesData from '../data/mixes';

class App extends Component {
  constructor(props){
    super(props)
    this.state = {
      // whether a mix is currently playing
      playing: false,
      // the id of current mix
      currentMix: '',
      // this will be equal to our data dile of mixes
      mixIds: mixesData,
      mix: null,
      mixes: []
    };
  }

  // fetchMixes = async () => {
  //
  //   const {mixIds} = this.state;
  //   //console.log(mixIds);
  //
  //   // here we loop over our mix ids and fetch each other
  //   mixIds.map(async id => {
  //     try {
  //       // always remember await when using fetch in an async function
  //       const response = await fetch (
  //         //'https://api.mixcloud.com/yazcine/bal-dambiances-ruh-special-guests-collab-by-skyecatcher-and-neon-jesus/'
  //         // we add the id onto the end of our url as a dynamic segment
  //         `https://api.mixcloud.com${id}`
  //       );
  //       const data = await response.json();
  //       // put the mix into our state
  //       this.setState((prevState, props) => ({
  //         // here we add our data onto the end of all of previous state using the spread
  //         mixes: [...prevState.mixes, data]
  //       }));
  //
  //     } catch (error) {
  //       console.log(error);
  //     }
  //   })
  //
  // };

  // https://github.com/superhi/marmalade-fm/blob/17665becad3032b99d258b7336b1708b438993ec/src/components/App.js#L29-L59
  fetchMixes = async () => {
    const {mixIds} = this.state;

    // we `reduce` over the mixes to make sure they're always returned in order,
    // if we used `map` here instead whichever mix came back from the api first
    // would be the one set first in the state
    const mixes = await mixIds.reduce(async (asyncMixes, id) => {
      try {
        // always remember to `await` when using fetch in an async function
        // we add the id onto the end of our url as a dynamic segment
        const response = await fetch(`https://api.mixcloud.com${id}`);
        const data = await response.json();
        // because this callback inside our `reduce` is an async function we need
        // to get our `mixes` back out of the promise before we can add the new mix,
        // we can do this by `await`ing them
        const mixes = await asyncMixes;
        // now we can add our `data` onto the end of all of the rest of the `mixes`
        // with an array spread
        return [...mixes, data];
      } catch (error) {
        console.log(error);
        return mixes;
      }
      // the initial value of `mixes` is an empty array wrapped in a promise.
      // this means that line 44 will work the first time through the `mixIds`
      // as well as every other time
    }, Promise.resolve([]));

    // and finally set the `mixes` to our state
    this.setState({mixes});
  };


  mountAudio = async () => {
    // when we use the ‘this’ keyword, our widget is now accessible
    // anywhere inside the component
    this.widget = Mixcloud.PlayerWidget(this.player);
    // here we wait for our widget to be ready before continuing
    await this.widget.ready;
    //await this.widget.play();

    // using mixcloud widget events we can detext when our audio has been paused,
    // set playing state to false
    this.widget.events.pause.on(() =>
      this.setState({
        playing: false
      })
    );
    // audio is playing again, sey playing state to true
    this.widget.events.play.on(() =>
      this.setState({
        playing: true
      })
    );

  };

  componentDidMount() {
    // when our app component is all loaded onto the page
    // our componentDidMount gets called and we can be sure
    // everything is ready, so we then run our mountAudio() method
    this.mountAudio();
    this.fetchMixes();
  }

  // togglePlay = () => {
  //   // we wat to togglePlay() on our widget
  //   this.widget.togglePlay();
  // }
  //
  // playMix = mixName => {
  //   // update the currentMix in our state with the mixName
  //   this.setState({
  //     currentMix: mixName
  //   });
  //
  //   // load a new mix by its name and then start playing it immediately
  //   /* https://www.mixcloud.com/developers/widget/#methods
  //     Methods 第一项：
  //     load(cloudcastKey, startPlaying):
  //     Load a new upload by key (e.g. /spartacus/lambiance/).
  //     Pass in startPlaying=true to start playing once loaded.
  //     Returns a promise that is resolved once the new upload has loaded. */
  //   this.widget.load(mixName, true);
  // }

  actions = {
    // we group our methods together inside of an object called actions
    togglePlay: () => {
      // we wat to togglePlay() on our widget
      this.widget.togglePlay();
    },

    playMix: mixName => {
      // if the mixname is the same as the currently playing mix,
      // we want to pause it instead
      // const currentMix = this.state.currentMix;
      const {currentMix} = this.state;
      if(mixName === currentMix){
        // when our code see return statement, it will stop running here and exit
        return this.widget.togglePlay();
      }

      // update the currentMix in our state with the mixName
      this.setState({
        currentMix: mixName
      });
      // load a new mix by its name and then start playing it immediately
      /* https://www.mixcloud.com/developers/widget/#methods
        Methods 第一项：
        load(cloudcastKey, startPlaying):
        Load a new upload by key (e.g. /spartacus/lambiance/).
        Pass in startPlaying=true to start playing once loaded.
        Returns a promise that is resolved once the new upload has loaded. */
      this.widget.load(mixName, true);
    }
  }

  render() {
    // this makes a variable from our first mix in the array
    // if the array is empty, we assign it a default value of an empty {} object
    const [firstMix = {}] = this.state.mixes;

    return (
      // router wraps our whole page and lets us use react-Router
      // https://reacttraining.com/react-router/web/example/basic
      <Router>

        <div>
          {/* this div contains our page (excluding audio player) */}
          <div className="flex-l justify-end">
            {/* FeaturedMix (needs styling and updateing) */}
            <FeaturedMix {...this.state} {...this.actions} {...firstMix} id={firstMix.key} />
            <div className="w-50-l relative z-1">
              {/* Header (needs styling and updateing) */}
              <Header />
              {/* Routed page */}

              {/* here we pass our state and our actions down into the home component
              so that we can use them */}
              <Route exact path="/" render={() => <Home {...this.state}
                {...this.actions} />} />
              <Route path="/archive" render={() => <Archive {...this.state}
                {...this.actions} />} />
              <Route path="/about" render={() => <About {...this.state} />} />

              <Route
                path="/show/:slug"
                // here we pass in the route params so that we can access the
                // url of the current show page
                render={routeParams => <Show {...routeParams} {...this.state}
                />}
              />

            </div>
          </div>

          {/* AudioPlayer */}
          <iframe
            width="100%"
            height="60"
            //src="https://www.mixcloud.com/widget/iframe/?hide_cover=1&mini=1&feed=%2FNTSRadio%2Ffloating-points-jamie-xx-18th-august-2016%2F"
            src="https://www.mixcloud.com/widget/iframe/?hide_cover=1&mini=1&feed=%2FNTSRadio%2Frap-vacation-w-kris-mangey-24th-january-2019%2F"
            frameBorder="0"
            className="db fixed bottom-0 z-5"
            // this allows us to get the actual html element inside react
            ref={ player => { this.player = player; }}
          />
        </div>

      </Router>
    );
  }
}

export default App;
