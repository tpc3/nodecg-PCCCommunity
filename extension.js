module.exports = function (nodecg) {
    const router = nodecg.Router();

    router.post('/bgm', (req, res) => {
        const bgm = req.body.bgm;
        const author = req.body.author;
        if(typeof bgm === "string" && typeof author === "string") {
            res.send('{result: "ok", error: null}');
            nodecg.Replicant('bgm').value = bgm + " by " + author;
        } else {
            res.send('{result: "ng", "error": "Invaild type"}')
        }
    });

    nodecg.mount('/PCCDiscord-API', router);
};
