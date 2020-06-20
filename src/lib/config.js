export default (function() {
  return {
    dev: 'http://localhost:3333',
    remoteDev: 'http://192.168.1.4:3333',
    staging: 'https://mycoolsite.staging.com',
    prod: 'https://mycoolsite.com',
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
