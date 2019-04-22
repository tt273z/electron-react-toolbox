import React, { Component } from 'react';
import { Row, Col, Input  } from 'antd';

const { TextArea } = Input

export default class TemplateSyntax extends Component {
  constructor(props){
    super(props)
  }

  render(){
    return (
      <div className="templ-syntax full-h">
        <Row type="flex" justify="space-between" className="full-h">
          <Col span={12}  className="full-h">
            <TextArea rows={8}  className="full-h templ-box"/>
          </Col>
          <Col span={12}>
          
          </Col>
        </Row>
      </div>
    )
  }
}