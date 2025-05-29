import { Injectable } from '@angular/core';

export interface Caption {
  id: number;
  startTime: number;
  endTime: number;
  text: string;
}

@Injectable({
  providedIn: 'root'
})
export class SrtParserService {
  
  constructor() { }

  parseSrt(srtContent: string): Caption[] {
    const captions: Caption[] = [];
    
    const normalizedContent = srtContent.replace(/\r\n/g, '\n').replace(/\r/g, '\n');
    
    const blocks = normalizedContent.trim().split('\n\n');
    
    blocks.forEach(block => {
      const lines = block.trim().split('\n');
      
      if (lines.length >= 3) {
        const id = parseInt(lines[0].trim());
        const timeRange = lines[1].trim();
        const text = lines.slice(2).join('\n').trim();
        
        const [startTimeStr, endTimeStr] = timeRange.split(' --> ');
        
        if (startTimeStr && endTimeStr) {
          const startTime = this.timeStringToSeconds(startTimeStr.trim());
          const endTime = this.timeStringToSeconds(endTimeStr.trim());
          
          captions.push({
            id,
            startTime,
            endTime,
            text
          });
        }
      }
    });
    
    return captions;
  }

  private timeStringToSeconds(timeString: string): number {
    const cleanTimeString = timeString.trim();

    const [time, milliseconds] = cleanTimeString.split(',');
    
    if (!time || milliseconds === undefined) {
      return 0;
    }
    
    const timeParts = time.split(':');
    
    if (timeParts.length !== 3) {
      return 0;
    }
    
    const [hours, minutes, seconds] = timeParts.map(Number);
    
    return hours * 3600 + minutes * 60 + seconds + (parseInt(milliseconds) / 1000);
  }
}
