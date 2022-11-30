import { cloneDeep } from 'lodash-es';
import { HeadNode } from './type';

export function getHeadings(source: string) {
  const titleReg = /^#{1,6}\s/;
  const lines = source.split('\n').filter((line) => {
    return titleReg.test(line);
  });

  return lines.map((raw, index) => {
    const text = raw.replace(titleReg, '');
    const level = raw.match(titleReg)?.[0].replace(' ', '').split('')
      .length as number;
    return { name: text, level, children: [] };
  });
}

export function getTreeData(data: HeadNode[]) {
  const treeData = toTree(data);

  return treeData;
}

function toTree(flatArr: HeadNode[]) {
  const tree: any = [];
  const copyArr = cloneDeep(flatArr);

  // 根据指定级别查找该级别的子孙级，并删除掉已经查找到的子孙级
  const getChildrenByLevel = function (
    currentLevelItem: HeadNode,
    arr: HeadNode[],
    level: number
  ) {
    if (!currentLevelItem) {
      return [];
    }
    // 将level值转成负数，再进行比较
    const minusCurrentLevel = -currentLevelItem.level;
    const children = [];
    for (let i = 0, len = arr.length; i < len; i += 1) {
      const levelItem = arr[i];
      if (-levelItem.level < minusCurrentLevel) {
        children.push(levelItem);
      } else {
        // 只找最近那些子孙级
        break;
      }
    }
    // 从数组中删除已经找到的那些子孙级，以免影响到其他子孙级的查找
    if (children.length > 0) {
      arr.splice(0, children.length);
    }
    return children;
  };

  const getTree = function (result: any, arr: HeadNode[], level: number) {
    // 首先将数组第一位移除掉，并添加到结果集中
    let currentItem = arr.shift() as HeadNode;

    currentItem.level = level;
    result.push(currentItem);
    while (arr.length > 0) {
      if (!currentItem) {
        return;
      }
      // 根据当前级别获取它的子孙级
      const children = getChildrenByLevel(currentItem, arr, level);
      // 如果当前级别没有子孙级则开始下一个
      if (children.length == 0) {
        currentItem = arr.shift() as HeadNode;
        currentItem.level = level;
        if (currentItem) {
          result.push(currentItem);
        }
        continue;
      }
      currentItem.children = [];
      // 查找到的子孙级继续查找子孙级
      getTree(currentItem.children, children, level + 1);
    }
  };
  getTree(tree, copyArr, 2);

  return tree;
}

const isEnglishWordReg = /^[a-zA-Z]+$/;

const calcStrLength = (text: string) => {
  const res = text.split(' ');
  let result = 0;
  res?.forEach((item) => {
    if (isEnglishWordReg.test(item)) {
      result += Math.floor(item.length / 2);
    } else {
      result += item.length;
    }
  });
  return result;
};

export const splitText = (length: number, text: string) => {
  let arr: string[] = [];
  text.split(' ').map((it) => {
    const isWord = isEnglishWordReg.test(it);
    return isWord ? arr.push(it) : (arr = arr.concat(it.split('')));
  });

  const result = [''];

  const maxLen = length;
  for (let i = 0; i < arr.length; i += 1) {
    let last = result[result.length - 1];
    const lastLen = calcStrLength(last);
    const newLen = calcStrLength(arr[i]);
    if (lastLen + newLen < maxLen) {
      const needSpace = /[a-zA-Z]$/.test(last) || isEnglishWordReg.test(arr[i]);
      result[result.length - 1] = `${last}${needSpace ? ' ' : ''}${arr[i]}`;
    } else {
      result.push(arr[i]);
    }
  }

  return result.join('\n  \n');
};

export const ellipsisText = (text: string, length: number) => {
  if (text.length > length) {
    return text.slice(0, length) + '...';
  }
  return text;
};

export const getRootRectWidth = (length: number, str: string) => {
  const textLen = str.length;

  return textLen > length ? 132 : textLen * 22;
};

export const getRootRectHeight = (str: string) => {
  const lines = str.split('\n').length;
  return lines * 20;
};
