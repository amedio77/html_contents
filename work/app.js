// 전역 앱 객체
const app = {
  // 상태 관리
  state: {
    currentScreen: 'gate1',
    userType: null, // 'youth' or 'adult'
    currentQuestionIndex: 0,
    answers: [],
    totalScore: 0,
    resultType: null,
    selectedMentor: null
  },

  // 초기화
  init() {
    this.navigate('gate1');
  },

  // 화면 네비게이션
  navigate(screenId) {
    // 진단테스트 다시하기 음향 재생
    if (screenId === 'gate1' && this.state.currentScreen !== 'gate1') {
      audioManager.playRestart();
    }
    
    // 모든 화면 숨기기
    const screens = document.querySelectorAll('.screen');
    screens.forEach(screen => screen.style.display = 'none');

    // 선택된 화면 표시
    const targetScreen = document.getElementById(screenId);
    if (targetScreen) {
      targetScreen.style.display = 'block';
      this.state.currentScreen = screenId;
    }

    // 화면별 초기화
    if (screenId === 'gate1') {
      this.resetState();
    }
  },

  // 상태 초기화
  resetState() {
    this.state.userType = null;
    this.state.currentQuestionIndex = 0;
    this.state.answers = [];
    this.state.totalScore = 0;
    this.state.resultType = null;
    this.state.selectedMentor = null;
  },

  // 퀴즈 시작
  startQuiz(type) {
    // 음향 재생: 청소년/성인 선택
    audioManager.playUserTypeSelect();
    
    this.state.userType = type;
    this.state.currentQuestionIndex = 0;
    this.state.answers = [];
    this.state.totalScore = 0;
    this.navigate('quiz');
    this.showQuestion();
  },

  // 질문 표시
  showQuestion() {
    const questions = CONFIG.quiz[this.state.userType];
    const currentQuestion = questions[this.state.currentQuestionIndex];
    const totalQuestions = questions.length;

    // 질문 번호와 텍스트 업데이트 (원본 형식에 맞게)
    const progressNum = (this.state.currentQuestionIndex + 1).toString().padStart(2, '0');
    document.getElementById('question-progress').textContent = `질문 ${progressNum} / ${totalQuestions}`;
    document.getElementById('question-text').textContent = currentQuestion.text;

    // 선택지 생성
    const choicesContainer = document.getElementById('question-choices');
    choicesContainer.innerHTML = '';

    currentQuestion.choices.forEach((choice, index) => {
      const label = document.createElement('label');
      
      const input = document.createElement('input');
      input.type = 'radio';
      input.name = 'number';
      input.value = choice.score;
      input.id = `choice-${choice.id}`;
      
      const span = document.createElement('span');
      // 번호 매기기: ①②③④ 형식
      const numbers = ['①', '②', '③', '④'];
      span.textContent = `${numbers[index]} ${choice.text}`;
      
      // 이전에 선택한 답안이 있으면 체크
      if (this.state.answers[this.state.currentQuestionIndex] === choice.score) {
        input.checked = true;
      }
      
      input.addEventListener('change', () => {
        this.selectAnswer(choice.score);
      });
      
      label.appendChild(input);
      label.appendChild(span);
      choicesContainer.appendChild(label);
    });

    // 버튼 상태 업데이트
    this.updateNavigationButtons();
  },

  // 답변 선택
  selectAnswer(score) {
    // 음향 재생: 질문 선택
    audioManager.playQuestionSelect();
    
    this.state.answers[this.state.currentQuestionIndex] = score;
    document.getElementById('btn-next').disabled = false;
  },

  // 다음 질문
  nextQuestion() {
    const questions = CONFIG.quiz[this.state.userType];
    
    if (this.state.currentQuestionIndex < questions.length - 1) {
      // 음향 재생: 다음 질문
      audioManager.playNextQuestion();
      this.state.currentQuestionIndex++;
      this.showQuestion();
    } else {
      // 마지막 질문인 경우 결과 계산 (결과 확인 음향)
      audioManager.playShowResult();
      this.calculateResult();
    }
  },

  // 이전 질문
  prevQuestion() {
    if (this.state.currentQuestionIndex > 0) {
      this.state.currentQuestionIndex--;
      this.showQuestion();
    }
  },

  // 네비게이션 버튼 업데이트
  updateNavigationButtons() {
    const questions = CONFIG.quiz[this.state.userType];
    const prevBtn = document.getElementById('btn-prev');
    const nextBtn = document.getElementById('btn-next');
    
    // 이전 버튼
    if (this.state.currentQuestionIndex === 0) {
      prevBtn.style.visibility = 'hidden';
    } else {
      prevBtn.style.visibility = 'visible';
    }
    
    // 다음 버튼
    if (this.state.answers[this.state.currentQuestionIndex] !== undefined) {
      nextBtn.disabled = false;
    } else {
      nextBtn.disabled = true;
    }
    
    // 마지막 질문일 때
    if (this.state.currentQuestionIndex === questions.length - 1) {
      nextBtn.textContent = '나의 투자성향 보기';
    } else {
      nextBtn.textContent = '다음';
    }
  },

  // 결과 계산
  calculateResult() {
    // 총점 계산
    this.state.totalScore = this.state.answers.reduce((sum, score) => sum + score, 0);
    
    // 결과 유형 찾기 (사용자 타입에 따라 구분)
    for (const [key, result] of Object.entries(CONFIG.results)) {
      if (result.userType === this.state.userType && 
          this.state.totalScore >= result.minScore && 
          this.state.totalScore <= result.maxScore) {
        this.state.resultType = key;
        break;
      }
    }
    
    // 결과 화면 표시
    this.showResult();
  },

  // 결과 표시
  showResult() {
    const result = CONFIG.results[this.state.resultType];
    
    // 배경색 설정 (성인용 결과는 bg_ter2 클래스 적용)
    const bgClass = result.bgClass || '';
    
    const resultHTML = `
      <div class="split_l">
        <div class="book_tit">
          <i class="icon_star"></i>
          <p class="guide_02cDGray noto">당신의 투자 성향은</p>
          <p class="h_02cDGray">${result.type}</p>
        </div>
        <div class="book_inner">
          <div class="note_card">
            <p class="${result.userType === 'adult' ? 'body_02' : 'body_02cDGray'}">
              ${result.description}
            </p>
          </div>
          <div class="btnGroup_center">
            <button type="button" class="btn_bgPrimary" onclick="app.navigate('gate1')">진단테스트 다시하기</button>
            <p class="qr_w">
              <img src="./images/img_qr.png">
              <span class="guide_02cDGray">결과저장하기</span>
            </p>
          </div>
        </div>
      </div>
      <div class="profile_w">
        <div class="profile_inner">
          <div class="pf_box">
            <div>
              <p class="guide_01cPrimary">${result.mentor.name}</p>
              <p class="guide_01cDGray">${result.mentor.tag.split(' ').map(tag => `<span>${tag}</span>`).join(' ')}</p>
            </div>
            <div class="img_w">
              <img src="./images/${result.mentor.image}" alt="${result.mentor.name}">
            </div>
          </div>
          <div class="pf_quotes">
            <p class="guide_01cDGray">${result.mentor.quote}</p>
          </div>
        </div>
        <button type="button" class="btn_lineLGray" onclick="app.showMentors()">다른 투자멘토 조언보기</button>
      </div>
    `;
    
    document.getElementById('result-content').className = `layout_split ${bgClass}`;
    document.getElementById('result-content').innerHTML = resultHTML;
    this.navigate('result');
  },

  // 멘토 목록 표시
  showMentors() {
    // 음향 재생: 다른 멘토 조언보기
    audioManager.playShowMentors();
    
    const mentors = CONFIG.mentors[this.state.userType];
    const mentorListContainer = document.getElementById('mentor-list');
    
    mentorListContainer.innerHTML = '';
    
    // 성인용일 때 배경색 추가
    if (this.state.userType === 'adult') {
      mentorListContainer.classList.add('bg_ter2');
    } else {
      mentorListContainer.classList.remove('bg_ter2');
    }
    
    mentors.forEach(mentor => {
      const li = document.createElement('li');
      li.innerHTML = `
        <a href="#" onclick="app.showMentoring(${mentor.id}); return false;">
          <p class="cDGray"><span class="cGray">${mentor.tag}</span>${mentor.name}</p>
          <img class="${mentor.class || ''}" src="./images/${mentor.image}" alt="${mentor.name}">
        </a>
      `;
      mentorListContainer.appendChild(li);
    });
    
    this.navigate('mentors');
  },

  // 멘토링 상세 표시
  showMentoring(mentorId) {
    const mentoring = CONFIG.mentoring[mentorId];
    
    if (!mentoring) {
      console.error('멘토링 정보를 찾을 수 없습니다:', mentorId);
      return;
    }

    // 배경 클래스 결정: 멘토 ID 5-8은 성인용(layout_bg_ter2), 1-4는 청소년용(layout_bg_ter1)
    const backgroundClass = (mentorId >= 5) ? 'layout_bg_ter2' : 'layout_bg_ter1';
    
    const mentoringHTML = `
      <div class="content">
        <div class="cont_tit">
          <i class="icon_play"></i>
          <h4 class="cGray">투자 멘토</h4>
        </div>
        <div class="${backgroundClass}">
          <div class="book_inner">
            <i class="icon_quotes"></i>
            <div class="note_card">
              <p class="body_01">
                ${mentoring.content}<br/>
                <span class="body_02cPrimary">${mentoring.hashtags}</span>
              </p>
            </div>
          </div>
          <div class="btnGroup_start">
            <button type="button" class="btn_lineLGray" onclick="app.showMentors()">다른 투자멘토 조언보기</button>
            <button type="button" class="btn_bgPrimary" onclick="app.navigate('gate1')">진단테스트 다시하기</button>
          </div>
          <img class="bg_profile" src="./images/${mentoring.image}" alt="${mentoring.name}">
          <p class="body_02cPrimary name_profile">${mentoring.name}</p>
        </div>
      </div>
    `;
    
    document.getElementById('mentoring-content').innerHTML = mentoringHTML;
    this.navigate('mentoring');
  }
};

// DOM 로드 후 앱 초기화
document.addEventListener('DOMContentLoaded', () => {
  app.init();
});