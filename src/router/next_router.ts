class TreeNode {
  constructor(
    public part: string = '',
    public isWild: boolean = false,
    public pattern: string = '',
    public children: TreeNode[] = [],
    public element: JSX.Element | null = null
  ) {}

  // 查询子节点， 返回所有 part 相同或者为 isWild 动态节点的子节点
  matchChildren(part: string) {
    const nodes: TreeNode[] = [];
    for (let i = 0; i < this.children.length; i++) {
      const child = this.children[i];
      if (child.isWild || child.part === part) {
        // 保存子节点
        nodes.push(child);
      }
    }

    return nodes;
  }

  // 查询子节点， 返回第一个 part 相同或者为 isWild 动态节点的子节点
  matchChild(part: string) {
    for (let i = 0; i < this.children.length; i++) {
      const child = this.children[i];
      if (child.isWild || child.part === part) {
        return child;
      }
    }

    return null;
  }

  // 插入节点
  insertNode(
    pattern: string,
    parts: string[],
    height: number,
    element: JSX.Element
  ) {
    // 当路径被 spilt ('/') 拆分成数据 parts, 其长度和 height 相等时，表明为叶子节点，完成 pattern 赋值操作，并返回
    if (parts.length === height) {
      this.pattern = pattern;

      return;
    }

    // 获取到当前路径部分
    const part = parts[height];
    // 插入节点只要查找到匹配的一个子节点即可
    let child = this.matchChild(part);

    // 子节点不存在，则 new 一个子节点，推入当前子节点中
    if (!child) {
      child = new TreeNode(
        part,
        part[0] === ':' || part[0] === '*',
        '',
        [],
        element
      );
      this.children.push(child);
    }

    // 子节点执行插入操作
    child.insertNode(pattern, parts, height + 1, element);
  }

  // 匹配节点，匹配失败时返回null
  matchNode(parts: string[], height: number): null | TreeNode {
    // 当遍历的高度和parts长度相等 或 part以*开始时（这个主要匹配/*filepath的路径）
    if (parts.length === height || this.part.startsWith('*')) {
      // 即使遍历的高度和parts长度相等，还需要判断当前节点是否为叶子节点，pattern为''不是叶子节点 例如插入了`/a/b/c`路由，匹配`/a/b`时，此时遍历的高度和parts长度相等，但对于`/a/b/c`路由的`b`部分不是叶子节点，因此匹配不成功
      if (this.pattern === '') {
        return null;
      }
      return this;
    }
    const part = parts[height];
    const nodes = this.matchChildren(part);

    // 遍历查询到的所有子节点，进行子节点的查询
    for (let i = 0; i < nodes.length; i++) {
      const node = nodes[i];
      const matchedNode = node.matchNode(parts, height + 1);

      // 返回第一个匹配到的节点
      if (matchedNode) {
        return matchedNode;
      }
    }

    return null;
  }
}

export class NextRouter {
  // 根节点
  root: TreeNode | null = null;

  // 添加路由
  addRoute({ pattern, element }: { pattern: string; element: JSX.Element }) {
    // 解析路径成数组
    const parts = parsePattern(pattern);
    // 根据是否需要初始化根节点
    if (!this.root) {
      this.root = new TreeNode('/', true, '/', [], element);
    }
    this.root.insertNode(pattern, parts, 0, element);

    // 通过根节点插入
  }

  // 获取路由
  getRoute(
    path: string
  ): { route: TreeNode; params: Record<string, string> } | undefined {
    // 获取并解析路径
    const searchParts = parsePattern(path);
    const params: { [param: string]: string } = {};

    // 匹配节点
    const node = this.root?.matchNode(searchParts, 0);
    if (!node) {
      return undefined;
    } else {
      // 根据实际请求路径和节点上的part解析出动态参数，如路由`user/:id`,请求路径为`user/1`,则params为{ id: 1 }
      const pathParts = parsePattern(node.pattern);

      for (let i = 0; i < pathParts.length; i++) {
        const part = pathParts[i];

        if (part.startsWith(':')) {
          params[part.slice(1)] = searchParts[i];
        }

        if (part.startsWith('*')) {
          params[part.slice(1)] = searchParts.slice(i).join('/');
        }
      }
      return { route: node, params };
    }
  }
}

// 分割路径，如路径`/a/b/c`,返回['a', 'b', 'c']
function parsePattern(pattern: string) {
  const pa = pattern.split('/');
  const parts = [];
  for (let i = 0; i < pa.length; i++) {
    const item = pa[i];
    if (item !== '') {
      parts.push(item);

      // 如果当前部分以`*`开始，则结束循环
      if (item[0] === '*') {
        break;
      }
    }
  }

  return parts;
}
