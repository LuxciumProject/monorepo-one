import React from 'react';

import Button from './Button';
import Card from './Card';

import css from './ErorModal.module.scss';

export const ErrorModal = (props: any) => {
  return (
    <Card className={css.modal}>
      <div>
        <div className={css.backdrop} onClick={props.onConfirm} />
        <header className={css.header}>
          <h2>{props.title}</h2>
        </header>
        <div className={css.content}>
          <p>{props.message}</p>
        </div>
        <footer className={css.actions}>
          <Button onClick={props.onConfirm}>Okay</Button>
        </footer>
      </div>
    </Card>
  );
};

export default ErrorModal;
