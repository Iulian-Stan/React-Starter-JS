import React, { useCallback, useState } from 'react';
import * as style from './ClickCounter.scss';

export default function ClickCounter() {
  const [counter, setCounter] = useState(0);

  const handleClick = useCallback(() => {
    setCounter(counter + 1);
  }, [counter]);

  return (
    <>
      <div className={style.button} onClick={handleClick}>Click me !</div>
      <div className={style.label}>This button was clicked {counter} times</div>
    </>
  );
}
