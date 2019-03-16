import React, { Component } from 'react';
import { Button, Row, Col, Upload, Modal, Input, Select, message } from 'antd'
import 'codemirror/mode/javascript/javascript.js';
import 'codemirror/addon/hint/show-hint.js';
import 'codemirror/addon/hint/javascript-hint.js';
import { Controlled as CodeMirror } from 'react-codemirror2';
import uuidv1 from 'uuid/v1'
import { loadScript, codeOutputHandler, removeElement } from '../utils/utils.js'

const Option = Select.Option

//TODO 快捷键
class Console extends Component {
  constructor(props) {
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
  componentDidMount = () => {
		let fileList = localStorage.getItem('filelist')? JSON.parse(localStorage.getItem('filelist')): []
    this.setState({fileList})
		fileList.map(file => {
			loadScript(file.url, file.uid)
		})
  }
  run = () => {
		try {
			var res = eval(this.state.code)
			this.state.outputList.push(codeOutputHandler(res))
			this.setState({ outputList: this.state.outputList })			
		} catch(err) {
			if(err instanceof SyntaxError){
				message.error(`语法错误: ${err.message}`)
			} else if(err instanceof TypeError){
				message.error(`类型错误: ${err.message}`)
			} else if(err instanceof ReferenceError){
				message.error(`引用错误: ${err.message}`)
			} else {
				message.error(err)
			}
		}
  }

  onFileChange = ({ file, fileList }) => {
		if(file.status == 'done'){
			let r = new FileReader()
			r.readAsDataURL(file.originFileObj, 'UTF-8')
			r.onload = () => {
				loadScript(r.result, file.uid)
			}
		}
		this.setState({ fileList })			
  }
	onFileRemove = (file) => {
		removeElement(file.uid)
		let fileList = this.state.fileList.filter(e => file.uid != e.uid)
		localStorage.setItem('filelist', JSON.stringify(fileList))
	}

  //Modal method
  changeModalVisiable = (bool, e) => {
    this.setState({
      modalVisible: bool,
    });
  }
  onSubmitCDN = () => {
    let url = this.state.cdnPrefix + this.state.cdnValue
		let id = uuidv1()
    if(this.state.fileList.some(e => url == e.url)){ //重复性检验
      message.info('CDN已存在 不能重复添加')
      return
    }
		loadScript(url, id, () => {
			this.state.fileList.push({
				uid: id,
				name: this.state.cdnValue,
				status: 'done',
				url: url
			})
			this.setState({
				modalVisible: false,
				fileList: this.state.fileList
			})
			//存入localStorage
			localStorage.setItem('filelist', JSON.stringify(this.state.fileList))			
		})
  }

  render() {
    const options = {
      lineNumbers: false,//为true时样式错误?
      mode: 'javascript',
      theme: 'material',
      lineWrapping: true, //自动换行
      readOnly: false, //可编辑模式
      autofocus: true, //自动获得焦点
      extraKeys: { 'Ctrl': 'autocomplete' } //按 ctrl 出现代码提示或补全代码
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
			accept: '.js',
      customRequest({ file, onSuccess }) {
        setTimeout(() => { onSuccess('ok') }, 0)
      },
    }
    return (
      <div>
        <div className="button-row">
          <Button type="primary" onClick={this.run}>运行</Button>
          <Button onClick={() => this.setState({ code: '' })}>清空代码</Button>
          <Button onClick={() => this.setState({ outputList: [] })}>清空结果</Button>
          <Button type="dashed" onClick={() => this.setState({ modalVisible: true })}>
            + CDN
          </Button>
          <Upload {...uploadprops} 
					  fileList={this.state.fileList} 
						onChange={this.onFileChange}
						onRemove={this.onFileRemove}
					>
            <Button type="dashed">
              + 本地库
            </Button>
          </Upload>
        </div>
        <Row>
          <Col span={12}>
            <CodeMirror
              value={this.state.code}
              options={options}
              // onChange={(editor, data, value) => { }} 
              // editorDidMount={editor => { this.instance = editor }} //获取codemirror实例
              onBeforeChange={(editor, data, value) => {
                this.setState({ code: value });
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
              <Select defaultValue="http://" style={{ width: 90 }} value={this.state.cdnPrefix} onChange={e => this.setState({ cdnPrefix: e.target.value })}>
                <Option value="http://">http://</Option>
                <Option value="https://">https://</Option>
              </Select>
            }
            value={this.state.cdnValue}
            onChange={e => this.setState({ cdnValue: e.target.value })}
          />
        </Modal>
      </div>
    )
  }
}

export default Console