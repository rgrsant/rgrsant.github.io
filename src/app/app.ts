import { Component } from '@angular/core';
import { Decrypt } from './decrypt.directive';
import { MatrixRain } from './matrix-rain';
import { Reveal } from './reveal.directive';
import {
  COURSES,
  EDUCATION,
  FEATURED,
  HERO_LINES,
  PROFILE,
  PROJECT_GROUPS,
  SKILL_GROUPS,
  WORK,
  gherkinSummary,
} from './portfolio.data';

@Component({
  selector: 'app-root',
  imports: [MatrixRain, Decrypt, Reveal],
  templateUrl: './app.html',
  styleUrl: './app.scss',
})
export class App {
  protected readonly profile = PROFILE;
  protected readonly work = WORK;
  protected readonly featured = FEATURED;
  protected readonly groups = PROJECT_GROUPS;
  protected readonly skillGroups = SKILL_GROUPS;
  protected readonly education = EDUCATION;
  protected readonly courses = COURSES;
  protected readonly lines = HERO_LINES;
  protected readonly summary = gherkinSummary(HERO_LINES);
  protected readonly year = new Date().getFullYear();
}
