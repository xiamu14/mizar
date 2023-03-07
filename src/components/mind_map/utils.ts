// 深拷贝
export const deepCopy = (data: string) => {
  return JSON.parse(JSON.stringify(data));
};

// 计算虚拟 div 宽高
export const getVSize = (str: string) => {
  const div = document.createElement('div');
  div.innerHTML = str;
  div.classList.add('mind-title-box');
  document.querySelector('body')?.appendChild(div);
  const rectData = div.getClientRects();
  div.remove();
  return rectData;
};

export const calcSize = (data: any) => {
  const list = data;
  const resize = (child: any) => {
    const size = getVSize(child.name)[0];

    child.width = size.width;
    child.height = size.height;
    if (child.children) {
      child.children.forEach((it: any) => resize(it));
    }
  };
  resize(list);
  return list;
};
