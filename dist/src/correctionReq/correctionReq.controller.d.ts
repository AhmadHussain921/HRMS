import { Response, Request } from 'express';
import { CorrectionReqService } from './correctionReq.service';
import { EmployeeService } from 'src/employee/employee.service';
import { CorrectionReqRequestDto, EIdQueryRequestDto, CRIDQueryRequestDto, ECRIDQueryRequestDto } from './correctionReq.dtos';
import { Model } from 'mongoose';
export declare class CorrectionReqController {
    private CorrectionReq;
    private readonly correctionReqService;
    private readonly employeeService;
    constructor(CorrectionReq: Model<any>, correctionReqService: CorrectionReqService, employeeService: EmployeeService);
    allCorrections(req: Request, res: Response): Promise<void>;
    myCorrectionReq(req: any, res: Response): Promise<void>;
    addCorrection(req: Request, res: Response, body: CorrectionReqRequestDto, query: EIdQueryRequestDto): Promise<void>;
    updateCorrection(req: Request, res: Response, body: CorrectionReqRequestDto, query: CRIDQueryRequestDto): Promise<void>;
    deleteCorrection(req: Request, res: Response, query: ECRIDQueryRequestDto): Promise<void>;
}
