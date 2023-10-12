import Image from 'next/image';
import { useRouter } from 'next/router';
import React, { useEffect, useState } from 'react';
import { BsGithub, BsTwitter } from 'react-icons/bs';

import style from './index.module.scss';
import NavItem from './item';

function $Navbar() {
  const [active, setActive] = useState('');
  const router = useRouter();

  useEffect(() => {
    if (/\/snippet/.test(router.asPath)) {
      setActive('snippets');
    } else if (/\/map/.test(router.asPath)) {
      setActive('maps');
    } else {
      setActive('');
    }
  }, [router.asPath]);
  return (
    <div className={style['navbar']}>
      <Image src="/images/logo0.svg" alt="logo" width={32} height={32} />
      <nav className={style['nav']}>
        <NavItem href="/" text="言之有物" isActive={active === ''} />
        <NavItem
          href="/snippets"
          text="片段"
          isActive={active === 'snippets'}
        />
        <NavItem href="/maps" text="目录" isActive={active === 'maps'} />
      </nav>
      <div className="space"></div>
      <div className={style.community}>
        <a
          className="github"
          href="https://github.com/xiamu14"
          title="github"
          target="_blank"
          rel="noreferrer"
        >
          <BsGithub size={20} />
        </a>
        <a
          className="twitter"
          href="https://twitter.com/BenjarminX"
          title="@BenjarminX"
          target="_blank"
          rel="noreferrer"
        >
          <BsTwitter size={20} />
        </a>
      </div>
    </div>
  );
}

const Navbar = React.memo($Navbar);

export default Navbar;
