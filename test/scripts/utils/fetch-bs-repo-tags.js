import { fileURLToPath } from 'url'
import { get } from 'https'
import oops from './oops.js'

function prefixError(err, messagePrefix) {
	err.message = `${messagePrefix}:\n${err.message}`

	return err
}

export default function fetchBootstrapRepoTags() {
	return new Promise((resolve, reject) => {
		get({
			hostname : 'api.github.com',
			path     : '/repos/twbs/bootstrap/tags',
			headers  : { 'User-Agent': 'seanCodes/bootstrap-less-port' },
		}, resp => {
			let data = ''

			resp.on('data', chunk => (data += chunk))
			resp.on('end', () => {
				const requestNotOk = resp.statusCode < 200 || resp.statusCode > 299

				if (requestNotOk)
					return reject(new Error(`Failed to fetch BS repo tags:\nRequest returned ${resp.statusCode} status with data: ${data}`))

				let resultJSON = {}

				try {
					resultJSON = JSON.parse(data)
				} catch (err) {
					return reject(err)
				}

				resolve(resultJSON)
			})
		}).on('error', err => reject(prefixError(err, `Failed to fetch BS repo tags:\n${err.message}`)))
	})
}

// If running this file directly from the command-line then call `fetchBootstrapRepoTags()` with the
// provided arguments.
if (process.argv[1] === fileURLToPath(import.meta.url)) {
	fetchBootstrapRepoTags(...process.argv.slice(2))
		.then(tagsJSON => tagsJSON.map(item => item.name).reverse().forEach(version => console.log(version)))
		.catch(err => oops(err, { exit: true }))
}
