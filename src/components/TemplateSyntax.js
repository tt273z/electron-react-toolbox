import React, { Component } from 'react';
import { Row, Col, Input, Button, Icon } from 'antd';
import { copy2Clipboard } from '../utils/utils.js'

const { TextArea } = Input

export default class TemplateSyntax extends Component {
  constructor(props) {
    super(props)
    this.state = {
      templStr: '',
      normalStr: ''
    }
  }

  run = () => {
    const tpl = this.state.templStr.trim()
    if (tpl == '') return
    const res = tpl
      .substring(1, tpl.length - 1).trim()
      .replace(/\${(.[^}]*)}/g, m => `"+ ${m.substring(2, m.length - 1).trim().replace(/\r\n|\n/g, '')} +"`)
      .replace(/\r\n|\n/g, m => `"${m}+ "`)
    this.setState({ normalStr: `"${res}"` })
  }

  render() {
    return (
      <div className="templ-syntax full-h">
        <Row type="flex" justify="space-between" align="middle" className="full-h">
          <Col span={10} className="full-h">
            <Button className="copy-icon" type="primary" shape="circle" icon="copy" size="large" onClick={() => copy2Clipboard(this.state.templStr)}/>
            <TextArea className="full-h templ-box" 
              value={this.state.templStr} 
              onChange={e => this.setState({ templStr: e.target.value })} 
              placeholder="# 输入模板语法"
            />
          </Col>
          <Col span={2} style={{ textAlign: 'center' }}>
            <Button type="primary" onClick={this.run}>Go <Icon type="right" /></Button>
          </Col>
          <Col span={10} className="full-h">
            <Button className="copy-icon" type="primary" shape="circle" icon="copy" size="large" onClick={() => copy2Clipboard(this.state.normalStr)}/>
            <TextArea className="full-h normal-box" 
              value={this.state.normalStr} 
              onChange={e => this.setState({ normalStr: e.target.value })} 
              placeholder="# 输出普通字符串连接语法"
            />
          </Col>
        </Row>
      </div>
    )
  }
}