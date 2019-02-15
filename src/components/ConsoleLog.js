import React, { Component } from 'react';

class Console extends Component {
  constructor(props){
    super(props)
    this.codebox = React.createRef()
  }
  render(){
    return (
      <div>
        <div ref={this.codebox}></div>
        <h1>ConsoleLog Page</h1>        
      </div>
    )
  }
}

export default Console