import color from 'ansi-colors'

export default function oops(message = '', err, { exit = true } = {}) {
	// Handle options object as second argument.
	if (err && 'exit' in err) {
		exit = err
		err = ''
	}

	// Handle error object as first argument.
	if (message instanceof Error) {
		err = message
		message = null
	}

	console.log('\n')

	if (message)
		console.error(color.red(message))

	if (err) {
		err.message = color.red(err.message)
		console.error(err)
	}

	if (exit)
		process.exit(1)
}
