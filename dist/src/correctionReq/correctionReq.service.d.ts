import { Model } from 'mongoose';
export declare class CorrectionReqService {
    private CorrectionReq;
    constructor(CorrectionReq: Model<any>);
    findMyCorrectionReq(crid: any): Promise<any>;
    delMyCorrectionReq(crid: any): Promise<any>;
}
