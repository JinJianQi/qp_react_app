import './Class.css'
import React from 'react'
import { Upload, Button, Icon, message, Table } from 'antd'
import { getTypeList } from '../../reqApi/reqApi'
import EditClass from './EditClass'
export default class Class extends React.Component {
  state = {
    classList: [],
    editClass: {
      show: false,
      id: '',
      title: '',
      img: '',
      show_flag: ''
    },
    columnsData: [
      {
        title: '编号',
        dataIndex: 'id',
        key: 'id'
      },
      {
        title: '标题',
        dataIndex: 'title',
        key: 'title'
      },
      {
        title: '显示',
        dataIndex: 'show_flag',
        key: 'show_flag',
        render: text => <div>{text == '1' ? '显示' : '隐藏'}</div>
      },
      {
        title: '图标',
        dataIndex: 'img',
        key: 'img',
        render: text => {
          let imgSrc = 'upload/' + text.split('upload')[1]
          return (<div className='ClassImgBox'>
            <img src={imgSrc} alt="" />
          </div>)
        }
      },
      {
        title: '操作',
        dataIndex: 'id',
        key: 'action',
        render: (text, row) => <div>
          <Button type='primary' onClick={() => {
            this.setState({
              editClass: { show: true, id: row.id, title: row.title, img: row.img, show_flag: row.show_flag }
            })
          }}>查看详情</Button>
          <Button type='danger' onClick={() => {
            window.alert(`
                        请注意：
                        由于删除类别会改变商品中的数据，导致不可控的数据混乱。
                        所以，请不要删除类别，请修改类别名称来改变类别
                        `)
            // this.getTypeList()
          }}>删除</Button>
        </div>
      }
    ]
  }
  componentDidMount () {
    this.getTypeList()
  }
  getTypeList () {
    getTypeList().then(res => {
      console.log(res)
      if (!res.err) {
        this.setState({
          classList: res.data
        })
      }
    }).catch(e => {
      message.error('获取列表错误')
    })
  }
  render () {
    let { classList, columnsData, editClass } = this.state;
    return (
      <div>
        <Button type='primary' onClick={() => {
          this.setState({
            editClass: { show: true, id: '', img: '', title: '', show_flag: '' }
          })
        }}>添加</Button>
        <Table
          columns={columnsData}
          dataSource={classList}
        ></Table>
        {editClass.show &&
          <EditClass
            editClass={editClass}
            onClose={() => {
              this.setState({
                editClass: { show: false, id: '', img: '', title: '', show_flag: '' }
              })
              this.getTypeList()
            }}
          ></EditClass>}

      </div>
    )
  }
}
