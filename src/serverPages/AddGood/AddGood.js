import React, { Component } from 'react'
import { Modal, Input, Upload, Icon, message, Select, Button } from 'antd'
import { serverUri, deleteImg, updateGood, getGoodInfo, getTypeList } from '../../reqApi/reqApi'
import "./AddGoods.css"
const { TextArea } = Input;
const { Option } = Select;

function getBase64(file) {
    return new Promise((resolve, reject) => {
        const reader = new FileReader();
        reader.readAsDataURL(file);
        reader.onload = () => resolve(reader.result);
        reader.onerror = error => reject(error);
    })
}
function beforeUpload(file) {
    const isJpgOrPng = file.type === 'image/jpeg' || file.type === 'image/png';
    if (!isJpgOrPng) {
        message.error('You can only upload JPG/PNG file!');
    }
    const isLt2M = file.size / 1024 / 1024 < 2;
    if (!isLt2M) {
        message.error('Image must smaller than 2MB!');
    }
    return isJpgOrPng && isLt2M;
}
export default class AddGood extends Component {
    constructor(props) {
        super(props);
        this.state = {
            visible: true,
            title: '添加',
            imageUrl: '',
            previewVisible: false,
            previewImage: '',
            fileList: [],
            classList: [],
            formData: {
                id: '',
                title: '',
                img: '',
                content: '',
                info: '',
                custom_data: '',
                typeid: '',
                input_line: []
            }
        }
    }
    getGoodInfo() {
        let { editGood } = this.props;
        if (!editGood.id) {
            this.setState({
                formData: {
                    id: '',
                    title: '',
                    img: '',
                    content: '',
                    info: '',
                    custom_data: '',
                    typeid: '',
                    input_line: []
                }
            })
            return
        }
        getGoodInfo({ id: editGood.id }).then(res => {
            let input_line = [];
            if (res && res.data && res.data.input_list) {
                try {
                    res.data.input_line = JSON.parse(res.data.input_list)
                } catch (e) {
                    message.error('解析错误')
                }
            }
            let fileList = [
                {
                    uid: '1',
                    status: 'done',
                    url: res.data.img
                }]
            this.setState({
                title: '修改',
                formData: Object.assign({}, this.state.formData, res.data),
                fileList
            })
        }).catch(e => {
            console.log(e)
            message.error('获取信息错误')
        })
    }
    getTypeList() {
        getTypeList().then(res => {
            this.setState({
                classList: res.data
            })
        }).catch(e => {
            console.log(e)
            message.error('请求错误')
        })
    }
    componentDidMount() {
        this.getTypeList()
        this.getGoodInfo()
    }
    onOkFunc() {
        let  formData  = Object.assign({},this.state.formData);
        if (!formData.title) {
            message.error('请填写活动标题')
            return
        }
        if (!formData.img) {
            message.error('请选择一个图片')
            return
        }
        if (!formData.custom_data) {
            message.error('请填写活动富文本')
            return
        }
        formData.input_line.map(val => {
            if (!val.title || !val.hint) {
                message.error('请填写自定义输入框内容')
                return
            }
        })
        try {
            formData.input_line = JSON.stringify(formData.input_line)
        } catch (e) {
            message.error('解析错误')
            formData.input_line = null
        }
        // if (!formData.content) {
        //     message.error('请填写活动内容')
        //     return
        // }
        // if (!formData.info) {
        //     message.error('请填写活动细则')
        //     return
        // }
        updateGood(formData).then(res => {
            console.log(res)
            if (res.err) message.error(res.data)
            else {
                message.success('操作成功')
                this.setState({
                    visible: false
                })
                this.props.editGood.onCancel()
            }
        }).catch(e => {
            message.error(e.data)
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
                    formData: Object.assign({}, this.state.formData, { img: '' })
                })
            }).catch(e => {
                message.error('删除失败' + e)
                return
            })
        } else {
            this.setState({
                formData: Object.assign({}, this.state.formData, { img: fileList[0].url })
            })
        }
        this.setState({ fileList })
    };
    handleTitleChange = (e) => {
        let { value } = e.target;
        let { formData } = this.state;
        this.setState({
            formData: Object.assign({}, formData, { title: value })
        })
    }
    handleInfoChange = (e) => {
        let { value } = e.target;
        let { formData } = this.state;
        this.setState({
            formData: Object.assign({}, formData, { info: value })
        })
    }
    handlecustomChange = (e) => {
        let { value } = e.target;
        let { formData } = this.state;
        this.setState({
            formData: Object.assign({}, formData, { custom_data: value })
        })
    }
    handleContentChange = (e) => {
        let { value } = e.target;
        let { formData } = this.state;
        this.setState({
            formData: Object.assign({}, formData, { content: value })
        })
    }
    onCancelFunc() {
        this.props.editGood.onCancel()
    }
    render() {
        console.log(this.state.fileList)
        let { title, fileList, previewVisible, visible, previewImage, formData } = this.state;
        let { editGood, classList } = this.state;
        let uploadButton =
            <div>
                <Icon type='plus'></Icon>
                <div className='ant-upload-text'>Upload</div>
            </div>
        return (
            <div className='AddGoods'>
                <Modal
                    title={title}
                    visible={visible}
                    onOk={this.onOkFunc.bind(this)}
                    onCancel={this.onCancelFunc.bind(this)}
                    okText='确认'
                    cancelText='取消'
                >
                    <div className='AddGoodMain'></div>
                    <div className='infoLine'>
                        <div className='addGoodstitle'>活动标题</div>
                        <div className='infoInput'>
                            <Input value={formData.title} onChange={this.handleTitleChange} placeholder='请输入活动标题'></Input>
                        </div>
                    </div>
                    <div className='infoLine'>
                        <div className='addGoodstitle'>活动图片</div>
                        <div className='infoInput'>
                            <Upload
                                name='upload_file'
                                listType='picture-card'
                                className='avatar-uploader'
                                beforeUpload={beforeUpload}
                                fileList={fileList}
                                onPreview={this.handlePreview}
                                action={serverUri + '/img/upload'}
                                onChange={this.handleChange.bind(this)}
                            >
                                {fileList.length >= 1 ? null : uploadButton}
                            </Upload>
                            <Modal visible={previewVisible} footer={null} onCancel={this.handleCancel}>
                                <img alt="example" style={{ width: '100%' }} src={previewImage} />
                            </Modal>
                        </div>
                    </div>
                    {/**<div className='infoLine'>
                        <div className='addGoodstitle'>活动说明</div>
                        <div className='infoInput'>
                            <TextArea value={formData.content} onChange={this.handleContentChange} placeholder='请输入活动说明'></TextArea>
                        </div>
                    </div>
                    <div className='infoLine'>
                        <div className='addGoodstitle'>活动细则</div>
                        <div className='infoInput'>
                            <TextArea value={formData.info} onChange={this.handleInfoChange} placeholder='请输入活动细则'></TextArea>
                        </div>
                    </div>  */}
                    <div className='infoLine'>
                        <div className='addGoodstitle'>类别</div>
                        <Select
                            onChange={(e) => {
                                this.setState({
                                    formData: Object.assign({}, this.state.formData, { typeid: e })
                                })
                            }}
                            placeholder='请选择类别'
                            className='infoInput'
                            value={formData.typeid}>
                            {classList.map((val, index) => (
                                <Option key={index} value={val.id}>{val.title}</Option>
                            ))}
                        </Select>
                    </div>
                    <div className='infoLine'>
                        <div className='addGoodstitle'>富文本</div>
                        <div className='infoInput'>
                            <TextArea value={formData.custom_data} onChange={this.handlecustomChange} placeholder='请输入富文本'></TextArea>
                        </div>
                    </div>

                    {formData.input_line.map((val, index) => (
                        <div key={index} className='infoLine'>
                            <div className='addGoodstitle'>标题</div>
                            <div className='infoInput'>
                                <Input value={val.title} onChange={(e) => {
                                    let { input_line } = formData;
                                    input_line[index].title = e.target.value;
                                    this.setState({
                                        formData: Object.assign({}, formData, {
                                            input_line
                                        })
                                    })
                                }} placeholder='请输入标题'></Input>
                            </div>
                            <div className='addGoodstitle'>提示信息</div>
                            <div className='infoInput'>
                                <Input value={val.hint} onChange={(e) => {
                                    let { input_line } = formData;
                                    input_line[index].hint = e.target.value;
                                    this.setState({
                                        formData: Object.assign({}, formData, {
                                            input_line
                                        })
                                    })
                                }} placeholder='请输入提示信息'></Input>
                            </div>
                            <Button type='danger' onClick={() => {
                                let { input_line } = formData;
                                input_line.splice(index, 1)
                                this.setState({
                                    formData: Object.assign({}, formData, {
                                        input_line
                                    })
                                })
                            }}>删除</Button>
                        </div>
                    )
                    )}
                    <Button type='primary' onClick={() => {
                        this.setState({
                            formData: Object.assign({}, formData, {
                                input_line: [...formData.input_line, {
                                    title: '',
                                    hint: ''
                                }]
                            })
                        })
                    }}>添加一个输入框</Button>
                </Modal>
            </div>
        )
    }
}
