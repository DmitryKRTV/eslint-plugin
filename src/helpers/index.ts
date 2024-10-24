export function isPathRelative(path: string) {
    return path === '.' || path.startsWith('./') || path.startsWith('../')
  }