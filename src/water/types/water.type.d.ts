export type Sort = 'asc' | 'desc';

export interface IReqQueryObject {
	q?: string;
	sort?: Sort;
	org?: string;
};