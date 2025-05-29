import { Component, ElementRef, ViewChild } from '@angular/core';
import { Caption, SrtParserService } from '../srt-parser.service';

@Component({
  selector: 'app-video-player',
  imports: [],
  templateUrl: './video-player.component.html',
  styleUrl: './video-player.component.scss'
})
export class VideoPlayerComponent {
  @ViewChild('videoElement', { static: true }) videoElement!: ElementRef<HTMLVideoElement>;

  captions: Caption[] = [];

  currentVideo: string = 'video_1';
  videoOptions = [
    { value: 'video_1', label: 'Clip 1' },
    { value: 'video_2', label: 'Clip 2' }
  ]
  constructor(private srtParser: SrtParserService) {}

  ngOnInit() {
    this.loadCaptions();
    this.loadVideo();
  }

  async loadCaptions() {
    try {
      const srtResponse = await fetch(`${this.currentVideo}/captions.srt`);
      const srtContent = await srtResponse.text();
      this.captions = this.srtParser.parseSrt(srtContent);
    } catch (error) {
      console.error('Error loading captions:', error);
    }
  }

  async loadVideo() {
    try {
      const video = this.videoElement.nativeElement;
      video.src = `${this.currentVideo}/clip.mp4`;
    } catch (error) {
      console.error('Error loading video:', error);
    }
  }

  switchVideo(videoName: string) {
    this.currentVideo = videoName;
    this.loadVideo();
  }


}
