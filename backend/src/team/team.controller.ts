import {
  Controller,
  Get,
  Post,
  Put,
  Patch,
  Delete,
  Param,
  Body,
  Query,
} from '@nestjs/common';
import { TeamService } from './team.service';
import { TeamDepartment } from '@prisma/client';

@Controller('team-members')
export class TeamController {
  constructor(private readonly teamService: TeamService) {}

  @Get()
  async getAllPublished(@Query('department') department?: TeamDepartment) {
    return this.teamService.getAllPublished(department);
  }

  @Get('admin/all')
  async getAllAdmin(
    @Query('department') department?: TeamDepartment,
    @Query('status') status?: string,
  ) {
    return this.teamService.getAllAdmin(department, status);
  }

  @Get(':idOrSlug')
  async getOne(@Param('idOrSlug') idOrSlug: string) {
    return this.teamService.getOne(idOrSlug);
  }

  @Post('admin/create')
  async create(@Body() body: any) {
    return this.teamService.create(body);
  }

  @Put('admin/:id')
  async update(@Param('id') id: string, @Body() body: any) {
    return this.teamService.update(id, body);
  }

  @Patch('admin/:id/status')
  async updateStatus(
    @Param('id') id: string,
    @Body('status') status: string,
  ) {
    return this.teamService.updateStatus(id, status);
  }

  @Delete('admin/:id')
  async delete(@Param('id') id: string) {
    return this.teamService.delete(id);
  }
}

