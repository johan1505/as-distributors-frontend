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
import { OilBottleIcon, JarIcon } from '@/components/icons/FoodIcons';
import type { ComponentType, SVGProps } from 'react';

type IconComponent =
	| LucideIcon
	| ComponentType<SVGProps<SVGSVGElement> & { size?: number | string }>;

export const CATEGORY_ICONS: Record<CategoryKey, IconComponent> = {
	'fresh-produce': Leaf,
	'corned-beef': Beef,
	'canned-fish-tuna': Fish,
	'frozen-fish': Snowflake,
	'canned-vegetables': Carrot,
	'cookies-crackers': Cookie,
	dairy: GlassWater,
	snacks: Popcorn,
	'snacks-guru-lucky': Popcorn,
	chips: Popcorn,
	noodles: Utensils,
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
