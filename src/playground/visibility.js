 const appRoot = document.getElementById('app');
// let btnValue = 'show details';
// const toggle = () => {
//     if (btnValue == 'show details') {
//         btnValue = 'hide details'
//         render();
//     } else if (btnValue == 'hide details') {
//         btnValue = 'show details'
        
//         render();
//     }
// };

// const render = () => {
//     const template = (
//         <div>
//             <h1>Visibility Toggle</h1>
//             <button onClick = {toggle}>{btnValue}</button>
//             {btnValue =='hide details' ? <p>hey! it works</p> : null}
//         </div>
//     );
//     ReactDOM.render(template,appRoot);
// }
// render();
let Visibility = false;
const toggle = () => {
    Visibility =!Visibility;
    render();
}
const render = () => {
    const template = (
        <div>
            <h1>Visibility Toggle</h1>
            <button onClick = {toggle}>{Visibility ? 'hide details' : 'show details'}</button>
            {Visibility && <p>hey! it works</p>}
        </div>
    );
    ReactDOM.render(template,appRoot);
}
render();