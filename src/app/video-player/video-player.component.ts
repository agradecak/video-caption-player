import { Component, ElementRef, ViewChild, ViewChildren, QueryList } from '@angular/core';
import { SrtParserService } from '../services/srt-parser.service';
import { CaptionTimePipe } from '../pipes/caption-time.pipe';
import { Caption } from '../interfaces/caption';

@Component({
  selector: 'app-video-player',
  imports: [CaptionTimePipe],
  templateUrl: './video-player.component.html',
  styleUrl: './video-player.component.scss'
})
export class VideoPlayerComponent {
  @ViewChild('videoElement', { static: true }) videoElement!: ElementRef<HTMLVideoElement>;
  @ViewChildren('transcriptItem') transcriptItems!: QueryList<ElementRef>;

  captions: Caption[] = [];
  currentCaption: Caption | null = null;

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

    if (activeCaption && activeCaption.id != this.currentCaption?.id) {
      this.currentCaption = activeCaption;
      this.scrollToActiveCaption();
    } else if (!activeCaption) {
       this.currentCaption = null;
    }
  }

  scrollToActiveCaption() {
    if (!this.currentCaption) return;

    const captionIndex = this.captions.findIndex(caption => caption.id === this.currentCaption!.id);
    
    if (captionIndex !== -1) {
      const transcriptItemsArray = this.transcriptItems.toArray();
      const activeElement = transcriptItemsArray[captionIndex];
      
      if (activeElement) {
        activeElement.nativeElement.scrollIntoView({
          behavior: 'smooth',
          block: 'start',
          inline: 'nearest'
        });
      }
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
    return this.currentCaption?.id === captionId;
  }
}