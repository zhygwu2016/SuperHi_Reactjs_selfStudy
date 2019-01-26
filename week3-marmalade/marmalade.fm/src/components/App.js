/*global Mixcloud*/
import React, { Component } from 'react';
import { BrowserRouter as Router, Route} from "react-router-dom";

import FeaturedMix from './FeaturedMix';
import Header from './Header';

const Home = () => <h1>Home</h1>;
const Archive = () => <h1>Archive</h1>;
const About = () => <h1>About</h1>;

class App extends Component {
  mountAudio = async () => {
    // when we use the this keyword, our widget is now accessible
    // anywhere inside the component
    this.widget = Mixcloud.PlayerWidget(this.player);
    // here we wait for our widget to be ready before continuing
    await this.widget.ready;
    await this.widget.play();
    console.log(this.widget);
  };

  componentDidMount() {
    // when our app component is all loaded onto the page
    // our componentDidMount gets called and we can be sure
    // everything is ready, so we then run our mountAudio() method
    this.mountAudio();
  }

  togglePlay = () => {
    console.log('togglePlay');
    // we wat to togglePlay() on our widget
    this.widget.togglePlay();
  };

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
                <button onClick={this.togglePlay}>Play/Pause</button>
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
