// This page only exists for local development.
// In production, Amplify handles this redirect via a 301 rule at the CDN level.
'use client';

import { useEffect } from 'react';
import { useRouter } from '@/i18n/navigation';
import { ROUTES } from '@/lib/routes';

export default function RootRedirect() {
	const router = useRouter();

	useEffect(() => {
		router.replace(ROUTES.home);
	}, [router]);

	return null;
}
