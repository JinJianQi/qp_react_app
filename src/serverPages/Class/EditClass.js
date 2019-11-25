import './Class.css'
import React from 'react'
import { Upload, Button, Icon, message, Modal, Input, Switch } from 'antd'
import { getTypeList } from '../../reqApi/reqApi'
import { serverUri, updateClass, deleteImg } from '../../reqApi/reqApi'
import { getBase64 } from '../../tools/tools'

export default class Class extends React.Component {
    state = {
        classList: [],
        fileList: [],
        previewVisible: false,
        previewImage: '',
        formData: {
            id: '',
            title: '',
            img: '',
            show_flag: '1'
        }
    }
    componentDidMount() {
        let { editClass } = this.props;
        if (!editClass.id) {

        } else {
            let fileList = []
            if (!editClass.img) fileList = []
            else {
                fileList = [
                    {
                        uid: '1',
                        status: 'done',
                        url: editClass.img
                    }]
            }
            this.setState({
                formData: editClass,
                fileList
            })
        }
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
            this.setState({
                formData: Object.assign({}, this.state.formData, {
                    img: ''
                })
            })
            deleteImg({ url: file.url }).then(res => {
                message.success('删除成功')
            }).catch(e => {
                console.log(e)
                message.error('删除失败' + e)
                return
            })
        } else {
            this.setState({
                formData: Object.assign({}, this.state.formData, {
                    img: fileList[0].url
                })
            })
        }
        this.setState({ fileList })
    };
    render() {
        let { formData, fileList, previewImage, previewVisible } = this.state;
        const uploadButton = (
            <div>
                <Icon type="plus" />
                <div className="ant-upload-text">Upload</div>
            </div>
        );
        return (
            <div>
                <Modal
                    visible={true}
                    onCancel={() => { this.props.onClose() }}
                    onOk={() => {
                        console.log(this.state.formData)
                        updateClass(this.state.formData).then(res => {
                            if (!res.err) {
                                message.success('操作成功')
                                this.props.onClose()
                            }
                        }).catch(e => {
                            message.error('操作失败')
                        })
                    }}
                    okText='应用'
                    cancelText='取消'
                >
                    <div className='infoLine'>
                        <div className='addGoodstitle'>标题</div>
                        <div className='infoInput'>
                            <Input value={formData.title} onChange={(e) => {
                                this.setState({
                                    formData: Object.assign({}, this.state.formData, { title: e.target.value })
                                })
                            }} placeholder='请输入类别标题'></Input>
                        </div>
                    </div>
                    <div className='infoLine'>
                        <div className='addGoodstitle'>显示</div>
                        <div className='infoInput'>
                            <Switch checked={formData.show_flag == '1'} onChange={(e) => {
                                console.log(e)
                                this.setState({
                                    formData: Object.assign({}, this.state.formData, { show_flag: e ? '1' : '0' })
                                })
                            }}></Switch>
                        </div>
                    </div>
                    <div className='infoLine'>
                        <div className='addGoodstitle'>图标</div>
                        <div className='infoInput'>
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
                </Modal>
            </div>
        )
    }
}
