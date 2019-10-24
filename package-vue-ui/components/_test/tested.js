import Affix from '../affix/'
import Anchor from '../anchor/'
import { Col, Row } from '../grid/'
import Button from '../button/'
import Modal from '../modal/'
//import Demo from './demo/'
import Breadcrumb from '../breadcrumb/'
import Steps from '../steps/'
const StepItem = Steps.Item
const BreadcrumbItem = Breadcrumb.Item
const Confirm = Modal.Confirm
const Link = Anchor.Link
const ButtonGroup = Button.Group
import Pagination from '../pagination/'
export default {
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
                        <Link href="#1st" title="1st first"></Link>
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
    getButton() {
        const clickHandler = () => alert('hello world')
        return (
            <div class="button-wrap">
                    <div>
                        <Button size="large">default</Button>
                        <Button>default</Button>
                        <Button size="small">default</Button>
                    </div>
                    <div>
                        <Button type="primary" size="large">primary</Button>
                        <Button type="primary" onClick={clickHandler}>primary</Button>
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
    },
    getModal(flag) {
        const modal = (
            <Modal 
                    visible={flag}
                    title="default"
                    closable={true}
                    afterClose={() => this.flag = false}
                    width={500}
                    okText="ok"
                    cancelText="cancel"
                    maskClosable={false}
                    okType="dashed"
                    okCall={(hide) => {console.log('onOk')}}
                    confirmLoading
                >
                    <p>hello world-1</p>
                </Modal>
        )
        const confirm = <Confirm 
                    type="warning"
                    visible={flag} 
                    afterClose={() => {this.flag = false}}
                    title="this is hello world"
                    okCall={(hide) => {hide();console.log('okCall')}}
                    >
                        hello world
                    </Confirm>
        return (
            <div class="modal-test">
                    <Button type="primary" onClick={this.modalToggle}>modal Show</Button>
                    {modal}
                </div>
        )
    },
    modalToggle() {
        this.flag = true
    },
    getBreadcrumb() {
        const routes = [{
                path: '/one/:id',
                breadcrumbName: 'one'
            },
            {
                path: '/two/:id',
                breadcrumbName: 'two:id'
            }
        ]
        const bread1 = <Breadcrumb routes={routes} params={{id: 2}}></Breadcrumb>
        const bread2 = <Breadcrumb>
                                <BreadcrumbItem href="#/hello">Application</BreadcrumbItem>     
                           </Breadcrumb>
        return (
            bread1
        )
    },
    getStep() {
        /*
        <Steps current={1}>
                <StepItem title="Finished" description="This is a description." />
                <StepItem title="In Progress" subTitle="Left 00:00:08" description="This is a description." />
                <StepItem title="Waiting" description="This is a description." />
            </Steps>
        <Steps current={1}>
               <StepItem status="finish" title="Login" icon={<Icon type="user" />} />
               <StepItem status="finish" title="Verification" icon={<Icon type="solution" />} />
               <StepItem status="process" title="Pay" icon={<Icon type="solution" />} />
               <StepItem status="wait" title="Done" icon={<Icon type="user" />} />
            </Steps>
            <Steps size="small" current={1} status="error">
                <StepItem title="Finished" description="This is a description." />
                <StepItem title="In Progress" description="This is a description." />
                <StepItem title="Waiting" description="This is a description." />
            </Steps>
            <Steps progressDot current={1} direction="vertical" >
              <StepItem title="Finished" description="You can hover on the dot." />
                <StepItem title="In Progress" description="You can hover on the dot." />
                <StepItem title="Waiting" description="You can hover on the dot." />
                <StepItem title="Waiting" description="You can hover on the dot." />
            </Steps>
         */
        return (
            <Steps current={1}>
                   <StepItem status="finish" title="Login" icon={<Icon type="user" />} />
                   <StepItem status="finish" title="Verification" icon={<Icon type="solution" />} />
                   <StepItem status="process" title="Pay" icon={<Icon type="solution" />} />
                   <StepItem status="wait" title="Done" icon={<Icon type="user" />} />
                </Steps>

        )
    },
    getPagination(){
           return <Pagination 
                    total={500} 
                    current={12} 
                    showQuickJumper 
                    pageSizeOptions={[10, 20, 30, 40]}
                    showTotal
                    showSizeChanger
                    changeFunc={(page, size, total) => {
                        console.log({page,size, total})
                    }}
                />
       }
}