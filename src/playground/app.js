class IndecisionApp extends React.Component {
    constructor(props) {
        super(props);
        // to pass down to the child class we need to bind these methods
        this.handleDeleteOptions = this.handleDeleteOptions.bind(this);
        this.handlePick = this.handlePick.bind(this);
        this.handleAddOption = this.handleAddOption.bind(this);
        this.handleDeleteOption = this.handleDeleteOption.bind(this);
        this.state = {
            options : props.options
        };
    }
    componentDidMount() {
        try {
            const json = localStorage.getItem('options');
            const options = JSON.parse(json);
            if (options) {
            this.setState(()=> ({options}));
         }
        } catch (error) {
            // if got invalid json
        }
        
    }
    componentDidUpdate(prevProps,prevState) {
        if (prevState.options.length !== this.state.options.length) {
            const json = JSON.stringify(this.state.options);
            localStorage.setItem('options',json);
        }
    }
    handleDeleteOptions() {
        this.setState(() => ({ options: []})); 
    }
    handleDeleteOption(optionToRemove){
        this.setState((preState)=> ({
            options : preState.options.filter(option =>optionToRemove !==option)
        }))
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
        const subtitle = "Put your life in the hands of a computer :)";
        return (
            <div>
            <Header subtitle = {subtitle} />
            <Action
                 hasOptions={this.state.options.length  > 0}
                 handlePick={this.handlePick}/>
            <Options 
                options = {this.state.options}
                handleDeleteOptions ={this.handleDeleteOptions}
                handleDeleteOption ={this.handleDeleteOption}/>
            <AddOption 
                handleAddOption={this.handleAddOption}/>
            </div>
        );
    }
} ;
IndecisionApp.defaultProps={
    options : []
}
const Header = (props) => {
    return (
        <div>
        <h1>{props.title}</h1>
        {props.subtitle && <h2>{props.subtitle}</h2>}
        </div>
    );
}
Header.defaultProps = {
    title : 'Indecision App'
}
// class Header extends React.Component {
//     render() {
//         // console.log(this.props)
//         return (
//             <div>
//             <h1>{this.props.title}</h1>
//             <h2>{this.props.subtitle}</h2>
//             </div>
//         );
//     }
// }
const Action = (props) => {
    return (
        <div>
        <button
            onClick={props.handlePick}
            disabled={!props.hasOptions}
        >
        What should I do ?</button>
        </div>
    );
} 

// class Action extends React.Component {
//     render() {
//         return (
//             <div>
//             <button
//                 onClick={this.props.handlePick}
//                 disabled={!this.props.hasOptions}
//             >
//             What should I do ?</button>
//             </div>
//         );
//     }
// }
const Options = (props) => {
    return (
        <div>
        <button onClick={props.handleDeleteOptions} >RemoveAll</button> 
        {props.options.length === 0 && <p>Please add an option to get started</p>}
        {
            props.options.map(option => 
                 <Option 
                    key={option} 
                    optionText={option}
                    handleDeleteOption={props.handleDeleteOption} />)
        }             
        </div>
   );
}
// class Options extends React.Component {
// //    constructor(props) {
// //        super(props);
// //        this.handleRemoveAll = this.handleRemoveAll.bind(this);
// //    }
// //    handleRemoveAll() {
// //        console.log(this.props.options)
// //    }

//     render() { 
        
//         return (
//              <div>
//              <button onClick={this.props.handleDeleteOptions} >RemoveAll</button> 
//              {
//                  this.props.options.map(option => <Option key={option} optionText={option} />)
//              }             
//              </div>
//         );
//     }
// }

// <button onClick={props.handleDeleteOption}>remove</button> down there this will not work coz this cannot pass props.optionText as 
// parameter on function props.handleDeleteOption so we need to add inline arrow function
const Option = (props) => {
    return (
        <div>{props.optionText}
        <button 
            onClick={(e) => {
                props.handleDeleteOption(props.optionText);
            }}>
        remove</button>
        </div>
    )
};

// class Option extends React.Component {
//     render() {
//         return (
//             <div>{this.props.optionText}</div>
//         )
//     }
// }
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
        if (!error) {
            e.target.elements.option.value = '';
        }
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
// an example for stateless functional component
// const User = (user) => {
//     return (
//         <div>
//             <p>Name : {user.name}</p>
//         </div>
//     )
// }
// ReactDOM.render(<User name='helloworld'/>,document.getElementById('app'))
ReactDOM.render(<IndecisionApp />,document.getElementById('app'));
// console.log('helloworld')