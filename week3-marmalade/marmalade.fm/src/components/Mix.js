import React from 'react';
import {Link} from 'react-router-dom';
import PlayButton from './PlayButton';
import PlayMix from './PlayMix';

// here we pick out our name props, and then the rest of the props
// we just pass on through
const Mix = ({name, pictures, slug, ...props}) => (
  <div
    className="aspect-ratio aspect-ratio--3x4 pointer bg-black cover bg-center"
    style = {{backgroundImage: `url(${pictures.extra_large})`}}
  >
    <Link to = {`/show/${slug}`}>
      {/* <PlayMix {...props}> */}
        <div className="ph3 pv4 aspect-ratio--object mix-overlay">
          <div className="flex items-center relative z-2">
            <h1 className="f4 f3-l mv0 white ttu biryani pr2 lh-title">{name}</h1>
            {/* PlayButton goes here */}
            <PlayButton />
          </div>
        </div>
      {/* </PlayMix> */}
    </Link>

  </div>
);

export default Mix;
