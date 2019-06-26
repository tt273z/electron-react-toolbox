import React, { Component } from 'react';
import { Row, Col, Icon, Radio, InputNumber } from 'antd';
import { Mover } from '../utils/utils';

const calculateVerticalLine = (long, short) => {
  return Number(Math.sqrt(Math.pow(long, 2) - Math.pow(short, 2))).toFixed(1)
}

export default class Triangle extends Component {
  constructor(props) {
    super(props)
    this.state = {
      type: 0,//等边0等腰1任意2
      bWidth: '0 50px 86.6px',
      bColor: 'transparent transparent #592f95',
      width: 100,//三角形宽
      height: 100,//三角形高
      color: '#592f95',
      direct: 'top',//三角形方向
      isRightAngle: false
    }

    this.onSetTriDirect = this.onSetTriDirect.bind(this)

  }

  returnIconStyle = (color) => {
    return { fontSize: 40, cursor: 'pointer', color }
  }
  onSetTriDirect = (color, direct) => {
    this.setState({ color, direct }, ()=> this.onCreateTri())
  }
  onCreateTri = () => {
    let bWidth, bColor, halfWidth = this.state.width / 2, width = this.state.width, height = this.state.height, color = this.state.color, type = this.state.type
    let verticalLine = type==0? calculateVerticalLine(width, halfWidth): height
    // this.state.direct.indexOf('-') != -1? this.setState({ isRightAngle: true, type: 1 })
    //   : this.setState({ isRightAngle: false, type: 0 })
    if(this.state.direct.indexOf('-') != -1) {//直角
      if(this.state.type == 0) this.setState({ type: 1 })
      this.setState({ isRightAngle: true, width, height })
    } else {
      this.setState({ isRightAngle: false })
      if(!type) this.setState({ height: verticalLine })
    }
    switch (this.state.direct) {
      case 'top':
        bWidth = `0 ${halfWidth}px ${verticalLine}px`
        bColor = `transparent transparent ${color}`
        break
      case 'bottom':
        bWidth = `${verticalLine}px ${halfWidth}px 0`
        bColor = `${color} transparent transparent`
        break;
      case 'left':
        bWidth = `${halfWidth}px ${verticalLine}px ${halfWidth}px 0`
        bColor = `transparent ${color} transparent transparent`
        break
      case 'right':
        bWidth = `${halfWidth}px 0 ${halfWidth}px ${verticalLine}px`
        bColor = `transparent transparent transparent ${color}`
        break
      case 'top-left'://直角 不等边
        bWidth = `${height}px ${width}px 0 0 `
        bColor = `${color} transparent transparent`
        break
      case 'top-right':
        bWidth = `${height}px 0 0 ${width}px`
        bColor = `${color} transparent transparent`
        break
      case 'bottom-left':
        bWidth = `0 ${width}px ${height}px 0`
        bColor = `transparent transparent ${color}`
        break
      case 'bottom-right':
        bWidth = `0 0 ${height}px ${width}px`
        bColor = `transparent transparent ${color}`
        break
      default:
        break
    }
    this.setState({bWidth, bColor})
  }
  onWidthChange = width => {
    if(this.state.isRightAngle&&this.state.type==1) { //等腰直角使宽高保持一致
      this.setState({ width, height: width }, () => this.onCreateTri())
    }
    this.setState({ width }, () => this.onCreateTri())
  }
  onHeightChange = height => {
    if(this.state.isRightAngle&&this.state.type==1) {
      this.setState({ height, width: height }, () => this.onCreateTri())
    }
    this.setState({ height }, () => this.onCreateTri())
  }
  onTypeChange = e => {
    this.setState({ type: e.target.value })
  } 
  render() {
    return (
      <div className="triangle">
        <Row type="flex" justify="space-between" align="middle" className="wrap">
          <Col span={12}>
            <section>
              <p className="subtitle">方向</p>
              <div className="direct-box">
                <Icon type="caret-up" className="i-top-left" style={this.returnIconStyle('#f11e27')} rotate="-45" onClick={this.onSetTriDirect('#f11e27', 'top-left')} />
                <Icon type="caret-up" className="i-top" style={this.returnIconStyle('#592f95')} onClick={this.onSetTriDirect('#592f95', 'top')} />
                <Icon type="caret-up" className="i-top-right" style={this.returnIconStyle('#0465b2')} rotate="45" onClick={this.onSetTriDirect('#0465b2', 'top-right')} />
                <br />
                <Icon type="caret-left" className="i-left" style={this.returnIconStyle('#f58225')} onClick={this.onSetTriDirect('#f58225', 'left')} />
                <Icon type="caret-right" className="i-right fr" style={this.returnIconStyle('#00acac')} onClick={this.onSetTriDirect('#00acac', 'right')} />
                <br />
                <Icon type="caret-down" className="i-bottom-left" style={this.returnIconStyle('#f8a51b')} rotate="45" onClick={this.onSetTriDirect('#f8a51b', 'bottom-left')} />
                <Icon type="caret-down" className="i-bottom" style={this.returnIconStyle('#fef102')} onClick={this.onSetTriDirect('#fef102', 'bottom')} />
                <Icon type="caret-down" className="i-bottom-right" style={this.returnIconStyle('#03a45e')} rotate="-45" onClick={this.onSetTriDirect('#03a45e', 'bottom-right')} />
              </div>
            </section>
            <section>
              <p className="subtitle">类型</p>
              <Radio.Group onChange={this.onTypeChange} value={this.state.type}>
                <Radio value={0} disabled={this.state.isRightAngle}>等边</Radio>
                <Radio value={1}>等腰</Radio>
                <Radio value={2}>任意</Radio>
              </Radio.Group>
            </section>
            <section>
              <p className="subtitle">大小</p>
              <div>
                <label>宽度 </label>
                <InputNumber className="margin-right" min={1} max={300} onChange={this.onWidthChange} value={this.state.width} />
                <label>高度 </label>
                <InputNumber min={1} max={300} value={this.state.height} onChange={this.onHeightChange} disabled={!this.state.type} />
              </div>
            </section>
          </Col>
          <Col span={12}>
            <div className="tri-box">
              <div className="tri" style={{ borderWidth: this.state.bWidth, borderColor: this.state.bColor }}></div>
            </div>
          </Col>
          <Col span={24}>
            <section>
              <p className="subtitle">CSS</p>
              <div className="css-code">
                .tri {'{'}<br/>
                  &nbsp;&nbsp;width: 0;<br/>
                  &nbsp;&nbsp;height: 0;<br/>
                  &nbsp;&nbsp;border-style: solid;<br/>
                  &nbsp;&nbsp;border-width: { this.state.bWidth };<br/>
                  &nbsp;&nbsp;border-color: { this.state.bColor };<br/>
                {'}'}
              </div>
            </section>          
          </Col>
        </Row>
      </div>
    )
  }
}