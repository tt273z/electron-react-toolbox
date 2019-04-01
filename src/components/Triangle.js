import React, { Component } from 'react';
import { Row, Col, Icon, Radio, InputNumber  } from 'antd';

export default class Triangle extends Component {
  constructor(props) {
    super(props)
    this.state = {
      type: 0,
      bWidth: '',
      bColor: '',
      width: 100,
      height: 100,
    }
  }
  returnIconStyle = (color) => {
    return { fontSize: 40, cursor: 'pointer', color }
  }
  onCreateTri = () => {
    this.state.bWidth = `0 ${this.state.width/2}px ${this.state.width*3/Math.sqrt(3)}px ${this.state.width/2}px`
    this.state.bColor = `transparent transparent #000 transparent`
    this.setState({
      bWidth: `0 ${this.state.width/2}px ${this.state.width*1.5/Math.sqrt(3)}px ${this.state.width/2}px`,
      bColor: `transparent transparent #000 transparent`
    })
  }
  onTypeChange = () => {

  }
  onWidthChange = () => {}
  onHeightChange = () => {}
  render() {
    return (
      <div className="triangle">
        <Row type="flex" justify="space-between" align="middle">
          <Col span={8}>
            <section>
              <p className="subtitle">方向</p>
              <div className="direct-box">
                <Icon type="caret-up" className="i-top-left" style={this.returnIconStyle('#f11e27')} rotate="-45" onClick={this.onCreateTri}/>
                <Icon type="caret-up" className="i-top" style={this.returnIconStyle('#592f95')}/>
                <Icon type="caret-up" className="i-top-right" style={this.returnIconStyle('#0465b2')} rotate="45"/>
                <br/>
                <Icon type="caret-left" className="i-left" style={this.returnIconStyle('#f58225')}/>
                <Icon type="caret-right" className="i-right fr" style={this.returnIconStyle('#00acac')}/>
                <br/> 
                <Icon type="caret-down" className="i-bottom-left" style={this.returnIconStyle('#f8a51b')} rotate="45"/>
                <Icon type="caret-down" className="i-bottom" style={this.returnIconStyle('#fef102')}/>
                <Icon type="caret-down" className="i-bottom-right" style={this.returnIconStyle('#03a45e')} rotate="-45"/>         
              </div>
            </section>
            <section>
              <p className="subtitle">类型</p>
              <Radio.Group onChange={this.onTypeChange} value={this.state.type}>
                <Radio value={0}>等边</Radio>
                <Radio value={1}>等腰</Radio>
              </Radio.Group>
            </section>
            <section>
              <p className="subtitle">大小</p>
              <div>
                <label>宽度 </label>
                <InputNumber className="margin-right" min={1} max={300} onChange={this.onWidthChange}  value={this.state.width}/>
                <label>高度 </label>
                <InputNumber min={1} max={300} onChange={this.onHeightChange} value={this.state.height}/>
              </div>
            </section>
          </Col>
          <Col span={16}>
            <div className="tri-box">
              <div className="tri" style={{borderWidth: this.state.bWidth, borderColor: this.state.bColor}}></div>
            </div>
          </Col>
        </Row>
        <section>
          <p className="subtitle">CSS</p>
          <div className="css-code">dddddddddd</div>
        </section>
      </div>
    )
  }
}