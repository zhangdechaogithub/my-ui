export default () => ({
    trigger: {
        type: Array,
        default: ['hover']
    },
    overlay: {
        type: null
    },
    disabled: {
        type: Boolean
    },
    align: {
        type: Object
    },
    getPopupContainer: Function,
    transitionName: String,
    placement: {
        validator(value) {
            return ['topLeft',
                'topCenter',
                'topRight',
                'bottomLeft',
                'bottomCenter',
                'bottomRight',
            ].includes(value)
        }
    },
    overlayClassName: String,
    overlayStyle: Object,
    forceRender: Boolean,
    mouseEnterDelay: Number,
    mouseLeaveDelay: Number
})