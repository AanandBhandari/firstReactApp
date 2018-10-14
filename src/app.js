class IndecisionApp extends React.Component {
    render() {
        const title = "Indecision";
        const subtitle = "Put your life in the hands of a computer :)";
        const options = ['number one', 'number two', 'number three', 'number four']
        return (
            <div>
            <Header title={title}  subtitle = {subtitle} />
            <Action />
            <Options options = {options} />
            <AddOption />
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
            <button>What should I do ?</button>
            </div>
        );
    }
}

class Options extends React.Component {
   hasOption() {
       console.log(this.props.options)
   }
    render() {
        
        return (
             <div>
             <button onClick={this.hasOption.bind(this)} >RemoveAll</button> 
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
    handleAddOption(e) {
        e.preventDefault();
        // e.target i.e form element
        const option = e.target.elements.option.value.trim();
        if (option) {
            alert(option)
        }
    }
    render() {
        return (
            <div>
                <form onSubmit={this.handleAddOption}>
                    <input type='text' name='option'/>
                    <button>Add option</button>
                </form>
            </div>
        );
    }
}
ReactDOM.render(<IndecisionApp />,document.getElementById('app'));
// console.log('helloworld')