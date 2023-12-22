import { Model } from 'mongoose';
export declare class DesignationService {
    private Designation;
    constructor(Designation: Model<any>);
    giveMyDesignation(desgId: any): Promise<any>;
    delMyDesignation(desgId: any): Promise<any>;
}
