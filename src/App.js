import React from 'react';
import './App.css';
import { withRouter, Link } from 'react-router-dom'

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
    }
  }

  render() {
    let { footList } = this.state;
    return (
      <div className='App' >
        {this.props.children}
      </div>
    )
  }
}

export default withRouter(App)