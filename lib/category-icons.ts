import {
	Beef,
	Fish,
	Carrot,
	Cookie,
	Popcorn,
	Candy,
	Wheat,
	Coffee,
	Drumstick,
	Utensils,
	Bird,
	Leaf,
	Snowflake,
	GlassWater,
	type LucideIcon,
} from 'lucide-react';
import type { CategoryKey } from './products';
import { OilBottleIcon, JarIcon, CrackerIcon } from '@/components/icons/FoodIcons';
import type { ComponentType, SVGProps } from 'react';

type IconComponent =
	| LucideIcon
	| ComponentType<SVGProps<SVGSVGElement> & { size?: number | string }>;

export const CATEGORY_ICONS: Record<CategoryKey, IconComponent> = {
	'corned-beef': Beef,
	'fish-tuna': Fish,
	'canned-vegetables': Carrot,
	cookies: Cookie,
	crackers: CrackerIcon,
	snacks: Popcorn,
	candies: Candy,
	'pickles-spices': JarIcon,
	oils: OilBottleIcon,
	'breakfast-cereal': Wheat,
	'powders-teas': Coffee,
	'lamb-goat': Drumstick,
	sausages: Utensils,
	'white-meats': Bird,
	'root-vegetables': Leaf,
	'misc-frozen-fresh': Snowflake,
	drinks: GlassWater,
};
