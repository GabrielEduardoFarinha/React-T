import React from 'react';
import { render } from '@testing-library/react-native';
import Workers from '../paginas/Workers';

test('Workers.js renders correctly', () => {
  const { getByText } = render(<Workers />);

  expect(getByText('Workers')).toBeTruthy();
});