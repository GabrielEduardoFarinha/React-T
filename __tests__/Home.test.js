import React from 'react';
import { render } from '@testing-library/react-native';
import Home from '../paginas/Home';

test('Home.js renders correctly', () => {
  const { getByText } = render(<Home />);
  expect(getByText('Home')).toBeTruthy();
});