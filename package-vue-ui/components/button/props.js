export default () => ({
    type: {
        validator(value) {
            return ['primary', 'danger', 'dashed', 'ghost', 'link', 'default'].includes(value)
        },
        default: 'default'
    },
    htmlType: {
        validator(value) {
            return ['button', 'submit', 'reset'].includes(value)
        },
        default: 'button'
    },
    icon: String,
    shape: {
        validator(value) {
            return ['circle'].includes(value)
        }
    },
    size: {
        validator(value) {
            return ['large', 'small'].includes(value)
        }
    },
    loading: [Boolean, Object],
    disabled: Boolean,
    ghost: Boolean,
    block: Boolean
})