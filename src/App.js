import React, { Component } from 'react'
import './App.css';
import axios from 'axios'

class App extends Component {
  constructor(props) {
    super(props)

    this.state = {
      data: "",
      result: null
    }
  }

  handleChange = (e) => {
    this.setState({ data: e.target.value })
  }

  handleSubmit = e => {
    e.preventDefault()
    if (this.state.data !== "") {
      axios.post("/data", { data: this.state.data })
        .then(res => this.setState({ data: "", result: res.data.result }))
        .catch(err => alert(err))
    }

    else { alert("PLease Enter an SQL Query!!!") }
  }
  render() {
    return (
      <div className="container">
        <div className='jumbotron'>

          <h1 style={{ backgroundColor: '#3282b8', textAlign: 'center' }} className='p-2'>Validate SQL Queries</h1>

          {/* Form For SQL Query */}
          <form method="POST" onSubmit={this.handleSubmit} style={{ textAlign: 'center' }} className='mt-4,'>
            <div className="form-group">
              <textarea name="data" value={this.state.data}
                onChange={this.handleChange}
                placeholder="Enter SQL Queries separated by semi colons"
                rows='10' cols='100' autoFocus />
            </div>
            <input type="submit" value="Submit" name="submit" className='btn btn-primary' />
          </form>

          <ul className='mt-4'>
            {this.state.result ? this.state.result.map((item, index) => {
              if(item.sql!==""){
              return item.message ?
                <React.Fragment key={index}>
                  <li className='mt-2' style={{ color: '#32CD32', listStyleType: 'none' }}>&#10004; {item.sql}
                  </li>
                </React.Fragment>
                : <React.Fragment key={index}>
                  < li className='mt-2' style={{ color: 'red', listStyleType: 'none' }}>&#10008; {item.sql}</li>
                </React.Fragment>
              }
              else
                return null
            }
            ) : null}
          </ul>
        </div>
      </div >
    );
  }
}

export default App;
