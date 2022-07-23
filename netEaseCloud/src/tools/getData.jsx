let url = 'http://localhost:4000'
// let url = 'http://1.12.230.59:3000'
async function getData(api) {
    let res = await fetch(`${url}${api}`)
    let data = await res.json()
    return data
}
export default getData