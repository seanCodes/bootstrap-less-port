#!/usr/bin/env node

/**!
 * Script for downloading either the latest version or a specific version of the Boostrap source
 * code from Github, for use with testing.
 *
 * Copyright 2019–2020 Sean Juarez
 *
 * Licensed under MIT (https://github.com/seanCodes/bootstrap-less-port/blob/master/LICENSE)
 */

import downloadFile from './utils/download-file.js'
import fetchBootstrapRepoTagData from './utils/fetch-bs-repo-tag-data.js'
import unzipFile from './utils/unzip-file.js'
import { canReadWrite, pathExists } from './utils/path-utils.js'
import { mkdirSync, unlinkSync } from 'fs'

const BOOTSTRAP_SOURCE_DIR = './test/bootstrap-source/'

function prefixError(err, messagePrefix) {
	err.message = `${messagePrefix}:\n${err.message}`

	return err
}

async function main([targetVersion]) {
	const { zipball_url: tagZipURL, name: version } = await fetchBootstrapRepoTagData(targetVersion)

	if (! pathExists(BOOTSTRAP_SOURCE_DIR))
		mkdirSync(BOOTSTRAP_SOURCE_DIR)
	else if (pathExists(`${BOOTSTRAP_SOURCE_DIR}${version}`)) {
		console.log(`\nSource files for ${version} already downloaded`)

		return
	}

	if (! canReadWrite(BOOTSTRAP_SOURCE_DIR))
		throw new Error(`Can’t read or write to folder "${BOOTSTRAP_SOURCE_DIR}"`)

	let zippedFilePath = ''

	try {
		zippedFilePath = await downloadFile(tagZipURL, BOOTSTRAP_SOURCE_DIR, version)
	} catch (err) {
		throw prefixError(err, `Error downloading zip file for version "${version}"`)
	}

	try {
		await unzipFile(zippedFilePath)
	} catch (err) {
		throw prefixError(err, `Error unzipping downloaded zip file ${zippedFilePath}`)
	}

	try {
		unlinkSync(zippedFilePath)
	} catch (err) {
		throw prefixError(err, `Error deleting downloaded zip file ${BOOTSTRAP_SOURCE_DIR}${version}`)
	}
}

main(process.argv.slice(2))
