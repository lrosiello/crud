import './globals.css';
import styles from './page.module.css'

import { Inter } from 'next/font/google';

import "rsuite/dist/rsuite.min.css";

const inter = Inter({ subsets: ['latin'] });




export const metadata = {
  title: 'Create Next App',
  description: 'Generated by create next app',
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={inter.className} >
      
        
        <div className={styles.main}>
        
        {children}
        </div>
      </body>
    </html>
  );
}
