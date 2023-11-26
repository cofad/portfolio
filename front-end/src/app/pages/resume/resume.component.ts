import { Component } from '@angular/core';
import resumePackage from '../../../../../resume/package.json'

@Component({
  selector: 'app-resume',
  templateUrl: './resume.component.html',
  styleUrl: './resume.component.scss'
})
export class ResumeComponent {
  resumeVersion = resumePackage.version;   
  resumeFileName= `will-warner-resume-${this.resumeVersion}.pdf`
  resumeFileUrl = `/assets/${this.resumeFileName}`
}
