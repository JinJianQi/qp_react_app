import React, { Component } from 'react'
import './Login.css'
import { loginOperator } from '../../reqApi/reqApi'
import { Form, Icon, Input, Button, Checkbox, message } from 'antd'
export default class asd extends Component {
    state = {
        o_user: '',
        o_psw: ''
    }
    handleSubmit = e => {
        e.preventDefault();
        this.props.form.validateFields((err, values) => {
            if (!err) {
                console.log('Received values of form: ', values);
            }
        });
    };
    render() {
        let { o_user, o_psw } = this.state;
        return (
            <div className='LoginPage'>
                <Input
                    className='LoginInput'
                    onChange={(e) => {
                        this.setState({
                            o_user: e.target.value
                        })
                    }}
                    value={o_user}
                    prefix={<Icon type="user" style={{ color: 'rgba(0,0,0,.25)' }} />}
                    placeholder='请输入帐号'></Input>
                <Input
                    className='LoginInput'
                    onChange={(e) => {
                        this.setState({
                            o_psw: e.target.value
                        })
                    }}
                    value={o_psw}
                    type="password"
                    prefix={<Icon type="lock" style={{ color: 'rgba(0,0,0,.25)' }} />}
                    placeholder='请输入密码'></Input>
                <Button type='primary' onClick={() => {
                    loginOperator(this.state).then(res => {
                        if (res.err) {
                            message.error(res.err)
                            return
                        }
                        message.success('登录成功');
                        localStorage.setItem('o_user', o_user)
                        localStorage.setItem('o_psw', o_psw)
                        localStorage.setItem('o_id', res.data.insertId || res.data.o_id)
                        localStorage.setItem('o_level', res.data.insertId ? '1' : (res.data.o_level))
                        this.props.history.push('/serverIndex')
                    }).catch(e => {
                        console.log(e)
                        message.error('错误:' + (e.data || e))
                    })
                }}
                    className='LoginButton'
                >登录</Button>
            </div>
        );
    }
}

