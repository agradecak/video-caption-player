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
  @ViewChild('transcriptContainer', { static: true }) transcriptContainer!: ElementRef<HTMLDivElement>;

  captions: Caption[] = [];
  currentCaptionId: number | null = null;

  currentVideo: string = 'video_1';
  videoOptions = [
    { value: 'video_1', label: 'Clip 1' },
    { value: 'video_2', label: 'Clip 2' }
  ]
  constructor(private srtParser: SrtParserService) {}

  ngOnInit() {
    this.loadCaptions();
    this.loadVideo();
    this.setupVideoEventListeners();
  }

  setupVideoEventListeners() {
    const video = this.videoElement.nativeElement;

    video.addEventListener('timeupdate', () => {
      this.updateCurrentCaption();
    });
  }

  updateCurrentCaption() {
    const currentTime = this.videoElement.nativeElement.currentTime;

    const activeCaption = this.captions.find(caption => 
      currentTime >= caption.startTime && currentTime <= caption.endTime
    );

    if (activeCaption && activeCaption.id != this.currentCaptionId) {
      this.currentCaptionId = activeCaption.id;
    } else if (!activeCaption) {
       this.currentCaptionId = null;
    }
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
    this.loadCaptions();
    this.loadVideo();
  }

    seekToTime(time: number) {
    this.videoElement.nativeElement.currentTime = time;
  }

  isActiveCaption(captionId: number): boolean {
    return this.currentCaptionId === captionId;
  }
}
