import StreamZip from 'node-stream-zip'
import { fileURLToPath } from 'url'
import { mkdirSync } from 'fs'
import { pathExists } from './path-utils.js'
import { basename, dirname, relative } from 'path'

export default async function unzipFile(zippedFilePathName, outputFilePath) {
	// [Sanity Checks] Make sure a file path was provided and that it exists.
	if (! zippedFilePathName)
		throw new ReferenceError('No zip file name provided')
	if (! pathExists(zippedFilePathName))
		throw new Error(`The file "${zippedFilePathName}" does not exist (or you do not have access to it)`)

	console.log(`\nUnzipping file ${relative(process.cwd(), zippedFilePathName)}...`)

	const unzip = new StreamZip.async({ // eslint-disable-line new-cap
		file                    : zippedFilePathName,
		storeEntries            : true,
		skipEntryNameValidation : true,
	})

	const outputPath = dirname(zippedFilePathName)

	if (! outputFilePath)
		outputFilePath = `${outputPath}/${basename(zippedFilePathName, '.zip')}`

	const entries = await unzip.entries()
	const [topLevelEntryName] = Object.keys(entries)

	mkdirSync(outputFilePath)

	await unzip.extract(topLevelEntryName, outputFilePath)
	await unzip.close()

	const relativeOutputFilePath = relative(process.cwd(), outputFilePath)

	console.log(`Unzipped to ${relativeOutputFilePath}/`)

	return relativeOutputFilePath
}

// If running this file directly from the command-line then call `unzipFile()` with the provided
// arguments.
if (process.argv[1] === fileURLToPath(import.meta.url)) {
	unzipFile(...process.argv.slice(2))
}
