#!/bin/bash
MEDIA_DIR=

BGM=$(lsof | grep "$MEDIA_DIR" | sed -e "s/^.*\///g" -e "s/.opus\$//g" | head -n 1)
#-e "s/-.*\$//g"
echo "$BGM"
curl -X POST -H "Content-Type: application/json" -d '{"bgm":"'"$BGM"'", "author":"lsof"}' "localhost:9090/PCCCommunity-API/bgm"
