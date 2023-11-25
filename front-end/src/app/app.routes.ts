import { Routes } from '@angular/router';
import { HomeComponent } from './pages/home/home.component';
import { AboutComponent } from './pages/about/about.component';
import { ContactComponent } from './pages/contact/contact.component';
import { ResumeComponent } from './pages/resume/resume.component';

export const routes: Routes = [
    {
        path: '',
        component: HomeComponent,
        title: 'Home',
    },
    {
        path: 'about',
        component: AboutComponent,
        title: 'About',
    },
    {
        path: 'contact',
        component: ContactComponent,
        title: 'Contact',
    },
    {
        path: 'resume',
        component: ResumeComponent,
        title: 'Resume',
    },
];
