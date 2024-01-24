'use client';

import clsx from 'clsx';
import type { Metadata } from 'next';
import { Inter } from 'next/font/google';

import { Box } from '@/components/atom/Box';
import { Sidebar } from '@/components/molecules/Sidebar';
import { useThemeStore } from '@/store/themeStore';
import { baseTokenClass, darkThemeClass, lightThemeClass } from '@/theme/theme.css';

import './global-style.css';
import './globals.css';

const inter = Inter({ subsets: ['latin'] });

// export const metadata: Metadata = {
//   title: "Create Turborepo",
//   description: "Generated by create turbo",
// };

export default function RootLayout({ children }: { children: React.ReactNode }): JSX.Element {
  const { darkMode } = useThemeStore();

  return (
    <html lang="en" className={clsx(inter.className)}>
      <body className={clsx(baseTokenClass, darkMode ? darkThemeClass : lightThemeClass)}>
        <Box>
          <Box display="flex">Music</Box>
          <Box display="flex" width="full" height="full">
            <Box width="64" height="full" display="block">
              <Sidebar.Root activePath="/a/c/d">
                <Sidebar.Item path="/f">F</Sidebar.Item>
                <Sidebar.Group groupPath="/a" label="A">
                  <Sidebar.Item path="/a/b">A/B</Sidebar.Item>
                  <Sidebar.Group groupPath="/a/c" label="A/C">
                    <Sidebar.Item path="/a/c/d">A/C/D</Sidebar.Item>
                  </Sidebar.Group>
                </Sidebar.Group>
              </Sidebar.Root>
            </Box>

            <Box flex="full">{children}</Box>
          </Box>
        </Box>
      </body>
    </html>
  );
}
