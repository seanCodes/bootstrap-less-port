let yiqThreshold = 0
let yiqTextDark  = ''
let yiqTextLight = ''

//
// Helper Functions
//

function lookupVariable(context, variableName) {
	const { frames, importantScope } = context

	return tree.Variable.prototype.find(frames, frame => {
		const { value, important } = frame.variable(variableName) || {}

		if (value === undefined)
			return

		if (important && importantScope[importantScope.length - 1])
			importantScope[importantScope.length - 1].important = important

		return value.eval(context)
	})
}

//
// Less Functions
//

functions.add('color-yiq', function ({ rgb: [r, g, b] }) {
	const yiq = ((r * 299) + (g * 587) + (b * 114)) / 1000

	if (yiqThreshold === 0)
		yiqThreshold = lookupVariable(this.context, '@yiq-contrasted-threshold').value
	if (yiqTextDark === '')
		yiqTextDark  = lookupVariable(this.context, '@yiq-text-dark')
	if (yiqTextLight === '')
		yiqTextLight = lookupVariable(this.context, '@yiq-text-light')

	return (yiq >= yiqThreshold) ? yiqTextDark : yiqTextLight
})
