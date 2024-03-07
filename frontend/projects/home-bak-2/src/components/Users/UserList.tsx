import React from 'react';
import Card from '../layout/Card';

import css from './UserList.module.scss';
export const UserList = (props: any) => {
  return (
    <Card className={css.users}>
      <ul>
        {props.users.map((user: any) => (
          <li key={user.id}>
            {user.name} ({user.age} years old)
          </li>
        ))}
      </ul>
    </Card>
  );
};
export default UserList;
