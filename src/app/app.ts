import { Component } from '@angular/core';
import { Activity } from './activity';
import { Decrypt } from './decrypt.directive';
import { GalleryComponent } from './gallery';
import { highlight } from './highlight';
import { MatrixRain } from './matrix-rain';
import { Reveal } from './reveal.directive';
import {
  COURSES,
  EDUCATION,
  FEATURED,
  HERO_CODE,
  HERO_FILE,
  HERO_REPL,
  NINJAZAP_COMMITS,
  PROFILE,
  PROJECT_GROUPS,
  SKILL_GROUPS,
  WORK,
} from './portfolio.data';

@Component({
  selector: 'app-root',
  imports: [MatrixRain, Decrypt, Reveal, GalleryComponent, Activity],
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
  protected readonly heroFile = HERO_FILE;
  protected readonly codeLines = highlight(HERO_CODE);
  protected readonly repl = HERO_REPL;
  protected readonly commits = NINJAZAP_COMMITS;
  protected readonly maxRepoCommits = Math.max(...WORK.repos.map((r) => r.commits));
  protected readonly year = new Date().getFullYear();
}
