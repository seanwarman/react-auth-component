export default (function() {
  return {
    dev: 'http://localhost:3333',
    remoteDev: 'http://192.168.1.4:3333',
    staging: 'https://mycoolapi.staging.com',
    prod: 'https://mycoolapi.com',
  }
})()

export function setStage(origin) {
  return origin.includes('localhost') ?
  'dev' 
  :
  origin.includes('192.168') ?
  'remoteDev'
  : 
  origin.includes('staging') ?
  'staging'
  :
  'prod'

}
