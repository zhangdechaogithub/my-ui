import { getPrefixCls, filterEmpty, getEvents, getPropsData, cloneElement } from '../_util/'
import { stepListProps } from './props'

const StepList = {
    name: 'StepList',
    props: stepListProps,
    data() {
        return {
            lastStepOffsetWidth: 0
        }
    },
    mounted() {
        this.$nextTick(() => {
            this.calcStepOffsetWidth()
        })
    },
    updated() {
        this.$nextTick(() => {
            this.calcStepOffsetWidth()
        })
    },
    beforeDestroy() {
        if (this.calcTimeout) {
            clearTimeout(this.calcTimeout)
        }
    },
    methods: {
        calcStepOffsetWidth() {
            const domNode = this.$refs.steps
            if (domNode.children.length > 0) {
                if (this.calcTimeout) {
                    clearTimeout(this.calcTimeout)
                }
                this.calcTimeout = setTimeout(() => {
                    const lastStepOffsetWidth = (domNode.lastChild.offsetWidth || 0) + 1
                    if (
                        this.lastStepOffsetWidth === lastStepOffsetWidth ||
                        Math.abs(this.lastStepOffsetWidth - lastStepOffsetWidth) <= 3
                    ) {
                        return
                    }
                    this.lastStepOffsetWidth = lastStepOffsetWidth
                })
            }

        }
    },
    render() {
        const {
            prefixCls = getPrefixCls('steps'),
                direction,
                labelPlacement,
                status,
                size,
                current,
                $scopedSlots,
                initial,
                icons,
                lastStepOffsetWidth
        } = this

        let progressDot = this.progressDot
        if (!progressDot) {
           progressDot = $scopedSlots.progressDot
        }
        const filteredChildren = filterEmpty(this.$slots.default)
        const lastIndex = filteredChildren.length - 1
        const adjustedlabelPlacement = progressDot ? 'vertical' : labelPlacement

        const clsStr = {
            [prefixCls]: true,
            [`${prefixCls}-${direction}`]: true,
            [`${prefixCls}-${size}`]: size,
            [`${prefixCls}-label-${adjustedlabelPlacement}`]: direction === 'horizontal',
            [`${prefixCls}-dot`]: !!progressDot,
        }
        
        const listProps = {
            class: clsStr,
            ref: 'steps',
            on: this.$listeners
        }

        return (
            <div {...listProps}>
    			{filteredChildren.map((child, index) => {
    				const childProps = getPropsData(child)
    				const stepNumber = initial + index
    				const stepProps = Object.assign({
    					props:{
    						stepNumber: `${stepNumber + 1}`,
				            progressDot: this.progressDot,
				            icons,
    					},
    					on: getEvents(child),
    					scopedSlots: $scopedSlots
    				}, childProps)
    				if (status === 'error' && index === current - 1) {
			            stepProps.class = `${prefixCls}-next-error`
			        }
			        if (!childProps.status) {
			            if (stepNumber === current) {
			              stepProps.props.status = status
			            } else if (stepNumber < current) {
			              stepProps.props.status = 'finish'
			            } else {
			              stepProps.props.status = 'wait'
			            }
			        }
    				return cloneElement(child, stepProps)
    			})}
    		</div>
        )
    }
}

export default StepList