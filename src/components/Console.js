import React, { Component } from 'react';
import { Button, Row, Col, Upload, Icon } from 'antd'
import 'codemirror/mode/javascript/javascript.js'; 
import 'codemirror/addon/hint/show-hint.js'; 
import 'codemirror/addon/hint/javascript-hint.js'; 
import { Controlled as CodeMirror } from 'react-codemirror2';

class Console extends Component {
  constructor(props){
    super(props)
    this.state = {
      code: '//按ctrl代码提示 ',
      outputList: []
    }
    this.instance = null
  }
  componentDidMount = () => {
    // this.instance.on('cursorActivity', () => {
    //   this.instance.showHint()
    // })
  }
  run = () => {
    let res = eval(this.state.code)
    this.state.outputList.push(res)
    this.setState({ outputList: this.state.outputList })
  }
  clearCode = () => {
    this.setState({ code: '' })
  }
  clearRes = () => {
    this.setState({ outputList: [] })
  }
  render(){
    const options = {
      lineNumbers: false,//为true时样式错误?
      mode: 'javascript',
      theme: 'material',
      lineWrapping: true, //自动换行
      readOnly: false, //可编辑模式
      autofocus: true, //自动获得焦点
      extraKeys: {'Ctrl': 'autocomplete'} //按 ctrl 出现代码提示或补全代码
    }
    const style = {
      section: {
        width: '50%',
        float: 'left'
      },
      output: {
        width: '100%',
        height: 300,
        background: '#eee'
      }
    }
    const uploadprops = {
      // action: '//jsonplaceholder.typicode.com/posts/',
      customRequest({ file, onSuccess }){
        setTimeout(() => { onSuccess('ok') }, 0)
      },
      onChange({ file, fileList }) {
        if (file.status !== 'uploading') {
          console.log(file, fileList);
        }
      },
      defaultFileList: [{
        uid: '1',
        name: 'xxx.png',
        status: 'done',
        response: 'Server Error 500', // custom error message to show
      }]
    }
    return (
      <div>
        <div className="button-row">
          <Button type="primary" onClick={this.run}>运行</Button>
          <Button onClick={this.clearCode}>清空代码</Button>     
          <Button onClick={this.clearRes}>清空结果</Button>
          <Button type="dashed">
            <Icon type="plus-circle" />CDN
          </Button>
          <Upload {...uploadprops}>
            <Button type="dashed">
              <Icon type="plus-circle" />本地库
            </Button>
          </Upload>
        </div>
        <Row>
          <Col span={12}>
            <CodeMirror 
              value={ this.state.code }
              options={ options } 
              // onChange={(editor, data, value) => { }} 
              // editorDidMount={editor => { this.instance = editor }} //获取codemirror实例
              onBeforeChange={(editor, data, value) => {
                this.setState({code: value});
              }}
            />             
          </Col>
          <Col span={12}>
            <div className="output" style={style.output}>
              {
                this.state.outputList.map((e, idx) => <p key={idx}>{e}</p>)
              }
            </div>
          </Col>
        </Row>
      </div>
    )
  }
}

export default Console