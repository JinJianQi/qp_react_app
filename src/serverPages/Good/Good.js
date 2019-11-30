import React, { Component } from 'react'
import { Table, Button, Modal, message } from 'antd'
import { getCardList, serverUri, deleteGoodR, getListBaseType } from '../../reqApi/reqApi'
import './Good.css'
import AddGoods from '../AddGood/AddGood'
export default class Good extends Component {
  constructor(props) {
    super(props);
    this.state = {
      cardList: [],
      editGoodShow: false,
      editGood: {
        show: false,
        type: 1,//0add 1edit
        id: 0,
        onCancel: () => this.onEditCancel()
      },
      deleteGood: {},
      columns: [
        {
          title: '编号',
          dataIndex: 'id',
          key: 'id'
        }, {
          title: '图片',
          dataIndex: 'img',
          key: 'img',
          render: text => {
            let imgSrcArr = text.split('upload');
            let imgSrc = 'upload' + imgSrcArr[1];
            return (
              <div className='editGoodImg'>
                <img src={imgSrc} alt="" />
              </div>
            )
          }
        }, {
          title: '标题',
          dataIndex: 'title',
          key: 'title'
        }, {
          title: '热度',
          dataIndex: 'hot',
          key: 'hot'
        }, {
          title: '操作',
          dataIndex: 'id',
          key: 'action',
          render: id => {
            return <div>
              <Button type='primary' onClick={() => {
                let { editGood } = this.state;
                this.setState({
                  editGood: Object.assign({}, editGood, { id, type: 0 }),
                  editGoodShow: true
                })
              }}>查看详情</Button>
              <Button type='danger' onClick={() => {
                let { deleteGood } = this.state;
                this.setState({
                  deleteGood: Object.assign({}, deleteGood, { id, show: true })
                })
              }}>删除</Button>
            </div>
          }
        }
      ]
    }
  }
  handleEditClick (e) {
    let { id } = e;
    let { editGood } = this.state;
    this.setState({
      editGood: Object.assign({}, editGood, { id }),
      editGoodShow: true
    })
  }
  onEditCancel () {
    let { editGood } = this.state;
    this.setState({
      editGood: Object.assign({}, editGood),
      editGoodShow: false
    })
    this.getCardList()
  }
  showEditGoodForAdd () {
    this.setState({
      editGoodShow: true,
      editGood: Object.assign({}, this.state.editGood, {
        id: ''
      })
    })
  }
  componentDidMount () {
    let { type } = this.props;
    this.getCardList(type)
  }
  componentWillUpdate () {
    // this.getCardList()
  }
  componentWillReceiveProps (e) {
    this.getCardList(e.type)
  }
  getCardList (type) {
    getListBaseType({ type }).then(res => {
      console.log(res)
      this.setState({
        cardList: res.data
      })
    })
    // return
    // getCardList({ type }).then(res => {
    //     this.setState({
    //         cardList: res.data
    //     })
    // })
  }
  render () {
    let { columns, cardList, editGood, deleteGood, editGoodShow } = this.state;
    return (
      <div>
        <div className='btnBox'>
          <Button type='primary' className='btnItem' onClick={this.showEditGoodForAdd.bind(this)} >添加</Button>
        </div>
        {cardList.map(val => {
          return (
            <div key={val.id} className='classBox'>
              <div className='classTitle'>{val.title}</div>
              <Table columns={columns}
                dataSource={val.list}
              />
            </div>)
        })}

        {editGoodShow && <AddGoods editGood={editGood} ></AddGoods>}
        <Modal
          title='删除活动'
          visible={deleteGood.show}
          onOk={() => {
            let { deleteGood } = this.state;
            deleteGoodR({ id: deleteGood.id }).then(res => {
              message.success('删除成功')
              this.setState({
                deleteGood: {}
              })
              this.getCardList()
            }).catch(e => {
              message.success('操作失败')
            })
          }}
          okText='确定'
          cancelText='取消'
          onCancel={() => {
            this.setState({
              deleteGood: Object.assign({}, this.state.deleteGood, { show: false })
            })
          }}
        >
          您确定要删除编号为{deleteGood.id}活动吗，这将会永久删除！
                </Modal>
      </div>
    )
  }
}
