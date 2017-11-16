//
// Less Functions
//

// NOTE: Unlike the native JS `indexOf`, this function actually returns `0` if the value is not
// found in the list/map, since Less lists are 1-indexed.
functions.add('index', function ({ value: list }, { value: searchValue }) {
	const index = list.findIndex(({ value: item } = {}) => {
		// Check if the current item is an array, (in case the current list is actually a map).
		if (Array.isArray(item))
			return (item[0].value === searchValue)

		return (item === searchValue)
	})

	return new tree.Dimension(index + 1)
})
