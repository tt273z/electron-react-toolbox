import React, { Component } from 'react';
import { Form, InputNumber, Checkbox } from 'antd'

export default class Regexper extends Component {
	onChange = () => {}
	render(){
		const formItemLayout = {
      labelCol: {
        xs: { span: 24 },
        sm: { span: 8 },
      },
      wrapperCol: {
        xs: { span: 24 },
        sm: { span: 16 },
      },
    };
		const includeOptions = [
			{ label: '数字', value: 'number' },
			{ label: '大写字母', value: 'upper' },
			{ label: '小写字母', value: 'lower' },
			{ label: '大/小写字母', value: 'uporlow' },
		]
		const notIncludeOptions = [
			{ label: '数字', value: 'number' },
		]
		return (
			
				<Form {...formItemLayout}>
					<Form.Item label="长度限制">
						<InputNumber onChange={this.onChange} /> - 
						<InputNumber onChange={this.onChange} />
					</Form.Item>
					<Form.Item label="同时包含">
						<Checkbox.Group options={includeOptions}/>
					</Form.Item>
					<Form.Item label="不包含">
						<Checkbox.Group options={notIncludeOptions}/>
					</Form.Item>
				</Form>
			
		)
	}
}