import React from 'react';
import {connect} from 'react-redux';
import Stat from './Stat';

// here we import the actions
import actions from '../store/actions'
console.log(actions);


const About = ({mixes, currentMix, setMix}) => (
  <div className="pad-bottom ph3 ph4-l">
    <div className="measure center 1h-copy">

      <div>
        <button onClick={() => setMix('some future funky disco!')}>Set the redux state</button>
        <h1>{currentMix}</h1>
      </div>

      <p className="mt0">
        Marmalade.fm features the latest and greatest in grooves, beats and
        world music.
      </p>
      <p>
        Whether you're into hip hop, trip hop, classic jazz, fusion jazz, afro
        beat or break beat...
        we have you covered!
      </p>

      <Stat statName="Featuring..." statNumber={mixes.length} statWord="mixes" />
      {/* play_count */}
      <Stat
        statName="Played..." statNumber={mixes.reduce((accum, current) =>
        accum + current.play_count, 0)} statWord="times"
      />
      {/* audio_length */}
      <Stat statName="With..." statNumber={mixes.reduce((accum, current) =>
      accum + current.audio_length, 0)} statWord="seconds" />

    </div>
  </div>
);

// here we connect our component to the redux state
// we pass it our entire state and all of our actions
// this is a higher order component (a wrapper component)
// that provides our About component with all our data
export default connect(state => state, actions)(About);
//export default About;
