# Video Caption Player

## Description

A simple video player with captions and transcript, build in Angular.

Includes:

- 📺 video player
- 🖼️ caption overlay
- 📜 transcript

## Features

- 🌐 uses native browser video player
- 🖱️ clickable transcript to seek caption time in video player

## Running

**⚠️ Docker engine has to be installed.**

One-liner to pull and run the app:

``` console
docker run -p 4200:80 agradecak/video-caption-player:latest
```

Alternatively:

``` console
docker pull agradecak/video-caption-player:latest
docker run -p 4200:80 agradecak/video-caption-player:latest
```

Then open the browser at [localhost:4200](http://localhost:4200)