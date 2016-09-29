export const rawProcessor = (url) => {
  return {
    src: url,
    name: url.substring(url.lastIndexOf('/') + 1)
  }
}
