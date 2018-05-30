import axios from 'axios'
import MockAdapter from 'axios-mock-adapter'

MockAdapter.prototype.getData = function(url, dataHandler) {
  let handler = (data, config) => data.data
  if (typeof dataHandler === 'function') {
    handler = dataHandler
  }
  return function(config) {
    console.log(config, 'config')
    return new Promise(function(resolve, reject) {
      axios.get(url).then(data => {
        resolve([200, handler(data, config)])
      })
    })
  }
}
export default function init() {
  const mock = new MockAdapter(axios)

  mock.onAny('/geta').reply(mock.getData('static/a.json', (data, config) => {
    console.log(config)
    let _data = data.data
    _data.x = 3
    return _data
  }))

  mock.onGet('/getb').reply(mock.getData('static/b.json'))

  mock.onAny().passThrough()
}
