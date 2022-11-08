import http from 'k6/http'
import { sleep,check } from 'k6'

import uuid from './libs/uuid.js'

export const options = {
  stages: [
    {duration: '30s', target: 1},
    {duration: '30s', target: 1},
    {duration: '1s', target: 0},
  ],
  thresholds: {
    http_req_duration: ['p(95)<2000'], //95% das requisições tem que responder em até 2s
    http_req_failed: ['rate<0.01'] // 1% das requisições podem ocorrer erro
  }
}

export default function () {

  const url = 'https://pokeapi.co/api/v2/pokemon/ditto'

  const headers = {
    'headers': {
      'Content-type': 'application/json'
    }
  }

  const res = http.get(url, headers)

  console.log(res.body)

  check(res, {
    'status should be 200': (r) => r.status === 200
  })

  sleep(1)
}
