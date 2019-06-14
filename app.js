var twitter = require('twitter');
var config = require('./config');

var T = new twitter(config);

var params = {
    q: '#nodejs',
    count: 10,
    result_type: 'recent',
    lang: 'en'
}

T.get('search/tweets', params, function(err, data, response){
    if(err){
        console.log(err);
    }
    for(var i = 0; i < data.statuses.length; i++){
        var id = { id: data.statuses[i].id_str }

        T.post('favorites/create', id, function(err, response){
            if(err){
                console.log(err[0].message);
            }
            else{
                var username = response.user.screen_name;
                var tweetId = response.id_str;
                console.log('Favorited: ', `https://twitter.com/${username}/status/${tweetId}`);
            }
        });
    }
})