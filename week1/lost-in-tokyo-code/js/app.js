//const Hello = props => <h1>Hello {props.name}</h1>;

//ReactDOM.render(<Hello name="Lawrence" />, document.getElementById('root'));

const Banner = props => <h1>Hello {props.firstName} {props.surName}</h1>;

ReactDOM.render(<Banner firstName="Rik" surName="Lomas" />,
document.getElementById('root'));
