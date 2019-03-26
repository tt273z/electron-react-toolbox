import React, { Component } from 'react';
import { Row, Col, Icon } from 'antd';

export default class Triangle extends Component {
  render() {
    const iconStyle = { fontSize: 40 }
    return (
      <div className="triangle">
        <Row type="flex" justify="space-between" align="middle">
          <Col span={12}>
            <section>
              <p className="direct">方向</p>
              <div className="direct-box">
                <Icon type="caret-up" className="i-top-left" style={iconStyle} rotate="-45"/>
                <Icon type="caret-up" className="i-top" style={iconStyle}/>
                <Icon type="caret-up" className="i-top-right" style={iconStyle} rotate="45"/>
                <br/>
                <Icon type="caret-left" className="i-left" style={iconStyle}/>
                <Icon type="caret-right" className="i-right fr" style={iconStyle}/>
                <br/>           
                <Icon type="caret-down" className="i-bottom-left" style={iconStyle} rotate="45"/>
                <Icon type="caret-down" className="i-bottom" style={iconStyle}/>
                <Icon type="caret-down" className="i-bottom-right" style={iconStyle} rotate="-45"/>         
              </div>
            </section>
          </Col>
          <Col span={12}>
            <div className="tri-box"></div>
          </Col>
        </Row>
      </div>
    )
  }
}