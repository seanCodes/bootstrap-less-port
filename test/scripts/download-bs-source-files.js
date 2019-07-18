#!/usr/bin/env node

/**!
 * Script for downloading either the latest version or a specific version of the Boostrap source
 * code from Github, for use with testing.
 *
 * Copyright 2019 Sean Juarez
 *
 * Licensed under MIT (https://github.com/seanCodes/bootstrap-less-port/blob/master/LICENSE)
 */

import downloadFile from './utils/download-file.js'
import fetchBootstrapRepoTagData from './utils/fetch-bs-repo-tag-data.js'
import oops from './utils/oops.js'
import unzipFile from './utils/unzip-file.js'
import { canReadWrite, pathExists } from './utils/path-utils.js'
import { mkdirSync, unlinkSync } from 'fs'

const BOOTSTRAP_SOURCE_DIR = './test/bootstrap-source/'

async function main([targetVersion]) {
	let tagZipURL = ''

	try {
		({ zipball_url: tagZipURL, name: targetVersion } = await fetchBootstrapRepoTagData(targetVersion))
	} catch (err) {
		return oops(err)
	}

	if (! pathExists(BOOTSTRAP_SOURCE_DIR))
		mkdirSync(BOOTSTRAP_SOURCE_DIR)
	else if (pathExists(`${BOOTSTRAP_SOURCE_DIR}${targetVersion}`))
		return console.log(`\nSource files for ${targetVersion} already downloaded`)

	if (! canReadWrite(BOOTSTRAP_SOURCE_DIR))
		return oops(`Can’t read or write to folder "${BOOTSTRAP_SOURCE_DIR}"`)

	let zippedFilePath = ''

	try {
		zippedFilePath = await downloadFile(tagZipURL, BOOTSTRAP_SOURCE_DIR, targetVersion)
	} catch (err) {
		return oops(`Error downloading zip file for version "${targetVersion}":`, err)
	}

	try {
		await unzipFile(zippedFilePath)
	} catch (err) {
		return oops(`Error unzipping file ${zippedFilePath}:`, err)
	}

	try {
		unlinkSync(zippedFilePath)
	} catch (err) {
		return oops(`Error deleting downloaded zip file ${BOOTSTRAP_SOURCE_DIR}${targetVersion}:`, err)
	}
}

main(process.argv.slice(2))
