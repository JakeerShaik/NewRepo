import { JobReassignComponent } from './job-reassign/job-reassign.component';
import { JobReallocationComponent } from './job-reallocation/job-reallocation.component';
import { PendingJobComponent } from './pending-job/pending-job.component';
import { CompletedJobComponent } from './completed-job/completed-job.component';
import { OutstandingJobComponent } from './outstanding-job/outstanding-job.component';
import { JobDocMapComponent } from './job-doc-map/job-doc-map.component';
import { JobColMapComponent } from './job-col-map/job-col-map.component';
import { JobTypeComponent } from './job-type/job-type.component';
import { JobAllocationComponent } from './job-allocation/job-allocation.component';
import { CreateDocumentComponent } from './create-document/create-document.component';
import { CreateJobComponent } from './create-job/create-job.component';
import { WebUserComponent } from './web-user/web-user.component';
import { AuthGuard } from './_guards/auth.guard';
import { HomeComponent } from './home/home.component';
import { Routes, RouterModule } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { AgentAddComponent } from './agent-add/agent-add.component';
import { CreateCollateralComponent } from './create-collateral/create-collateral.component';

const appRoutes: Routes = [
    { path: 'login', component: LoginComponent},
    { path: 'home', component: HomeComponent,canActivate:[AuthGuard]},
    { path: 'agent', component: AgentAddComponent,canActivate:[AuthGuard]},
    { path: 'create-collateral', component: CreateCollateralComponent,canActivate:[AuthGuard]},
    { path: 'user', component: WebUserComponent,canActivate:[AuthGuard]},
    { path: 'create-job', component: CreateJobComponent,canActivate:[AuthGuard]},
    { path: 'create-document', component: CreateDocumentComponent,canActivate:[AuthGuard]},
    { path: 'job-allocation', component: JobAllocationComponent,canActivate:[AuthGuard]},
    { path: 'job-type', component: JobTypeComponent,canActivate:[AuthGuard]},
    { path: 'job-col-map', component: JobColMapComponent,canActivate:[AuthGuard]},
    { path: 'job-doc-map', component: JobDocMapComponent,canActivate:[AuthGuard]},
    { path: 'outstanding-job', component: OutstandingJobComponent,canActivate:[AuthGuard]},
    { path: 'completed-job', component: CompletedJobComponent,canActivate:[AuthGuard]},
    { path: 'pending-job', component: PendingJobComponent,canActivate:[AuthGuard]},
    { path: 'job-reallocation', component: JobReallocationComponent,canActivate:[AuthGuard]},
    { path: 'job-reassign', component: JobReassignComponent,canActivate:[AuthGuard]},
    
    // otherwise redirect to Login
    { path: '**', redirectTo: 'login' }
];

export const routing = RouterModule.forRoot(appRoutes);