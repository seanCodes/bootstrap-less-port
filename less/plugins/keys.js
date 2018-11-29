functions.add('keys', function ({ ruleset: { rules } }) {
	const keys = []

	rules.forEach(({ name: key }) => {
		if (typeof key !== 'string' && key.length === 1 && (key[0] instanceof tree.Keyword)) // Logic borrowed from https://github.com/less/less.js/blob/master/lib/less/tree/declaration.js#L46-L49
			key = key[0].value // This may be a touch brittle

		keys.push(new tree.Anonymous(key))
	})

	return new tree.Value(keys)
})
