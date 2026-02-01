import { Sansita } from 'next/font/google';
import './globals.css';

// Global font configuration - change this to update the font across the entire app
const sansita = Sansita({
	subsets: ['latin'],
	weight: ['400', '700', '800', '900'],
	variable: '--font-primary',
});

export default function RootLayout({
	children,
}: Readonly<{
	children: React.ReactNode;
}>) {
	return (
		<html lang="en" className={sansita.variable} suppressHydrationWarning>
			<body className="antialiased">{children}</body>
		</html>
	);
}
