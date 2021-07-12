#!/bin/bash

# Get the current bgm from pulseaudio and send it to the NodeCG

function check () {
    local PLAY=$(pacmd list-sink-inputs | grep "media.name" | grep -v "AudioStream")
    if [[  "$PLAY" == *"\n"* ]]; then
        echo "I found multiple (or no) stream, not sending it"
        echo "$PLAY"
    else
        PLAY=$(echo -n "$PLAY" | sed -e 's/media\.name \= //g' -e 's/ , /,/g'| tr -d "\t\n'"'"')
        BGM=$(echo "$PLAY" | cut -f 1 -d ",")
        AUTHOR=$(echo "$PLAY" | cut -f 2 -d ",")
        if [ "$BGM" != "$LASTBGM" ]; then
            echo -e "Nowplaying:\n$BGM by $AUTHOR"
            curl -X POST -H "Content-Type: application/json" -d '{"bgm":"'"$BGM"'", "author":"'"$AUTHOR"'"}' localhost:9090/PCCCommunity-API/bgm
            echo -e "\n"
            LASTBGM="$BGM"
        fi
    fi
}

while true; do
    check
    sleep 5
done
