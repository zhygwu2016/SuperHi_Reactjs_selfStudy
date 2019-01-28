/*global Mixcloud*/
import React, { Component } from 'react';
import { BrowserRouter as Router, Route} from "react-router-dom";

import FeaturedMix from './FeaturedMix';
import Header from './Header';

const Home = () => <h1>Home</h1>;
const Archive = () => <h1>Archive</h1>;
const About = () => <h1>About</h1>;

class App extends Component {
  constructor(props){
    super(props)
    this.state = {
      // whether a mix is currently playing
      playing: false,
      // the id of current mix
      currentMix: ''
    };
  }


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

    console.log(this.widget);
  };

  componentDidMount() {
    // when our app component is all loaded onto the page
    // our componentDidMount gets called and we can be sure
    // everything is ready, so we then run our mountAudio() method
    this.mountAudio();
  }

  togglePlay = () => {
    // we wat to togglePlay() on our widget
    this.widget.togglePlay();
  };

  playMix = mixName => {
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

  render() {
    return (
      // router wraps our whole page and lets us use react-Router
      // https://reacttraining.com/react-router/web/example/basic
      <Router>

        <div>
          {/* this div contains our page (excluding audio player) */}
          <div className="flex-l justify-end">
            {/* FeaturedMix (needs styling and updateing) */}
            <FeaturedMix />
            <div className="w-50-l relative z-1">
              {/* Header (needs styling and updateing) */}
              <Header />
              {/* Routed page */}

              <div>
                <button onClick={this.togglePlay}>
                  {/* if a mix is playing we say 'Pause'. otherwise 'play' */}
                  {this.state.playing ? 'Pause' : 'Play'}
                </button>
              </div>

              <div>
                <h1>Currently playing: {this.state.currentMix}</h1>

                <button onClick={() => this.playMix
                  ('/NTSRadio/bonobo-24th-june-2015/')}>
                  Play Mix
                </button>

                <button onClick={() => this.playMix
                  ('/NTSRadio/ryuichi-sakamoto-22nd-september-2017/')}>
                  Play four tet mix
                </button>
              </div>

              <Route exact path="/" component={Home} />
              <Route path="/archive" component={Archive} />
              <Route path="/about" component={About} />
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
