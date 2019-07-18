import StreamZip from 'node-stream-zip'
import { mkdirSync } from 'fs'
import { basename, dirname, relative } from 'path'

export default function unzipFile(zippedFilePathName, outputFilePath) {
	return new Promise((resolve, reject) => {
		console.log(`\nUnzipping file ${relative(process.cwd(), zippedFilePathName)}...`)

		const unzip = new StreamZip({
			file                    : zippedFilePathName,
			storeEntries            : true,
			skipEntryNameValidation : true,
		})

		const outputPath = dirname(zippedFilePathName)

		// Unzip the folder next to the zipped file (in the same directory).
		unzip.on('ready', () => {
			const entries = unzip.entries()
			const [topLevelEntryName] = Object.keys(entries)

			if (! outputFilePath)
				outputFilePath = `${outputPath}/${basename(zippedFilePathName, '.zip')}`

			mkdirSync(outputFilePath)

			unzip.extract(topLevelEntryName, outputFilePath, (err) => {
				unzip.close()

				if (err)
					return reject(err)

				const relativeOutputFilePath = relative(process.cwd(), outputFilePath)

				console.log(`Unzipped to ${relativeOutputFilePath}/`)

				resolve(relativeOutputFilePath)
			})
		})

		unzip.on('error', err => {
			unzip.close()

			return reject(err)
		})
	})
}
