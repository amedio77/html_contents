const CONFIG = {
  // 음향 효과 설정
  audio: {
    enabled: true,
    volume: 0.7,
    sounds: {
      notification: './mp3/new-notification-09-352705.mp3',    // 일반 액션 (청소년/성인 선택, 멘토 조언, 다시하기)
      result: './mp3/decidemp3-14575.mp3',                    // 결과 확인 (나의 투자성향 결과보기)
      select: './mp3/bubble-pop-06-351337.mp3',               // 질문 선택 (선택지 클릭)
      next: './mp3/ui-sounds-pack-2-sound-4-358895.mp3'       // 다음 질문 (다음 버튼)
    }
  },

  // 퀴즈 질문 데이터 (quiz.txt 기준)
  quiz: {
    youth: [
      {
        id: 'y1',
        text: '투자한 돈을 언제 다시 사용할 계획인가요?',
        choices: [
          { id: 'a', text: '1년 안에 쓸 예정이에요.', score: 1 },
          { id: 'b', text: '2~3년 후에 쓸 예정이에요.', score: 2 },
          { id: 'c', text: '5년 이상 쓸 계획이 없어요.', score: 3 },
          { id: 'd', text: '10년 이상 묻어둘 거예요.', score: 4 }
        ]
      },
      {
        id: 'y2',
        text: '투자는 어떤 마음으로 하고 싶나요?',
        choices: [
          { id: 'a', text: '빨리 돈을 벌고 싶어요.', score: 1 },
          { id: 'b', text: '천천히 조금씩 늘려가고 싶어요.', score: 2 },
          { id: 'c', text: '아주 오래 기다려서 많이 늘리고 싶어요.', score: 3 },
          { id: 'd', text: '언제 써야 할지 모르겠어요.', score: 4 }
        ]
      },
      {
        id: 'y3',
        text: '투자를 하는 이유는 무엇인가요?',
        choices: [
          { id: 'a', text: '용돈을 더 많이 모으고 싶어요.', score: 1 },
          { id: 'b', text: '비싼 물건을 사고 싶어요.', score: 2 },
          { id: 'c', text: '나중에 집을 사고 싶어요.', score: 3 },
          { id: 'd', text: '나이 들어서 쓸 돈을 모으고 싶어요.', score: 4 }
        ]
      },
      {
        id: 'y4',
        text: '투자로 얼마나 돈이 늘어나면 좋겠나요?',
        choices: [
          { id: 'a', text: '원금만 안 잃으면 돼요.', score: 1 },
          { id: 'b', text: '1년에 3~5% 정도 늘어나면 만족해요.', score: 2 },
          { id: 'c', text: '1년에 10% 정도 늘어나면 좋겠어요.', score: 3 },
          { id: 'd', text: '1년에 20% 이상 많이 늘어나면 좋겠어요.', score: 4 }
        ]
      },
      {
        id: 'y5',
        text: '매달 들어오는 돈(용돈, 월급 등) 중에서 얼마나 투자할 수 있나요?',
        choices: [
          { id: 'a', text: '거의 투자할 돈이 없어요.', score: 1 },
          { id: 'b', text: '조금씩(약 1~5만 원)만 투자할 수 있어요.', score: 2 },
          { id: 'c', text: '꽤 많이(10만 원 이상) 투자할 수 있어요.', score: 3 },
          { id: 'd', text: '아주 많이(50만 원 이상) 투자할 수 있어요.', score: 4 }
        ]
      },
      {
        id: 'y6',
        text: '갑자기 돈이 필요할 때 어떻게 하시겠어요?',
        choices: [
          { id: 'a', text: '투자한 돈을 빼서 써야 해요.', score: 1 },
          { id: 'b', text: '다른 곳에서 돈을 빌려야 해요.', score: 2 },
          { id: 'c', text: '따로 모아둔 돈이 있어요.', score: 3 },
          { id: 'd', text: '충분한 비상금이 있어서 걱정 없어요.', score: 4 }
        ]
      },
      {
        id: 'y7',
        text: '투자한 100만 원이 80만 원으로 줄어들면 어떻게 하시겠어요?',
        choices: [
          { id: 'a', text: '너무 무서워서 바로 팔 거예요.', score: 1 },
          { id: 'b', text: '걱정되지만 조금 더 기다려볼 거예요.', score: 2 },
          { id: 'c', text: '괜찮아요. 가격이 다시 오를 때까지 기다릴 거예요.', score: 3 },
          { id: 'd', text: '기회다! 더 사겠어요.', score: 4 }
        ]
      },
      {
        id: 'y8',
        text: '투자에서 가장 중요한 것은 무엇인가요?',
        choices: [
          { id: 'a', text: '절대 돈을 잃으면 안 돼요.', score: 1 },
          { id: 'b', text: '조금 잃어도 괜찮지만 안전이 중요해요.', score: 2 },
          { id: 'c', text: '돈을 잃을 수도 있지만 많이 벌 수 있으면 좋아요.', score: 3 },
          { id: 'd', text: '많이 잃어도 상관없어요. 대박을 노려요.', score: 4 }
        ]
      },
      {
        id: 'y9',
        text: '투자에 대해 얼마나 알고 있나요?',
        choices: [
          { id: 'a', text: '투자가 뭔지 잘 모르겠어요.', score: 1 },
          { id: 'b', text: '저금과 투자의 차이 정도는 알아요.', score: 2 },
          { id: 'c', text: '주식, 펀드 같은 것들에 대해 알아요.', score: 3 },
          { id: 'd', text: '투자에 대해 많이 공부했어요.', score: 4 }
        ]
      },
      {
        id: 'y10',
        text: '투자 경험은 어느 정도인가요?',
        choices: [
          { id: 'a', text: '한 번도 투자해 본 적이 없어요.', score: 1 },
          { id: 'b', text: '적금이나 예금만 해봤어요.', score: 2 },
          { id: 'c', text: '펀드나 주식을 조금 해봤어요.', score: 3 },
          { id: 'd', text: '여러 가지 투자를 많이 해봤어요.', score: 4 }
        ]
      }
    ],
    adult: [
      {
        id: 'a1',
        text: '투자 자금의 사용 시기는 언제로 계획하고 계시나요?',
        choices: [
          { id: 'a', text: '1년 이내 사용할 계획입니다.', score: 1 },
          { id: 'b', text: '2~3년 후 사용할 예정입니다.', score: 2 },
          { id: 'c', text: '5년 이상 보유할 예정입니다.', score: 3 },
          { id: 'd', text: '10년 이상 장기 투자할 계획입니다.', score: 4 }
        ]
      },
      {
        id: 'a2',
        text: '투자에 임하는 기본적인 태도는 어떤가요?',
        choices: [
          { id: 'a', text: '단기간에 수익을 얻고 싶습니다.', score: 1 },
          { id: 'b', text: '안정적으로 자산을 늘리고 싶습니다.', score: 2 },
          { id: 'c', text: '장기적인 성장을 기대하며 투자합니다.', score: 3 },
          { id: 'd', text: '아직 목표 시점이 정해지지 않았습니다.', score: 4 }
        ]
      },
      {
        id: 'a3',
        text: '투자 목적은 무엇인가요?',
        choices: [
          { id: 'a', text: '여유 자금을 모으기 위해서입니다.', score: 1 },
          { id: 'b', text: '고가의 물품(차, 가전 등) 구매를 위한 자금 마련입니다.', score: 2 },
          { id: 'c', text: '주택 마련 등 중장기 목표 자금입니다.', score: 3 },
          { id: 'd', text: '은퇴 이후 자금 준비를 위한 장기 자산 운용입니다.', score: 4 }
        ]
      },
      {
        id: 'a4',
        text: '기대하는 수익률은 어느 정도인가요?',
        choices: [
          { id: 'a', text: '원금 손실 없이 보존되면 충분합니다.', score: 1 },
          { id: 'b', text: '연 3~5% 수준의 안정적인 수익이면 좋겠습니다.', score: 2 },
          { id: 'c', text: '연 10% 수준의 수익을 기대합니다.', score: 3 },
          { id: 'd', text: '연 20% 이상의 높은 수익을 기대합니다.', score: 4 }
        ]
      },
      {
        id: 'a5',
        text: '매달 소득 중 투자 가능한 금액은 어느 정도인가요?',
        choices: [
          { id: 'a', text: '투자할 여유가 거의 없습니다.', score: 1 },
          { id: 'b', text: '소액(5~10만 원)만 정기적으로 투자할 수 있습니다.', score: 2 },
          { id: 'c', text: '일정 금액을 지속적으로 투자할 수 있습니다.', score: 3 },
          { id: 'd', text: '고정적으로 상당 금액을 투자할 수 있습니다.', score: 4 }
        ]
      },
      {
        id: 'a6',
        text: '긴급 자금이 필요할 경우 어떻게 하시겠습니까?',
        choices: [
          { id: 'a', text: '투자금을 회수해서 사용해야 합니다.', score: 1 },
          { id: 'b', text: '외부에서 자금을 조달해야 합니다.(대출 등)', score: 2 },
          { id: 'c', text: '별도로 준비한 비상금이 있습니다.', score: 3 },
          { id: 'd', text: '충분한 유동성 자산을 확보해두었습니다.', score: 4 }
        ]
      },
      {
        id: 'a7',
        text: '주식 투자금 100만 원이 80만 원으로 감소하면 어떻게 하시겠습니까?',
        choices: [
          { id: 'a', text: '손실이 두려워 바로 매도하겠습니다.', score: 1 },
          { id: 'b', text: '우려되지만 조금 더 지켜보겠습니다.', score: 2 },
          { id: 'c', text: '회복 가능성을 믿고 유지하겠습니다.', score: 3 },
          { id: 'd', text: '하락 시 추가 매수를 고려하겠습니다.', score: 4 }
        ]
      },
      {
        id: 'a8',
        text: '투자 시 가장 중요하게 생각하는 것은 무엇인가요?',
        choices: [
          { id: 'a', text: '절대 손실이 없어야 합니다.', score: 1 },
          { id: 'b', text: '안전성을 최우선으로 생각합니다.', score: 2 },
          { id: 'c', text: '수익성과 안정성을 균형 있게 고려합니다.', score: 3 },
          { id: 'd', text: '높은 수익을 위해 어느 정도 손실도 감수할 수 있습니다.', score: 4 }
        ]
      },
      {
        id: 'a9',
        text: '투자에 대한 이해 수준은 어느 정도인가요?',
        choices: [
          { id: 'a', text: '투자의 개념이 익숙하지 않습니다.', score: 1 },
          { id: 'b', text: '저축과 투자의 차이 정도는 알고 있습니다.', score: 2 },
          { id: 'c', text: '주식, 펀드 등 기본적인 상품에 대해 알고 있습니다.', score: 3 },
          { id: 'd', text: '자산 운용 전반에 대한 이해도가 높습니다.', score: 4 }
        ]
      },
      {
        id: 'a10',
        text: '실제 투자 경험은 어느 정도인가요?',
        choices: [
          { id: 'a', text: '아직 투자해 본 적이 없습니다.', score: 1 },
          { id: 'b', text: '예금·적금 등 안전자산 위주로 운용했습니다.', score: 2 },
          { id: 'c', text: '주식이나 펀드 등에 일부 투자한 경험이 있습니다.', score: 3 },
          { id: 'd', text: '다양한 금융상품에 적극적으로 투자해왔습니다.', score: 4 }
        ]
      }
    ]
  },

  // 결과 유형 데이터 (quiz.txt 기준: 청소년 1-4, 성인 5-8)
  results: {
    // 청소년용 결과 (result_1~4)
    1: {
      type: '안전 우선형',
      minScore: 10,
      maxScore: 17,
      userType: 'youth',
      bgClass: '',
      description: '느리지만 안전하게 가는 거북이처럼! <span class="cSecondary">안전한 투자</span>를 좋아해요.<br/>장점은 돈을 잃을 위험이 적지만, 너무 안전만 추구하면 돈을 불리는데 시간이 오래 걸릴 수 있어요. <span class="cSecondary">은행 예금, 적금부터 시작</span>해서 <span class="cSecondary">원금 보장 상품 위주로 투자를 시작</span>할 수 있어요.',
      mentor: {
        name: '벤저민 그레이엄',
        tag: '#가치투자의 아버지<br/>#월가의 스승',
        image: 'profile_1.png',
        quote: '나는 대공황을 겪으면서 깨달았네.<br/>이 시장은 언제든 흔들릴 수 있지. 그래서 나는 항상 <span class="underline">"안전마진"</span>을 확보하지 않으면 절대 투자하지 않았다네.<br/>시장이 불확실할수록 방어적인 자산을 담고, 주가가 아닌 "가치"를 보게나.'
      }
    },
    2: {
      type: '안정 추구형',
      minScore: 18,
      maxScore: 25,
      userType: 'youth',
      bgClass: '',
      description: '조심스럽지만 꾸준히 앞으로 가는 토끼처럼! 안전하면서도 조금씩 돈을 늘리고 싶어 해요. 장점은 안전하면서도 꾸준히 조금씩 돈이 늘어나요.<br/>하지만 가끔은 용기를 내는 것도 필요해요. <span class="cSecondary">안전한 펀드에 소액 투자부터 시작</span>할 수 있어요. <span class="cSecondary">소액 투자를 하며 투자 기본 지식과 경험을 쌓을 수 있어요.</span>',
      mentor: {
        name: '워런 버핏',
        tag: '#장기투자의 신<br/>#오마하의 현인',
        image: 'profile_3.png',
        quote: '내가 코카콜라를 샀을 때도, 당장 오르길 기대하지 않았지. 하지만 난 이 회사를 10년 후에도 사랑할 자신이 있었네.<br/><span class="underline">좋은 회사를 좋은 가격에 사서 오래 들고 가는 것</span>,<br/>그게 가장 안전하고도 강한 전략이야.'
      }
    },
    3: {
      type: '위험 중립형',
      minScore: 26,
      maxScore: 33,
      userType: 'youth',
      bgClass: '',
      description: '높이 날면서도 균형을 잡는 독수리처럼! <span class="cSecondary">적당한 위험을 감수</span>할 수 있어요.<br/>장점은 <span class="cSecondary">위험과 안전 사이에서 균형</span>을 잘 맞출 수 있어요. 하지만 너무 욕심을 내지 않게 주의해야 해요. <span class="cSecondary">주식형 펀드와 채권을 섞어서 투자</span>해 보세요.<br/>투자에 관한 뉴스를 정기적으로 보면 도움이 됩니다.',
      mentor: {
        name: '피터 린치',
        tag: '#월가의 영웅<br/>#월가를 이긴 전설의 펀드매니저',
        image: 'profile_4.png',
        quote: '나는 슈퍼마켓에서 아이들이 뭘 사는지 보면서 투자 아이디어를 얻었다네.<br/>투자란, <span class="underline">내 일상에서 발견한 성장의 단서</span>를 믿는 일이야.<br/>내가 이해하고 공감할 수 있는 기업에 투자하되, 숫자로도 꼭 검증하게.'
      }
    },
    4: {
      type: '적극 투자형',
      minScore: 34,
      maxScore: 40,
      userType: 'youth',
      bgClass: '',
      description: '용감하게 도전하는 사자처럼! <span class="cSecondary">위험을 감수하고 큰 수익을 원해요.</span><br/>장점은 큰 수익을 얻을 수 있어요.<br/>하지만 손실도 크게 생길 수 있으니 조심하세요. <span class="cSecondary">신중하게 주식 투자에 도전</span>해 보세요. 투자 공부와 함께 <span class="cSecondary">위험 관리 방법도 알아두셔야</span> 합니다.',
      mentor: {
        name: '조지 소로스',
        tag: '#공격적 매도자의 전설',
        image: 'profile_5.png',
        quote: '나는 틀릴 수도 있다는 걸 인정했기에 성공했네.<br/><span class="underline">시장이 내 예상과 다르면</span>, 즉시 포지션을 수정했지.<br/>용기 있게 베팅하되, 자신의 실수를 빨리 인정할 줄 알아야 진짜 강한 투자자가 되는 거야.'
      }
    },
    
    // 성인용 결과 (result_5~8)
    5: {
      type: '안전 우선형',
      minScore: 10,
      maxScore: 17,
      userType: 'adult',
      bgClass: 'bg_ter2',
      description: '손실을 극도로 꺼리고 <span class="underline">투자금 보전을 최우선</span>으로 생각하시는군요.<br/>투자 경험이 거의 없거나 투자에 대한 자신감과 정보가 부족한 상태입니다.<br/>투자 비중보다는 <span class="cSecondary">저축 및 금융 안전망 확보</span>가 먼저 이루어져야 하므로<br/><span class="underline"><span class="cSecondary">정기예금, MMF, 국채 또는 원금 보장형 ELS, ISA 등을 추천</span></span>합니다.',
      mentor: {
        name: '벤저민 그레이엄',
        tag: '#가치투자의 아버지<br/>#월가의 스승',
        image: 'profile_1.png',
        quote: '투자는 철저히 자신을 지키는 행위이며, 절대 도박이 되어선 안 된다네.<br/><span class="underline">장기적으로 금융 문해력을 키워, 예산의 일부를 안정적인 배당주 펀드 등으로 천천히 노출시켜 보게나.</span><br/>원칙은 "안정 + 점진적 학습"인 걸 잊지 마시게.'
      }
    },
    6: {
      type: '안정 추구형',
      minScore: 18,
      maxScore: 25,
      userType: 'adult',
      bgClass: 'bg_ter2',
      description: '손실 가능성은 우려하지만 일정 수준의 수익도 기대하시는군요.<br/><span class="cSecondary">투자에 대해 학습 의지</span>가 있으며 <span class="cSecondary">자산 배분의 중요성을 인식</span>하고 있습니다.<br/>분산 투자를 기반으로 한 혼합형 자산 구성을 추천하며, 목표 중심(주택 마련, 자녀 교육 등)의 자산 운용이 이루어져야 합니다. <span class="cSecondary">적합한 상품으로는 채권형 펀드, 안전형 ETF, TDF</span> 등이 있고, <span class="cSecondary">배당주와 우량주 중심으로 포트폴리오를 구성하는 것도 고려해 보시면</span> 좋습니다.',
      mentor: {
        name: '존 보글',
        tag: '#인덱스 펀드 창시자<br/>#월가의 성자',
        image: 'profile_2.png',
        quote: '복잡한 전략은 필요 없습니다.<br/><span class="underline">낮은 비용, 분산된 투자, 그리고 장기 보유가 핵심인 걸 잊지 마세요.</span><br/>너무 빠르게 수익을 추구하지 말고, 꾸준한 지출 통제와 함께 <span class="underline">자동화된 투자 습관을 구축</span>해야 합니다. 이 습관은 지루하지만 강력한 전략이 될 것입니다.'
      }
    },
    7: {
      type: '위험 중립형',
      minScore: 26,
      maxScore: 33,
      userType: 'adult',
      bgClass: 'bg_ter2',
      description: '중장기 자산 증식 목표를 갖고 계시는군요. <span class="cSecondary">수익성과 손실 리스크 사이에서 균형을 잡는 걸 중요</span>하게 생각하고 있습니다.<br/>다양한 자산에 대한 이해와 관리가 가능하므로 <span class="underline"><span class="cSecondary">주식과 채권 비중을 6:4 도는 7:3 정도</span></span> 유지하는 것이 좋습니다. <span class="cSecondary">우량주와 중소형 성장주 혼합 포트폴리오를 추천</span>하며 <span class="cSecondary">글로벌 ETF, 리츠(REITs) 등을 고려</span>해 볼 수 있습니다.',
      mentor: {
        name: '피터 린치',
        tag: '#월가의 영웅<br/>#월가를 이긴 전설의 펀드매니저',
        image: 'profile_4.png',
        quote: '<span class="underline">자신이 이해하는 기업에 투자하고, 스스로 조사하는 습관이 중요</span>합니다.<br/>기업의 가치와 흐름을 파악할 수 있다면, <span class="underline">일상에서 보이는 기회가 최고의 정보</span>입니다.<br/>장기적 관점으로 본인의 투자 기준을 만들어보세요.'
      }
    },
    8: {
      type: '적극 투자형',
      minScore: 34,
      maxScore: 40,
      userType: 'adult',
      bgClass: 'bg_ter2',
      description: '높은 수익률을 목표로 하며 손실에 대한 내성도 강하시네요.<br/>이미 <span class="cSecondary">투자에 대한 지식과 경험이 풍부</span>해서 시장 흐름을 빠르게 읽고, 과감한 의사결정을 하실 수 있는 기반이 되어 있습니다. 수익률 극대화를 위한 적극적 자산 운용을 추천드립니다. <span class="cSecondary">트렌드 기반의 테마 투자</span> 또는 <span class="cSecondary">글로벌 분산</span> 등을 활용하면서, <span class="cSecondary">리스크 헷징</span>과 <span class="cSecondary">종목 리밸런싱을 병행</span>하는 전략이 필요해요.',
      mentor: {
        name: '마크 모비우스',
        tag: '#신흥국 투자의 대부',
        image: 'profile_6.png',
        quote: '내가 세계 곳곳의 신흥국 시장에 발을 들일 때가 생각나는군요. 정보도 적고, 정치적 불확실성도 커서 모두가 말렸죠. <br/>하지만 나는 그 리스크 속에 숨겨진 기회를 보았고, 직접<br/>현장에 뛰어 들어 하나하나 확인해보고 분석했던 기억이 나는군요. <span class="underline">두려움이 있는 곳에 기회가 있고, 행동하는 자에게 수익이 따릅니다.</span> 그러나 그 <span class="underline">행동은 반드시 지식과 분석, 그리고 준비된 태도 위에 있어야 합니다.</span>'
      }
    }
  },

  // 멘토 데이터
  mentors: {
    youth: [
      { id: 1, name: '벤저민 그레이엄', tag: '가치투자의 아버지', image: 'profile_1.png', class: 'ty2' },
      { id: 2, name: '워런 버핏', tag: '장기투자의 신', image: 'profile_3.png' },
      { id: 3, name: '피터 린치', tag: '월가의 영웅', image: 'profile_4.png' },
      { id: 4, name: '조지 소로스', tag: '공격적 매도자의 전설', image: 'profile_5.png' }
    ],
    adult: [
      { id: 5, name: '벤저민 그레이엄', tag: '가치투자의 아버지', image: 'profile_1.png', class: 'ty2' },
      { id: 6, name: '존 보글', tag: '인덱스 펀드 창시자', image: 'profile_2.png' },
      { id: 7, name: '피터 린치', tag: '월가의 영웅', image: 'profile_4.png' },
      { id: 8, name: '마크 모비우스', tag: '신흥국 투자의 대부', image: 'profile_6.png' }
    ]
  },

  // 멘토링 내용
  mentoring: {
    1: {
      name: '벤저민 그레이엄',
      title: '가치투자의 아버지',
      subtitle: '월가의 스승',
      image: 'profile_1_b.png',
      content: "나는 대공황을 겪으면서 깨달았네. 이 시장은 언제든 흔들릴 수 있지.<br/>그래서 나는 항상 '안전마진'을 확보하지 않으면 절대 투자하지 않았다네.<br/>시장이 불확실할수록 방어적인 자산을 담고, 주가가 아닌 '가치'를 보게나.",
      hashtags: "#가치투자의 아버지  #월가의 스승"
    },
    2: {
      name: '워런 버핏',
      title: '오마하의 현인',
      subtitle: '장기투자의 신',
      image: 'profile_3_b.png',
      content: "내가 코카콜라를 샀을 때도, 당장 오르길 기대하지 않았지. 하지만<br/>난 이 회사를 10년 후에도 사랑할 자신이 있었네. <br/>좋은 회사를 좋은 가격에 사서 오래 들고 가는 것, 그게 가장 안전하고도 강한 전략이야.",
      hashtags: "#오마하의 현인이자 장기투자자의 롤모델 #미국 청년들에게 가장 존경받는 투자자"
    },
    3: {
      name: '피터 린치',
      title: '월가의 영웅',
      subtitle: '월가를 이긴 전설의 펀드매니저',
      image: 'profile_4_b.png',
      content: "나는 슈퍼마켓에서 아이들이 뭘 사는지 보면서 투자 아이디어를 얻었다네.<br/> 투자란, 내 일상에서 발견한 성장의 단서를 믿는 일이야.<br/> 내가 이해하고 공감할 수 있는 기업에 투자하되, 숫자로도 꼭 검증하게.",
      hashtags: "#월가의 영웅  #월가를 이긴 전설의 펀드매니저"
    },
    4: {
      name: '조지 소로스',
      title: '공격적 매도자의 전설',
      subtitle: '재귀성 이론의 창시자',
      image: 'profile_5_b.png',
      content: "나는 틀릴 수도 있다는 걸 인정했기에 성공했네. <br/>시장이 내 예상과 다르면 즉시 포지션을 수정했지. <br/>용기 있게 베팅하되, 자신의 실수를 빨리 인정할 줄 알아야 진짜 강한 투자자가 되는 거야.",
      hashtags: "#공격적 매도자의 전설"
    },
    5: {
      name: '벤저민 그레이엄',
      title: '가치투자의 아버지',
      subtitle: '월가의 스승',
      image: 'profile_1_b.png',
      content: "투자는 철저히 자신을 지키는 행위이며, 절대 도박이 되어서는 안 된다네.<br/>장기적으로 금융 문해력을 키워 예산 일부를 안정적인 배당주 펀드 등으로<br/>천천히 노출시켜 보게나. 원칙은 '안정 + 점진적 학습'인 걸 잊지 마시게.",
      hashtags: "#가치투자의 아버지  #월가의 스승"
    },    
    6: {
      name: '존 보글',
      title: '인덱스펀드의 창시자',
      subtitle: '월가의 성자',
      image: 'profile_2_b.png',
      content: "복잡한 전략은 필요 없습니다. <br/>낮은 비용, 분산된 투자, 그리고 장기 보유가 핵심인 걸 잊지 마세요. <br/>너무 빠르게 수익을 추구하지 말고, 꾸준한 지출 통제와 함께 자동화된 투자 습관을 구축해야 합니다. <br/>이 습관은 지루하지만 강력한 전략이 될 것입니다.",
      hashtags: "#인덱스 펀드 창시자 #월가의 성자"
    },    
    7: {
      name: '피터 린치',
      title: '월가의 영웅',
      subtitle: '월가를 이긴 전설의 펀드매니저',
      image: 'profile_4_b.png',
      content: " 자신이 이해하는 기업에 투자하고, 스스로 조사하는 습관이 중요합니다.<br/>기업의 가치와 흐름을 파악할 수 있다면, 일상에서 보이는 기회가 최고의 정보입니다.<br/> 장기적 관점으로 본인의 투자 기준을 만들어보세요.",
      hashtags: "#월가의 영웅  #월가를 이긴 전설의 펀드매니저"
    },
    
    8: {
      name: '마크 모비우스',
      title: '신흥국 투자의 대부',
      subtitle: '글로벌 투자의 개척자',
      image: 'profile_6_b.png',
      content: "내가 세계 곳곳의 신흥국 시장에 발을 들일 때가 생각나는군요. <br/>정보도 적고, 정치적 불확실성도 커서 모두가 말렸죠. 하지만 나는 그 리스크 속에 숨겨진 기회를 보았고,<br/> 직접 현장에 뛰어 들어 하나하나 확인해보고 분석했던 기억이 나는군요. <br/>두려움이 있는 곳에 기회가 있고, 행동하는 자에게 수익이 따릅니다. <br/>그러나 그 행동은 반드시 지식과 분석, 그리고 준비된 태도 위에 있어야 합니다.",
      hashtags: "#신흥국 투자의 대부"
    }
  }
};