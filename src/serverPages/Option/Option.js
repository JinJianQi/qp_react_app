import React, { Component } from 'react'
import { Input, Button, message, Switch, Upload, Icon, Modal } from 'antd'
import { getOptions, updateOptions, serverUri, deleteImg } from '../../reqApi/reqApi'
import './Option.css'
import { getBase64 } from '../../tools/tools'
export default class Option extends Component {
    state = {
        kefu_url: '',
        update_url: '',
        notice: '',
        notice_custom: '',
        fileList: [],
        previewVisible: false,
        previewImage: ''
    }
    componentDidMount() {
        getOptions().then(res => {
            let fileList = []
            if (!res.data.icon) fileList = []
            else {
                fileList = [
                    {
                        uid: '1',
                        status: 'done',
                        url: res.data.icon
                    }]
            }
            this.setState({
                ...res.data,
                fileList
            })
        })
    }
    handleCancel = () => this.setState({ previewVisible: false });
    handlePreview = async file => {
        if (!file.url && !file.preview) {
            file.preview = await getBase64(file.originFileObj);
        }

        this.setState({
            previewImage: file.url || file.preview,
            previewVisible: true,
        });
    };
    handleChange = ({ fileList, file }) => {
        fileList.map(val => {
            if (val.response) {
                val.url = val.response.url;
            }
            return val
        })
        if (fileList.length < 1) {
            //进行图片的删除
            deleteImg({ url: file.url }).then(res => {
                message.success('删除成功')
                this.setState({
                    icon: ''
                })
            }).catch(e => {
                message.error('删除失败' + e)
                return
            })
        } else {
            this.setState({
                icon: fileList[0].url
            })
        }
        this.setState({ fileList })
    };
    render() {
        let { kefu_url, update_url, notice, notice_custom, fileList, previewImage, previewVisible, icon } = this.state;
        const uploadButton = (
            <div>
                <Icon type="plus" />
                <div className="ant-upload-text">Upload</div>
            </div>
        );
        return (
            <div className='Option'>
                <div className='inputLine'>
                    <div className='optionTitle'>客服地址</div>
                    <Input className='optionInput' onChange={(e) => {
                        this.setState({
                            kefu_url: e.target.value
                        })
                    }} value={kefu_url} placeholder='请输入第三方客服地址'></Input>
                </div>
                <div className='inputLine'>
                    <div className='optionTitle'>软件更新地址</div>
                    <Input className='optionInput' onChange={(e) => {
                        this.setState({
                            update_url: e.target.value
                        })
                    }} value={update_url} placeholder='请输入软件更新地址'></Input>
                </div>
                <div className='inputLine'>
                    <div className='optionTitle'>最新消息</div>
                    <Input className='optionInput' onChange={(e) => {
                        this.setState({
                            notice: e.target.value
                        })
                    }} value={notice} placeholder='请输入最新消息'></Input>
                </div>
                <div className='inputLine'>
                    <div className='optionTitle'>是否显示自定义消息</div>
                    <div className='optionInput'>
                        <Switch onChange={(e) => {
                            console.log(e)
                            this.setState({
                                notice_custom: e ? '1' : '0'
                            })
                        }} checked={notice_custom == '1' ? true : false}></Switch>
                    </div>
                </div>
                <div className='inputLine'>
                    <div className='optionTitle'>图标</div>
                    <div className='optionInput'>
                        <Upload
                            name='upload_file'
                            action={serverUri + '/img/upload'}
                            listType="picture-card"
                            fileList={fileList}
                            onPreview={this.handlePreview}
                            onChange={this.handleChange}
                        >
                        {fileList.length >= 1 ? null : uploadButton}
                        </Upload>
                        <Modal visible={previewVisible} footer={null} onCancel={this.handleCancel}>
                            <img alt="example" style={{ width: '100%' }} src={previewImage} />
                        </Modal>
                    </div>
                </div>

                <div className='optionBtnBox'>
                    <Button type='primary' onClick={() => {
                        updateOptions({
                            kefu_url, update_url, notice, notice_custom, icon
                        }).then(res => {
                            console.log(res)
                            message.success('操作成功')
                        }).catch(e => {
                            message.error('操作失败')
                        })
                    }}>应用</Button>
                </div>
            </div>
        )
    }
}
