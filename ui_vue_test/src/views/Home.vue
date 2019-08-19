<template>
    <div class="home" id="el">
        <div class="">
            <!--/////=========================================================test-component-->
            <Test class="test-outer-wrap ok go" hello="world" :class="testClass" style="color:orange;">
                <span name="span-ele">ok</span>
            </Test>
            <!--////====================================================-->
            <!--
            <Affix :target="getWindow">hello</Affix>
            <Alert message="Success Text" type="success" showIcon/>
            <Alert message="Success Text" type="info" showIcon/>
            <Alert message="Success Text" type="warning" showIcon/>
            <Alert message="Success Text" type="error" showIcon/>     
            <Alert message="Warning Text" type="warning" closable showIcon/>
            <Alert message="Error Text" description="Error Description Error Description Error Description Error Description Error Description Error Description" type="error" closable show-icon :afterClose="closeHandler"/>
            

            <Col span="6" class="col">col-6</Col>
            <Col span="6" push="6" class="col">col-6</Col>
            <Col span="6" class="col">col-6</Col>
            <Row :gutter="gutter">
                <Col span="12" class="col">col-12</Col>
                <Col span="12" class="col">col-12</Col>
            </Row>
             
            <Anchor :getContainer="getWindow" :affix="anchorAffix" :offsetTop="anchor.offsetTop" :bounds="anchor.bounds">
                <Link href="#section1" title="section1">
                </Link>
                <Link href="#section2" title="section2">
                </Link>
                <Link href="#section3" title="section3">
                </Link>
                <Link href="#section4" title="section4">
                </Link>
            </Anchor>
            <div id="section1" style="position: relative;height:2000px;">section1</div>
            <div id="section2" style="position: relative;height:2000px;">section2</div>
            <div id="section3" style="position: relative;height:2000px;">section3</div>
            <div id="section4" style="position: relative;height:2000px;">section4</div>

             <Icon type="fas fa-exclamation-circle"/>
            <AutoComplete></AutoComplete>
            -->
            <Button>click btn</Button>
            <Button type="primary" size="small" loading>
                Loading
            </Button>
            <Button shape="circle" loading />
            <Button type="primary" shape="circle" loading />
            <Button type="primary">Primary</Button>
            <Button>Default</Button>
            <Button type="dashed">Dashed</Button>
            <Button type="danger">Danger</Button>
            <Button type="link">Link</Button>
            <Button type="danger" ghost>
                danger
            </Button>
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
                    Go back
                </Button>
                <Button type="primary">
                    Go forward
                    <Icon type="right" />
                </Button>
            </ButtonGroup>
            <ButtonGroup>
                <Button type="primary" icon="cloud" />
                <Button type="primary" icon="cloud-download" />
            </ButtonGroup>
            <Dropdown></Dropdown>
        </div>
    </div>
</template>
<script>
import { Test } from '../../../package-vue-ui/es/index.js'
import { Icon } from '../../../package-vue-ui/es/index.js'
import { Col } from '../../../package-vue-ui/es/index.js'
import { Row } from '../../../package-vue-ui/es/index.js'
import { Affix } from '../../../package-vue-ui/es/index.js'
import { Alert } from '../../../package-vue-ui/es/index.js'
import { Anchor } from '../../../package-vue-ui/es/index.js'
import { AutoComplete } from '../../../package-vue-ui/es/index.js'
import { Button } from '../../../package-vue-ui/es/index.js'
import { Dropdown } from '../../../package-vue-ui/es/index.js'
const Link = Anchor.Link
const ButtonGroup = Button.Group
export default {
    name: 'home',
    components: {
        Test,
        Icon,
        Affix,
        Alert,
        Col,
        Row,
        Anchor,
        Link,
        AutoComplete,
        Button,
        ButtonGroup,
        Dropdown
    },
    mounted() {},
    data() {
        return {
            name: 'hello',
            gutter: { xs: 8, sm: 16, md: 24 },
            testClass: ['one', 'two'],
            getWindow: () => window,
            anchorAffix: true,
            anchor: {
                offsetTop: 30,
                bounds: 5
            },
            closeHandler: () => alert('close')
        }
    },
    methods: {
        clickHandler() {
            console.log('click outter')
        }
    }
}
</script>
<style lang="scss">
.home {
    padding: 5%;
}
</style>