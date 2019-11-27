import React, { Component } from 'react'
import './Operator.css'
import {Table, Button, Modal, Input, Switch, message} from 'antd'
import {withRouter} from 'react-router-dom'
import {getOperatorList, updateOLevel, deleteOperator} from '../../reqApi/reqApi'
class Operator extends Component {
    constructor(props){
        super(props);
        this.state = {
            columns:[{
                title: '编号',
                dataIndex: 'o_id',
                key:'o_id'
            },{
                title: '用户',
                dataIndex: 'o_user',
                key:'o_user'
            },{
                title: '密码',
                dataIndex: 'o_psw',
                key:'o_psw',
            render: text => <div>{(this.state.mLevel=='0'||this.state.o_id==this.state.mId )?'****':text}</div>
            }
                ,{
                title: '等级',
                dataIndex: 'o_level',
                key:'o_level',
            render: text => <div>{text=='1'?'管理员':'操作员'}</div>
            },{
                title: '操作',
                dataIndex: 'o_id',
                key: 'action',
                render: (text,rowData) => <div>
                    <Button type='primary'
                    onClick={()=>{
                        this.setState(Object.assign(this.state,{
                            visible: true
                        },rowData))
                    }}
                    disabled={this.state.mLevel=='0'}
                    >详情</Button>
                    <Button type='danger' 
                    onClick={()=>{
                        deleteOperator({o_id: text}).then(res=>{
                            if(!res.err&&res.data){
                                message.success('删除成功')
                                this.getOperatorList()
                                return
                            }else{
                                message.success('删除失败'+res.data)
                            }
                        }).catch(e=>{
                            message.error(e)
                        })
                    }}
                    disabled={this.state.mLevel=='0'||(this.state.mId==text)}
                    >删除</Button>
                </div>
            }],
             dataSource:[],
             visible: false,
             o_id: '',
             o_user: '',
             o_psw: '',
             mLevel: '0'
        }
    }
    componentWillReceiveProps(e){
        this.setState(Object.assign(this.state, e))
    }
    componentDidMount(){
        this.setState({
            mLevel: localStorage.getItem('o_level'),
            mId: localStorage.getItem('o_id'),
        })
        if(this.props.o_id) {
        this.setState(Object.assign(this.state, this.props))
        return
        }
        this.getOperatorList();
    }
    getOperatorList(){
        getOperatorList().then(res=>{
            console.log(res)
            if(res.err){
                message.error(res.data)
                return
            }
            this.setState({
                dataSource: res.data
            })
        }).catch(e=>{
            message.error(e)
        })
    }
    render() {
        let {columns, dataSource, visible, o_user, o_psw, o_level, o_id , mId,mLevel} = this.state;
        let {onCancelClick} = this.props;
        return (
            <div>
                <Button
                 type='primary' 
                onClick={()=>{
                    this.setState({
                        visible: true,
                        o_id: '',
                        o_user: '',
                        o_psw: '',
                        o_level: ''
                    })
                }}
                disabled={mLevel=='0'||o_id==mId}
                >添加</Button>
                <Table
                dataSource={dataSource}
                columns={columns}
                />
                <Modal
                visible={visible}
                okText='应用'
                cancelText='取消'
                onOk={()=>{
                    updateOLevel({
                        o_id,o_user,o_level,o_psw
                    }).then(res=>{
                        if(res.err){
                            message.error(res.data)
                            return
                        }
                        message.success('操作成功')
                        if(o_id == localStorage.getItem('o_id')){
                            message.success('请重新登录')
                            localStorage.setItem('o_id', '')
                            localStorage.setItem('o_user', '')
                            localStorage.setItem('o_level', '')
                            localStorage.setItem('o_psw', '')
                            this.props.history.push('/serverIndex/login')
                            return
                        }
                        this.setState({
                            visible: false,
                            o_id: '',
                            o_user: '',
                            o_psw: ''
                        })
                        this.getOperatorList()
                    }).catch(e=>{
                        message.error(e)
                    })
                }}
                onCancel={()=>{
                    this.setState({
                        visible: false,
                        o_id: '',
                        o_user: '',
                        o_psw: ''
                    })
                }}
                >
                {mId==o_id&&<div className='InputLine'>
                您当前修改的是自己，修改成功后需要重新登录
                    </div>}
                    <div className='InputLine'>
                        <div>用户</div>
                        <Input
                        value={o_user}
                        onChange={(e)=>{
                            this.setState({
                                o_user: e.target.value
                            })
                        }}
                        ></Input>
                        </div>            
                        <div className='InputLine'>
                        <div>密码</div>
                        <Input
                        value={o_psw}
                        onChange={(e)=>{
                            this.setState({
                                o_psw: e.target.value
                            })
                        }}
                        >
                        </Input>
                        </div>       
                        <div className='InputLine'>
                        <div>管理员权限</div>
                        <Switch
                        onChange={(e)=>{
                            this.setState({
                                o_level: e? '1':'0'
                            })
                        }}
                        checked={o_level=='1'}
                        disabled={mLevel=='0'||o_id==mId}
                        ></Switch>
                        </div>    
                </Modal>
            </div>
        )
    }
}


export default  withRouter(Operator)