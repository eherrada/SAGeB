import { Controller, Get, Post, Body, Param, Delete, Patch, Query, UsePipes, ValidationPipe, ParseIntPipe } from '@nestjs/common';
import { ReimbursementsService } from './reimbursements.service';
import { CreateReimbursementDto } from './DTO/create-reimbursement.dto';
import { ReimbursementStatusValidationPipe } from './pipes/reimbursement-status-validtaion.pipe';
import { Reimbursement } from './reimbursement.entity';
import { ReimbursementStatus } from './reimbursement-status.enum';
const vision = require('@google-cloud/vision');


@Controller('Reimbursements')
export class ReimbursementsController{ 
    constructor(private reimbursementService : ReimbursementsService) {}    

    // @Get()
    // getTasks(@Query(ValidationPipe) filterDto: GetTasksFilterDto): Task[]{
    //     if(Object.keys(filterDto).length){
    //         return this.taskService.getTasksWithFilter(filterDto);
    //     } else {
    //         return this.taskService.getAllTasks();
    //     }
    // }

    @Get('/:id')
    getReimbursementById(@Param('id', ParseIntPipe) id: number): Promise<Reimbursement>{
        return this.reimbursementService.getReimbursementById(id);
    }

    @Delete('/:id')
    deleteReimbursement(@Param('id', ParseIntPipe) id: number): Promise<void>{
        //return this.taskService.deleteTask(id);
        return this.reimbursementService.deleteReimbursement2(id);
        
    }

    @Patch('/:id/status')
    async updateReimbursementStatus(
        @Param('id', ParseIntPipe) id: number,
        @Body('status', ReimbursementReimbursementValidationPipe) status: ReimbursementStatus
    ): Promise<Reimbursement> {
        return await this.reimbursementService.updateReimbursementStatus(id, status);
     }

    @Post()
    @UsePipes(ValidationPipe)
    createReimbursement(@Body() createReimbursementDto : CreateReimbursementDto): Promise<Reimbursement> {
        return this.reimbursementService.createReimbursement(createReimbursementDto);

    }

    @Post()
    testOCR(){

    }

    async function testOCR(cuit,ticket){
        // Creates a client
        const client = new vision.ImageAnnotatorClient({
            keyFilename: 'apiKey.json'
        });
        const fileName = ticketList[ticket];
        // Performs text detection on the local file
        const [result] = await client.textDetection(fileName);
        const detections = result.textAnnotations;
        //detections.forEach(text => console.log(text));
        return detections;
    }
    

}
0