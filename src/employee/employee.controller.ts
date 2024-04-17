import { Controller, Get, Post, Body, Query, HttpCode } from '@nestjs/common';
import { EmployeeService } from './employee.service';
import { CreateEmployeeDto, DeleteEmployeeDto, UpdateEmployeeDto } from './dto';
import { PagedDataQuery } from 'src/interface/tabular';
import { IndexEmployeeRequest } from './model';
import { ApiTags } from '@nestjs/swagger';

@ApiTags('Employee')
@Controller('employee')
export class EmployeeController {
  constructor(private readonly employeeService: EmployeeService) {}

  @Post('/create')
  @HttpCode(200)
  create(@Body() payload: CreateEmployeeDto) {
    return this.employeeService.create(payload);
  }

  @Post('/index')
  @HttpCode(200)
  findAll(@Body() payload: PagedDataQuery<IndexEmployeeRequest>) {
    return this.employeeService.findAll(payload);
  }

  @Get('/getDetail')
  findOne(@Query('id') id: string) {
    return this.employeeService.findOne(id);
  }

  @Post('/update')
  @HttpCode(200)
  update(@Body() payload: UpdateEmployeeDto) {
    return this.employeeService.update(payload);
  }

  @Post('/delete')
  @HttpCode(200)
  remove(@Body() payload: DeleteEmployeeDto) {
    return this.employeeService.remove(payload.employeeId);
  }
}
