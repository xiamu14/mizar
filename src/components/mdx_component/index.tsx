import { PropsWithChildren, useCallback, useRef, useState } from 'react';
import Divider from '../divider';
import Image from './components/image';
import Table from './components/table';
import styles from './index.module.scss';

const Pre = ({ children, ...otherProps }: PropsWithChildren<any>) => {
  const textInput = useRef<HTMLDivElement>(null);
  const [hovered, setHovered] = useState(false);
  const [copied, setCopied] = useState(false);
  const onEnter = () => {
    setHovered(true);
  };
  const onExit = () => {
    setHovered(false);
    setCopied(false);
  };
  const handleCopy = useCallback(() => {
    if (textInput.current) {
      setCopied(true);
      navigator.clipboard.writeText(textInput.current.textContent || '');
      setTimeout(() => {
        setCopied(false);
      }, 2000);
    }
  }, []);
  return (
    <div
      className={styles['pre-box']}
      onMouseEnter={onEnter}
      onMouseLeave={onExit}
    >
      <div ref={textInput} className={styles['pre-container']}>
        <pre {...otherProps}>{children}</pre>
      </div>
      {hovered && (
        <button className={styles['btn-copy']} onClick={handleCopy}>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            stroke="currentColor"
            fill="none"
            className={styles['icon-copy']}
          >
            {copied ? (
              <>
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-6 9l2 2 4-4"
                />
              </>
            ) : (
              <>
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2"
                />
              </>
            )}
          </svg>
        </button>
      )}
    </div>
  );
};

const mdxComponent = {
  hr: Divider,
  pre: Pre,
  img: Image,
  Table,
};

export default mdxComponent;
