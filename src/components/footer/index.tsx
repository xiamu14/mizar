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
            <h4 className={style.title}>认识我</h4>
            <Link href="/maps">Github</Link>
            <Link href="/maps">Twitter</Link>
          </div>
          <div className={style.column}>
            <h4 className={style.title}>有趣站点</h4>
            <Link href="/maps">Github</Link>
            <Link href="/maps">Twitter</Link>
          </div>
        </div>
      </ContentWidth>
    </footer>
  );
}

const Footer = React.memo($Footer);

export default Footer;
