import Link from 'next/link';
import React from 'react';
import style from './item.module.scss';

const $NavItem = ({
  href,
  text,
  isActive,
}: {
  href: string;
  text: string;
  isActive: boolean;
}) => {
  return (
    <Link href={href}>
      <div
        className={`${style['nav-item']} ${
          isActive && style['nav-item-active']
        }`}
      >
        {text}
      </div>
    </Link>
  );
};
const NavItem = React.memo($NavItem);

export default NavItem;
