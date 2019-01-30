import React from 'react';
import Stat from './Stat';


const About = ({mixes}) => (
  <div className="measure center">
    <div className="1h-copy mb4">
      <p className="mt0">
        Marmalade.fm features the latest and greatest in grooves, beats and
        world music.
      </p>
      <p>
        Whether you're into hip hop, trip hop, classic jazz, fusion jazz, afro
        beat or break beat...
        we have you covered!
      </p>
    </div>

    <div className="">
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

export default About;
