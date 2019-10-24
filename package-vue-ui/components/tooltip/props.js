import { getPrefixCls } from '../_util/'
const tooltipProps = {
    trigger: {
        validator(value) {
            return ['hover', 'focus', 'click'].includes(value)
        },
        default: 'hover'
    },
    visible: Boolean,
    placement: {
        validator(value) {
            return [
                'top',
                'left',
                'right',
                'bottom',
                'topLeft',
                'topRight',
                'bottomLeft',
                'bottomRight',
                'leftTop',
                'leftBottom',
                'rightTop',
                'rightBottom',
            ].includes(value)
        },
        default: 'top'
    },
    transitionName: {
        type: String,
        default: 'zoom-big-fast'
    },
    overlayStyle: Object,
    overlayClassName: String,
    prefixCls: {
        type: String,
        default: getPrefixCls('tooltip')
    },
    mouseEnterDelay: {
        type: Number,
        default: 0.1
    },
    mouseLeaveDelay: {
        type: Number,
        default: 0.1
    },
    getPopupContainer: {
        type: Function
    },
    visibleChange: {
        type: Function
    },
    arrowPointAtCenter: {
        type: Boolean,
        default: false,
    },
    autoAdjustOverflow: {
        type: [Boolean, Object],
        default: true
    },
    align: Object
}

export default tooltipProps