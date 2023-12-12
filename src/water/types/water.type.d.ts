import { $Enums } from '@prisma/client'
import { AllowedColor, WaterOrder, WaterSearch } from '../dto/water.dto'


export type WaterArgs = {
	q?: string
	order?: WaterOrder[]
	wtypes?: $Enums.WaterType[]
	ltypes?: $Enums.LicenseType[]
}