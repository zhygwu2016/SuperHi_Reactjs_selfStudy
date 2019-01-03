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

const App = () => (
  <div>
    <div className="min-vh-100 ph4 flex flex-column">
      {/* our navigation component */}
      <Intro />
      {/* our intro text component */}
    </div>
    <div className="flex flex-wrap container">
      {/* our attractions list component */}
    </div>
  </div>
)

ReactDOM.render(<App />, document.getElementById('root'));
