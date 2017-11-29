//
// Helper Functions
//

function listToMap({ value: list } = { value: [] }) {
	const map = {}

	// Handle maps that only have one key/value pair (since they will look like a plain list of
	// length 2).
	if (list.length === 2 && ! Array.isArray(list[0].value)) {
		const [{ value: key }, value] = list || [{}]

		map[key] = value
	} else
		list.forEach(({ value: item } = {}) => {
			if (Array.isArray(item)) {
				const [{ value: key }, value] = item || [{}]

				map[`${key}`] = value
			}
		})

	return map
}

//
// Less Functions
//

functions.add('map-get', function (list, { value: key } = { value: '' }) {
	const map = listToMap(list)

	if (key && map[key])
		return map[key]

	return new tree.Quoted('"')
})
