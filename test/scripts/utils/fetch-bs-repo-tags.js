import https from 'https'

export default function fetchBootstrapRepoTags() {
	return new Promise((resolve, reject) => {
		https.get({
			hostname : 'api.github.com',
			path     : '/repos/twbs/bootstrap/tags',
			headers  : { 'User-Agent': 'seanCodes/bootstrap-less-port' },
		}, resp => {
			let data = ''

			resp.on('data', chunk => (data += chunk))
			resp.on('end', () => {
				const requestNotOk = resp.statusCode !== 200

				if (requestNotOk)
					return reject(data)

				let resultJSON = {}

				try {
					resultJSON = JSON.parse(data)
				} catch (err) {
					return reject(err)
				}

				resolve(resultJSON)
			})
		}).on('error', reject)
	})
}
