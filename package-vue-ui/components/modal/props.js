export default () => ({
    /** 对话框是否可见*/
    visible: {
        type: Boolean,
        default: false
    },
    /** 确定按钮 loading
    confirmLoading: {
        type: Boolean
    },*/
    /** 标题*/
    title: {
        type: null
    },
    /** 是否显示右上角的关闭按钮*/
    closable: {
        type: Boolean,
        default: true
    },
    /** 关闭后回调*/
    afterClose: {
        type: Function
    },
    /** 宽度*/
    width: {
        type: Number
    },
    /** 底部内容*/
    footer: {
        type: null
    },
    /** 确认按钮文字*/
    okText: {
        type: String
    },
    okType: {
        validator(value) {
            return ['primary', 'danger', 'dashed', 'ghost', 'link', 'default'].includes(value)
        },
        default: 'default'
    },
    cancelText: {
        type: String
    },
    /** 点击蒙层是否允许关闭*/
    maskClosable: {
        type: Boolean,
        default: true
    },
    //确定按钮回调
    onOk: {
        type: Function
    },   
    //取消按钮回调
    onCancel: {
        type: Function
    }
})