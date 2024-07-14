import React from 'react';
import '@testing-library/jest-dom';
import { cleanup, render } from '@testing-library/react';
import Title from '../../src/components/Title';

afterEach(cleanup);

test('loads and displays click counter', () => {
  const { getByText } = render(<Title/>);
  expect(getByText('My ReactJS Application')).toBeInTheDocument();
});
