#!/usr/bin/env node

/**!
 * Script for copying a CSS file from a downloaded Bootstrap source directory to the compiled-CSS-
 * reference directory.
 *
 * Copyright 2019–2020 Sean Juarez
 *
 * Licensed under MIT (https://github.com/seanCodes/bootstrap-less-port/blob/master/LICENSE)
 */

import fetchBootstrapRepoTagData from './utils/fetch-bs-repo-tag-data.js'
import { fileURLToPath } from 'url'
import oops from './utils/oops.js'
import { canReadWrite, pathExists } from './utils/path-utils.js'
import { copyFileSync, mkdirSync } from 'fs'

const BOOTSTRAP_SOURCE_DIR            = './test/bootstrap-source/'
const SASS_COMPILED_CSS_REFERENCE_DIR = './test/sass-compiled-css-reference/'
const SASS_COMPILED_CSS_SOURCE_DIR    = '/dist/css/bootstrap.css'

export default async function copyBootstrapCSS([targetVersion]) {
	({ name: targetVersion } = await fetchBootstrapRepoTagData(targetVersion))

	if (! pathExists(BOOTSTRAP_SOURCE_DIR)) {
		oops(`Path "${BOOTSTRAP_SOURCE_DIR}" does not exist. Have you downloaded the Bootstrap source files yet?`, { exit: true })

		return
	}

	if (! canReadWrite(BOOTSTRAP_SOURCE_DIR))
		throw new Error(`Can’t read or write to folder "${BOOTSTRAP_SOURCE_DIR}"`)

	if (! pathExists(SASS_COMPILED_CSS_REFERENCE_DIR))
		mkdirSync(SASS_COMPILED_CSS_REFERENCE_DIR)

	if (! canReadWrite(SASS_COMPILED_CSS_REFERENCE_DIR))
		throw new Error(`Can’t read or write to folder "${SASS_COMPILED_CSS_REFERENCE_DIR}"`)

	const sassCompiledCSSFilepath = `${BOOTSTRAP_SOURCE_DIR}${targetVersion}${SASS_COMPILED_CSS_SOURCE_DIR}`

	if (! pathExists(sassCompiledCSSFilepath)) {
		oops(`CSS file "${sassCompiledCSSFilepath}" does not exist. Have you downloaded the Bootstrap source files yet?`, { exit: true })

		return
	}

	copyFileSync(sassCompiledCSSFilepath, `${SASS_COMPILED_CSS_REFERENCE_DIR}/bootstrap-${targetVersion}.css`)
}

// If running this file directly from the command-line then call `fetchBootstrapRepoTags()` with the
// provided arguments.
if (process.argv[1] === fileURLToPath(import.meta.url)) {
	copyBootstrapCSS(process.argv.slice(2)).catch(err => oops(err, { exit: true }))
}
