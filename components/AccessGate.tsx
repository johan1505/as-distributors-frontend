'use client';

import { type FormEvent, useEffect, useState } from 'react';
import { useTranslations } from 'next-intl';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';

const ACCESS_CODE = '15051002';
const STORAGE_KEY = 'as-access-granted';

export function AccessGate({ children }: { children: React.ReactNode }) {
	const t = useTranslations('accessGate');
	const [granted, setGranted] = useState<boolean | null>(null);
	const [code, setCode] = useState('');
	const [error, setError] = useState(false);

	useEffect(() => {
		setGranted(localStorage.getItem(STORAGE_KEY) === 'true');
	}, []);

	function handleSubmit(e: FormEvent) {
		e.preventDefault();
		if (code === ACCESS_CODE) {
			localStorage.setItem(STORAGE_KEY, 'true');
			setGranted(true);
		} else {
			setError(true);
		}
	}

	// Still checking localStorage
	if (granted === null) {
		return null;
	}

	if (granted) {
		return <>{children}</>;
	}

	return (
		<div className="flex min-h-screen items-center justify-center bg-background p-4">
			<div className="w-full max-w-sm space-y-6 text-center">
				<div className="space-y-2">
					<h1 className="text-2xl font-bold">{t('title')}</h1>
					<p className="text-muted-foreground text-sm">{t('description')}</p>
				</div>
				<form onSubmit={handleSubmit} className="space-y-4">
					<Input
						type="text"
						value={code}
						onChange={(e) => {
							setCode(e.target.value);
							setError(false);
						}}
						placeholder={t('placeholder')}
						autoFocus
					/>
					{error && <p className="text-destructive text-sm">{t('error')}</p>}
					<Button type="submit" className="w-full">
						{t('submit')}
					</Button>
				</form>
			</div>
		</div>
	);
}
