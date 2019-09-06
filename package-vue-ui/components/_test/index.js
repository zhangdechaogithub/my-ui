import './style/index.scss'
import mixinDemo from './demo'
export default {
    name: 'Test',
    props: ['name'],
    mixins: [mixinDemo],
    mounted() {},
    methods: {
        clickHandler() {
            this.show = !this.show
        }
    },
    data() {
        return {
            affixContainer() {
                return document.getElementById('one')
            },
            containerFuncAnchor() {
                return document.getElementById('anchorWrap')
            }
        }
    },
    render() {
        //const AlertNode = this.getAlertTest()
        //const AffixNode = this.getAffixTest(this.affixContainer)
        //const AffixNode2 = this.getAffixWinTest(this.affixContaine)
        //const anchorNode = this.getAnchorTest()
        //const rowNode = this.getRowTest()
        const button = this.getButton()
        return (
            <div>
                {button}
            </div>
        )
    }
}