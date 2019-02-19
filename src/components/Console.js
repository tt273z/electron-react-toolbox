import React, { Component } from 'react';

import 'codemirror/mode/xml/xml.js';
import 'codemirror/mode/javascript/javascript.js'; 
import { Controlled as CodeMirror } from 'react-codemirror2';

class Console extends Component {
  state = {
    value: 'function StringStream(string) {  this.pos = 0;  this.string = string; }  '
  }
  render(){
    let options = {
      lineNumbers: false,//为true时样式错误?
      mode: 'javascript',
      theme: 'material',
      lineWrapping: true,
      readOnly: false,

    }
    return (
      <div style={{ width: 400 }}>
        <CodeMirror 
          value={ this.state.value }
          options={ options } 
          onChange={(editor,data, value) => {
          }} 
          onBeforeChange={(editor, data, value) => {
            this.setState({value: value});
          }}
        />     
      </div>
    )
  }
}

export default Console