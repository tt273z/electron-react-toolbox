import React, { Component } from 'react';
import { Form, InputNumber, Checkbox } from 'antd'

export default class Regexper extends Component {
	constructor(props){
		super(props)
		this.state = {
			regexp: ''
		}
	}
	onChange = () => {}
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
    };
		const includeOptions = [
			{ label: '数字', value: 'number' },
			{ label: '大小写字母', value: 'upandlow' },
			{ label: '大/小写字母', value: 'uporlow' },
			{ label: '特殊字符', value: 'symbol' },
		]
		const notIncludeOptions = [
			{ label: '特殊字符', value: 'symbol' },
		]
		return (
			<div>
				<Form {...formItemLayout}>
					<Form.Item label="长度限制">
						<InputNumber onChange={this.onChange} style={{width: 60}}/>&nbsp;-&nbsp;
						<InputNumber onChange={this.onChange} style={{width: 60}}/>
					</Form.Item>
					<Form.Item label="同时包含">
						<Checkbox.Group options={includeOptions}/>
					</Form.Item>
					<Form.Item label="不包含">
						<Checkbox.Group options={notIncludeOptions}/>
					</Form.Item>
				</Form>
				<div className="regexp">{this.state.regexp}</div>
			</div>
		)
	}
}