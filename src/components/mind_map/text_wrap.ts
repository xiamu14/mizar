const lineHeight = 26;

export const dc = {
  getWrapString(str: string) {
    if (!str || str.length === 0) return '';

    const $line = document.createElement('div');
    $line.classList.add('dc-box');
    document.querySelector('body')?.appendChild($line);

    const words = [];
    const temp = str.split(/\b/);
    for (let i = 0; i < temp.length; i += 1) {
      if (this.isCjkCharter(temp[i])) {
        words.push.apply(words, temp[i].split(''));
      } else {
        words.push(temp[i]);
      }
    }
    let lines = [],
      oneLine = [];
    for (let i = 0; i < words.length; i += 1) {
      let word = words[i];
      if (word === '\n') {
        lines.push(oneLine, []);
        $line.innerText = '';
        oneLine = [];
        continue;
      }
      //   往容器中添加内容
      $line.innerText = $line.innerText + word;
      if ($line.clientHeight <= lineHeight) {
        oneLine.push(word);
      } else {
        lines.push(oneLine);
        $line.innerText = '';
        oneLine = [];
        i -= 1;
        continue;
      }
    }
    lines.push(oneLine);
    const result = lines
      .map((item) => {
        return item.join('');
      })
      .join('\n');
    $line.remove();
    return result;
  },
  isCjkCharter(ch: string) {
    const cjk = {
      NO1Unihan: [
        '\\u3400-\\u3db5',
        '\\u4e00-\\u9fa5',
        '\\u9fa6-\\u9fbb',
        '\\uf900-\\ufa2d',
        '\\ufa30-\\ufa6a',
        '\\ufa70-\\ufad9',
        '',
        '',
      ],
      NO2UFF00: ['\\uff00-\\uffef'],
      NO3U2E80: ['\\u2e80-\\u2eff'],
      NO4U3000: ['\\u3000-\\u303f'],
      NO5U31C0: ['\\u31c0-\\u31ef'],
      NO6U2F00: ['\\u2f00-\\u2fdf'],
      NO7U2FF0: ['\\u2ff0-\u2fff'],
      NO8U3100: ['\\u3100-\\u312f'],
      NO9U31A0: ['\\u31a0-\\u31bf'],
      NO10U3040: ['\\u3040-\\u309f'],
      NO11U30A0: ['\\u30a0-\\u30ff'],
      NO12U31F0: ['\\u31f0-\\u31ff'],
      NO13UAC00: ['\\uac00-\\ud7af'],
      NO14U1100: ['\\u1100-\\u11ff'],
      NO15U3130: ['\\u3130-\\u318f'],
      NO16U1D300: [''], //\\u1d300-\\u1d35f
      NO17U4DC0: ['\\u4dc0-\\u4dff'],
      NO18UA000: ['\\ua000-\\ua48f'],
      NO19UA490: ['\\ua490-\\ua4cf'],
      NO20U2800: ['\\u2800-\\u28ff'],
      NO21U3200: ['\\u3200-\\u32ff'],
      NO22U3300: ['\\u3300-\\u33ff'],
      NO23U2700: ['\\u2700-\\u27bf'],
      NO24U2600: ['\\u2600-\\u26ff'],
      NO25UFE10: ['\\ufe10-\\ufe1f'],
      NO26UFE30: ['\\ufe30-\\ufe4f'],
    };
    let reg,
      str = '[';
    for (let k in cjk) {
      str += cjk[k as keyof typeof cjk].join('');
    }
    str += ']+';
    if (str != '[]+') {
      reg = new RegExp(str, 'm');
      return reg.test(ch);
    }
    return null;
  },
};
