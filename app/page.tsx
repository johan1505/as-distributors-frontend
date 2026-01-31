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
