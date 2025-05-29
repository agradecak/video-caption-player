import { Component, ElementRef, ViewChild } from '@angular/core';

@Component({
  selector: 'app-video-player',
  imports: [],
  templateUrl: './video-player.component.html',
  styleUrl: './video-player.component.scss'
})
export class VideoPlayerComponent {
  @ViewChild('videoElement', { static: true }) videoElement!: ElementRef<HTMLVideoElement>;

  currentVideo: string = 'video_1';
  videoOptions = [
    { value: 'video_1', label: 'Clip 1' },
    { value: 'video_2', label: 'Clip 2' }
  ]

  ngOnInit() {
    this.loadVideo();
  }

  async loadVideo() {
    const video = this.videoElement.nativeElement;
    video.src = `${this.currentVideo}/clip.mp4`;
  }

  switchVideo(videoName: string) {
    this.currentVideo = videoName;
    this.loadVideo();
  }


}
