const createList = (cur, total, ergodic) => {
    let arr = new Array(9).fill(null)
    let list = []
    if (total <= 6) {
        arr.forEach((v, i) => {
            if (i < total) {
                list.push(i + 1)
            }
        })
    } else {
        if (cur - 3 <= 1) {
            arr.forEach((v, i) => {
                if (i < 5) {
                    list.push(i + 1)
                }
            })
            list.push('lg')
            list.push(total)
        } else if (cur + 3 >= total) {
            list.push(1)
            list.push('sm')

            arr.forEach((v, i) => {
                if (i < 5) {
                    list.push(total - 4 + i)
                }
            })
        } else {
            let start = cur - 3
            list.push(1)
            list.push('sm')
            arr.forEach((v, i) => {
                if (i < 5) {
                    list.push(start + i + 1)
                }
            })
            list.push('lg')
            list.push(total)
        }
    }
    if(ergodic){
        list.push('next')
        list.unshift('prev')
    }
    return list
}

export {createList}