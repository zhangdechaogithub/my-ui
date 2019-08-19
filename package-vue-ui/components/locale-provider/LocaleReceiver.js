import defaultLocaleData from './default'

export default {
    props: ['componentName', 'defaultLocale', 'children'],
    inject: {
        localeData: { default: () => ({}) }
    },
    methods: {
        getLocale() {
            const { componentName, defaultLocale } = this
            const locale = defaultLocale || defaultLocaleData[componentName || 'global']
            const { localeData } = this.localeData
            const localeFromContext = componentName && localeData ? localeData[componentName] : {}
            return Object.assign(typeof locale === 'function' ? locale() : locale, localeFromContext || {})
        },
        getLocaleCode() {
            const { localeData } = this.localeData
            const localeCode = localeData && localeData.locale
            if (localeData && localeData.exit && !localeCode) {
                return defaultLocaleData.locale
            }
            return localeCode;
        }
    },
    render() {
        const { $scopedSlots } = this
        const children = this.children || $scopedSlots.default
        return children(this.getLocale(), this.getLocaleCode())
    },
}