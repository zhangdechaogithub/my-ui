import { getComponentName } from '../_util/'
import { getWindow } from '../_util/domOpt'
import {cloneVNode} from '../_util/vnode'



const Test = {
    name: 'Test',
    mounted() {  
        //console.log('domOpt', util)
    },
    methods: {
        clickHandler() {
            console.log('hello world ddd')
        }
    },
    props: {
        hello: ''
    },
    render(h) {
        var node = <div class="test-wrap" ><span>hello world</span></div>
        return node
    }
}
export default Test