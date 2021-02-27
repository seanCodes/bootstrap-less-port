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
