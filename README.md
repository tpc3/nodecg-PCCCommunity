# TPC3 stream graphics

[![docker](https://github.com/tpc3/nodecg-PCCCommunity/actions/workflows/docker.yml/badge.svg)](https://github.com/tpc3/nodecg-PCCCommunity/actions/workflows/docker.yml)

Praphics of PCCCommunity streams.

![queue](examples/queue.png)

**WARNING**: Always under heavy development, use caution when you want to use this in production env.

## Credits

* Background pictures are provided by [unsplash](https://unsplash.com/).
* Animations are done with [anime.js](https://animejs.com/)
* Fonts and Icons(Material Icons) are loaded from [Google Fonts](https://fonts.google.com/).
* Styled via [tailwindcss](https://tailwindcss.com/).
* Some resources are made by TPC3 members.
* And of course, [nodecg](https://www.nodecg.dev/) is used for our graphics.

## Tips

* You can import BGM status from almost any players using your own script and our API.
  * Tested with MPD and Mopidy.
* Use json files to change queue scene notifications and each info of event frames.
  * check `examples/` for more details.
* This graphics uses some videos and canvas, so be careful to computing resources!
  * When you develop or capture(not using browser source of OBS...etc) be sure to use Chromium-based browsers.
* This is not intended for example of making nodecg graphics.
  * ~~Trust me - Source codes are worst over any graphics by others.~~

## How to run

```bash
docker run -p 9090:9090 ghcr.io/tpc3/nodecg-pcccommunity
```

Attach volume to save files.  
General advice - apply auth before opening to public!
