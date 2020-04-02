//
// Less Functions
//

functions.add('warn', function ({ value: message } = { value: '' }) {
	let filename = this.currentFileInfo.filename

	if (filename)
		// Make filename relative and wrap in square brackets.
		filename = `[${filename.replace(this.currentFileInfo.entryPath, '')}] `

	message = `${filename}WARNING: ${message}`

	less.logger.warn(message) // eslint-disable-line

	return false
})

functions.add('error', function ({ value: message } = { value: '' }) {
	let filename = this.currentFileInfo.filename

	if (filename)
		// Make filename relative and wrap in square brackets.
		filename = `[${filename.replace(this.currentFileInfo.entryPath, '')}] `

	message = `${filename}ERROR: ${message}`

	less.logger.error(message) // eslint-disable-line

	throw new Error(message)
})
