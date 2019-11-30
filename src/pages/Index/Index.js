import React, { Component } from 'react'
import { getListBaseType, getOptions } from '../../reqApi/reqApi'
import Dialog from '../../components/Dialog/Dialog'
import InfoPage from '../../components/InfoPage/InfoPage'
// import logoImg from '../../res/logo.png'
import applyImg from '../../res/h_web.png'
import applyImg1 from '../../res/btn01.png'
import infoImg from '../../res/btn02.png'
import './Index.css'
import { withRouter } from 'react-router-dom'
import homeImg from '../../res/icon01.png'
import updateImg from '../../res/icon02.png'
import KefuImg from '../../res/icon03.png'
import NoticeImg from '../../res/icon04.png'
class Index extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      footList: [{
        title: '首页',
        icon: homeImg
      }, {
        title: 'APP跟新/修复',
        icon: updateImg
      }, {
        title: '在线客服',
        icon: KefuImg
      }],
      notice: '',
      kefu_url: '',
      update_url: '',
      icon: '',
      dialog: {
        show: false,
        type: 0,//0是查询进度
        cardid: '',
        cardTitle: ''
      },
      infoPage: {
        show: false
      },
      cardList: [],
      boxList: []
    }
  }
  navPage (e) {
    console.log(e)
    switch (e) {
      case 0: {
        this.props.history.push('/')
        break;
      }
      case 1: {
        window.location.href = this.state.update_url
        // this.props.history.push('/Update')
        break;
      }
      case 2: {
        // this.props.history.push('/Kefu')
        window.location.href = this.state.kefu_url
        break;
      }
    }
  }
  getOptions () {
    getOptions().then(res => {
      this.setState({
        ...res.data
      })
    })
  }
  componentDidMount () {
    this.getCardLsit()
    this.getOptions()
  }
  getCardLsit () {
    getListBaseType({ type: 0 }).then(res => {
      console.log(res)
      this.setState({
        boxList: res.data
      })
    }).catch(e => {
      console.log(e)
    })
  }
  closeDialog () {
    this.setState({
      ...this.state,
      dialog: Object.assign({}, { show: false })
    })
  }
  closeInfoPage () {

    this.setState({
      ...this.state,
      infoPage: Object.assign({}, this.state.infoPage, { show: false })
    })
  }
  render () {
    let { boxList, noticeShow, dialog, infoPage, footList, icon } = this.state;
    return (
      <div className='IndexBack'>
        <div className='Index'>
          <div className='header'>
            <img className="logoImg" src={icon} alt="" />
            <img className='applyBtn' onClick={() => {
              this.setState({
                dialog: Object.assign({}, this.state.dialog, { show: true, type: 0 })
              })
            }} src={applyImg} alt="" />
          </div>
          <div className='notice'>
            <img className='noticeImg' src={'upload/' + NoticeImg.split('upload')[1]} alt="" />
            <div className='noticeText'>
              <span className='noticeTextanimate'>
                {noticeShow}
              </span>
            </div>
          </div>
          <div className='mainBox'>
            {boxList.map((val, index) => (val.show_flag == '1' ?
              <div key={val.id} className='itemBox'>
                <img src={'upload/' + val.img.split('upload')[1]} className='titleImg' alt="" />
                <div className='listBox'>
                  {val.list.map((v, i) => (
                    <div className='goodItem' key={v.id}>
                      <div className='indexImgBox'>
                        <img className='goodImg' onClick={() => {
                          console.log(v)
                          this.setState({
                            dialog: Object.assign({}, this.state.dialog, { show: true, type: 1, cardid: v.id, cardTitle: v.title, input_list: v.input_list })
                          })
                        }} src={'upload/' + v.img.split('upload')[1]} alt="" />
                      </div>
                      <div className='goodInfo'>
                        <img src={applyImg1} className='img1' onClick={() => {
                          console.log(v)
                          this.setState({
                            dialog: Object.assign({}, this.state.dialog, { show: true, type: 1, cardid: v.id, cardTitle: v.title, input_list: v.input_list })
                          })
                        }}></img>
                        <img src={infoImg} onClick={() => {
                          this.setState({
                            infoPage: Object.assign({}, this.state.infoPage, { show: true, custom_data: v.custom_data })
                          })
                        }} className='img2'></img>
                      </div>
                    </div>
                  ))}
                </div>
              </div> : ''
            ))}

          </div>
          {dialog.show && <Dialog
            show={dialog.show}
            type={dialog.type}
            card_id={dialog.cardid}
            cardTitle={dialog.cardTitle}
            onClose={this.closeDialog.bind(this)}
            input_list={dialog.input_list}
          ></Dialog>}
          {infoPage.show && <InfoPage
            show={infoPage.show}
            type={infoPage.type}
            custom_data={infoPage.custom_data}
            onClose={this.closeInfoPage.bind(this)}
          ></InfoPage>}
          <div className='footBar'>
            {footList.map((val, i) => (
              <div className='btnItem' key={val.title} onClick={this.navPage.bind(this, i)}>
                <img className='imgBox' src={val.icon}></img>
                {val.title}</div>
            ))}
          </div>
        </div>
      </div>
    )
  }
}


export default withRouter(Index)