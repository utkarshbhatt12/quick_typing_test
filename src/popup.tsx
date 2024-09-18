import './globals.css';

import React from 'react';
import { createRoot } from 'react-dom/client';
import TypingTest from './TypingTest';

const root = createRoot(document.getElementById('root')!);

root.render(
  <React.StrictMode>
    <TypingTest />
  </React.StrictMode>,
);
