import Icon from '../icon/'
import Alert from '../alert/'
import Affix from '../affix/'
import Anchor from '../anchor/'
import { Col, Row } from '../grid/'
import Button from '../Button/'
const Link = Anchor.Link
const ButtonGroup = Button.Group

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
        getAnchorTest(containerFuncAnchor) {
            let container = () => window //document.getElementById('anchorWrap')
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
        getRowTest() {
            return (
                <Row gutter={16}>
                  <Col class="gutter-row" span={6}>
                    <div class="gutter-box">col-6</div>
                  </Col>
                  <Col class="gutter-row" span={6}>
                    <div class="gutter-box">col-6</div>
                  </Col>
                  <Col class="gutter-row" span={6} push={6}>
                    <div class="gutter-box">col-6</div>
                  </Col>
                </Row>
            )
        },
        getButton(){
            const clickHandler = () =>  alert('hello world')
            return (
                <div class="button-wrap">
                    <div>
                        <Button size="large">default</Button>
                        <Button>default</Button>
                        <Button size="small">default</Button>
                    </div>
                    <div>
                        <Button type="primary" size="large">primary</Button>
                        <Button type="primary">primary</Button>
                        <Button type="primary" size="small">primary</Button>
                    </div>
                    <div>
                        <Button type="danger" size="large">danger</Button>
                        <Button type="danger">danger</Button>
                        <Button type="danger" size="small">danger</Button>
                    </div>
                    <div>
                        <Button type="danger" size="large" block>danger</Button>
                        <Button type="danger" block>danger</Button>
                        <Button type="danger" size="small" block>danger</Button>
                    </div>
                     <div>
                        <Button type="primary" size="large" ghost>primary ghost</Button>
                        <Button type="primary" ghost>primary ghost</Button>
                        <Button type="primary" size="small" ghost>primary ghost</Button>
                    </div>
                    <div>
                        <Button type="danger" ghost size="large">danger ghost</Button>
                        <Button type="danger" ghost>danger ghost</Button>
                        <Button type="danger" ghost size="small">danger ghost</Button>
                    </div>
                    <div>
                        <Button type="dashed" ghost size="large">Dashed ghost</Button>
                        <Button type="dashed" ghost>Dashed ghost</Button>
                        <Button type="dashed" ghost size="small">Dashed ghost</Button>
                    </div>
                    <div>
                        <Button type="dashed" size="large">Dashed</Button>
                        <Button type="dashed">Dashed</Button>
                        <Button type="dashed" size="small">Dashed</Button>
                    </div>
                    <div>
                        <Button ghost size="large">Ghost</Button>
                        <Button ghost>Ghost</Button>
                        <Button ghost size="small">Ghost</Button>
                    </div>
                    <div>
                        <Button type="primary" size="large" disabled>disabled</Button>
                        <Button type="primary" disabled>disabled</Button>
                        <Button type="primary" size="small" disabled>disabled</Button>
                    </div>
                    <div>
                        <Button type="primary" shape="circle" size="large" icon="download"/>
                        <Button type="primary" shape="circle" icon="download"/>
                        <Button type="primary" shape="circle" size="small" icon="download"/>
                    </div>
                    <div>
                        <Button type="primary" loading size="large"><span>loading</span></Button>
                        <Button type="primary" loading><span>loading</span></Button>
                        <Button type="primary" loading size="small"><span>loading</span></Button>
                    </div>
                    <Button type="link">Link</Button>
                    
                    <Button type="dashed" shape="circle" icon="search" />
                    <Button type="dashed" icon="search">Search</Button>
                    <Button type="dashed" shape="circle" icon="search" ghost />
                    
                    <Button type="primary" shape="circle" loading />
                    <div>
                        <ButtonGroup>
                          <Button>Cancel</Button>
                          <Button>OK</Button>
                        </ButtonGroup>
                        <ButtonGroup>
                          <Button disabled>L</Button>
                          <Button disabled>M</Button>
                          <Button disabled>R</Button>
                        </ButtonGroup>
                        <ButtonGroup>
                          <Button>L</Button>
                          <Button>M</Button>
                          <Button>R</Button>
                        </ButtonGroup>

                        <h4>With Icon</h4>
                        <ButtonGroup>
                          <Button type="primary">
                            <Icon type="left" />
                            <span>Go back</span>
                          </Button>
                          <Button type="primary">
                            <span>Go forward</span>
                            <Icon type="right" />
                          </Button>
                        </ButtonGroup>
                        <ButtonGroup>
                          <Button type="primary" icon="cloud" />
                          <Button type="primary" icon="cloud-download" />
                        </ButtonGroup>
                        <ButtonGroup>
                          <Button type="primary" size="small" icon="cloud" />
                          <Button type="primary" size="small" icon="cloud-download" />
                        </ButtonGroup>
                        <ButtonGroup>
                          <Button type="primary" size="large" icon="cloud" />
                          <Button type="primary" size="large" icon="cloud-download" />
                        </ButtonGroup>
                      </div>
                </div>
            )
        }
    }
}

export default mixinDemo