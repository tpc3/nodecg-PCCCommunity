#!/bin/bash
BGM=$(lsof | grep "/run/media/yksrv/0C55AEC82AE45302/" | sed -e "s/^.*\///g" -e "s/.opus\$//g" | head -n 1)
#-e "s/-.*\$//g"
echo "$BGM"
curl -X POST -H "Content-Type: application/json" -d '{"bgm":"'"$BGM"'", "author":"YouTube"}' "192.168.0.159:9090/PCCDiscord-API/bgm"
