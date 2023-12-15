//////// config

const jellyfinSocket = "wss://jellyfin.tpc3.org/socket";
const apiKey = "YOUR_API_KEY";
const deviceName = /streamer/; // regex use first match

const nodecgAPI = ["https://nodecg.svc.tpc3.org/PCCCommunity-API/bgm", "https://nodecg2.svc.tpc3.org/PCCCommunity-API/bgm"];


//////// main

const jellyfinSocketURL = new URL(jellyfinSocket);
jellyfinSocketURL.searchParams.set("api_key", apiKey);

import WebSocket from 'ws';
 
var ws = new WebSocket(jellyfinSocketURL);

ws.on("open", () => {
    console.log("[Jellyfin Gatherer] WebSocket opened");
    ws.send('{"MessageType":"SessionsStart","Data":"0,2000"}');
});

ws.on("message", (raw_data) => {
    const data = JSON.parse(raw_data);
    if (data["MessageType"] != "Sessions") {
        return;
    }

    let musicTitle;

    for (const session of data["Data"]) {
        if (deviceName.test(session["DeviceName"])) {
            const nowPlaying = session["NowPlayingItem"];
            if (!nowPlaying) {
                break;
            }
            musicTitle = nowPlaying["Name"];
            break;
        }
    }

    if (musicTitle && lastSent != musicTitle) {
        console.log("[Jellyfin Gatherer] new musicTitle: ", musicTitle);
        for (const api of nodecgAPI) {
            fetch(api, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    "bgm": musicTitle,
                    "author": "",
                }),
            }).then(async (resp) => {
                if (!resp.ok) {
                    console.log("[Jellyfin Gatherer] nodecg return no ok: ", resp.status, await resp.text());
                } else {
                    console.log("[Jellyfin Gatherer] nodecg success: ", resp.status);
                }
            }).catch((err) => {
                console.log("[Jellyfin Gatherer] nodecg fail: ", err);
            });
        }
        lastSent = musicTitle;
    }
});

ws.on("close", (reason, desc) => {
    console.log("[Jellyfin Gatherer] WebSocket connect closed: ", reason, desc);
});
ws.on("error", (error) => {
    console.log("[Jellyfin Gatherer] WebSocket error: ", error);
});

let lastSent = "";

// ws.connect(jellyfinSocketURL.toString());
