<template>
    <div class="home" id="el">
        <div class="">
            <!--/////=========================================================test-component-->
            <Test class="test-outer-wrap ok go" name="world">
                
            </Test>
            <!--////====================================================-->
        </div>
    </div>
</template>
<script>



import { Test } from '../../../package-vue-ui/dist/index.js'

export default {
    name: 'home',
    components: {
        Test
    }
}
</script>
<style lang="scss">
@import '../../public/index.css';
.home {
    padding: 3%;
}
</style>