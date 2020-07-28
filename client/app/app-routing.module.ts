// Angular
import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
// Services
import {AuthGuardLogin} from './services/auth-guard-login.service';
import {AuthGuardAdmin} from './services/auth-guard-admin.service';
// Components
import {AboutComponent} from './about/about.component';
import {RegisterComponent} from './account-management/register/register.component';
import {LoginComponent} from './account-management/login/login.component';
import {LogoutComponent} from './account-management/logout/logout.component';
import {AccountComponent} from './account-management/account/account.component';
import {AdminComponent} from './administration/admin/admin.component';
import {NotFoundComponent} from './not-found/not-found.component';
import {DatasetComponent} from './datasets/dataset/dataset.component';
import {DatasetDetailsComponent} from './datasets/dataset-details/dataset-details.component';
import {SequenceFileComponent} from './datasets/sequence-file/sequence-file.component';
import {SequencesComponent} from './datasets/sequences/sequences.component';
import {AnnotationComponent} from './annotations/annotation/annotation.component';
import {AnnotationDetailsComponent} from './annotations/annotation-details/annotation-details.component';
import {GermlineComponent} from './germlines/germline/germline.component';
import {GermlineDetailsComponent} from './germlines/germline-details/germline-details.component';
import {BenchmarkComponent} from './benchmarks/benchmark/benchmark.component';
import {BenchmarkDetailsComponent} from './benchmarks/benchmark-details/benchmark-details.component';
import {ToolComponent} from './tools/tool/tool.component';
import {JobComponent} from './jobs/job/job.component';

const routes: Routes = [
    {path: '', component: AboutComponent},

    {path: 'register', component: RegisterComponent},
    {path: 'login', component: LoginComponent},
    {path: 'logout', component: LogoutComponent},
    {path: 'account', component: AccountComponent, canActivate: [AuthGuardLogin]},

    {path: 'admin', component: AdminComponent, canActivate: [AuthGuardAdmin]},

    {path: 'datasets', component: DatasetComponent, canActivate: [AuthGuardLogin]},
    {path: 'datasets/:id', component: DatasetDetailsComponent, canActivate: [AuthGuardLogin]},
    {path: 'sequenceFiles', component: SequenceFileComponent, canActivate: [AuthGuardLogin]},
    {path: 'sequences', component: SequencesComponent, canActivate: [AuthGuardLogin]},
    {path: 'sequences/dataset/:datasetId', component: SequencesComponent, canActivate: [AuthGuardLogin]},
    {path: 'sequences/file/:fileId', component: SequencesComponent, canActivate: [AuthGuardLogin]},
    {path: 'sequences/:sequenceId', component: SequencesComponent, canActivate: [AuthGuardLogin]},

    {path: 'annotations', component: AnnotationComponent, canActivate: [AuthGuardLogin]},
    {path: 'annotations/:id/details', component: AnnotationDetailsComponent, canActivate: [AuthGuardLogin]},
    {path: 'annotations/:id/sequences', component: AnnotationDetailsComponent, canActivate: [AuthGuardLogin]},

    {path: 'germlines', component: GermlineComponent, canActivate: [AuthGuardLogin]},
    {path: 'germlines/:id', component: GermlineDetailsComponent, canActivate: [AuthGuardLogin]},
    {path: 'germlines/:id/vgenes', component: GermlineDetailsComponent, canActivate: [AuthGuardLogin]},
    {path: 'germlines/:id/dgenes', component: GermlineDetailsComponent, canActivate: [AuthGuardLogin]},
    {path: 'germlines/:id/jgenes', component: GermlineDetailsComponent, canActivate: [AuthGuardLogin]},

    {path: 'benchmarks', component: BenchmarkComponent, canActivate: [AuthGuardLogin]},
    {path: 'benchmarks/:id', component: BenchmarkDetailsComponent, canActivate: [AuthGuardLogin]},

    {path: 'tools', component: ToolComponent},

    {path: 'jobs', component: JobComponent, canActivate: [AuthGuardLogin]},
    {path: 'jobs/:id', component: JobComponent, canActivate: [AuthGuardLogin]},

    {path: 'notfound', component: NotFoundComponent},
    {path: '**', redirectTo: '/notfound'},
];

@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule]
})

export class AppRoutingModule {
}
