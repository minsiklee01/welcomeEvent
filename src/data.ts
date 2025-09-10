export type Person = {
  id: number;
  hint: string;
  hint_en: string;
  answer: string | string[];
  answer_en: string;
}

export const QUIZ: Person[] = [
  { id: 1, hint: '하늘에서 뛰어내린적이 있습니다', hint_en: 'I have gone skydiving.', answer: '양민주', answer_en: 'Minju Yang'},
  { id: 2, hint: '크크크 흠 음.. 수영장 파도풀에서 죽을뻔했는데 라이프가드님께서 뿅! 나타나셔서 건져주신적이 있어요', hint_en: 'I nearly drowned in a wave pool at a water park, but a lifeguard suddenly appeared and saved me.', answer: '구예은', answer_en: 'Lia'},
  { id: 3, hint: '어린이날 아빠 보러 교회가다가 차에 치인 적이 있습니다.', hint_en: "On Children's Day, I was hit by a car on the way to church to see my dad.", answer: '박하진', answer_en: 'Hajin Park'},
  { id: 4, hint: '저는 우간다, 케냐에서 산 경험이 있습니다. 일자 손금입니다', hint_en: "I've lived in Uganda and Kenya. I have a single straight palmar crease.", answer: '정태백산맥', answer_en: 'Mac'},
  { id: 5, hint: '쌍둥이 오빠가 있습니다', hint_en: 'I have a twin older brother.', answer: '이예나', answer_en: 'Yena'},
  { id: 6, hint: '이름 앞 뒤가 똑같아요', hint_en: 'My name reads the same forwards and backwards.', answer: '정윤정', answer_en: 'Yoony'},
  { id: 7, hint: '집에서 혼자 쿠키 만드려다가 태웠는데 옆집에서 연기 때문에 불난 줄 알고 신고하셨어요..', hint_en: 'I tried baking cookies alone at home and burned them, and the neighbor reported a fire because of the smoke.', answer: '이서진', answer_en: 'Seo Jin'},
  { id: 8, hint: '저는 레바논, 튀니지에 산 적이 있습니다. 인어공주처럼 바다에서 돌고래와 함께 수영한적이 있습니다.', hint_en: "I've lived in Lebanon and Tunisia. I once swam with dolphins in the sea like the Little Mermaid.", answer: '박준용', answer_en: 'Charlie'},
  { id: 9, hint: '세미 내리막길 구간에서 신나게 보드를 타다 넘어져 1년동안 축구를 하지 못했습니다', hint_en: "I fell while skateboarding down a slight downhill path and couldn't play soccer for a year.", answer: '서지명', answer_en: 'Jimmy'},
  { id: 10, hint: '어릴적 개미를 잡아먹는 것이 취미였습니다. 기억은 없지만 ㅎㅎ ', hint_en: "As a kid, my hobby was catching and eating ants (I don't remember it, haha).", answer: '김미선', answer_en: 'Meesun'},
  { id: 11, hint: '밤따려고 나뭇가지 던졌다가 머리가 찢었었습니다', hint_en: 'I threw a branch to pick chestnuts and ended up splitting my head open.', answer: '김민주', answer_en: 'Minju Kim'},
  { id: 12, hint: '망둥어랑 뽀뽀한적이 있습니다', hint_en: 'I once kissed a mudskipper.', answer: '왕선웅', answer_en: 'Sun Woong'},
  { id: 13, hint: '저는 한국, 헝가리, 독일, 중국에 산 적이 있습니다. 한국에 돌아가면 집이 없습니다', hint_en: "I've lived in Korea, Hungary, Germany, and China. I don't have a home to return to in Korea.", answer: '이찬혁', answer_en: 'Chan Hyuk'},
  { id: 14, hint: '누나랑 닮았다는 말을 많이 들었어요', hint_en: 'People often say I look like my older sister.', answer: '구교준', answer_en: 'Kyo Jun'},
  { id: 15, hint: '슈퍼에서 만원 잃었음', hint_en: 'I once lost 10,000 won at a supermarket.', answer: '채준하', answer_en: 'Joon Ha'},
  { id: 16, hint: '7-8살때 경찰서가서 조사받은적 있습니다', hint_en: 'When I was 7-8 years old, I was questioned at the police station.', answer: '고온유', answer_en: 'On Yu'},
  { id: 17, hint: '비행기를 놓치는 꿈을 꾸고 진짜로 비행기를 놓쳤어요ㅎ', hint_en: 'I dreamed I missed a flight, and then I actually missed a flight (haha).', answer: '박수익', answer_en: 'Sooik'},
  { id: 18, hint: '인대 하나가 없어져서 군대안가도 한국국적을 받을수 있게 되었어요', hint_en: "I'm missing one ligament and received an exemption from military service for Korean nationality.", answer: '최석현', answer_en: 'Suk Hyun'},
  { id: 19, hint: '어릴때 당나귀한테 물려서 손가락이 거의 짤릴뻔했다', hint_en: 'When I was little, a donkey bit me and my finger almost got cut off.', answer: ['Emi','도희'], answer_en: 'Emi'},
  { id: 20, hint: '칼로 깊이 벤 손가락을 강력 본드로 봉하고 완쾌 했음', hint_en: 'I sealed a deep knife cut on my finger with super glue and fully recovered.', answer: 'Tom', answer_en: 'Tom'},
  { id: 21, hint: 'I was driving on a bridge when it fell down', hint_en: 'I was driving on a bridge when it collapsed.', answer: 'Eric', answer_en: 'Eric'},
]