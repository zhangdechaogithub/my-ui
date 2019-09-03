import Icon from '../icon/'
import Alert from '../alert/'
import Affix from '../affix/'
import Anchor from '../anchor/'
import {Col, Row} from '../grid/'

const Link = Anchor.Link

const mixinDemo = {
    methods: {
        //alert test ======================================================================================
        getAlertTest() {
            const { show, msg, description } = {
                show: true,
                msg: 'hello world',
                description: '迪丽热巴'
            }
            return (
                <div class="alert-wrap">
                    <Alert v-show={show} showIcon type="warning" width={300} msg={msg} closable />
                    <Alert v-show={show} showIcon type="error" msg={msg} description={description} closable/>
                    <Alert v-show={show} showIcon type="info" msg={msg} description={description}  closable/>
                    <Alert v-show={show} showIcon type="success" msg={msg}  description={description} closable/>
                </div>
            )
        },
        //affix test ======================================================================================
        getAffixTest(containerFunc) {
            return (                  
                <div class="affix-wrap" id="one">
                    <Affix container={containerFunc} offsetBottom={50} reset={true}>
                        <div>hello=============================</div>
                    </Affix>
                    <div class="affix-container">
                        <div id="1st"></div>
                    </div>
                </div>
            )
        },
        getAffixWinTest() {
            return (
            <div class="affix-wrap" style="height: 2000px;">
                    <Affix container={() => window} offsetBottom={100} reset={true}>
                        <div>world=========================</div>
                    </Affix>
            </div>)
        },
        //anchor test ============================================================
        //
        getAnchorTest(containerFuncAnchor){
            let container = () => window//document.getElementById('anchorWrap')
            return (
                <div class="anchor-wrap" id="anchorWrap">
                   <Anchor affix={true} container={container} offsetTop={100} wrapCls={'hello world'}>
                        <Link href="#1st" title="1st first">
                            <h3>hello world</h3>
                        </Link>
                        <Link href="#2nd" title="2nd second" />
                        <Link href="#3th" title="3th third" />
                        <Link href="#4th" title="4th fouth" />
                    </Anchor>
                    <div class="anchor-ids">
                        <div id="1st">1st =====================================</div>
                        <div id="2nd">2nd =====================================</div>
                        <div id="3th">3th =====================================</div>
                        <div id="4th">4th =====================================</div>
                    </div>
                </div>
            )
        },
        getRowTest(){
            return (
                <Row gutter={16}>
                  <Col class="gutter-row" span={6}>
                    <div class="gutter-box">col-6</div>
                  </Col>
                  <Col class="gutter-row" span={6}>
                    <div class="gutter-box">col-6</div>
                  </Col>
                  <Col class="gutter-row" span={6}>
                    <div class="gutter-box">col-6</div>
                  </Col>
                  <Col class="gutter-row" span={6}>
                    <div class="gutter-box">col-6</div>
                  </Col>
                </Row>
            )
        },
        getColTest(){
            return (
                <Col></Col>
            )
        }
    }
}

export default mixinDemo