import React, { Component } from 'react';
import { Button, Row, Col, Upload, Icon, Modal, Input, Select } from 'antd'
import 'codemirror/mode/javascript/javascript.js'; 
import 'codemirror/addon/hint/show-hint.js'; 
import 'codemirror/addon/hint/javascript-hint.js'; 
import { Controlled as CodeMirror } from 'react-codemirror2';

const Option = Select.Option
//TODO 1. code敏感字符过滤 2. 弹窗添加cdn 3. 本地文件?
class Console extends Component {
  constructor(props){
    super(props)
    this.state = {
      code: '//按ctrl代码提示 ',
      outputList: [], //code执行结果list
	  fileList: [], //上传文件list
	  modalVisible: false,
	  cdnValue: '',
	  cdnPrefix: 'http://'
    }
    //this.instance = null
  }
  //componentDidMount = () => {}
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

  onFileChange = ({fileList}) => {
	this.setState({fileList})
  }
  //Modal method
  changeModalVisiable = (bool, e) => {
	this.setState({
      modalVisible: bool,
    });
  }
  onSubmitCDN = () => {
	console.log(this.state.cdnPrefix)
	this.state.fileList.push({ 
	  name: this.state.cdnValue,
	  status: 'done',
	  url: this.state.cdnPrefix + this.state.cdnValue
	})
	this.setState({
	  modalVisible: false,
	  fileList: this.state.fileList
	})
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
    }
    return (
      <div>
        <div className="button-row">
          <Button type="primary" onClick={this.run}>运行</Button>
          <Button onClick={this.clearCode}>清空代码</Button>     
          <Button onClick={this.clearRes}>清空结果</Button>
          <Button type="dashed" onClick={() => this.setState({modalVisible: true})}>
            + CDN
          </Button>
          <Upload {...uploadprops} fileList={this.state.fileList} onChange={this.onFileChange}>
            <Button type="dashed">
              + 本地库
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
		<Modal
          title="输入要添加的CDN地址"
          visible={this.state.modalVisible}
          onOk={this.onSubmitCDN}
          onCancel={e => this.changeModalVisiable(false, e)}
        >
		  <Input 
			addonBefore={
			  <Select defaultValue="http://" style={{ width: 90 }} value={this.state.cdnPrefix} onChange={e => this.setState({cdnPrefix: e.target.value})}>
				<Option value="http://">http://</Option>
				<Option value="https://">https://</Option>
			  </Select>
			}
			value = {this.state.cdnValue}
			onChange = {e => this.setState({cdnValue: e.target.value})}
		  />
        </Modal>
      </div>
    )
  }
}

export default Console