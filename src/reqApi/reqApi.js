const Request = require('request')
const serverUri = 'http://39.106.49.94:8080'
// const serverUri = 'http://localhost:8080'

const request = (data) => {
    console.log(data)
    return new Promise((resolve, reject) => {
        Request({
            url: serverUri + data.url,
            method: data.data ? 'POST' : 'GET',
            body: data.data,
            header: {
                'Content-Type': 'application/x-www-form-urlencoded'
            },
            json: true
        }, (err, res, body) => {
            if (err) {
                reject({ err: !!err, data: '网络错误' })
            }
            else
                if (body.err) {
                    reject(body.data)
                } else
                    resolve({
                        err: null,
                        data: body.data
                    })
        })
    })
}

const getUserList = (data) => request({ url: '/user/getList', data })
const insertUser = (data) => request({ url: '/user/insertUser', data })
const getUserByUser = (data) => request({ url: '/user/getUserByUser', data })
const updateStatus = (data) => request({ url: '/user/updateStatus', data })
const updateReply = (data) => request({ url: '/user/updateReply', data })
const getCardList = (data) => request({ url: '/card/getList', data })
const deleteImg = (data) => request({ url: '/img/delete', data })
const updateGood = (data) => request({ url: '/card/update', data })
const deleteGoodR = (data) => request({ url: '/card/delete', data })
const getGoodInfo = (data) => request({ url: '/card/getGoodInfo', data })
const getTypeList = () => request({ url: '/class/getList' })
const getListBaseType = (data) => request({ url: '/card/getListBaseType', data })
const getOptions = () => request({ url: '/option/getOptions' })
const updateOptions = (data) => request({ url: '/option/updateOptions', data })
const getCardListNoType = (data) => request({ url: '/class/getList', data })
const updateClass = (data) => request({ url: '/class/update', data })

export {
    getUserList,
    getCardList,
    serverUri,
    deleteImg,
    updateGood,
    deleteGoodR,
    getGoodInfo,
    updateStatus,
    getTypeList,
    getListBaseType,
    getOptions,
    updateOptions,
    insertUser,
    getUserByUser,
    updateReply,
    getCardListNoType,
    updateClass
}