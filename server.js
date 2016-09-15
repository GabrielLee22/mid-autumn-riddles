var express = require('express');
var bodyParser = require('body-parser');
var app = express();
app.use(bodyParser.json());
'Content-Type': 'text/plain;charset=utf-8'

app.listen(3000, function () {
	  console.log('Example app listening on port 3000!');
});

app.listen(process.env.PORT || 8888);

app.use(express.static("public"));

var jokes=[{setup:"“月亮代表我的心” 这首歌是谁的作曲?",punchline:"翁清渓"},{setup:"能说会道",punchline:"团"},{setup:"皮也轻轻，骨也轻轻，心头轻轻，全身通明。（猜一物品）",punchline:"灯笼"},{setup:"艳阳西下，皓月东挂。（猜一字）",punchline:"明"},{setup:"“但愿人长久，千里共婵娟”出自哪位词人之手？ ",punchline:"苏轼 "},{setup:"中秋节除了吃月饼，还会有什么食物？",punchline:"柚子"},{setup:"一面镜子亮晶晶，走遍天下照古今。",punchline:"月亮"},{setup:"月亮的一另半（猜一字）",punchline:"胖"},{setup:"后羿是从谁得到仙丹的?",punchline:"西王母"},{setup:"中秋节又称为?",punchline:"月夕"}];

app.route("/jokes").get(function(req,res,next){
	randomJokeIndex = Math.floor(Math.random()*jokes.length);

	jokes[randomJokeIndex].id = randomJokeIndex;

	res.send(jokes[randomJokeIndex]);
});

app.post('/upvote', function(req, res) {
    var jokeIndex = req.body.id;
    if (typeof jokes[jokeIndex].votes === 'undefined') {
        console.log("Creating vote for this joke");
        jokes[jokeIndex].votes = 0;
    }

    jokes[jokeIndex].votes++;

    res.send(jokes[jokeIndex]);
});

app.post('/downvote', function(req, res) {
    var jokeIndex = req.body.id;
    if (typeof jokes[jokeIndex].votes === 'undefined') {
        console.log("Creating vote for this joke");
        jokes[jokeIndex].votes = 0;
    }

    jokes[jokeIndex].votes--;

    res.send(jokes[jokeIndex]);
});
