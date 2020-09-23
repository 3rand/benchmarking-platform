// Angular
import {NgModule, CUSTOM_ELEMENTS_SCHEMA} from '@angular/core';
import {JwtModule} from '@auth0/angular-jwt';
// Modules
import {AppRoutingModule} from './app-routing.module';
import {SharedModule} from './shared/shared.module';
// Services
import {SequenceService} from './services/sequence.service';
import {UserService} from './services/user.service';
import {AuthService} from './services/auth.service';
import {AuthGuardLogin} from './services/auth-guard-login.service';
import {AuthGuardAdmin} from './services/auth-guard-admin.service';
import {JobsService} from './services/jobs.service';

// Components
import {AppComponent} from './app.component';
import {AboutComponent} from './about/about.component';
import {RegisterComponent} from './account-management/register/register.component';
import {LoginComponent} from './account-management/login/login.component';
import {LogoutComponent} from './account-management/logout/logout.component';
import {AccountComponent} from './account-management/account/account.component';
import {AdminComponent} from './administration/admin/admin.component';
import {NotFoundComponent} from './not-found/not-found.component';
import { DatasetComponent } from './datasets/dataset/dataset.component';
import { SequenceFileComponent } from './datasets/sequence-file/sequence-file.component';
import { SequencesComponent } from './datasets/sequences/sequences.component';
import { DatasetDetailsComponent } from './datasets/dataset-details/dataset-details.component';
import {Ng2SmartTableModule} from 'ng2-smart-table';
import {NgbModule} from '@ng-bootstrap/ng-bootstrap';
import {DatasetService} from './services/datasets.service';
import {SequenceFilesService} from './services/sequence-files.service';
import {NgxUploaderModule} from 'ngx-uploader';
import { AnnotationComponent } from './annotations/annotation/annotation.component';
import { AnnotationDetailsComponent } from './annotations/annotation-details/annotation-details.component';
import {NgxChartsModule} from '@swimlane/ngx-charts';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import { GermlineComponent } from './germlines/germline/germline.component';
import { GermlineDetailsComponent } from './germlines/germline-details/germline-details.component';
import { BenchmarkComponent } from './benchmarks/benchmark/benchmark.component';
import { BenchmarkDetailsComponent } from './benchmarks/benchmark-details/benchmark-details.component';
import { ToolComponent } from './tools/tool/tool.component';
import { JobComponent } from './jobs/job/job.component';
import {GermlinesService} from './services/germlines.service';


export function tokenGetter() {
    return localStorage.getItem('token');
}

@NgModule({
    declarations: [
        AppComponent,
        AboutComponent,
        RegisterComponent,
        LoginComponent,
        LogoutComponent,
        AccountComponent,
        AdminComponent,
        NotFoundComponent,
        DatasetComponent,
        SequenceFileComponent,
        SequencesComponent,
        DatasetDetailsComponent,
        AnnotationComponent,
        AnnotationDetailsComponent,
        GermlineComponent,
        GermlineDetailsComponent,
        BenchmarkComponent,
        BenchmarkDetailsComponent,
        ToolComponent,
        JobComponent,
    ],
    imports: [
        AppRoutingModule,
        SharedModule,
        JwtModule.forRoot({
            config: {
                tokenGetter,
                // whitelistedDomains: ['localhost:3000', 'localhost:4200']
            }
        }),
        Ng2SmartTableModule,
        NgbModule,
        NgxUploaderModule,
        NgxChartsModule,
        BrowserAnimationsModule
    ],
    providers: [
        AuthService,
        AuthGuardLogin,
        AuthGuardAdmin,
        SequenceService,
        UserService,
        DatasetService,
        SequenceFilesService,
        GermlinesService,
        JobsService
    ],
    schemas: [CUSTOM_ELEMENTS_SCHEMA],
    bootstrap: [AppComponent]
})

export class AppModule {
}
