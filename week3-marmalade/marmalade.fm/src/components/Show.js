import React, {Component} from 'react';
// https://date-fns.org/v1.29.0/docs/differenceInDays
import differenceInDays from 'date-fns/difference_in_days';
import Stat from './Stat';

class Show extends Component {
  constructor(props){
    super(props);
    this.state = {
      mix: {}
    };
  }

  // componentWillReceiveProps runs every timr our component gets some new props,
  // rather than just once like componentDidMount
  // meaning we can get and update the props every time some nre ones come in
  
  // componentWillReceiveProps(nextProps){
  //   const {match} = this.props;
  //   const {mixes} = nextProps;
  //
  //   console.log(mixes, match.params.slug);
  //
  //   // here we grab the mix that has a slug that matches our params from the url
  //   const [firstMix = {}] = mixes.filter(mix => mix.slug === match.params.slug);
  //   // only set the state if we have a firstMix
  //   this.setState({
  //     mix: firstMix
  //   });
  //
  // }

  render() {
    // const {match} = this.props;
    // const {mix} = this.state;

    // ↓ 临时代码，之后会有Redux写
    const {match, mixes} = this.props;
    console.log(mixes, match.params.slug);
    // here we grab the mix that has a slug that matches our params from the url
    const [mix = {}] = mixes.filter(mix => mix.slug === match.params.slug);
    // ↑

    return (
      <div className="ph3 ph4-l pad-bottom">
        <div className="measure center 1h-copy">
          <p>{mix.description}</p>

          <Stat
            statName="Plays..."
            statNumber={mix.play_count || 0}
            statWord="times"
          />

          {/* https://date-fns.org/v1.29.0/docs/differenceInDays */}
          {/* differenceInDays(new Date(), mix.created_time) */}
          {/* new Date() creates a date/time stamp from the current time */}
          <Stat
            statName="Uploaded..."
            statNumber={differenceInDays(new Date(), mix.created_time)}
            statWord="days ago"
          />

          <Stat
            statName="Lasting for..."
            statNumber={mix.audio_length / 60}
            statWord="minutes"
          />

        </div>

      </div>
    );
  }
}


export default Show;
