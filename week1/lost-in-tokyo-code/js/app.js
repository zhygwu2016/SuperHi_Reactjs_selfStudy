// http://superguides.netlify.com/react/jiffy/#jiffy-introduction

/*
// const Hello = props => <h1>Hello {props.name}</h1>;
// ReactDOM.render(<Hello name="Lawrence" />, document.getElementById('root'));

const Title = props => <h1 className="tc">{props.title}</h1>;

const Banner = props => (
  <h1 className="tc f1 yellow pa3">
    Hello {props.firstName} {props.surName}
  </h1>
);

const App = () => (
  <div>
    <Title title="Welcome to my website!" />
    <Banner firstName="Lawrence" surName="Gosset" />
  </div>
);

// ReactDOM.render(<Banner firstName="Rik" surName="Lomas" />, document.getElementById('root'));
ReactDOM.render(<App />, document.getElementById('root'));
*/

const Highlight = ({children, type}) => (
  <span className={`relative highlight highlight-${type}`}>
    <span className="relative z-2">{children}</span>
  </span>
);

const Intro = () => (
  <div className="m-auto-ns f4 f3-m f2-l tc w-80-l normal">
    <div className="mb3 mb4-ns">
      <Highlight type="aqua">Lost in Tokyo</Highlight> is a directory of fun places to see,
      play in and <Highlight type="yellow">explore</Highlight>,
      in <Highlight type="blue">Tokyo</Highlight>, Japan.{' '}
    </div>
    <div>
      From museums and galleries, to robot restaurants and kitten cafes,
      Tokyo is the gift that keeps on giving. Dattebayo!{' '}
    </div>
  </div>
);

//console.log(menu);

// the ({className, href, children}) grabs our properties directly
// it means that we don't have to type out props.className, props.href etc
const NavItem = ({className, href, children, logo}) => (
  <li className={`mh2-ns f6 f4-1 tc ${className}`}>
    <a className="white no-underline" href={href}>
      {/* here we check for the logo prop, if we have it we render out our logo
        otherwise we just render out our regular navigation text(children prop)*/}
      {logo ? <img src="../../final-code/images/logo.svg" /> : children}
      {/* {children}*/}
    </a>
  </li>
);

const Nav = () => (
  /*<nav>
    <ul>
      <li>About</li>
      <li>Tickets</li>
      <li>
        <img src="../../final-code/images/logo.svg" />
      </li>
      <li>Journal</li>
      <li>Contact</li>
    </ul>
  </nav>*/
  <nav className="pt3 pt4-ns mb4 mb0-ns">
    <ul className="list flex flex-wrap flex-nowrap-ns justify-between items-center pa0 ma0">
      {menu.map(item => (
        <NavItem {...item} />
        // http://superguides.netlify.com/react/lost-in-tokyo/#spreading-our-props
      ))}
    </ul>
  </nav>
);

const Overlay = ({showInfo, title, description}) => (
  <div
    className="absolute w-100 h-100 flex items-center pa3 pa4-ns bg-aqua overlay"
    style = {{
      // we do a test to see whether our showInfo state is true
      // if it is, we change the transform to be none, otherwise -100%
      transform: showInfo? 'none' : 'translateY(-100%)'
    }}
  >
    <div>
      <h1 className="f4 f3-ns mt0 mb2 regular black normal lh-title">{title}</h1>
      <p className="lh-title lh-copy-ns mv0 black f6 measure-l">{description}</p>
    </div>
  </div>
)

// we can also create components as classes
// these gives us more advanced functionally and features such as the
// component lifecycle as well as react's in-built this.state.
class Attraction extends React.Component {
  constructor(props){
    super(props);
    this.state = {
      showInfo: false
    }
    // set up our methods
    // here we tell our toggleInfo about 'this'
    // otherwise things like setState will not work
    this.toggleInfo = this.toggleInfo.bind(this);
    this.closeInfo = this.closeInfo.bind(this);
  }

  // this is our own method
  toggleInfo(){
    this.setState((prevState, props) => ({
      // here we invert our showInfo boolean by using the previous state and
      // the ! exclamation mark
      showInfo: !prevState.showInfo
    }));
  }

  closeInfo() {
    // here we use setState the usual way because we don;t need access to the previous state,
    // we're just force setting the showInfo to be false
    this.setState({
      showInfo: false
    });
  }

  render(){
    const {title, description, className, image} = this.props
    // shorthand for:
    // const title = this.props.title,
    // const description = this.props.description
    // etc
    const {showInfo} = this.state
    return (
      <div
        className={`ph4 ph5-ns ph0-l mb4 mb5-ns w-100 overflow-hidden pointer
        attraction ${className}`}
        onClick = {this.toggleInfo}
        onMouseLeave={this.closeInfo}
      >

        <div className="relative">
          {/* here we remember to pass along all of our props and state */}
          <Overlay {...this.props} {...this.state} />
          <img src={`../../final-code/images/${image}`} className="db" />
        </div>
      </div>
    )
  }
}
/*
const Attraction = ({title, description, className, image}) => (
  <div
    className={`ph4 ph5-ns ph0-l mb4 mb5-ns w-100 overflow-hidden pointer
    attraction ${className}`}
  >
    <div className="relative">
      <div className="absolute w-100 h-100 flex items-center pa3 pa4-ns bg-aqua overlay">
        <div>
          <h1 className="f4 f3-ns mt0 mb2 regular black normal lh-title">{title}</h1>
          <p className="lh-title lh-copy-ns mv0 black f6 measure-l">{description}</p>
        </div>
      </div>
      <img src={`../../final-code/images/${image}`} className="db" />
    </div>
  </div>
)*/

const App = () => (
  <div>
    <div className="min-vh-100 ph4 flex flex-column">
      {/* our navigation component */}
      <Nav />
      {/* our intro text component */}
      <Intro />
    </div>
    <div className="flex flex-wrap container">
      {/* our attractions list component */}
      {attractions.map(attraction => <Attraction {...attraction} /> )}
    </div>
  </div>
)

ReactDOM.render(<App />, document.getElementById('root'));
