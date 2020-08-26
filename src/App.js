import React from 'react'
import './App.css';
import Editor from './Editor';

function App() {
  return (
    <div className="container">
      <div className='jumbotron'>
        <h1 style={{ backgroundColor: '#3282b8', textAlign: 'center' }} className='p-2'>Validate SQL Queries</h1>
        <Editor />
      </div>
    </div >
  );
}


export default App;
