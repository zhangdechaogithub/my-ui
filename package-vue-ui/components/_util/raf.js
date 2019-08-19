import raf from 'raf'

let id = 0
const ids = {}

const wrapperRaf = (callback, delayFrames = 1) => {
    const myId = id++
    let restFrames = delayFrames

    const internalCallback = () => {
        restFrames -= 1

        if (restFrames <= 0) {
            callback()
            delete ids[id]
        } else {
            ids[id] = raf(internalCallback)
        }
    }

    ids[id] = raf(internalCallback)

    return myId
}

wrapperRaf.cancel = (id) => {
    raf.cancel(ids[id])
    delete ids[id]
}
export default wrapperRaf