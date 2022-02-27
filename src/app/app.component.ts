import { animate, state, style, transition, trigger } from '@angular/animations';
import { Component, ElementRef, HostListener, OnInit, ViewChild } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  animations: [
    trigger('fade', [
      state('true', style({ opacity: 1 })),
      state('false', style({ opacity: 0 })),
      transition('false <=> true', animate(700, style({ opacity: 1 })))
    ])
  ]
})
export class AppComponent implements OnInit {
  constructor(private modalService: NgbModal) {
  }

  ngOnInit() {
    //this.typeWriterEffect();
  }

  contents = ["Educational qualification", "Work experience", "Skills", "Projects", "Achievements", "Contact"];
  viewIndex = -1;
  openContent(content: any, view: number) {
    this.viewIndex = view;
    this.modalService.open(content, { size: 'xl', scrollable: true, centered: true, keyboard: false, backdrop: 'static' });
  }

  changeContent(increment: number) {
    this.viewIndex = this.viewIndex + increment;
  }

  typeWriterContents = ["Thanks for visiting :)", "Let's connect!"];
  typeWriterContent = "";
  typeWriterContentIndex = 0;
  typeWriterContentToDisplay = "";
  incrementer = 1;
  freezeTimer = 0;
  typeWriterEffect() {
    setInterval(() => {
      if (!this.freezeTimer) {
        if (this.typeWriterContentIndex <= 0) {
          this.typeWriterContent = this.typeWriterContent.length ? (this.typeWriterContents.indexOf(this.typeWriterContent) + 1 >= this.typeWriterContents.length ? this.typeWriterContents[0] : this.typeWriterContents[this.typeWriterContents.indexOf(this.typeWriterContent) + 1]) : this.typeWriterContents[0];
          this.typeWriterContentIndex = 0;
          this.incrementer = 1;
        }
        this.typeWriterContentToDisplay = this.typeWriterContent.substring(0, this.typeWriterContentIndex + this.incrementer);
        this.typeWriterContentIndex = this.typeWriterContentIndex + this.incrementer;
        if (this.typeWriterContentIndex == this.typeWriterContent.length) {
          this.incrementer = -1;
          this.freezeTimer = 20;
        }
      }
      else
        this.freezeTimer--;
    }, 175);
  }

  contentView() {
    let elmntToView = document.getElementById("smooth-scroll-view");
    if (elmntToView)
      elmntToView.scrollIntoView({ behavior: "smooth" });
  }

  downloadResume() {
    let link = document.createElement("a");
    link.download = "Resume-DeepakMohanSingh";
    link.href = "assets/Resume-DeepakMohanSingh.pdf";
    link.click();
    link.remove();
  }

  openLink(link: string) {
    window.open(link);
  }

  @ViewChild('educationContent') educationContent: ElementRef | undefined;
  @ViewChild('experienceContent') experienceContent: ElementRef | undefined;
  @ViewChild('skillsContent') skillsContent: ElementRef | undefined;
  @ViewChild('achievementsContent') achievementsContent: ElementRef | undefined;
  @ViewChild('contactContent') contactContent: ElementRef | undefined;

  public animateEducationContent = false;
  public animateExperienceContent = false;
  public animateSkillsContent = false;
  public animateAchievementsContent = false;
  public animateContactContent = false;

  @HostListener('window:scroll')
  checkScroll() {
    const scrollPosition = window.pageYOffset + window.innerHeight;

    this.animateEducationContent = this.educationContent ? scrollPosition >= (this.educationContent.nativeElement.offsetTop + 150) : false;
    this.animateExperienceContent = this.experienceContent ? scrollPosition >= (this.experienceContent.nativeElement.offsetTop + 150) : false;
    this.animateSkillsContent = this.skillsContent ? scrollPosition >= (this.skillsContent.nativeElement.offsetTop + 150) : false;
    this.animateAchievementsContent = this.achievementsContent ? scrollPosition >= (this.achievementsContent.nativeElement.offsetTop + 150) : false;
    this.animateContactContent = this.contactContent ? scrollPosition >= (this.contactContent.nativeElement.offsetTop + 150) : false;
  }
}
