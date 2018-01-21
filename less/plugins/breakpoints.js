let gridBreakpoints = {}

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

function listToMap({ value: list } = { value: [] }) {
	const map = {}

	// Handle maps that only have one key/value pair (since they will look like a plain list of
	// length 2).
	if (list.length === 2 && ! Array.isArray(list[0].value)) {
		const [{ value: key }, value] = list || [{}]

		map[key] = value
	} else
		list.forEach(({ value: item } = {}) => {
			if (Array.isArray(item)) {
				const [{ value: key }, value] = item || [{}]

				map[`${key}`] = value
			}
		})

	return map
}

function getBreakpoints(context, breakpoints) {
	if (! breakpoints) {
		if (Object.keys(gridBreakpoints).length === 0)
			gridBreakpoints = lookupVariable(context, '@grid-breakpoints')

		breakpoints = gridBreakpoints
	}

	return listToMap(breakpoints)
}

//
// Less Functions
//

functions.add('breakpoint-next', function ({ value: breakpointName }, breakpoints) {
	const breakpointsMap  = getBreakpoints(this.context, breakpoints)
	const breakpointNames = Object.keys(breakpointsMap)
	const breakpointIndex = breakpointNames.indexOf(breakpointName)

	if (breakpointIndex === -1)
		return new tree.Quoted('"')

	// Next breakpoint is null for the last breakpoint.
	if ((breakpointIndex + 1) === breakpointNames.length)
		return new tree.Quoted('"')

	return new tree.Quoted('"', breakpointNames[breakpointIndex + 1])
})

functions.add('breakpoint-min', function ({ value: breakpointName }, breakpoints) {
	const breakpointsMap  = getBreakpoints(this.context, breakpoints)
	const breakpointNames = Object.keys(breakpointsMap)
	const breakpointIndex = breakpointNames.indexOf(breakpointName)

	if (breakpointIndex === -1)
		return new tree.Quoted('"')

	// Minumum breakpoint width is null for the first breakpoint.
	if (breakpointIndex === 0)
		return new tree.Quoted('"')

	return breakpointsMap[breakpointName]
})

functions.add('breakpoint-max', function ({ value: breakpointName }, breakpoints) {
	const breakpointsMap  = getBreakpoints(this.context, breakpoints)
	const breakpointNames = Object.keys(breakpointsMap)
	const breakpointIndex = breakpointNames.indexOf(breakpointName)

	if (breakpointIndex === -1)
		return new tree.Quoted('"')

	// Maximum breakpoint width is null for the last breakpoint.
	if ((breakpointIndex + 1) === breakpointNames.length)
		return new tree.Quoted('"')

	return new tree.Dimension((breakpointsMap[breakpointNames[breakpointIndex + 1]].value - 0.02), 'px')
})

functions.add('breakpoint-infix', function ({ value: breakpointName }, breakpoints) {
	const breakpointsMap  = getBreakpoints(this.context, breakpoints)
	const breakpointNames = Object.keys(breakpointsMap)
	const breakpointIndex = breakpointNames.indexOf(breakpointName)

	if (breakpointIndex === -1)
		return new tree.Quoted('"')

	// Breakpoint infix is null the first breakpoint.
	if (breakpointIndex === 0)
		return new tree.Quoted('"')

	return new tree.Quoted('"', `-${breakpointName}`)
})
