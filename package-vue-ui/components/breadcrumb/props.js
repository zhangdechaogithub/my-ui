export default () => ({
    routes: {
        validator(val) {
            if (val instanceof Array) {
                const arr = val.filter((v) => {
                    return v.hasOwnProperty('path') && v.hasOwnProperty('breadcrumbName')
                })
                return arr.length === val.length
            }
            return false
        }
    },
    params: {
        type: null
    },
    separator: {
        type: null
    },
    itemRender: {
        type: Function
    }
})