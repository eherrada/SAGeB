import {IsNotEmpty} from 'class-validator'

export class CreateReimbursementDto{
    @IsNotEmpty()
    title: string;

    @IsNotEmpty()
    description: string;
}
