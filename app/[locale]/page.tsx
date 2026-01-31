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
