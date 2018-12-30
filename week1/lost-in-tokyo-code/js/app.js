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
