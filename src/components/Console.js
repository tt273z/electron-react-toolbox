import React, { Component } from 'react';
import { Button, Row, Col } from 'antd'

import 'codemirror/mode/xml/xml.js';
import 'codemirror/mode/javascript/javascript.js'; 
import { Controlled as CodeMirror } from 'react-codemirror2';

class Console extends Component {
  constructor(props){
    super(props)
    this.state = {
      code: '1+3'
    }
  }
  run = () => {
    let res = eval(this.state.code)
    document.querySelector('iframe').contentDocument.write(res)
  }
  clearCode = () => {
    this.setState({ code: '' })
  }
  render(){
    const options = {
      lineNumbers: false,//为true时样式错误?
      mode: 'javascript',
      theme: 'material',
      lineWrapping: true,
      readOnly: false,
    }
    const style = {
      section: {
        width: '50%',
        float: 'left'
      },
      iframe: {
        width: '100%',
        height: 300,
        border: 'none',
        background: '#eee'
      }
    }
    return (
      <div>
        <div>
          <Button type="primary" style={{ margin: '0 16px 16px 0' }} onClick={this.run}>运行</Button>
          <Button type="primary" onClick={this.clearCode}>清空</Button>          
        </div>
        <Row>
          <Col span={12}>
            <CodeMirror 
              value={ this.state.code }
              options={ options } 
              onChange={(editor,data, value) => {
              }} 
              onBeforeChange={(editor, data, value) => {
                this.setState({code: value});
              }}
            />             
          </Col>
          <Col span={12}>
            <iframe title="output" style={style.iframe}></iframe>
          </Col>
        </Row>
      </div>
    )
  }
}

export default Console