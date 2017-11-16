//
// Less Functions
//

functions.add('color-yiq', function ({ rgb: [r, g, b] }) {
	const yiq = ((r * 299) + (g * 587) + (b * 114)) / 1000
	let color = {}

	if (yiq >= 150) {
		color = new tree.Color('111')
		color.value = '#111' // manually set the value (in order to match the Sass output)
	} else {
		color = new tree.Color('fff')
		color.value = '#fff' // manually set the value (in order to match the Sass output)
	}

	return color
})
