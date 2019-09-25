const paginationProps = {
    current: {
        type: Number,
        default: 1
    },
    total: {
        type: Number,
        default: 0
    },
    pageSize: {
        type: Number,
        default: 10
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
    type:{
    	validator(value) {
            return ['select', 'page', 'jumpPrev', 'jumpNext', 'prev', 'next', 'goInput'].includes(value)
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