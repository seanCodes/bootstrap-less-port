import { accessSync, constants } from 'fs'

export function canReadWrite(path) {
	try {
		return accessSync(path, constants.R_OK | constants.W_OK) || true
	} catch (err) {
		return false
	}
}

export function pathExists(path) {
	try {
		return accessSync(path, constants.F_OK) || true
	} catch (err) {
		return false
	}
}
