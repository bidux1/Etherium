import React from 'react';
import ReactDOM from 'react-dom'

// Create a new component. this component should produce 
// some HTML
const App = () =>   {
    return <div> Hi</div>;
}



// tale this cpomponent's generated HTML and put it on the page ( DOM)
const node = document.querySelector('.container');
ReactDOM.render(<App />, node);