import React, { Component } from 'react'
import { getUserList, updateStatus, updateReply, getUserByUser } from '../../reqApi/reqApi'
import { Table, Button, Tag, message, Modal, Input } from 'antd'
import './User.css'
const { TextArea } = Input;
export default class User extends Component {
    constructor(props) {
        super(props);

        this.getUserList = (type) => {
            if (this.state.searchValue) {
                this.getUserByUser()
                return
            }
            getUserList({ type }).then(res => {
                res.data.map(val => {
                    val.input_list = JSON.parse(val.input_list)
                })
                this.setState({
                    data: res.data
                })
            })
        }
        this.state = {
            userList: [],
            searchValue: "",
            dialog: {
                show: false,
                type: 0,//0用户详情  1回复
                data: '',
                input_list: [],
                id: ''
            },
            columns: [
                {
                    title: '编号',
                    dataIndex: 'id',
                    key: 'id'
                },
                {
                    title: '用户名',
                    dataIndex: 'user',
                    key: 'user'
                },
                {
                    title: '商品',
                    dataIndex: 'card_title',
                    key: 'card_title'
                },
                {
                    title: '申请时间',
                    dataIndex: 'create_time',
                    key: 'create_time',
                    render: text => new Date(Number(text)).toLocaleString()
                },
                {
                    title: '状态',
                    dataIndex: 'status',
                    key: 'status',
                    render: text => {
                        switch (text) {
                            case 0: {
                                return <Tag color='orange'>待审核</Tag>
                            }
                            case 1: {
                                return <Tag color='#2db7f5'>已通过</Tag>
                            }
                            case 2: {
                                return <Tag color='#f50'>已拒绝</Tag>
                            }
                            default: {
                                return <Tag color='#50'>未知</Tag>
                            }
                        }
                    }
                },
                {
                    title: '信息详情',
                    dataIndex: 'id',
                    key: 'id3',
                    render: (text, row) => <a style={{ whiteSpace: "nowrap" }} onClick={() => {
                        // let input_list = JSON.parse(row.input_list)
                        // console.log(input_list)
                        this.setState({
                            dialog: Object.assign({}, this.state.dialog, { show: true, type: 0, id: row.id, input_list: row.input_list })
                        })
                    }}>点击查看</a>
                },
                {
                    title: '回复信息',
                    dataIndex: 'reply',
                    key: 'reply',
                    render: (text, row, index) => {
                        return (<div >
                            <div className='UserTextReply'>
                                <div className='noticeTextanimate'

                                >{text}</div>
                            </div>
                            <a onClick={() => {
                                this.setState({
                                    dialog: Object.assign({},
                                        this.state.dialog,
                                        { show: true, type: 1, id: row.id, data: text }
                                    )
                                })
                            }}>点击修改</a>
                        </div >)
                    }
                },
                {
                    title: '操作',
                    dataIndex: 'id',
                    key: 'action',
                    render: id => (
                        <div className='btnBox'>
                            <Button type='primary' onClick={() => {
                                updateStatus({ id, status: 1 }).then(res => {
                                    message.success('操作成功')
                                    this.getUserList(this.props.type)
                                }).catch(e => {
                                    console.log(e)
                                    message.error('操作失败：' + e)
                                })
                            }}>通过</Button>
                            <Button type='danger'
                                onClick={() => {
                                    updateStatus({ id, status: 2 }).then(res => {
                                        message.success('操作成功')
                                        this.getUserList(this.props.type)
                                    }).catch(e => {
                                        message.error('操作失败：' + e)
                                    })
                                }}
                            >拒绝</Button>

                        </div>
                    )
                }
            ],
            data: []
        }
    }
    componentWillReceiveProps(e) {
        this.setState({
            searchValue: ''
        }, () => {
            this.getUserList(e.type)
        })
    }
    componentDidMount() {
        let { type } = this.props;
        this.getUserList(type)

    }
    getUserByUser() {
        getUserByUser({ user: this.state.searchValue }).then(res => {
            console.log(res)
            if (res.err) {
                message.error('操作失败：' + res.data)
                return
            }
            if (res.data.length < 1) {
                message.error('没有记录')
                return
            }
            message.success('操作成功')
            this.setState({
                data: res.data
            })
        }).catch(e => {
            message.error('操作失败：' + e)
        })
    }
    render() {
        let { columns, data, dialog, searchValue } = this.state;
        return (
            <div>
                <div className='UserSearchBar'>
                    <Input value={searchValue} placeholder='输入要搜索的用户' onChange={(e) => {
                        this.setState({
                            searchValue: e.target.value
                        })
                    }}></Input>
                    <Button type='primary' onClick={() => {
                        this.getUserByUser()

                    }}>搜索</Button>
                </div>
                <Table className='table' columns={columns} dataSource={data}></Table>
                <Modal className='modal'
                    visible={dialog.show}
                    onCancel={() => {
                        this.setState({
                            dialog: Object.assign(dialog, {
                                show: false,
                                id: '',
                                data: '',
                                input_list: []
                            })
                        })
                    }}
                    okText='应用'
                    cancelText='取消'
                    onOk={() => {
                        if (dialog.type == '1')
                            updateReply({
                                id: dialog.id,
                                reply: dialog.data
                            }).then(res => {
                                if (res.err) {
                                    message.error('回复错误')
                                    return
                                }
                                message.success('回复成功')
                                this.getUserList(this.props.type)
                            }).catch(e => {
                                message.error('回复错误')
                                return
                            })
                        this.setState({
                            dialog: Object.assign(dialog, {
                                show: false,
                                id: '',
                                data: '',
                                input_list: []
                            })
                        })
                    }}
                >
                    {dialog.type == '1'
                        ? <div>
                            <TextArea value={dialog.data} onChange={(e) => {
                                this.setState({
                                    dialog: Object.assign({}, dialog, { data: e.target.value })
                                })
                            }}></TextArea>
                        </div>
                        : <div>
                            {dialog.input_list.length ? dialog.input_list.map((val, index) =>
                                <div key={index} className='userInputLine'>
                                    <div className='title'>{val.title}</div>
                                    <div className='value'>{val.value}</div>
                                </div>
                            ) : <div>暂无</div>}
                        </div>}
                </Modal>
            </div>
        )
    }
}
