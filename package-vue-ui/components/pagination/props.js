const paginationProps = {
    current: {
        type: Number,
        default: 1
    },
    total: {
        type: Number,
        default: 0
    },
    showTotal: {
        type: Boolean
    },
    pageSize: {
        type: Number,
        default: 10
    },
    pageSizeOptions: {
        validator(val) {
            if (val.constructor === Array) {
                let i = 0;
                while (i < val.length) {
                    if (parseInt(val[i])) {
                        i++
                    } else {
                        return false
                    }
                }
                return true

            }
            return false
        }
    },
    showTotal: {
        type: Boolean,
        default: true
    },
    prevIcon: {
        type: null
    },
    nextIcon: {
        type: null
    },
    jumpPrevIcon: {
        type: null
    },
    jumpNextIcon: {
        type: null
    },
    disabled: {
        type: Boolean
    },
    showQuickJumper: {
        type: Boolean
    },
    size: {
        validator(value) {
            return ['small', 'default'].includes(value)
        },
        default: 'default'
    },
    showSizeChanger:{
        type: Boolean
    },
    changeFunc:{
        type: Function
    },
    simple:{
        type: Boolean
    }
}
export { paginationProps }

const pageItemProps = {
    page: {
        type: [String, Number]
    },
    active: {
        type: Number
    },
    type: {
        validator(value) {
            return ['select', 'page', 'jumpPrev', 'jumpNext', 'prev', 'next', 'simple'].includes(value)
        }
    },
    prevIcon: {
        type: null
    },
    nextIcon: {
        type: null
    },
    jumpPrevIcon: {
        type: null
    },
    jumpNextIcon: {
        type: null
    },
    disabled: {
        type: Boolean
    }
}
export { pageItemProps }