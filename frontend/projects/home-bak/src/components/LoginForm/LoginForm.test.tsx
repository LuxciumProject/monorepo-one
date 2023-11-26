import React from 'react';
import { render, fireEvent } from '@testing-library/react';
import LoginForm from '.';

// This code was written for React 16.x

test('login form submits email and password', () => {
  const onSubmit = jest.fn();
  const { getByLabelText, getByText } = render(<LoginForm onSubmit={onSubmit} />);

  const emailInput = getByLabelText('Email:');
  const passwordInput = getByLabelText('Password:');
  const submitButton = getByText('Submit');

  fireEvent.change(emailInput, { target: { value: 'user@example.com' } });
  fireEvent.change(passwordInput, { target: { value: 'password' } });
  fireEvent.click(submitButton);

  expect(onSubmit).toHaveBeenCalledWith({ email: 'user@example.com', password: 'password' });
});
