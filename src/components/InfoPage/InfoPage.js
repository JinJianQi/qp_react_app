import React from 'react'
import './InfoPage.css'
import btnImg from '../../res/1572161085697.png'
export default class InfoPage extends React.Component {
    render() {
        console.log(this.props)
        return (
            <div className='InfoPageBack'>
                <div className='infoPage'>
                    <div className='infoHeader' onClick={() => { this.props.onClose() }}>
                        <div className='BackBtn'>{'<'}</div>
                        <div>活动规则</div>
                    </div>
                    <div className='infoMain'>
                        <div dangerouslySetInnerHTML={{
                            __html: this.props.custom_data
                        }}></div>

                        <div className='infoTitle'>申请方式</div>
                        <img className='btnBl' onClick={()=>{
                            this.props.onClose()
                        }} src={btnImg} alt="" />
                    </div>
                    {
                        //     <div className='infoMain'>
                        //     <div className='name'>新会员礼包4：注册满30天送蔓越礼金</div>
                        //     <div className='infoTitle'>活动内容</div>
                        //     <div className='infoContent'>即日起新注册会员于【棋牌游戏、电子游戏、捕鱼游戏】完成有效投注，即可获得最高1777元满月礼包奖金，赠送不限人数，快告诉您的好友一起来分享来领取吧！</div>
                        //     <div className='infoTitle'>申请方式</div>
                        //     <img className='btnBl' src={btnImg} alt="" />
                        //     <div className='infoTitle'>活动细节</div>
                        //     <div className='infoContent'>即日起新注册会员于【棋牌游戏、电子游戏、捕鱼游戏】完成有效投注，即可获得最高1777元满月礼包奖金，赠送不限人数，快告诉您的好友一起来分享来领取吧！</div>
                        //     <div className='infoContent'>即日起新注册会员于【棋牌游戏、电子游戏、捕鱼游戏】完成有效投注，即可获得最高1777元满月礼包奖金，赠送不限人数，快告诉您的好友一起来分享来领取吧！</div>
                        //     <div className='infoContent'>即日起新注册会员于【棋牌游戏、电子游戏、捕鱼游戏】完成有效投注，即可获得最高1777元满月礼包奖金，赠送不限人数，快告诉您的好友一起来分享来领取吧！</div>
                        //     <div className='infoContent'>即日起新注册会员于【棋牌游戏、电子游戏、捕鱼游戏】完成有效投注，即可获得最高1777元满月礼包奖金，赠送不限人数，快告诉您的好友一起来分享来领取吧！</div>
                        //     <div className='infoContent'>即日起新注册会员于【棋牌游戏、电子游戏、捕鱼游戏】完成有效投注，即可获得最高1777元满月礼包奖金，赠送不限人数，快告诉您的好友一起来分享来领取吧！</div>
                        //     <div className='infoContent'>即日起新注册会员于【棋牌游戏、电子游戏、捕鱼游戏】完成有效投注，即可获得最高1777元满月礼包奖金，赠送不限人数，快告诉您的好友一起来分享来领取吧！</div>
                        //     <div className='infoContent'>即日起新注册会员于【棋牌游戏、电子游戏、捕鱼游戏】完成有效投注，即可获得最高1777元满月礼包奖金，赠送不限人数，快告诉您的好友一起来分享来领取吧！</div>
                        //     <div className='infoContent'>即日起新注册会员于【棋牌游戏、电子游戏、捕鱼游戏】完成有效投注，即可获得最高1777元满月礼包奖金，赠送不限人数，快告诉您的好友一起来分享来领取吧！</div>
                        //     <div className='infoContent'>即日起新注册会员于【棋牌游戏、电子游戏、捕鱼游戏】完成有效投注，即可获得最高1777元满月礼包奖金，赠送不限人数，快告诉您的好友一起来分享来领取吧！</div>
                        //     <div className='infoContent'>即日起新注册会员于【棋牌游戏、电子游戏、捕鱼游戏】完成有效投注，即可获得最高1777元满月礼包奖金，赠送不限人数，快告诉您的好友一起来分享来领取吧！</div>
                        //     <div className='infoContent'>即日起新注册会员于【棋牌游戏、电子游戏、捕鱼游戏】完成有效投注，即可获得最高1777元满月礼包奖金，赠送不限人数，快告诉您的好友一起来分享来领取吧！</div>
                        //     <div className='infoContent'>即日起新注册会员于【棋牌游戏、电子游戏、捕鱼游戏】完成有效投注，即可获得最高1777元满月礼包奖金，赠送不限人数，快告诉您的好友一起来分享来领取吧！</div>
                        //     <div className='infoContent'>即日起新注册会员于【棋牌游戏、电子游戏、捕鱼游戏】完成有效投注，即可获得最高1777元满月礼包奖金，赠送不限人数，快告诉您的好友一起来分享来领取吧！</div>
                        //     <div className='infoContent'>即日起新注册会员于【棋牌游戏、电子游戏、捕鱼游戏】完成有效投注，即可获得最高1777元满月礼包奖金，赠送不限人数，快告诉您的好友一起来分享来领取吧！</div>
                        //     <div className='infoContent'>即日起新注册会员于【棋牌游戏、电子游戏、捕鱼游戏】完成有效投注，即可获得最高1777元满月礼包奖金，赠送不限人数，快告诉您的好友一起来分享来领取吧！</div>
                        //     <div className='infoContent'>即日起新注册会员于【棋牌游戏、电子游戏、捕鱼游戏】完成有效投注，即可获得最高1777元满月礼包奖金，赠送不限人数，快告诉您的好友一起来分享来领取吧！</div>
                        //     <div className='infoContent'>即日起新注册会员于【棋牌游戏、电子游戏、捕鱼游戏】完成有效投注，即可获得最高1777元满月礼包奖金，赠送不限人数，快告诉您的好友一起来分享来领取吧！</div>
                        //     <div className='infoContent'>即日起新注册会员于【棋牌游戏、电子游戏、捕鱼游戏】完成有效投注，即可获得最高1777元满月礼包奖金，赠送不限人数，快告诉您的好友一起来分享来领取吧！</div>
                        //     <div className='infoContent'>即日起新注册会员于【棋牌游戏、电子游戏、捕鱼游戏】完成有效投注，即可获得最高1777元满月礼包奖金，赠送不限人数，快告诉您的好友一起来分享来领取吧！</div>
                        //     <div className='infoContent'>即日起新注册会员于【棋牌游戏、电子游戏、捕鱼游戏】完成有效投注，即可获得最高1777元满月礼包奖金，赠送不限人数，快告诉您的好友一起来分享来领取吧！</div>
                        //     <div className='infoContent'>即日起新注册会员于【棋牌游戏、电子游戏、捕鱼游戏】完成有效投注，即可获得最高1777元满月礼包奖金，赠送不限人数，快告诉您的好友一起来分享来领取吧！</div>
                        //     <div className='infoContent'>即日起新注册会员于【棋牌游戏、电子游戏、捕鱼游戏】完成有效投注，即可获得最高1777元满月礼包奖金，赠送不限人数，快告诉您的好友一起来分享来领取吧！</div>
                        //     <div className='infoContent'>即日起新注册会员于【棋牌游戏、电子游戏、捕鱼游戏】完成有效投注，即可获得最高1777元满月礼包奖金，赠送不限人数，快告诉您的好友一起来分享来领取吧！</div>
                        //     <div className='infoContent'>即日起新注册会员于【棋牌游戏、电子游戏、捕鱼游戏】完成有效投注，即可获得最高1777元满月礼包奖金，赠送不限人数，快告诉您的好友一起来分享来领取吧！</div>
                        //     <div className='infoContent'>即日起新注册会员于【棋牌游戏、电子游戏、捕鱼游戏】完成有效投注，即可获得最高1777元满月礼包奖金，赠送不限人数，快告诉您的好友一起来分享来领取吧！</div>
                        //     <div className='infoContent'>即日起新注册会员于【棋牌游戏、电子游戏、捕鱼游戏】完成有效投注，即可获得最高1777元满月礼包奖金，赠送不限人数，快告诉您的好友一起来分享来领取吧！</div>
                        //     <div className='infoContent'>即日起新注册会员于【棋牌游戏、电子游戏、捕鱼游戏】完成有效投注，即可获得最高1777元满月礼包奖金，赠送不限人数，快告诉您的好友一起来分享来领取吧！</div>
                        //     <div className='infoContent'>即日起新注册会员于【棋牌游戏、电子游戏、捕鱼游戏】完成有效投注，即可获得最高1777元满月礼包奖金，赠送不限人数，快告诉您的好友一起来分享来领取吧！</div>
                        // </div>
                    }
                </div>
            </div>
        )
    }
}
