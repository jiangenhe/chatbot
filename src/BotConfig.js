// https://abcnews.go.com/2020/top-20-whitest-blackest-names/story?id=2470131
// https://www.babycenter.com/0_100-most-popular-hispanic-baby-names-of-2011_10363639.bc
// https://www.momjunction.com/articles/asian-baby-names-for-girls-and-boys_00433930/

const code = {
  AF: "ASIAN_FEMALE",
  AM: "ASIAN_MALE",
  BF: "BLACK_FEMALE",
  BM: "BLACK_MALE",
  HF: "HISPANIC_FEMALE",
  HM: "HISPANIC_MALE",
  WF: "WHITE_FEMALE",
  WM: "WHITE_MALE"
}

const botConfig = {
  AF: {gender: 'F', race: 'A', avatar:'./avatar/af.png', name: 'Hong'},
  AM: {gender: 'M', race: 'A', avatar:'./avatar/am.png', name: 'Lee'},
  BF: {gender: 'F', race: 'B', avatar:'./avatar/bf.png', name: 'Ebony'},
  BM: {gender: 'M', race: 'B', avatar:'./avatar/bm.png', name: 'Darnell'},
  HF: {gender: 'F', race: 'H', avatar:'./avatar/hf.png', name: 'Camila'},
  HM: {gender: 'M', race: 'H', avatar:'./avatar/hm.png', name: 'Mateo'},
  WF: {gender: 'F', race: 'W', avatar:'./avatar/wf.png', name: 'Molly'},
  WM: {gender: 'M', race: 'W', avatar:'./avatar/wm.png', name: 'Jake'},
}

export default botConfig;
