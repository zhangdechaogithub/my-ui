import Event from './Event'

import { requestAnimationTimeout, cancelAnimationTimeout } from '../index'

const isCssAnimationSupported = Event.endEvents.length !== 0

const capitalPrefixes = [
    'Webkit',
    'Moz',
    'O',
    'ms'
]

const prefixes = ['-webkit-', '-moz-', '-o-', 'ms-', '']

function getStyleProperty(node, name) {
    const style = window.getComputedStyle(node, null)
    let ret = ''

    for (let i = 0; i < prefixes.length; i++) {
        ret = style.getPropertyValue(prefixes[i] + name)
        if (ret) {
            break;
        }
    }

    return ret
}

function fixBrowserByTimeout(node) {
    if (isCssAnimationSupported) {
        const transitionDelay = parseFloat(getStyleProperty(node, 'transition-delay')) || 0
        const transitionDuration = parseFloat(getStyleProperty(node, 'transition-duration')) || 0
        const animationDelay = parseFloat(getStyleProperty(node, 'animation-delay')) || 0
        const animationDuration = parseFloat(getStyleProperty(node, 'animation-duration')) || 0
        const time = Math.max(transitionDuration + transitionDelay, animationDuration + animationDelay)

        node.rcEndAnimTimeout = setTimeout(() => {
            node.rcEndAnimTimeout = null
            if (node.rcEndListener) {
                node.rcEndListener()
            }
        }, time * 1000 + 200)
    }
}

function clearBrowserBugTimeout(node) {
    if (node.rcEndAnimTimeout) {
        clearTimeout(node.rcEndAnimTimeout)
        node.rcEndAnimTimeout = null
    }
}

const cssAnimation = (node, transitionName, endCallback) => {

    const nameIsObj = typeof transitionName === 'object'

    const className = nameIsObj ? transitionName.name : transitionName

    const activeClassName = nameIsObj ? transitionName.active : `${transitionName}-active`

    let end = endCallback
    let start, active;

    const nodeClasses = node.classList 

    if (endCallback && Object.prototype.toString.call(endCallback) === '[object Object]') {
        end = endCallback.end
        start = endCallback.start
        active = endCallback.active
    }

    if (node.rcEndListener) {
        node.rcEndListener()
    }

    node.rcEndListener = e => {
        if (e && e.target !== node) {
            return
        }

        if (node.rcAnimTimeout) {
            cancelAnimationTimeout(node.rcAnimTimeout)
            node.rcAnimTimeout = null
        }

        clearBrowserBugTimeout(node)

        nodeClasses.remove(className)
        nodeClasses.remove(activeClassName)

        Event.removeEndEventListener(node, node.rcEndListener)
        node.rcEndListener = null

        if (end) {
            end()
        }
    }

    Event.addEndEventListener(node, node.rcEndListener)

    if (start) {
        start()
    }

    nodeClasses.add(className)
    node.rcAnimTimeout = requestAnimationFrame(() => {
        node.rcAnimTimeout = null
        nodeClasses.add(activeClassName)
        if (active) {
            requestAnimationTimeout(active, 0)
        }
        fixBrowserByTimeout(node)
    }, 30)

    return {
        stop() {
            if (node.rcEndListener) {
                node.rcEndListener()
            }
        }
    }
}

cssAnimation.style = (node, style, callback) => {
	if(node.rcEndListener){
		node.rcEndListener()
	}

	node.rcEndListener = e => {
		if(e && e.target !== node){
			return
		}

		if(node.rcAnimTimeout){
			cancelAnimationTimeout(node.rcAnimTimeout)
			node.rcAnimTimeout = null
		}

		clearBrowserBugTimeout(node)
		Event.removeEndEventListener(node, node.rcEndListener)

		node.rcEndListener = null

		if(callback){
			callback()
		}
	}

	Event.addEndEventListener(node, node.rcEndListener)

	node.rcAnimTimeout = requestAnimationTimeout(() => {

	}, 0)
}

cssAnimation.setTransition = (node, p, value) => {

}

cssAnimation.isCssAnimationSupported = isCssAnimationSupported

export { isCssAnimationSupported }
export default cssAnimation