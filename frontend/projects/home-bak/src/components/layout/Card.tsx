import React from 'react';

import css from './Card.module.css';
export const Card = (props: any) => {
  return (
    <div className={`${css.card}  ${props.className}`}>
      <div className={css.container}>
        <h2>
          <b>{props.title}</b>
        </h2>
        <div>{props.children}</div>
      </div>
    </div>
  );
};

export default Card;
