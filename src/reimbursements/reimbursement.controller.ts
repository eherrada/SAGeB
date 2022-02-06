import { Controller, Get, Post, Body, Param, Delete, Patch, Query, UsePipes, ValidationPipe, ParseIntPipe, UseGuards, UseInterceptors, UploadedFile } from '@nestjs/common';
import { ReimbursementsService } from './reimbursement.service';
import { CreateReimbursementDto } from './DTO/create-reimbursement.dto';
import { ReimbursementStatusValidationPipe } from './pipes/reimbursement-status-validtaion.pipe';
import { Reimbursement } from './reimbursement.entity';
import { ReimbursementStatus } from './reimbursement-status.enum';
import { AuthGuard } from '@nestjs/passport';
import { Observable, of } from 'rxjs';
import { fileURLToPath } from 'url';
import { FileInterceptor } from '@nestjs/platform-express';
import { diskStorage } from 'multer';
import vision from '@google-cloud/vision';


@Controller('Reimbursements')
@UseGuards(AuthGuard())
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

    @Get('/')
    getAllReimbursements(): Promise<Reimbursement[]>{
        return this.reimbursementService.getAllReimbursements();
    }


    @Delete('/:id')
    deleteReimbursement(@Param('id', ParseIntPipe) id: number): Promise<void>{
        //return this.taskService.deleteTask(id);
        return this.reimbursementService.deleteReimbursement2(id);
        
    }

    @Patch('/:id/status')
    async updateReimbursementStatus(
        @Param('id', ParseIntPipe) id: number,
        @Body('status', ReimbursementStatusValidationPipe) status: ReimbursementStatus
    ): Promise<Reimbursement> {
        return await this.reimbursementService.updateReimbursementStatus(id, status);
     }

    @Post()
    @UsePipes(ValidationPipe)
    @UseInterceptors(FileInterceptor('file', {
        storage: diskStorage({
            destination: './uploads/invoices',
            filename: (req, file, cb) => {
                const randomName = Array(32).fill(null).map(() => (Math.round(Math.random() * 16)).toString(16)).join('');
                return cb(null, `${randomName}-${file.originalname}`);
            }
        })
    }))
    createReimbursement(@UploadedFile() file, @Body() createReimbursementDto : CreateReimbursementDto): Promise<Reimbursement> {
        return this.reimbursementService.createReimbursement(createReimbursementDto, file.path);
    }

    @Post('/url')
    async testOCR(@Body () ticketUrl: string){  
        // Creates a client
        const client = new vision.ImageAnnotatorClient({
            keyFilename: './src/reimbursements/api.json'
        });
        //const fileName = './src/reimbursements/images/ticket.png';
        const fileName = './uploads/invoices/5cb6974dc1a9cb655e3f9513a64fac15-ticket.jpg';
        console.log(ticketUrl);
        console.log(fileName);
        // Performs text detection on the local file
        const [result] = await client.textDetection(ticketUrl);
        const detections = result.textAnnotations;
        //detections.forEach(text => console.log(text));
        return detections[0].description;
    }

}


    // @Post('/upload')
    // @UseInterceptors(FileInterceptor('file', {
    //     storage: diskStorage({
    //         destination: './uploads/invoices',
    //         filename: (req, file, cb) => {
    //             const randomName = Array(32).fill(null).map(() => (Math.round(Math.random() * 16)).toString(16)).join('');
    //             return cb(null, `${randomName}-${file.originalname}`);
    //         }
    //     })
    // }))
    // uploadFile(@UploadedFile() file): Observable<Object> {
    //     return of({imagePath: file.path}); 
    // }
