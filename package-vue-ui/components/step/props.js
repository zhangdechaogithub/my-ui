const stepItemProps = {
    wapperStyle: {
        type: Object
    },
    itemWidth: {
        type: String
    },
    status: {
        type: String
    },
    icon: {
        type: null
    },
    adjustMarginRight: {
        type: String
    },
    stepNumber: {
        type: String
    },
    description: {
        type: null
    },
    title: {
        type: null
    },
    processDot: {
        type: [Boolean, Function],

    },
    tailContent: {
        type: null
    },
    icons: {
        validator(val) {
            return val.hasOwnProperty('finish') && val.hasOwnProperty('error')
        }
    }
}

export { stepItemProps }

const stepListProps = {
    direction: {
        type: String,
        default: 'horizontal',
    },
    labelPlacement: {
        type: String,
        default: 'horizontal',
    },
    status: {
        type: String,
        default: 'process',
    },
    processDot: {
        type: [Boolean, Function],
    },
    initial: {
        type: Number,
        default: 0
    },
    current: {
        type: Number,
        default: 0
    },
    icons: {
        validator(val) {
            return val.hasOwnProperty('finish') && val.hasOwnProperty('error')
        }
    }
}

export { stepListProps }


const indexProps = {
    current: {
        type: Number
    },
    initial: {
        type: Number
    },
    labelPlacement: {
        validator(value) {
            return ['horizontal', 'vertical'].includes(value)
        },
        default: 'horizontal'
    },
    status: {
        validator(value) {
            return ['wait', 'process', 'finish', 'error'].includes(value)
        }
    },
    size: {
        validator(value) {
            return ['default', 'small'].includes(value)
        }
    },
    direction: {
        validator(value) {
            return ['horizontal', 'vertical'].includes(value)
        }
    },
    progressDot: {
        type: [Boolean, Function],
        default: false
    },
}

export { indexProps }