import { en } from './en';
import { vi } from './vi';
import { es } from './es';
import { zh } from './zh';
import type { Translation } from './en';

export const translations: Record<string, Translation> = {
    en,
    vi,
    es,
    zh
};

export type { Translation };
