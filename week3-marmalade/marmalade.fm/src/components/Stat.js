import React from 'react';
import Counter from './Counter';

const Stat = ({statName, statNumber, statWord}) => (
  <div className="mb4" style={{marginRight: -2}} >
    <div className="f5 black mb0 b biryani">
      {statName}
    </div>
    <Counter end={statNumber} duration={2} />
    <div className="f4 lh-1">
      {statWord}
    </div>
  </div>
)

export default Stat;
