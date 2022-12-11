import Link from 'next/link';
import React from 'react';
import ContentWidth from '../../layouts/content_width';
import style from './index.module.scss';
function $Footer() {
  return (
    <footer className={style.footer}>
      <ContentWidth>
        <div className={style.content}>
          <div className={style.column}>
            <h4 className={style.title}>导航栏</h4>
            <Link href="/snippets">片段</Link>
            <Link href="/maps">目录</Link>
          </div>
          <div className={style.column}>
            <h4 className={style.title}>关于我</h4>
            <Link href="https://github.com/xiamu14">Github</Link>
            <Link href="https://twitter.com/BenjarminX">Twitter</Link>
          </div>
          <div className={style.column}>
            <h4 className={style.title}>我的开源</h4>
            <Link href="https://sceneui.vercel.app/">SceneUI</Link>
            <Link href="https://star-board-delta.vercel.app/xiamu14">
              Star Board
            </Link>
          </div>
        </div>
      </ContentWidth>
    </footer>
  );
}

const Footer = React.memo($Footer);

export default Footer;
