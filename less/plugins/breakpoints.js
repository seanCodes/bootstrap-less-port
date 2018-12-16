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

function rulesetToMap({ ruleset: { rules } } = { ruleset: { rules: [] } }) { // @TODO: unify this function between files, maybe even canonize it as a Ruleset/DetachedRuleset method at some point.
	const map = {}

	rules.forEach(({ name: key, value: { value } }) => {
		if (typeof key !== 'string' && key.length === 1 && (key[0] instanceof tree.Keyword)) // Logic adapted from https://github.com/less/less.js/blob/master/lib/less/tree/declaration.js#L46-L49
			key = key[0].value

		map[`${key}`] = value
	})

	return map
}

function getBreakpoints(context, breakpoints) {
	if (! breakpoints) {
		if (Object.keys(gridBreakpoints).length === 0)
			gridBreakpoints = lookupVariable(context, '@grid-breakpoints')

		breakpoints = gridBreakpoints
	}

	return rulesetToMap(breakpoints)
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

	const nextBreakpoint = breakpointsMap[breakpointNames[breakpointIndex + 1]]

	return new tree.Dimension((parseFloat(nextBreakpoint) - 0.02), nextBreakpoint.replace(/[0-9.+-]+/g, ''))
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
