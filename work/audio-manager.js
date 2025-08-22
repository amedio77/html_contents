// 음향 효과 관리자 클래스
class AudioManager {
  constructor() {
    this.sounds = {};
    this.enabled = this.loadSettings();
    this.volume = 0.7;
    this.isLoaded = false;
    
    // 브라우저 자동재생 정책 대응
    this.userInteracted = false;
    this.initUserInteraction();
  }

  // 사용자 상호작용 감지 (브라우저 자동재생 정책 대응)
  initUserInteraction() {
    const events = ['click', 'touchstart', 'keydown'];
    const enableAudio = () => {
      this.userInteracted = true;
      if (!this.isLoaded) {
        this.loadSounds();
      }
      events.forEach(event => {
        document.removeEventListener(event, enableAudio);
      });
    };

    events.forEach(event => {
      document.addEventListener(event, enableAudio, { once: true });
    });
  }

  // 음향 파일 로드
  loadSounds() {
    if (this.isLoaded) return;

    const soundFiles = {
      'notification': './mp3/new-notification-09-352705.mp3',    // 일반 액션
      'result': './mp3/decidemp3-14575.mp3',                    // 결과 확인
      'select': './mp3/bubble-pop-06-351337.mp3',               // 질문 선택
      'next': './mp3/ui-sounds-pack-2-sound-4-358895.mp3'       // 다음 질문
    };

    for (const [name, src] of Object.entries(soundFiles)) {
      try {
        const audio = new Audio(src);
        audio.volume = this.volume;
        audio.preload = 'auto';
        
        // 로드 완료 이벤트
        audio.addEventListener('canplaythrough', () => {
          console.log(`✅ Sound loaded: ${name}`);
        });
        
        // 에러 처리
        audio.addEventListener('error', (e) => {
          console.warn(`⚠️ Failed to load sound: ${name}`, e);
        });
        
        this.sounds[name] = audio;
      } catch (error) {
        console.warn(`⚠️ Error creating audio for ${name}:`, error);
      }
    }
    
    this.isLoaded = true;
    console.log('🔊 AudioManager initialized');
  }

  // 음향 재생
  play(soundName) {
    if (!this.enabled || !this.userInteracted) {
      return;
    }

    const sound = this.sounds[soundName];
    if (!sound) {
      console.warn(`⚠️ Sound not found: ${soundName}`);
      return;
    }

    try {
      // 이미 재생 중인 경우 처음부터 재시작
      sound.currentTime = 0;
      const playPromise = sound.play();
      
      if (playPromise !== undefined) {
        playPromise.catch(error => {
          console.warn(`⚠️ Failed to play sound ${soundName}:`, error);
        });
      }
    } catch (error) {
      console.warn(`⚠️ Error playing sound ${soundName}:`, error);
    }
  }

  // 볼륨 조절 (0.0 ~ 1.0)
  setVolume(level) {
    this.volume = Math.max(0, Math.min(1, level));
    
    for (const sound of Object.values(this.sounds)) {
      sound.volume = this.volume;
    }
    
    this.saveSettings();
  }

  // 음향 ON/OFF 토글
  toggle() {
    this.enabled = !this.enabled;
    this.saveSettings();
    this.updateUI();
    
    console.log(`🔊 Audio ${this.enabled ? 'enabled' : 'disabled'}`);
    return this.enabled;
  }

  // 음향 활성화 상태 확인
  isEnabled() {
    return this.enabled;
  }

  // 설정 저장 (localStorage)
  saveSettings() {
    try {
      localStorage.setItem('audioSettings', JSON.stringify({
        enabled: this.enabled,
        volume: this.volume
      }));
    } catch (error) {
      console.warn('⚠️ Failed to save audio settings:', error);
    }
  }

  // 설정 로드 (localStorage)
  loadSettings() {
    try {
      const settings = localStorage.getItem('audioSettings');
      if (settings) {
        const parsed = JSON.parse(settings);
        this.volume = parsed.volume || 0.7;
        return parsed.enabled !== false; // 기본값 true
      }
    } catch (error) {
      console.warn('⚠️ Failed to load audio settings:', error);
    }
    return true; // 기본값
  }

  // UI 업데이트
  updateUI() {
    const toggleBtn = document.getElementById('audio-toggle');
    if (toggleBtn) {
      toggleBtn.textContent = this.enabled ? '🔊' : '🔇';
      toggleBtn.title = this.enabled ? '음향 끄기' : '음향 켜기';
    }
  }

  // 특정 액션별 음향 재생 메서드들
  playUserTypeSelect() {
    this.play('notification');
  }

  playQuestionSelect() {
    this.play('select');
  }

  playNextQuestion() {
    this.play('next');
  }

  playShowResult() {
    this.play('result');
  }

  playShowMentors() {
    this.play('notification');
  }

  playRestart() {
    this.play('notification');
  }
}

// 전역 AudioManager 인스턴스 생성
const audioManager = new AudioManager();

// DOM 로드 후 초기화
document.addEventListener('DOMContentLoaded', () => {
  audioManager.updateUI();
});