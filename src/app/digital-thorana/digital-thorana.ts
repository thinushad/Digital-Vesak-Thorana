import { CommonModule } from '@angular/common';
import { ChangeDetectorRef, Component, ElementRef, ViewChild } from '@angular/core';

interface StoryPanel {
  title: string;
  description: string;
  image: string;
  audio: string;
}

@Component({
  selector: 'app-digital-thorana',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './digital-thorana.html',
  styleUrl: './digital-thorana.css',
})
export class DigitalThorana {
  @ViewChild('bgMusic') bgMusic!: ElementRef<HTMLAudioElement>;
  @ViewChild('storyAudio') storyAudio!: ElementRef<HTMLAudioElement>;

  isRunning = true;
  isMusicPlaying = false;
  selectedStoryIndex = 0;
  isThoranaVisible = false;

  centerImage = 'assets/vesak/buddha-center.png';

  outerLights = Array.from({ length: 96 });
  bottomLights = Array.from({ length: 100 });
  imageLights = Array.from({ length: 32 });

  defaultAudio = 'assets/audio/vesak-music.mp3';
  currentStoryAudio = '';

  constructor(private cdr: ChangeDetectorRef) {}

  openThorana(): void {
    this.isThoranaVisible = true;
    this.cdr.detectChanges();

    setTimeout(() => {
      this.playDefaultAudio();
    }, 100);
  }

  stories: StoryPanel[] = [
    {
      title: 'වෙස්සන්තර රජුගේ රාජධානිය',
      description:
        'වෙස්සන්තර රජු දානයට ප්‍රසිද්ධ වූ අතර, සිය රාජධානියේ ජනතාවට කරුණාවෙන් සහ සාධාරණයෙන් සැලකූ උතුම් රජෙකි.',
      image: 'assets/vesak/story-1.png',
      audio: 'assets/audio/story-1.mp3',
    },
    {
      title: 'සුදු ඇතා දානය කිරීම',
      description:
        'තම රාජ්‍යයට අතිශය වටිනා සුදු ඇතා පවා, අන් අයගේ යහපත වෙනුවෙන් වෙස්සන්තර රජු නිර්ලෝභීව දානය කළේය.',
      image: 'assets/vesak/story-2.png',
      audio: 'assets/audio/story-2.mp3',
    },
    {
      title: 'ජනතාවගේ කෝපය / රජු වනයට යාම',
      description:
        'සුදු ඇතා දීම නිසා ජනතාව කෝපයට පත් වූ අතර, වෙස්සන්තර රජුට රාජධානිය අතහැර වනය බලා යාමට සිදු විය.',
      image: 'assets/vesak/story-3.png',
      audio: 'assets/audio/story-3.mp3',
    },
    {
      title: 'වනයේ සරල ජීවිතය',
      description:
        'මද්‍රී දේවිය සහ දරුවන් සමඟ වෙස්සන්තර රජු වනයේ සරල ජීවිතයක් ගත කරමින් ඉවසීම සහ පාරමිතාව පෙන්වීය.',
      image: 'assets/vesak/story-4.png',
      audio: 'assets/audio/story-4.mp3',
    },
    {
      title: 'ජූජක බ්‍රාහ්මණයාගේ පැමිණීම',
      description:
        'ජූජක බ්‍රාහ්මණයා වනයට පැමිණීමත් සමඟ, වෙස්සන්තර රජුගේ දාන පාරමිතාව තවත් ගැඹුරින් පරීක්ෂා වන අවස්ථාව උදා විය.',
      image: 'assets/vesak/story-5.png',
      audio: 'assets/audio/story-5.mp3',
    },
    {
      title: 'දරුවන්ගෙන් වෙන්වීම / වෙස්සන්තර රජුගේ උතුම් පරීක්ෂාව',
      description:
        'දරුවන්ගෙන් වෙන්වීම වෙස්සන්තර රජුට මහත් දුෂ්කර පරීක්ෂාවක් වූවත්, ඔහු දාන පාරමිතාව අත් නොහැර ස්ථිරව සිටියේය.',
      image: 'assets/vesak/story-6.png',
      audio: 'assets/audio/story-6.mp3',
    },
    {
      title: 'මද්‍රී දේවිය දානය කිරීම / සක්‍ර දෙවියන්ගේ පරීක්ෂාව',
      description:
        'සක්‍ර දෙවියන් බ්‍රාහ්මණයෙකු ලෙස පැමිණ මද්‍රී දේවිය ඉල්ලූ අතර, වෙස්සන්තර රජු ඇයවත් දානය කර උතුම් පාරමිතාව සම්පූර්ණ කළේය.',
      image: 'assets/vesak/story-7.png',
      audio: 'assets/audio/story-7.mp3',
    },
    {
      title: 'පවුල නැවත එක්වීම / දාන පාරමිතාවේ ජයග්‍රහණය',
      description:
        'අවසානයේ පවුල නැවත එක්වූ අතර, වෙස්සන්තර රජුගේ දාන පාරමිතාව කරුණාව, ඉවසීම සහ ජයග්‍රහණය ලෙස ලොවට පෙන්වීය.',
      image: 'assets/vesak/story-8.png',
      audio: 'assets/audio/story-8.mp3',
    },
  ];

  get selectedStory(): StoryPanel {
    return this.stories[this.selectedStoryIndex];
  }

  selectStory(index: number): void {
    this.selectedStoryIndex = index;
    this.playStoryAudio(index);
  }

  nextStory(): void {
    const nextIndex =
      this.selectedStoryIndex === this.stories.length - 1 ? 0 : this.selectedStoryIndex + 1;

    this.selectStory(nextIndex);
  }

  previousStory(): void {
    const previousIndex =
      this.selectedStoryIndex === 0 ? this.stories.length - 1 : this.selectedStoryIndex - 1;

    this.selectStory(previousIndex);
  }

  toggleMusic(): void {
    const bgAudio = this.bgMusic.nativeElement;
    const storyAudioEl = this.storyAudio?.nativeElement;

    if (this.isMusicPlaying) {
      bgAudio.pause();

      if (storyAudioEl) {
        storyAudioEl.pause();
      }

      this.isMusicPlaying = false;
      this.cdr.detectChanges();
      return;
    }

    this.playDefaultAudio();
  }

  private playStoryAudio(index: number): void {
    const bgAudio = this.bgMusic.nativeElement;
    const storyAudioEl = this.storyAudio.nativeElement;

    const selectedAudio = this.stories[index].audio;

    bgAudio.pause();

    this.currentStoryAudio = selectedAudio;
    this.isMusicPlaying = true;
    this.cdr.detectChanges();

    setTimeout(() => {
      storyAudioEl.pause();
      storyAudioEl.currentTime = 0;
      storyAudioEl.volume = 0.45;
      storyAudioEl.loop = false;
      storyAudioEl.load();

      storyAudioEl
        .play()
        .then(() => {
          this.isMusicPlaying = true;
          this.cdr.detectChanges();
        })
        .catch((error) => {
          console.error('Story audio play failed:', error);
          this.isMusicPlaying = false;
          this.cdr.detectChanges();
        });
    });
  }

  private playDefaultAudio(): void {
    const bgAudio = this.bgMusic.nativeElement;
    const storyAudioEl = this.storyAudio?.nativeElement;

    if (storyAudioEl) {
      storyAudioEl.pause();
      storyAudioEl.currentTime = 0;
    }

    bgAudio.volume = 0.35;
    bgAudio.loop = true;
    bgAudio.currentTime = 0;

    bgAudio
      .play()
      .then(() => {
        this.currentStoryAudio = '';
        this.isMusicPlaying = true;
        this.cdr.detectChanges();
      })
      .catch((error) => {
        console.error('Default audio play failed:', error);
        this.isMusicPlaying = false;
        this.cdr.detectChanges();
      });
  }
}
