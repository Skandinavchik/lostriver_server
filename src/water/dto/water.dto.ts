import { LicenseType, WaterType } from '@prisma/client';



export class WaterDto {
	serialNumber: string;
	title: string;
	organizationId: string;
	cover: string;
	visitorPrice: number;
	memberPrice: number;
	waterType: WaterType;
	licenseType: LicenseType[];
}