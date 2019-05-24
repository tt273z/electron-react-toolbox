import React, { Component } from 'react';
import { Input, Button, Row, Col } from 'antd';
export default class Test extends Component {
  render(){
    return (
      <div className="full-h"> 
        <Row type="flex" justify="space-between" align="middle" className="full-h">
          <Col span={10} className="full-h">
            <Input.TextArea className="full-h" />
          </Col>
          <Col span={2}>
            <Button>dddd</Button>
          </Col>
          <Col span={10} className="full-h">
            <Input.TextArea className="full-h" />
          </Col>
        </Row>
      </div> 
    )
  }
}