export default function getObject(name: string) {
  name = name.trim()
  let findedObj = JSON.parse(localStorage.getItem(name))
  return findedObj
}
