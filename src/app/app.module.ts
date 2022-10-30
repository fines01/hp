import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HomeComponent } from './home/home.component';

import {MatToolbarModule} from '@angular/material/toolbar';
import {MatIconModule} from '@angular/material/icon';
import {MatButtonModule} from '@angular/material/button';
import {MatTooltipModule} from '@angular/material/tooltip';
import {MatProgressBarModule} from '@angular/material/progress-bar';
// import {MatFormFieldModule} from '@angular/material/form-field';
// import {MatInputModule} from '@angular/material/input';

import { PortfolioComponent } from './portfolio/portfolio.component';
import { ContactComponent } from './contact/contact.component';
import { AboutComponent } from './about/about.component';
import { FooterComponent } from './footer/footer.component';
import { MainComponent } from './main/main.component';
import { ReactiveFormsModule } from '@angular/forms';  
import { HttpClientModule } from '@angular/common/http';
import { ContactService } from './contact.service';
import { DialogContactResponseComponent } from './dialog-contact-response/dialog-contact-response.component';
import {MatDialogModule} from '@angular/material/dialog';
import { ObserveIntersectionDirective } from './directives/observe-intersection.directive';


@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    PortfolioComponent,
    ContactComponent,
    AboutComponent,
    FooterComponent,
    MainComponent,
    DialogContactResponseComponent,
    ObserveIntersectionDirective,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MatToolbarModule,
    MatIconModule,
    MatButtonModule,
    MatTooltipModule,
    MatProgressBarModule,
    ReactiveFormsModule,
    HttpClientModule,
    MatDialogModule,
  ],
  providers: [
    ContactService,
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
