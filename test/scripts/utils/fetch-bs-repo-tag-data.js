import fetchBootstrapRepoTags from './fetch-bs-repo-tags.js'

function prefixError(err, messagePrefix) {
	err.message = `${messagePrefix}:\n${err.message}`

	return err
}

export default async function fetchBootstrapRepoTagData(targetVersion) {
	let tags = []

	try {
		tags = await fetchBootstrapRepoTags()
	} catch (err) {
		throw prefixError(err, 'Error fetching Bootstrap tags')
	}

	const versionNames = tags.map(({ name }) => name)

	// If no version was provided then use the latest version.
	if (! targetVersion)
		targetVersion = versionNames[0]

	// Ensure version is prefixed with a “v”.
	if (! targetVersion.startsWith('v'))
		targetVersion = `v${targetVersion}`

	// Ensure version exists.
	if (! versionNames.includes(targetVersion))
		throw new Error(`No tag exists for version "${targetVersion}".\nAvailable versions:\n  ${versionNames.join('\n  ')}`)

	const versionData = tags.find(({ name }) => name === targetVersion)

	return Promise.resolve(versionData)
}
