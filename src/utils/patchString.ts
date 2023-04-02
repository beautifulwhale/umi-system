
export function patchString(target: Record<string, any>, flag = true) {
    Object.keys(target).forEach(key => {
        if (!target[key]) {
            target[key] = ''
        }
        if (target[key] && !flag) {
            target[key] = ''
        }
    })
    return target
}
