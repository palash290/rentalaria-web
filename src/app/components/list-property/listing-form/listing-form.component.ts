import { Component } from '@angular/core';
import { RouterLink } from "@angular/router";

@Component({
  selector: 'app-listing-form',
  imports: [RouterLink],
  templateUrl: './listing-form.component.html',
  styleUrl: './listing-form.component.css'
})
export class ListingFormComponent {

  currentStep = 0;

  ngAfterViewInit() {
    setTimeout(() => this.showStep(0));
  }

  showStep(index: number) {
    const steps = document.querySelectorAll('.form-step');
    const progress = document.querySelectorAll('#ct_form_progressbar li');

    // Hide all steps
    steps.forEach(step => step.classList.remove('active'));

    // Show current step
    steps[index]?.classList.add('active');

    // Update progress bar
    progress.forEach((li, i) => {
      if (i <= index) {
        li.classList.add('active');
      } else {
        li.classList.remove('active');
      }
    });
  }

  nextStep() {
    const steps = document.querySelectorAll('.form-step');
    if (this.currentStep < steps.length - 1) {
      this.currentStep++;
      this.showStep(this.currentStep);
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  }

  prevStep() {
    if (this.currentStep > 0) {
      this.currentStep--;
      this.showStep(this.currentStep);
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  }


}
