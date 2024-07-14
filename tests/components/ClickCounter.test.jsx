import React from 'react';
import '@testing-library/jest-dom';
import { cleanup, fireEvent, render } from '@testing-library/react';
import ClickCounter from '../../src/components/ClickCounter';

afterEach(cleanup);

test('loads and displays "click me" button', () => {
  const { getByText } = render(<ClickCounter/>);
  expect(getByText('Click me !')).toBeInTheDocument();
});

test('loads and displays click counter', () => {
  const { getByText } = render(<ClickCounter/>);
  expect(getByText('This button was clicked 0 times')).toBeInTheDocument();
});

test('increments counter on click', () => {
  const { getByText } = render(<ClickCounter/>);
  let count = Math.floor(Math.random() * 10 + 1);
  for (let i = 0; i < count; ++i) {
    fireEvent.click(getByText('Click me !'));
  }
  expect(getByText(`This button was clicked ${count} times`)).toBeInTheDocument();
});
