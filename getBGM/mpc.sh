#!/bin/sh
curl -X POST -H "Content-Type: application/json" -d '{"bgm":"'"$(mpc -h mpd -f %title% current)"'", "author":""}' "http://localhost:9090/PCCCommunity-API/bgm"