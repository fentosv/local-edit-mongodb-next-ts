import { CategoryModified } from '@types'

export const byLength = (ascending: boolean) => {
    return function (a: CategoryModified, b: CategoryModified) {

        const aPathArray = a.pathArray
        const bPathArray = b.pathArray

        if (aPathArray === null) {
            // nulls sort first
            if (ascending) return -1
            else return 1
        }
        if (bPathArray === null) {
            if (ascending) return 1
            else return -1
        }

        // equal items sort equally 
        if (aPathArray.length === bPathArray.length) {
            return 0
        }

        // otherwise, if we're ascending, lowest sorts first
        if (ascending) {
            return aPathArray.length < bPathArray.length ? -1 : 1
        }
        // if descending, highest sorts first
        return aPathArray.length < bPathArray.length ? 1 : -1
    }
}
