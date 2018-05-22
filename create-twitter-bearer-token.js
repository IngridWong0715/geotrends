
var consumer_key = 'A87Nzf0zVRiRv8CcNsMUJHhOP';
var consumer_secret = 'xiv57E1eYZ5UBT6BV29d9wpV2lfgsblWEey5mK69QCtZdHzgCd';
var encode_secret = new Buffer(consumer_key + ':' + consumer_secret).toString('base64');

fetch('https://api.twitter.com/oauth2/token', {
  headers: {
      'Authorization': 'Basic ' + encode_secret,
      'Content-Type': 'application/x-www-form-urlencoded;charset=UTF-8'},
  body: 'grant_type=client_credentials',
  method: 'POST'
})
.then( res => {
  debugger;
})
