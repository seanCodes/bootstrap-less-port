#!/usr/bin/env node

/**!
 * Script for comparing a Sass-compiled Bootstrap CSS file to a Less-compiled CSS file.
 *
 * Copyright 2019–2020 Sean Juarez
 *
 * Licensed under MIT (https://github.com/seanCodes/bootstrap-less-port/blob/master/LICENSE)
 */

import color from 'ansi-colors'
import { dirname } from 'path'
import { exec } from 'child_process'
import fetchBootstrapRepoTagData from './utils/fetch-bs-repo-tag-data.js'
import { fileURLToPath } from 'url'
import less from 'less'
import oops from './utils/oops.js'
import { promisify } from 'util'
import { canReadWrite, pathExists } from './utils/path-utils.js'
import { mkdirSync, readFileSync, writeFileSync } from 'fs'

const execPromise = promisify(exec)

const LESS_ENTRY_POINT = './less/bootstrap.less'
const LESS_COMPILED_CSS_REFERENCE_DIR = './test/less-compiled-css-reference/'
const SASS_COMPILED_CSS_REFERENCE_DIR = './test/sass-compiled-css-reference/'

function prefixError(err, messagePrefix) {
	err.message = `${messagePrefix}:\n${err.message}`

	return err
}

export default async function compareLessCSStoSassCSS([targetVersion]) {
	try {
		({ name: targetVersion } = await fetchBootstrapRepoTagData(targetVersion))
	} catch (err) {
		throw prefixError(err, `Error fetching Bootstrap tag data for version ${targetVersion}`)
	}

	let lessEntryPointFileContents = ''

	try {
		lessEntryPointFileContents = readFileSync(LESS_ENTRY_POINT, 'utf8')
	} catch (err) {
		throw prefixError(err, `Error reading file "${LESS_ENTRY_POINT}"`)
	}

	less.logger.addListener({
		debug(message) { console.log(`${color.cyan('[DEBUG]')} ${message}`) },
		info(message)  { console.log(`${color.blue('[INFO]')} ${message}`) },
		warn(message)  { console.log(`${color.yellow('[WARN]')} ${message}`) },
		error(message) { console.error(`${color.red('[ERROR]')} ${message}`) },
	})

	let lessCompiledCSS = ''

	console.log('Compile Less...')
	try {
		lessCompiledCSS = (await less.render(lessEntryPointFileContents, { math: 'parens', paths: [dirname(LESS_ENTRY_POINT)] })).css
	} catch (err) {
		throw prefixError(err, `Error compiling "${LESS_ENTRY_POINT}"`)
	}
	console.log('Done.')

	// Format the Less-compiled CSS file slightly by sorting each group of selectors (making
	// comparison with the Sass-compiled CSS version easier).
	lessCompiledCSS = lessCompiledCSS.replace(
		/(^ *\S.*,\n)*^ *\S.*(?= {)/gm,
		match => match.split(',\n').sort().join(',\n')
	)
	// Remove the credit to the Bootstrap Less port.
	lessCompiledCSS = lessCompiledCSS.replace(/^ \*\n \* Compiled[\S\s]*\n(?= \*\/)/gm, '')
	// Remove the special placeholder selectors.
	lessCompiledCSS = lessCompiledCSS.replace(/,\n[^\n]*?\\%[^{]*{/gm, ' {')

	if (! pathExists(LESS_COMPILED_CSS_REFERENCE_DIR))
		mkdirSync(LESS_COMPILED_CSS_REFERENCE_DIR)

	if (! canReadWrite(LESS_COMPILED_CSS_REFERENCE_DIR))
		throw new Error(`Can’t read or write to folder "${LESS_COMPILED_CSS_REFERENCE_DIR}"`)

	const lessCompiledCSSFilepath = `${LESS_COMPILED_CSS_REFERENCE_DIR}bootstrap-${targetVersion}.css`

	// Write the Less-compiled CSS file to disk. This isn’t necessary for the comparison but is
	// useful for reference.
	try {
		writeFileSync(lessCompiledCSSFilepath, lessCompiledCSS)
	} catch (err) {
		throw prefixError(err, `Error writing Less-compiled CSS file`)
	}

	const sassCompiledCSSFilepath = `${SASS_COMPILED_CSS_REFERENCE_DIR}bootstrap-${targetVersion}.css`

	if (! pathExists(sassCompiledCSSFilepath))
		throw new Error(`Path "${sassCompiledCSSFilepath}" does not exist. Have you copied the Bootstrap CSS file to the reference directory yet?`)

	// Compare!

	let diff = ''

	try {
		const { stdout, stderr } = await execPromise(`git -c color.ui=always diff --no-index --patience ${sassCompiledCSSFilepath} ${lessCompiledCSSFilepath}; exit 0`, { encoding: 'utf8' })

		if (stderr)
			throw new Error(`\`git diff\` output an error:\n${stderr}`)

		diff = stdout
	} catch (err) {
		throw prefixError(err, 'Error running git diff')
	}

	try {
		writeFileSync('./test/scripts/result.diff', color.unstyle(diff))
	} catch (err) {
		throw prefixError(err, 'Error writing comparison diff file')
	}

	if (diff) {
		console.error(diff) // write to stderr

		const differenceCount = color.unstyle(diff).match(/(^-(?!--).*\n)+(^\+.*\n)+|(^\+.*\n)+(^-(?!--).*\n)|(^\+(?!\+\+).*\n)+|(^-(?!--).*\n)+/gm).length

		oops(`${differenceCount} differences found.`, { exit: true })

		return
	}

	console.log(color.green('\n\nNo differences.'))
}

// If running this file directly from the command-line then call `fetchBootstrapRepoTags()` with the
// provided arguments.
if (process.argv[1] === fileURLToPath(import.meta.url)) {
	compareLessCSStoSassCSS(process.argv.slice(2)).catch(err => oops(err, { exit: true }))
}
