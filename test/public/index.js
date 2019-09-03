var Icon = {
    name: 'Icon',
    props: {
        type: String
    },
    render: function render() {
        var h = arguments[0];

        var type = ["icon", "iconfont", "icon-" + this.type];
        return h("i", { "class": type });
    }
};

Icon.install = function (Vue) {
    Vue.component(Icon.name, Icon);
};

var Test = {
    name: 'Test',
    mounted: function mounted() {},

    methods: {
        clickHandler: function clickHandler() {
            this.show = !this.show;
        }
    },
    data: function data() {
        return {
            show: true
        };
    },
    render: function render() {
        var h = arguments[0];
        var clickHandler = this.clickHandler,
            show = this.show;

        return h(
            'div',
            { 'class': 'wrap' },
            [h(
                'button',
                {
                    on: {
                        'click': clickHandler
                    }
                },
                [h(Icon, {
                    attrs: { type: 'check-circle-fill' }
                }), 'Toggle']
            ), h(
                'transition',
                {
                    attrs: { name: 'fade' }
                },
                [h(
                    'p',
                    {
                        directives: [{
                            name: 'show',
                            value: show
                        }]
                    },
                    ['hello']
                )]
            )]
        );
    }
};
/*

 */

var ENV = process.env.NODE_ENV;
//==================================================

var components = [Test, Icon];

var install = function install(Vue) {
    components.each(function (component) {
        Vue.use(component);
    });
};
if (typeof window !== 'undefined' && window.Vue) {
    install(window.Vue);
}
var index = {
    install: install
};

export default index;
export { Icon, Test };
