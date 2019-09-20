<template>
    <div class="home" id="el">
        <div class="">
            <!--/////=========================================================test-component-->
            <Test class="test-outer-wrap ok go" name="world">
                
            </Test>
            <!--////====================================================-->
        </div>
        <!--
        <Anchor wrap-cls="hello">
            <template #links>
                <Link href="#one" title="one" />
                <Link href="#two" title="two" />
                <Link href="#three" title="three" />
                <Link href="#four" title="four" />
            </template>
        </Anchor>
        <div class="anchor-list">
            <div id="one">one =====================================</div>
            <div id="two">two =====================================</div>
            <div id="three">three =====================================</div>
            <div id="four">four =====================================</div>
        </div>
    -->
    </div>
</template>
<script>
import { Test } from '../../../package-vue-ui/dist/index.js'
//import Anchor from '../components/Anchor/'
//const Link = Anchor.Link
export default {
    name: 'home',
    components: {
        Test
        //Anchor,
        //Link
    },
    mounted() {
        //console.log({ Link })
    }
}
</script>
<style lang="scss">
@import '../../public/index.css';
.home {
    padding: 3%;
}
.anchor-list{
    div{
        height: 500px;
    }
}
</style>