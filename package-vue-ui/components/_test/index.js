import './style/index.scss'
import mixinDemo from './demo'
import Demo from './demo/'
export default {
    name: 'Test',
    props: ['name'],
    mixins: [mixinDemo],
    mounted() {
        setTimeout(() => {
            //this.$refs.aniTest.style.top = '200px'
        }, 1000)
        //this.$refs.aniTest.addEventListener('transitionend', () => alert('finish'), false)
    },
    methods: {
        clickHandler() {
            this.show = !this.show
        }
    },
    data() {
        return {
           flag: false
        }
    },
    render() {
        //const AlertNode = this.getAlertTest()
        //const AffixNode = this.getAffixTest(this.affixContainer)
        //const AffixNode2 = this.getAffixWinTest(this.affixContaine)
        //const anchorNode = this.getAnchorTest()
        //const rowNode = this.getRowTest()
        //const button = this.getButton()
        //const modal = this.getModal(this.flag)
        //const Breadcrumb = this.getBreadcrumb()
        //const step = this.getStep()
        const Pagination = this.getPagination()
        return (
           <div class="ani-test" ref="aniTest">
               {Pagination}
           </div>
        )
    }
}