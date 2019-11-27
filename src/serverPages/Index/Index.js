import React from 'react'
import "./Index.css"
// import 'antd/dist/antd.css';
import User from '../User/User'
import Good from '../Good/Good'
import Class from '../Class/Class'
import Option from '../Option/Option'
import Operator from '../Operator/Operator'
import { Menu, Icon,message, Modal } from 'antd'
const { SubMenu } = Menu;
export default class Index extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            pageNum: 0,//0用户 1商品 2其他设置
            type: 0,//参数 0待审核 1已通过 2已拒绝
            o_id: '',
            o_user: '',
            o_level: '',
            o_psw: '',
            oData: {
                oVisable: false
            }
        }
    }
    changePage(item) {
        let { key } = item;
        let pageNum;
        let type = 0;
        if (key < 5)
            pageNum = 0;
        type = key - 1;
        if (key == 5)
            pageNum = 1;
        if (key == 6)
            pageNum = 2;
            if (key == 7)
                pageNum = 3;
                if (key == 8)
                    pageNum = 4;
        this.setState({
            pageNum,
            type,
            oData: {}
        })
    }
    componentDidMount(){
        let o_user = localStorage.getItem('o_user');
        let o_level = localStorage.getItem('o_level');
        let o_id = localStorage.getItem('o_id');
        let o_psw = localStorage.getItem('o_psw');
        if(!o_user){
            message.success('请登录')
            this.props.history.push('/serverIndex/login')
            return 
        }
        this.setState({
            o_user,
            o_level,
            o_id,
            o_psw
        })
    }
    render() {
        let { pageNum, type, o_user, o_psw, o_id, o_level ,oData } = this.state;
        return (
            <div className='serverBody'>
                <div className='serverHeader'>
                后台管理系统
        <div 
        onClick={()=>{
            this.setState({
                oData: {o_user,o_id,o_psw,o_level, oVisable: true},
                pageNum: 4
            })
        }}
        className='oBox'>{(o_level=='1'?'管理员 :':'操作员 :')+o_user} <a style={{fontSize: 12}}>点击修改密码 (id:{o_id})</a></div>
                </div>
                <div className='serverIndex'>
                    <div className='menu'>
                        <Menu className='menuBox' onSelect={this.changePage.bind(this)}
                            onClick={this.handleClick}
                            defaultSelectedKeys={['1']}
                            defaultOpenKeys={['sub1']}
                            mode="inline"
                        >
                            <SubMenu
                                key="sub1"
                                title={
                                    <span>
                                        <Icon type="user" />
                                        <span>申请列表</span>
                                    </span>
                                }
                            >
                                <Menu.Item key="1">全部</Menu.Item>
                                <Menu.Item key="2">待审核</Menu.Item>
                                <Menu.Item key="3">已通过</Menu.Item>
                                <Menu.Item key="4">已拒绝</Menu.Item>
                            </SubMenu>
                            <SubMenu
                                key="sub2"
                                title={
                                    <span>
                                        <Icon type="appstore" />
                                        <span>商品列表</span>
                                    </span>
                                }
                            >
                                <Menu.Item key='5'>全部商品</Menu.Item>
                                <Menu.Item key='6'>类别设置</Menu.Item>
                            </SubMenu>
                            <SubMenu
                                key="sub4"
                                title={
                                    <span>
                                        <Icon type="setting" />
                                        <span>其他设置</span>
                                    </span>
                                }
                            >
                                <Menu.Item key='7'>全部设置</Menu.Item>
                            </SubMenu>
                            <SubMenu
                                key="sub5"
                                title={
                                    <span>
                                        <Icon type="setting" />
                                        <span>审核人员</span>
                                    </span>
                                }
                            >
                                <Menu.Item key='8'>审核人员</Menu.Item>
                            </SubMenu>
                        </Menu>
                    </div>
                    <div className='ServerMainBox'>
                        {pageNum == 0 && <User type={type} />}
                        {pageNum == 1 && <Good type={type} />}
                        {pageNum == 2 && <Class />}
                        {pageNum == 3 && <Option />}
                        {pageNum == 4 && 
                        <Operator 
                        o_user={oData.o_user}
                        o_id={oData.o_id}
                        o_psw={oData.o_psw}
                        o_level={oData.o_level}
                        visible={oData.oVisable}
                        />}
                    </div>
                </div>
            </div>
        )
    }
}
