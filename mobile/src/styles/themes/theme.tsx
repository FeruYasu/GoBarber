import React, { useEffect } from 'react';
import { ThemeProvider } from 'styled-components';

import { useAuth } from '../../hooks/auth';

import dark from './dark';
import light from './light';

const Theme: React.FC = ({ children }) => {
  const { user, theme, setTheme } = useAuth();

  useEffect(() => {
    if (user === undefined) {
      setTheme(dark);
      return;
    }

    if (user.theme === 'dark') {
      setTheme(dark);
    } else {
      setTheme(light);
    }
  }, [user, setTheme]);

  return <ThemeProvider theme={theme}>{children}</ThemeProvider>;
};

export default Theme;
