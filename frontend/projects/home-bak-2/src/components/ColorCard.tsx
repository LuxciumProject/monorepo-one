import React from 'react';
import css from './ColorCard.module.scss';
export const ColorCard = (props: any) => {
  return (
    <div className={css.card}>
      <div className={css.container}>
        <h4 style={{ background: props.hex }}>
          <b>{props.hex}</b>
        </h4>
        <p>{props.property}</p>
      </div>
    </div>
  );
};
export default ColorCard;
