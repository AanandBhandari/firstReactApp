const app = {
    title : 'Indecision App',
    subtitle : 'Put your life in the hands of a computer',
    option : []
};
const onFormSubmit = (e) => {
    //preventDefault prevent page to reload after submiting form and allow us to run some code below it
    e.preventDefault();
    const option = e.target.elements.option.value;
    if (option) {
        app.option.push(option);
        e.target.elements.option.value = '';
        renderIndecisionApp();
        
    }
};
const deleteAll = () => {
    app.option = [];
    renderIndecisionApp();
};

const onMakeDecision = () => {
    const random = Math.floor(Math.random()*app.option.length);
    alert(app.option[random]);
}

 
const appRoot = document.getElementById('app');

const renderIndecisionApp = () => {
    const template = (
        <div>
            <h1>{app.title}</h1>
            {app.subtitle && <p>{app.subtitle}</p>}
            <p>{app.option.length > 0 ? 'Here are your option' : 'No option'}</p>
             
             <button disabled = {app.option.length === 0} onClick = {onMakeDecision}>What should do I next?</button>
             <button onClick = {deleteAll}>Delete All Option</button>
            <ol>
            {
                app.option.map((option) => {
                    return <li key = {option}>{option} </li>
                })
            }
            </ol>
            <form onSubmit = {onFormSubmit}>
            <input name="option" type = "text" ></input>
            <button>Add Option</button>
            </form>
        </div>
    );
    ReactDOM.render(template,appRoot);
}
renderIndecisionApp();