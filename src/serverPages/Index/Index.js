import React from 'react'
import "./Index.css"
// import 'antd/dist/antd.css';
import User from '../User/User'
import Good from '../Good/Good'
import Class from '../Class/Class'
import Option from '../Option/Option'
import { Menu, Icon } from 'antd'
const { SubMenu } = Menu;
export default class Index extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            pageNum: 0,//0用户 1商品 2其他设置
            type: 0,//参数 0待审核 1已通过 2已拒绝
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
        this.setState({
            pageNum,
            type
        })
    }
    render() {
        let { pageNum, type } = this.state;
        return (
            <div className='serverBody'>
                <div className='serverHeader'>
                后台管理系统
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
                        </Menu>
                    </div>
                    <div className='ServerMainBox'>
                        {pageNum == 0 && <User type={type} />}
                        {pageNum == 1 && <Good type={type} />}
                        {pageNum == 2 && <Class />}
                        {pageNum == 3 && <Option />}
                    </div>
                </div>
            </div>
        )
    }
}
