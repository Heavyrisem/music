'use client';

import { Button } from '@/components/atom/Button';
import { useThemeStore } from '@/store/themeStore';

export default function Home() {
  const { darkMode, toggleDarkMode } = useThemeStore();

  return (
    <div>
      <Button onClick={toggleDarkMode}>Dark: {String(darkMode)}</Button>
    </div>
  );
}
