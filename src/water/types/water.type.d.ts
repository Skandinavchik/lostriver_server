import { LicenseType, WaterType } from '@prisma/client';

export type Sort = 'asc' | 'desc';

export interface IReqQueryObject {
	q?: string;
	sort?: Sort;
	wtypes?: WaterType;
	ltypes?: LicenseType;
};