// This page only exists for local development.
// In production, Amplify handles this redirect via a 301 rule at the CDN level.
'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { ROUTES } from '@/lib/routes';

export default function BaseRedirect() {
	const router = useRouter();

	useEffect(() => {
		router.replace(`/en${ROUTES.home}`);
	}, [router]);

	return null;
}
