module.exports = function (nodecg) {
    const router = nodecg.Router();

    router.post("/bgm", (req, res) => {
        const { bgm } = req.body;
        const { author } = req.body;
        if (typeof bgm === "string" && typeof author === "string") {
            res.send('{result: "ok", error: null}');
            if (bgm === "" && author === "") {
                nodecg.Replicant("bgm").value = "";
            } else if (author === "") {
                nodecg.Replicant("bgm").value = bgm;
            } else {
                nodecg.Replicant("bgm").value = bgm + " by " + author;
            }
        } else {
            res.send('{result: "ng", "error": "Invaild type"}');
        }
    });
    router.post("/chat", (req, res) => {
        const { name } = req.body;
        const { avatar } = req.body;
        const { content } = req.body;
        if (typeof name === "string" && typeof avatar === "string" && typeof content === "string") {
            res.send('{result: "ok", error: null}');
            nodecg.Replicant("chat").value = { name, avatar, content };
        } else {
            res.send('{result: "ng", "error": "Invaild type"}');
        }
    });
    router.post("/vc", (req, res) => {
		const { members } = req.body;
        if (typeof members === "object") {
            res.send('{result: "ok", error: null}');
            nodecg.Replicant("vc").value = members;
        } else {
            res.send('{result: "ng", "error": "Invaild type"}');
        }
    });
    router.post("/current", (req, res) => {
        const assets = nodecg.Replicant("assets:streams");
        var success = false;
		const { stream } = req.body;
		const { next } = req.body;
        if (stream != undefined) {
            if (typeof stream !== "string") {
                res.send('{result: "ng", "error": "Invaild type"}');
                return;
            }
            const asset = assets.value.find(element => element.name == stream);
            if (asset == undefined) {
                res.send('{result: "ng", "error": "Asset not found"}');
                return;
            }
            nodecg.Replicant("stream").value = asset.url;
            success = true;
        }
        if (next != undefined) {
            if (typeof next !== "string") {
                res.send('{result: "ng", "error": "Invaild type"}');
                return;
            }
            const asset = assets.value.find(element => element.name == next);
            if (asset == undefined) {
                res.send('{result: "ng", "error": "Asset not found"}');
                return;
            }
            nodecg.Replicant("next").value = asset.url;
            success = true;
        }
        if (success) {
            res.send('{result: "ok", error: null}');
        } else {
            res.send('{result: "ng", error: "Invalid argument"}');
        }
    });

    nodecg.mount("/PCCCommunity-API", router);
};
