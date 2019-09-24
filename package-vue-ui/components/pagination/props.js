const indexProps = {

}

export {indexProps}

const listProps = {
	current:{
		type: Number,
		default: 1
	},
	total:{
		type: Number,
		default: 0
	},
	pageSize:{
		type: Number,
		default: 10
	},
	showTotal:{
		type: Boolean,
		default: true
	},
	prevIcon: {
		type: null
	},
	nextIcon:{
		type: null
	}
}
export { listProps }

const itemProps = {
	page:{
		type: String
	},
	icon: {
		type: null
	},
	active:{
		type: Boolean
	}
}
export {itemProps}