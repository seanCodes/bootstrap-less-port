export default function findReplace(str, find, replace, multiPass = false) {
	const findRgx = new RegExp(find, 'g')

	if (multiPass)
		while (findRgx.test(str)) {
			str = str.replace(findRgx, replace)
		}
	else
		str = str.replace(findRgx, replace)

	return str
}
