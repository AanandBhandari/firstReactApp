class IndecisionApp extends React.Component {
    constructor(props) {
        super(props);
        // to pass down to the child class we need to bind these methods
        this.handleDeleteOptions = this.handleDeleteOptions.bind(this);
        this.handlePick = this.handlePick.bind(this);
        this.handleAddOption = this.handleAddOption.bind(this);
        this.state = {
            options : []
        };
    }
    handleDeleteOptions() {
        this.setState(() => {
            return {
                options: []
            }; 
        });
    }
    handlePick() {
        const random = Math.floor(Math.random()*this.state.options.length);
        const option = this.state.options[random];
        alert(option);
    }
    handleAddOption(option) {
        if (!option) {
            return 'Enter valid value to add item';
        } else if (this.state.options.indexOf(option)>-1){
            return 'this option is already exists';
        }
            this.setState((preState) => {
                return {
                    options : preState.options.concat(option)
                };
            });
    }
    render() {
        const title = "Indecision";
        const subtitle = "Put your life in the hands of a computer :)";
        return (
            <div>
            <Header title={title}  subtitle = {subtitle} />
            <Action
                 hasOptions={this.state.options.length  > 0}
                 handlePick={this.handlePick}/>
            <Options 
                options = {this.state.options}
                handleDeleteOptions ={this.handleDeleteOptions} />
            <AddOption 
                handleAddOption={this.handleAddOption}/>
            </div>
        );
    }
} ;

class Header extends React.Component {
    render() {
        // console.log(this.props)
        return (
            <div>
            <h1>{this.props.title}</h1>
            <h2>{this.props.subtitle}</h2>
            </div>
        );
    }
}

class Action extends React.Component {
    render() {
        return (
            <div>
            <button
                onClick={this.props.handlePick}
                disabled={!this.props.hasOptions}
            >
            What should I do ?</button>
            </div>
        );
    }
}

class Options extends React.Component {
//    constructor(props) {
//        super(props);
//        this.handleRemoveAll = this.handleRemoveAll.bind(this);
//    }
//    handleRemoveAll() {
//        console.log(this.props.options)
//    }

    render() { 
        
        return (
             <div>
             <button onClick={this.props.handleDeleteOptions} >RemoveAll</button> 
             {
                 this.props.options.map(option => <Option key={option} optionText={option} />)
             }             
             </div>
        );
    }
}
class Option extends React.Component {
    render() {
        return (
            <div>{this.props.optionText}</div>
        )
    }
}
class AddOption extends React.Component {
    constructor(props) {
        super(props);
        this.handleAddOption =this.handleAddOption.bind(this);
        this.state = { 
            error : undefined
        };
    }
    handleAddOption(e) {
        e.preventDefault();
        // e.target i.e form element
        
        const option = e.target.elements.option.value.trim();
        const error = this.props.handleAddOption(option);
        this.setState(() => {
            return {error};
        });
    }
    render() {
        return (
            <div>
            {this.state.error && <p>{this.state.error}</p>}
                <form onSubmit={this.handleAddOption}>
                    <input type='text' name='option'/>
                    <button>Add option</button>
                </form>
            </div>
        );
    }
}
ReactDOM.render(<IndecisionApp />,document.getElementById('app'));
// ReactDOM.render(<p>helloworld</p>,document.getElementById('app'))
// console.log('helloworld')