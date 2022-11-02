import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { DeleteResult } from 'typeorm';
import { CreateReimbursementDto } from './DTO/create-reimbursement.dto';
import { ReimbursementStatus } from './reimbursement-status.enum';
import { Reimbursement } from './reimbursement.entity';
import { ReimbursementRepository } from './reimbursement.repository';
import vision from '@google-cloud/vision';
import { UserService } from 'src/users/user.service';
import { ReimbursementResponseDto } from './DTO/reimbursment-response.dto';

@Injectable()
export class ReimbursementsService {
  constructor(
    @InjectRepository(ReimbursementRepository)
    private reimbursementRepository: ReimbursementRepository,
    private userService: UserService,
  ) {}

  async getReimbursementById(id: number): Promise<Reimbursement> {
    const found = await this.reimbursementRepository.findOne(id);
    if (!found) {
      throw new NotFoundException(`Reimbursement with ID "${id}" not found`);
    }
    return found;
  }

  async getAllReimbursements(): Promise<Reimbursement[]> {
    return await this.reimbursementRepository.find();
  }

  async createReimbursement(
    createReimbursementDto: CreateReimbursementDto,
    filePath,
  ): Promise<ReimbursementResponseDto> {
    const aux = new ReimbursementResponseDto();
    const reimbursement = await this.reimbursementRepository.createReimbursement(
      createReimbursementDto,
      filePath,
    );
    const user = await this.userService.getUserById(
      createReimbursementDto.userId,
    );
    const ticketResponse = await this.testOCR(filePath);
    aux.reimbusment = reimbursement;
    aux.cuitFound = true;
    aux.total = ReimbursementsService.getTotal(ticketResponse);
    if (!ReimbursementsService.isCuitNumber(ticketResponse, user.cuit)) {
      //throw new NotFoundException('Invalid CUIT number');
      aux.cuitFound = false;
    }
    return aux;
  }

  static getIndexByWord(array: string[], word: string) {
    let idx = 0;
    const indexes = [];
    array.forEach(function (element) {
      if (element.includes(word)) {
        indexes.push(idx);
      }
      idx++;
    });
    return indexes;
  }

  static isCuitNumber(array: string[], userCuit: string) {
    const cuit = 'CUIT';
    const indexes = ReimbursementsService.getIndexByWord(array, cuit);
    let flag = false;
    let cuitNumber;
    indexes.forEach(function (idx) {
      cuitNumber = array[idx].replace(/[^0-9]+/gi, '');
      if (cuitNumber === userCuit) {
        flag = true;
      }
    });
    return flag;
  }

  async deleteReimbursement(id: number): Promise<DeleteResult> {
    return await this.reimbursementRepository.delete(id);
  }

  async deleteReimbursement2(id: number): Promise<void> {
    const result = await this.reimbursementRepository.delete(id);

    if (result.affected === 0) {
      throw new NotFoundException(`Reimbursement with ID "${id}" not found`);
    }
  }

  async removeReimbursement(id: number): Promise<Reimbursement> {
    const found = await this.getReimbursementById(id);
    if (!found) {
      throw new NotFoundException(`Reimbursement with ID "${id}" not found`);
    }
    return this.reimbursementRepository.remove(found);
  }

  async updateReimbursementStatus(
    id: number,
    status: ReimbursementStatus,
  ): Promise<Reimbursement> {
    const reimbursement = await this.getReimbursementById(id);
    reimbursement.status = status;
    await reimbursement.save();
    return reimbursement;
  }

  async testOCR(ticketUrl: string): Promise<string[]> {
    // Creates a client
    const client = new vision.ImageAnnotatorClient({
      keyFilename: './src/reimbursements/api.json',
    });
    // Performs text detection on the local file
    const [result] = await client.textDetection(ticketUrl);
    const detections = result.textAnnotations;
    return detections[0].description.split('\n');
  }

  static getTotal(array: string[]) {
    const total = 'TOTAL';
    const indexes = ReimbursementsService.getIndexByWord(array, total);
    let response = [];
    if (indexes.length > 0) {
      response = array[indexes[indexes.length - 1]].match(
        /([-+]?[0-9]+\.[0-9]+)/,
      );
      if (response) {
        return response.pop();
      }
    }
    return null;
  }
}
