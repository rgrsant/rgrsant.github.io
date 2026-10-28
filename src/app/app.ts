import { Component } from '@angular/core';
import {
  COURSES,
  EDUCATION,
  FEATURED,
  HERO_STEPS,
  PROFILE,
  PROJECT_GROUPS,
  SKILL_GROUPS,
  WORK,
} from './portfolio.data';

@Component({
  selector: 'app-root',
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
  protected readonly steps = HERO_STEPS;
  protected readonly year = new Date().getFullYear();
}
