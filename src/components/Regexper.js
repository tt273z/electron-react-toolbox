import React, { Component } from 'react';
import { Form, InputNumber, Checkbox, Radio, Input, Icon, message } from 'antd'

const MAP = ['0-9', 'A-Z', 'a-z', '#?!@$%^&*-,_=+']

//TODO 至少三种字符的情况/重置按钮
export default class Regexper extends Component {
	constructor(props){
		super(props)
		this.state = {
			regexp: '点击此处生成正则',
			minLength: null,
			maxLength: null,
			include: [],
			atLeast: '',
			isMatched: true,
		}
	}
	onSubmit = () => {
		if(!this.state.minLength&&!this.state.maxLength&&!this.state.include.length) {
			message.info('请选择条件后生成表达式')
			return
		}
		let min = this.state.minLength==null?'': this.state.minLength, 
			max = this.state.maxLength==null?'': this.state.maxLength
		let lenLimit = (!min && !max)? '*': `{${min},${max}}`
		let includeStr = ''
		this.state.include.map(e => includeStr+=MAP[e])
		let atLeastStr = ''
		if(this.state.atLeast == '0') {
			this.state.include.map(e => atLeastStr+=`(?!^[${MAP[e]}]${lenLimit}$)`)
		}
		this.setState({ regexp: `${atLeastStr}^[${includeStr}]${lenLimit}$` })
		let input = document.createElement('input');
		document.body.appendChild(input);
		input.setAttribute('value', `/${atLeastStr}^[${includeStr}]${lenLimit}$/`);
		input.select();
		if (document.execCommand('copy')) {
			document.execCommand('copy');
			message.success('已复制到剪贴板 =)')
		}
		document.body.removeChild(input);
		input = null;
	}

	onTest = val => {
		let res = new RegExp(this.state.regexp)
		this.setState({ isMatched: res.test(val) })
	}

	render(){
		const formItemLayout = {
      labelCol: {
        xs: { span: 24 },
        sm: { span: 2 },
      },
      wrapperCol: {
        xs: { span: 24 },
        sm: { span: 20 },
			},
			labelAlign: 'left'
    };
		const includeOptions = [
			{ label: '数字', value: '0' },
			{ label: '大写字母', value: '1' },
			{ label: '小写字母', value: '2' },
			{ label: '特殊字符(#?!@$%^&*-,_=+)', value: '3' },
		]
		const atLeastOptions = [
			{ label: '2种字符', value: '0' },
			{ label: '3种字符', value: '1' },
		]
		return (
			<div className="regexp">
				<Form {...formItemLayout}>
					<Form.Item label="长度限制">
						<InputNumber value={this.state.minLength} onChange={e => {this.setState({ minLength: e })}} style={{width: 60}}/>&nbsp;-&nbsp;
						<InputNumber value={this.state.maxLength} onChange={e => {this.setState({ maxLength: e })}} style={{width: 60}}/>
					</Form.Item>
					<Form.Item label="同时包含">
						<Checkbox.Group options={includeOptions} onChange={e => this.setState({include: e})}/>
					</Form.Item>
					<Form.Item label="至少包含">
						<Radio.Group options={atLeastOptions} onChange={e => this.setState({atLeast: e.target.value})}/>
					</Form.Item>
				</Form>
				<div className="regexp-box margin-bottom" onClick={this.onSubmit}>/{this.state.regexp}/</div>
				<Input.Search
					style={{width: 400}}
					placeholder="Regexp Test"
					enterButton="Test"
					size="large"
					onSearch={this.onTest}
				/>
				<Icon type={this.state.isMatched? 'smile': 'frown'} 
					style={{fontSize: 40, marginLeft: 10}}
					theme="twoTone" 
					twoToneColor={this.state.isMatched? '#52c41a': '#f81d22'}/>
			</div>
		)
	}
}