//
// Less Functions
//

functions.add('warn', function ({ value: message } = { value: '' }) {
	let filename = this.currentFileInfo.filename

	if (filename)
		filename = `[${filename}] `

	message = `${filename}WARNING: ${message}`

	less.logger.warn(message) // eslint-disable-line

	return false
})

functions.add('error', function ({ value: message } = { value: '' }) {
	let filename = this.currentFileInfo.filename

	if (filename)
		filename = `[${filename}] `

	message = `${filename}ERROR: ${message}`

	less.logger.error(message) // eslint-disable-line

	throw new Error(message)
})
