const LocaleProvider = {
	name: 'LocaleProvider'
}

LocaleProvider.install = (Vue) => {
	Vue.component(LocaleProvider.name, LocaleProvider)
}

export default LocaleProvider