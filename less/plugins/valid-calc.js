//
// Less Functions
//

functions.add('add', function (value1, value2, returnCalc) {
	// If both values are numbers or dimensions and the sum of the two values can already be computed
	// then output the computed result instead of a `calc()`.
	//
	// > Note: We use the `compare()` method here as a shortcut to determine whether both values have
	//   either the same unit, no unit, or at least one has no unit.
	if (value1.compare && value1.compare(value2) !== undefined)
		return value1.operate(this.context, '+', value2)

	const expression = `${value1.toCSS()} + ${value2.toCSS()}`

	if (returnCalc && returnCalc.value === 'false')
		return new tree.Quoted('', expression)

	return new tree.Quoted('', `calc(${expression})`)
})

functions.add('subtract', function (value1, value2, returnCalc) {
	// If both values are numbers or dimensions and the difference of the two values can already be
	// computed then output the computed result instead of a `calc()`.
	//
	// > Note: We use the `compare()` method here as a shortcut to determine whether both values have
	//   either the same unit, no unit, or at least one has no unit.
	if (value1.compare && value1.compare(value2) !== undefined)
		return value1.operate(this.context, '+', value2)

	const expression = `${value1.toCSS()} - ${value2.toCSS()}`

	if (returnCalc && returnCalc.value === 'false')
		return new tree.Quoted('', expression)

	return new tree.Quoted('', `calc(${expression})`)
})
