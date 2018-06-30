
function getPramsAsObj(querystring) {
  // console.log(querystring);
  var qs_arr = decodeURI(querystring).slice(1).split('&');
  return qs_arr.map(function(cur){
    return cur.replace(/\+/g, ' ').split('=')
  }).reduce(function (acc, cur){
    acc[cur[0]] = cur[1];
    return acc;
  }, {});
}