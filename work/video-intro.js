// ==================== Configuration ====================
const APP_CONFIG = {
  // 각 카드별 영상 매핑 - 순서대로 로컬 MP4 파일
  videos: {
    '대공황': './mp4/01.mp4',
    '오일쇼크': './mp4/02.mp4',
    '아시아금융위기': './mp4/03.mp4',
    '글로벌금융위기': './mp4/04.mp4',
    '유럽재정위기': './mp4/05.mp4',
    'COVID-19경제위기': './mp4/06.mp4'
  },
  returnDelay: 5000, // 5 seconds
  defaultVideo: './mp4/01.mp4'
};

// ==================== Global Variables ====================
let currentVideo = null;
let returnTimer = null;

// ==================== DOM Elements ====================
const elements = {
  introSection: document.getElementById('introSection'),
  modalSection: document.getElementById('modalSection'),
  videoContainer: document.getElementById('videoContainer'),
  videoPlayer: document.getElementById('videoPlayer'),
  btnHome: document.getElementById('btnHome'),
  notificationSound: document.getElementById('notificationSound'),
  crisisCards: document.querySelectorAll('.intro_bottom li'),
  popupOverlay: document.getElementById('popupOverlay'),
  closePopup: document.getElementById('closePopup'),
  confirmYes: document.getElementById('confirmYes'),
  confirmNo: document.getElementById('confirmNo')
};

// ==================== Video Player Manager ====================
class VideoPlayerManager {
  constructor() {
    this.video = elements.videoPlayer;
    this.setupEventListeners();
  }
  
  setupEventListeners() {
    // Video ended event
    this.video.addEventListener('ended', () => {
      console.log('[Video] Ended');
      this.handleVideoEnd();
    });
    
    // Video error event
    this.video.addEventListener('error', (e) => {
      console.error('[Video] Error:', e);
      this.handleError();
    });
    
    // Video can play event
    this.video.addEventListener('canplay', () => {
      console.log('[Video] Can play');
    });
    
    // Video playing event
    this.video.addEventListener('playing', () => {
      console.log('[Video] Playing');
    });
  }
  
  loadVideo(videoUrl) {
    console.log('[Video] Loading:', videoUrl);
    this.video.src = videoUrl;
    this.video.load();
  }
  
  play() {
    // Ensure video is muted for autoplay
    this.video.muted = true;
    
    // Try to play
    const playPromise = this.video.play();
    
    if (playPromise !== undefined) {
      playPromise
        .then(() => {
          console.log('[Video] Playing successfully');
          // Remove controls after starting
          this.video.controls = false;
        })
        .catch(error => {
          console.error('[Video] Play failed:', error);
          // Show controls if autoplay fails
          this.video.controls = true;
        });
    }
  }
  
  stop() {
    this.video.pause();
    this.video.currentTime = 0;
  }
  
  handleVideoEnd() {
    console.log('[Video] Starting return timer');
    clearReturnTimer();
    returnTimer = setTimeout(() => {
      returnToIntro();
    }, APP_CONFIG.returnDelay);
  }
  
  handleError() {
    alert('비디오를 재생할 수 없습니다.');
    returnToIntro();
  }
}

// ==================== Modal Controller ====================
class ModalController {
  show() {
    // Hide intro
    elements.introSection.style.display = 'none';
    
    // Show modal
    elements.modalSection.classList.add('active');
    
    // Start with initial scale animation, then fullscreen
    setTimeout(() => {
      elements.videoContainer.classList.add('active');
      
      // Add fullscreen with expand animation after initial appearance
      setTimeout(() => {
        elements.videoContainer.classList.add('fullscreen');
        
        // Add animation-complete class after animation finishes
        setTimeout(() => {
          elements.videoContainer.classList.add('animation-complete');
        }, 800); // Animation duration is 0.8s
      }, 200);
    }, 100);
  }
  
  hide() {
    // Remove fullscreen and animations
    elements.videoContainer.classList.remove('fullscreen', 'animation-complete');
    elements.videoContainer.style.animation = '';
    
    // Start hide animation
    elements.videoContainer.style.animation = 'scaleOut 0.3s ease-in forwards';
    
    setTimeout(() => {
      // Hide modal
      elements.modalSection.classList.remove('active');
      elements.videoContainer.classList.remove('active');
      elements.videoContainer.style.animation = '';
      
      // Show intro
      elements.introSection.style.display = 'block';
    }, 300);
  }
}

// ==================== Popup Controller ====================
class PopupController {
  show() {
    elements.popupOverlay.classList.add('active');
  }
  
  hide() {
    elements.popupOverlay.classList.remove('active');
  }
}

// ==================== Audio Manager ====================
class AudioManager {
  constructor() {
    this.sound = elements.notificationSound;
  }
  
  async playNotification() {
    try {
      await this.sound.play();
    } catch (error) {
      console.error('[Audio] Play failed:', error);
    }
  }
  
  preload() {
    this.sound.load();
  }
}

// ==================== Draggable Button Manager (Fixed Click Issue) ====================
class DraggableButton {
  constructor(element) {
    this.element = element;
    this.isDragging = false;
    this.hasMoved = false; // 실제 움직임이 있었는지 추적
    this.startX = 0;
    this.startY = 0;
    this.currentX = 0;
    this.currentY = 0;
    this.offsetX = 0;
    this.offsetY = 0;
    this.dragThreshold = 5; // 5픽셀 이상 움직여야 드래그로 인식
    this.savedPosition = this.loadPosition();
    
    this.init();
  }
  
  init() {
    // Load saved position
    if (this.savedPosition) {
      this.element.style.left = this.savedPosition.x + 'px';
      this.element.style.top = this.savedPosition.y + 'px';
      this.element.style.right = 'auto';
    }
    
    this.addEventListeners();
  }
  
  addEventListeners() {
    // 바인드된 메서드를 저장하여 나중에 제거할 수 있도록 함
    this.boundHandleMouseDown = this.handleMouseDown.bind(this);
    this.boundHandleMouseMove = this.handleMouseMove.bind(this);
    this.boundHandleMouseUp = this.handleMouseUp.bind(this);
    this.boundHandleTouchStart = this.handleTouchStart.bind(this);
    this.boundHandleTouchMove = this.handleTouchMove.bind(this);
    this.boundHandleTouchEnd = this.handleTouchEnd.bind(this);
    
    // Mouse events
    this.element.addEventListener('mousedown', this.boundHandleMouseDown);
    document.addEventListener('mousemove', this.boundHandleMouseMove);
    document.addEventListener('mouseup', this.boundHandleMouseUp);
    
    // Touch events - passive: false를 설정하여 preventDefault() 허용
    this.element.addEventListener('touchstart', this.boundHandleTouchStart, { passive: false });
    document.addEventListener('touchmove', this.boundHandleTouchMove, { passive: false });
    document.addEventListener('touchend', this.boundHandleTouchEnd);
    
    // Prevent default drag behavior
    this.element.addEventListener('dragstart', (e) => e.preventDefault());
  }
  
  // 이벤트 리스너 제거 메서드 추가 (메모리 누수 방지)
  removeEventListeners() {
    // Mouse events
    this.element.removeEventListener('mousedown', this.boundHandleMouseDown);
    document.removeEventListener('mousemove', this.boundHandleMouseMove);
    document.removeEventListener('mouseup', this.boundHandleMouseUp);
    
    // Touch events
    this.element.removeEventListener('touchstart', this.boundHandleTouchStart);
    document.removeEventListener('touchmove', this.boundHandleTouchMove);
    document.removeEventListener('touchend', this.boundHandleTouchEnd);
  }
  
  handleMouseDown(e) {
    // 초기 위치만 저장, preventDefault는 실제 드래그 시작시에만 호출
    this.startX = e.clientX;
    this.startY = e.clientY;
    this.currentX = e.clientX;
    this.currentY = e.clientY;
    this.hasMoved = false;
    
    const rect = this.element.getBoundingClientRect();
    this.offsetX = e.clientX - rect.left;
    this.offsetY = e.clientY - rect.top;
  }
  
  handleTouchStart(e) {
    // 초기 위치만 저장, preventDefault는 실제 드래그 시작시에만 호출
    const touch = e.touches[0];
    this.startX = touch.clientX;
    this.startY = touch.clientY;
    this.currentX = touch.clientX;
    this.currentY = touch.clientY;
    this.hasMoved = false;
    
    const rect = this.element.getBoundingClientRect();
    this.offsetX = touch.clientX - rect.left;
    this.offsetY = touch.clientY - rect.top;
  }
  
  handleMouseMove(e) {
    if (this.startX === 0 && this.startY === 0) return;
    
    this.currentX = e.clientX;
    this.currentY = e.clientY;
    
    // 움직임 거리 계산
    const moveDistance = Math.sqrt(
      Math.pow(this.currentX - this.startX, 2) + 
      Math.pow(this.currentY - this.startY, 2)
    );
    
    // 임계값 초과시에만 드래그 시작
    if (!this.isDragging && moveDistance > this.dragThreshold) {
      this.isDragging = true;
      this.hasMoved = true;
      this.element.classList.add('dragging');
    }
    
    // 드래그 중일 때만 실제 드래그 수행
    if (this.isDragging) {
      e.preventDefault(); // 드래그 중에만 기본 동작 차단
      this.drag(this.currentX, this.currentY);
    }
  }
  
  handleTouchMove(e) {
    if (this.startX === 0 && this.startY === 0) return;
    
    const touch = e.touches[0];
    this.currentX = touch.clientX;
    this.currentY = touch.clientY;
    
    // 움직임 거리 계산
    const moveDistance = Math.sqrt(
      Math.pow(this.currentX - this.startX, 2) + 
      Math.pow(this.currentY - this.startY, 2)
    );
    
    // 임계값 초과시에만 드래그 시작
    if (!this.isDragging && moveDistance > this.dragThreshold) {
      this.isDragging = true;
      this.hasMoved = true;
      this.element.classList.add('dragging');
    }
    
    // 드래그 중일 때만 실제 드래그 수행
    if (this.isDragging) {
      e.preventDefault(); // 드래그 중에만 기본 동작 차단
      this.drag(this.currentX, this.currentY);
    }
  }
  
  drag(clientX, clientY) {
    const newX = clientX - this.offsetX;
    const newY = clientY - this.offsetY;
    
    // Boundary constraints
    const maxX = window.innerWidth - this.element.offsetWidth;
    const maxY = window.innerHeight - this.element.offsetHeight;
    
    const constrainedX = Math.max(0, Math.min(newX, maxX));
    const constrainedY = Math.max(0, Math.min(newY, maxY));
    
    this.element.style.left = constrainedX + 'px';
    this.element.style.top = constrainedY + 'px';
    this.element.style.right = 'auto';
  }
  
  handleMouseUp() {
    this.stopDrag();
  }
  
  handleTouchEnd() {
    this.stopDrag();
  }
  
  stopDrag() {
    if (this.isDragging) {
      this.isDragging = false;
      this.element.classList.remove('dragging');
      
      // Save position only if actually moved
      if (this.hasMoved) {
        this.savePosition();
      }
    }
    
    // Reset tracking variables
    this.startX = 0;
    this.startY = 0;
    this.currentX = 0;
    this.currentY = 0;
    this.hasMoved = false;
  }
  
  // 클릭과 드래그를 구분하는 메서드 추가
  wasActualDrag() {
    return this.hasMoved;
  }
  
  savePosition() {
    const position = {
      x: parseInt(this.element.style.left) || 0,
      y: parseInt(this.element.style.top) || 0
    };
    localStorage.setItem('homeButtonPosition', JSON.stringify(position));
  }
  
  loadPosition() {
    const saved = localStorage.getItem('homeButtonPosition');
    return saved ? JSON.parse(saved) : null;
  }
}

// ==================== Initialize Managers ====================
const videoManager = new VideoPlayerManager();
const modalController = new ModalController();
const popupController = new PopupController();
const audioManager = new AudioManager();

// ==================== Event Handlers ====================
function handleCardClick(event) {
  const card = event.currentTarget;
  const videoUrl = card.dataset.video;
  const title = card.dataset.title;
  
  if (!videoUrl) {
    console.error('[App] No video URL found');
    return;
  }
  
  console.log('[App] Opening video:', title, videoUrl);
  
  // Clear any existing timer
  clearReturnTimer();
  
  // Set current video
  currentVideo = videoUrl;
  
  // Show modal
  modalController.show();
  
  // Load and play video
  videoManager.loadVideo(videoUrl);
  
  // Start playing after a short delay
  setTimeout(() => {
    videoManager.play();
  }, 500);
}

// 홈 버튼 클릭 시 확인 팝업 표시 (수정된 버전)
function handleHomeClick(event) {
  console.log('[App] Home button clicked - showing confirmation');
  popupController.show();
}

// 팝업에서 "네" 클릭 시
async function handleConfirmYes() {
  console.log('[App] Confirmed - returning to intro');
  
  // Hide popup
  popupController.hide();
  
  // Play notification sound
  await audioManager.playNotification();
  
  // Stop video
  videoManager.stop();
  
  // Clear timer
  clearReturnTimer();
  
  // Return to intro
  returnToIntro();
}

// 팝업에서 "아니오" 클릭 시
function handleConfirmNo() {
  console.log('[App] Cancelled - continuing video');
  popupController.hide();
}

// 영상 바깥 영역 클릭 시
function handleModalClick(event) {
  // 비디오 컨테이너 외부 클릭 확인
  if (event.target === elements.modalSection || 
      event.target === elements.modalSection.querySelector('.bg_wrap') ||
      event.target === elements.modalSection.querySelector('.bg_wrap img')) {
    console.log('[App] Clicked outside video - showing confirmation');
    popupController.show();
  }
}

function returnToIntro() {
  console.log('[App] Returning to intro');
  
  // Hide modal
  modalController.hide();
  
  // Clear video
  currentVideo = null;
  videoManager.stop();
  
  // Clear timer
  clearReturnTimer();
}

function clearReturnTimer() {
  if (returnTimer) {
    clearTimeout(returnTimer);
    returnTimer = null;
  }
}

function handleKeyboard(event) {
  // Escape key - show confirmation popup or exit fullscreen
  if (event.key === 'Escape' && elements.modalSection.classList.contains('active')) {
    popupController.show();
  }
  
  // Enter key on card
  if (event.key === 'Enter' && event.target.tagName === 'LI') {
    handleCardClick(event);
  }
  
  // F11 key to toggle fullscreen (additional fullscreen support)
  if (event.key === 'F11') {
    event.preventDefault();
    if (elements.modalSection.classList.contains('active')) {
      const isFullscreen = elements.videoContainer.classList.contains('fullscreen');
      if (isFullscreen) {
        elements.videoContainer.classList.remove('fullscreen');
      } else {
        elements.videoContainer.classList.add('fullscreen');
      }
    }
  }
}

// ==================== Initialize Application ====================
document.addEventListener('DOMContentLoaded', () => {
  console.log('[App] Initializing');
  
  // Preload audio
  audioManager.preload();
  
  // Initialize draggable home button
  const draggableHomeButton = new DraggableButton(elements.btnHome);
  
  // Card click events
  elements.crisisCards.forEach(card => {
    card.addEventListener('click', handleCardClick);
    card.addEventListener('keypress', (e) => {
      if (e.key === 'Enter') {
        handleCardClick(e);
      }
    });
  });
  
  // Home button click - 수정된 클릭 감지 로직
  elements.btnHome.addEventListener('click', (e) => {
    // 실제 드래그가 발생하지 않았을 때만 클릭 이벤트 처리
    if (!draggableHomeButton.wasActualDrag()) {
      console.log('[App] Home button clicked (not dragged)');
      handleHomeClick(e);
    } else {
      console.log('[App] Home button dragged - ignoring click');
    }
  });
  
  // Modal background click - show confirmation popup
  elements.modalSection.addEventListener('click', handleModalClick);
  
  // Popup events
  elements.closePopup.addEventListener('click', () => popupController.hide());
  elements.confirmYes.addEventListener('click', handleConfirmYes);
  elements.confirmNo.addEventListener('click', handleConfirmNo);
  
  // Popup overlay click (outside popup)
  elements.popupOverlay.addEventListener('click', (e) => {
    if (e.target === elements.popupOverlay) {
      popupController.hide();
    }
  });
  
  // Keyboard events
  document.addEventListener('keydown', handleKeyboard);
  
  // Prevent zoom on double tap (mobile)
  let lastTouchEnd = 0;
  document.addEventListener('touchend', (e) => {
    const now = Date.now();
    if (now - lastTouchEnd <= 300) {
      e.preventDefault();
    }
    lastTouchEnd = now;
  }, false);
  
  // Handle orientation change
  window.addEventListener('orientationchange', () => {
    setTimeout(() => {
      window.scrollTo(0, 0);
    }, 100);
  });
  
  console.log('[App] Ready');
});

// ==================== Debug Mode ====================
const DEBUG_MODE = false;
if (DEBUG_MODE) {
  window.app = {
    videoManager,
    modalController,
    popupController,
    audioManager,
    elements,
    config: APP_CONFIG
  };
}