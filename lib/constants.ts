import type { CategoryKey, ProductSlug } from './products';
import { BASE_URL } from './site-config';

export const JSON_LD_CONSTANTS = {
	ORGANIZATION: `${BASE_URL}/#organization`,
	WEBSITE: `${BASE_URL}/#website`,
	PRODUCT: (categoryKey: CategoryKey, productSlug: ProductSlug) =>
		`${BASE_URL}/products/${categoryKey}/${productSlug}`,
} as const;

export const CONTANCT = {
	TELEPHONE: '209-406-7888',
	EMAIL: 'sales@pacificislanderfoods.com',
	ADDRESS: {
		street: '4710 Elm Street',
		city: 'Salida',
		state: 'CA',
		zipCode: '95368',
		country: 'US',
	},
};
