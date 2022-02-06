import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { DeleteResult, In } from 'typeorm';
import { CreateReimbursementDto } from './DTO/create-reimbursement.dto';
import { GetReimbursementsFilterDto } from './DTO/get-reimbursements-filter.dto';
import { ReimbursementStatus } from './reimbursement-status.enum';
import { Reimbursement } from './reimbursement.entity';
import { ReimbursementRepository } from './reimbursement.repository';
@Injectable()
export class ReimbursementsService {
    constructor(
        @InjectRepository(ReimbursementRepository)
        private reimbursementRepository: ReimbursementRepository,
    ) {}

    // getAllTasks(): Task[]{
    //     return this.tasks;
    // }

    // getTasksWithFilter(filterDto: GetTasksFilterDto): Task[]{
    //     const {status, search} = filterDto;
    //     let tasks = this.getAllTasks();
    //     if(status){
    //         tasks = tasks.filter(task => task.status === status);
    //     }
    //     if(search){
    //         tasks = tasks.filter(task =>
    //             task.title.includes(search) ||
    //             task.description.includes(search),
    //         );
    //     }
    //     return tasks;
    // }

    async getReimbursementById(id:number): Promise<Reimbursement> {
        const found = await this.reimbursementRepository.findOne(id);
        if (!found){
            throw new NotFoundException(`Reimbursement with ID "${id}" not found`);
        }
        return found;
    }

    //service getAllReimbursements
    async getAllReimbursements(): Promise<Reimbursement[]>{
        return await this.reimbursementRepository.find();
    }

    async createReimbursement(createReimbursementDto: CreateReimbursementDto, filePath): Promise <Reimbursement>{
        return this.reimbursementRepository.createReimbursement(createReimbursementDto, filePath);
    }

    async deleteReimbursement(id: number): Promise<DeleteResult>{
        return await this.reimbursementRepository.delete(id);
    }

    async deleteReimbursement2(id:number): Promise<void> {
        const result = await this.reimbursementRepository.delete(id);

        if (result.affected === 0) {
            throw new NotFoundException(`Reimbursement with ID "${id}" not found`);
        }
    }

    async removeReimbursement(id: number): Promise<Reimbursement>{
        const found= await this.getReimbursementById(id);
        if (!found){
            throw new NotFoundException(`Reimbursement with ID "${id}" not found`);
        }
        return this.reimbursementRepository.remove(found);
    }

    async updateReimbursementStatus(id: number, status: ReimbursementStatus): Promise<Reimbursement>{
             const reimbursement = await this.getReimbursementById(id);
             reimbursement.status = status;
             await reimbursement.save();
             return reimbursement;
        }

    // getTaskById(id: string): Task{
    //     const found = this.tasks.find(task => task.id === id);
    //     if (!found){
    //         throw new NotFoundException(`Task with ID "${id}" not found`);
    //     }
    //     return found;
    // }

    // delteTask(id: string){
    //     const found = this.getTaskById(id);
    //     this.tasks = this.tasks.filter(task => task.id !== found.id);
    // }

    // updateTaskStatus(id: string, status: TaskStatus): Task{
    //     const task = this.getTaskById(id);
    //     task.status = status;
    //     return task;
    // }

    // createTask(createTaskDto: CreateTaskDto): Task{
    //     const {title, description} = createTaskDto;
    //     const task: Task ={
    //         id: uuid(),
    //         title,
    //         description,
    //         status: TaskStatus.OPEN,
    //     };
    //     this.tasks.push(task);
    //     return task;
    // }

}
