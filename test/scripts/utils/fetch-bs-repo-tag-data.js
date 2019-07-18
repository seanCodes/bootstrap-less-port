import fetchBootstrapRepoTags from './fetch-bs-repo-tags.js'

export default async function fetchBootstrapRepoTagData(targetVersion) {
	let tags = []

	try {
		tags = await fetchBootstrapRepoTags()
	} catch (err) {
		return Promise.reject(err)
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
		return Promise.reject(new Error(`No tag exists for version "${targetVersion}".\nAvailable versions:\n  ${versionNames.join('\n  ')}`))

	const versionData = tags.find(({ name }) => name === targetVersion)

	return Promise.resolve(versionData)
}
