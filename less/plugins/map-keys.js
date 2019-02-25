functions.add('map-keys', function ({ ruleset: { rules } } = { ruleset: { rules: [] } }) {
	const keys = []

	rules.forEach(rule => {
		// Not exactly sure how to handle other types (or if they should be handled at all).
		if (! (rule instanceof tree.Declaration))
			return

		const { name: key } = rule.eval(this.context)

		keys.push(new tree.Anonymous(key))
	})

	return new tree.Value(keys)
})
