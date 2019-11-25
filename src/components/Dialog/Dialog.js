import React from 'react'
import './Dialog.css'
import { message } from 'antd'
import closeImg from '../../res/close.png'
import btnBack from '../../res/btn03.png'
import titleBack from '../../res/title.png'
import { insertUser, getUserByUser, getCardList } from '../../reqApi/reqApi'
import { isNumber } from 'util';
export default class Dialog extends React.Component {
    state = {
        title: '',
        user: '',
        vCode: '',
        btnTitle: '',
        searchShow: false,
        price: null,
        searchRes: [],
        statusTitle: ['处理中', '申请成功', '已拒绝'],
        input_list: [],
        select: [],
        select_id: ''
    }
    getClass() {
        getCardList({ type: 0 }).then(res => {
            if (res.err) {
                return
            }
            this.setState({
                select: Object.assign([], res.data)
            })
        })
    }
    componentDidMount() {
        this.getClass()
        let { type, input_list } = this.props;
        console.log(input_list)

        if (type == 0) {
            this.setState({
                title: '申请进度查询',
                btnTitle: '点击查询'
            })
        } else {
            this.setState({
                title: '申请提交',
                btnTitle: '点击提交',
                input_list: JSON.parse(input_list)
            })
        }
    }
    // componentWillReceiveProps(e) {
    //     let input_list_state;
    //     let { input_list } = e;
    //     if (!input_list) input_list_state = null
    //     else {
    //         try {
    //             input_list_state = JSON.parse(input_list)
    //         } catch (e) {
    //             message.error('解析错误')
    //             input_list_state = null
    //         }
    //     }
    //     console.log(input_list)
    //     this.setState({
    //         input_list: input_list_state
    //     })
    // }
    render() {
        let { title, btnTitle, user, searchShow, searchRes, statusTitle, price, input_list, select_id } = this.state;
        let { show, type, card_id, cardTitle } = this.props;
        return (
            <div>
                <div className={show ? 'dialog' : 'close'}>
                    <img className='closeImg' onClick={() => { this.props.onClose() }} src={closeImg} alt="" />
                    <div className='title'>
                        {title}
                        <img src={titleBack} className='titleBack' alt="" />
                    </div>
                    <div className='DialogTitle'>{cardTitle}</div>
                    {searchShow ?
                        <table className='DialogTable'>
                            <thead>
                                <tr>
                                    <td>用户名</td>
                                    <td>申请时间</td>
                                    <td>申请状态</td>
                                    <td>申请回复</td>
                                </tr>
                            </thead>
                            <tbody>
                                {(searchRes && searchRes.length > 0) ? searchRes.map(val => (
                                    <tr key={val.id}>
                                        <td>
                                            {val.user}
                                        </td>
                                        <td>
                                            {new Date(Number(val.create_time)).toLocaleString()}
                                        </td>
                                        <td>
                                            {statusTitle[val.status]}
                                        </td>
                                        <td>
                                            <a onClick={() => {
                                                window.alert(val.reply || '暂时还未回复哟')
                                            }}>点击查看</a>
                                        </td>
                                    </tr>
                                ))
                                    : <div>暂无消息</div>
                                }
                            </tbody>
                        </table>
                        :
                        <div className='DialogInputBox'>

                            <input value={this.state.user} onChange={(e) => {
                                this.setState({
                                    user: e.target.value
                                })
                            }} placeholder='请填写会员账号' className='input' type="text" />
                            {type == 0 &&
                                <select onChange={(e) => {
                                    console.log(e)
                                    this.setState({
                                        select_id: e.target.value
                                    })
                                }} className='DialogSelect'>请选择活动种类
                                {this.state.select.map(val =>
                                    <option key={val.id} value={val.id}>{val.title}</option>
                                )}
                                </select>
                            }
                            {
                                (input_list && type == 1) && input_list.map((val, index) => <input onChange={(e) => {
                                    let input_list_new = Object.assign([], input_list)
                                    input_list_new[index].value = e.target.value;
                                    this.setState({
                                        input_list: input_list_new
                                    })
                                }} placeholder={val.hint} value={this.state.price} className='input' type="text" />
                                )
                            }

                            <div className='btn'>
                                <div onClick={() => {
                                    if (type == 0) {
                                        //查询
                                        if (!user) {
                                            message.error('请输入用户名')
                                            return
                                        }
                                        getUserByUser({ user, select_id }).then(res => {
                                            message.success('操作成功')
                                            console.log(res)
                                            this.setState({
                                                searchShow: true,
                                                searchRes: res.data
                                            })
                                        }).catch(e => {
                                            console.log(e)
                                            message.error('操作错误')
                                        })
                                    } else {
                                        let Flag = false;
                                        let input_list_str = null;
                                        if (input_list && input_list.length > 0) {
                                            this.state.input_list.map(val => {
                                                if (!val.value) {
                                                    message.error('请输入正确的' + val.title)
                                                    Flag = true;
                                                    return
                                                }
                                            })
                                            if (Flag) return
                                            input_list_str = JSON.stringify(input_list)
                                        }
                                        if (!card_id || !Number(card_id)) {
                                            message.error('无效的商品')
                                            return;
                                        }
                                        if (!user) {
                                            message.error('请输入正确的用户名')
                                            return;
                                        }
                                        //添加
                                        insertUser({ user, card_id, price, input_list: input_list_str }).then(res => {
                                            message.success('操作成功')
                                            this.props.onClose()
                                        }).catch(e => {
                                            message.error('添加错误')
                                        })
                                    }
                                }}>{btnTitle}</div>
                                <img className='btnBack' src={btnBack} alt="" />
                            </div>
                        </div>
                    }

                </div>
                <div className={show ? 'mask' : 'close'}></div>
            </div>
        )
    }
}
