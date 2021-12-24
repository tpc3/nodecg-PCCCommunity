module.exports = function (nodecg) {
	const router = nodecg.Router();

	router.post('/bgm', (req, res) => {
		const {bgm} = req.body;
		const {author} = req.body;
		if (typeof bgm === 'string' && typeof author === 'string') {
			res.send('{result: "ok", error: null}');
			if (bgm === '' && author === '') {
				nodecg.Replicant('bgm').value = '';
			} else if (author === '') {
				nodecg.Replicant('bgm').value = bgm;
			} else {
				nodecg.Replicant('bgm').value = bgm + ' by ' + author;
			}
		} else {
			res.send('{result: "ng", "error": "Invaild type"}');
		}
	});

	nodecg.mount('/PCCCommunity-API', router);
};
