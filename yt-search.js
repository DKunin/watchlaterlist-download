'use strict';

var search = require('youtube-search');

var opts = {
    maxResults: 10,
    order: 'date',
    safeSearch: 'none',
    key: process.env.YOUTUBE_KEY
};

search('Chilling Tales for dark nights', opts, (err, results) => {
    if (err) {
        return console.log(err);
    }
    const moderatedList = results
        .filter(singleVideo => singleVideo.kind === 'youtube#video');

    console.dir(moderatedList);
});
