#!/usr/bin/env node

/**!
 * Compile the current Less files and compare the resulting CSS with the Sass-compiled CSS to see if
 * they match, then output the result.
 *
 * Copyright 2019–2020 Sean Juarez
 *
 * Licensed under MIT (https://github.com/seanCodes/bootstrap-less-port/blob/master/LICENSE)
 */

import color from 'ansi-colors'
import fetchBootstrapRepoTagData from './scripts/utils/fetch-bs-repo-tag-data.js'
import oops from './scripts/utils/oops.js'
import { pathExists } from './scripts/utils/path-utils.js'
import { execSync, spawnSync } from 'child_process'

const BOOTSTRAP_SOURCE_DIR = './test/bootstrap-source/'

async function main([targetVersion]) {
	try {
		({ name: targetVersion } = await fetchBootstrapRepoTagData(targetVersion))
	} catch (err) {
		oops(err, { exit: false })

		return oops('✘ TESTS FAILED')
	}

	console.log(`\nTesting current Less-compiled CSS against Sass-compiled CSS for version: ${color.bold(targetVersion)}`)

	if (! pathExists(`${BOOTSTRAP_SOURCE_DIR}${targetVersion}`))
		try {
			execSync(`node test/scripts/download-bs-source-files.js ${targetVersion}`)
		} catch (err) {
			oops(err, { exit: false })

			return oops('✘ TESTS FAILED')
		}

	let stdout = ''
	let stderr = ''

	;({ stdout, stderr } = spawnSync('node', `test/scripts/copy-bs-css.js ${targetVersion}`.split(' '), { encoding: 'utf8' })) // , stdio: [process.stdin, process.stdout, process.stderr] })

	if (stderr) {
		console.error(stderr)
		console.error(color.red('\n✘ TESTS FAILED'))

		return
	}

	console.log(stdout)

	;({ stdout, stderr } = spawnSync('node', `test/scripts/format-bs-css.js ${targetVersion}`.split(' '), { encoding: 'utf8' })) // , stdio: [process.stdin, process.stdout, process.stderr] })

	if (stderr) {
		console.error(stderr)
		console.error(color.red('\n✘ TESTS FAILED'))

		return
	}

	console.log(stdout)

	;({ stdout, stderr } = spawnSync('node', `test/scripts/compare-less-css-to-sass-css.js ${targetVersion}`.split(' '), { encoding: 'utf8' })) // , stdio: [process.stdin, process.stdout, process.stderr] })

	if (stderr) {
		console.error(stderr)
		console.error(color.red('\n✘ TESTS FAILED'))

		return
	}

	console.log(stdout)

	console.log('Files match.', color.green('\n\n✔ TESTS PASSED'))
	process.exit(0)
}

main(process.argv.slice(2))
