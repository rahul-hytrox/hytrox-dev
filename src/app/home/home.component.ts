import { Component, OnInit } from '@angular/core';
import { NgOptimizedImage } from '@angular/common';
import emailjs, { EmailJSResponseStatus } from 'emailjs-com';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [NgOptimizedImage],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent implements OnInit {
  emailMsg!: string;
  sidebarBtn!: Element | null;
  sidebar!: Element | null;
  testimonialsItem!: NodeListOf<Element>;
  modalContainer!: Element | null;
  modalCloseBtn!: Element | null;
  overlay!: Element | null;
  modalImg!: HTMLImageElement | null;
  modalTitle!: Element | null;
  modalText!: Element | null;
  select!: Element | null;
  selectItems!: NodeListOf<Element>;
  selectValue!: Element | null;
  filterBtn!: NodeListOf<Element>;
  filterItems!: NodeListOf<Element>;
  form!: HTMLFormElement | null;
  formInputs: NodeListOf<HTMLInputElement | HTMLTextAreaElement> | null = null;
  formBtn!: HTMLButtonElement | null;
  navigationLinks!: NodeListOf<Element>;
  pages!: NodeListOf<Element>;

  getWebDataItems = [{site_preview_image:'https://i.imgur.com/Sv5Fjme.png',site_title:'Jaz N Angel 1988',site_url:'https://jaznangel.com.au'},{site_preview_image:'https://i.imgur.com/YDyvWq5.png',site_title:'aicyberinfo.com.au',site_url:'https://aicyberinfo.com.au/'},{site_preview_image:'https://i.imgur.com/BnWcODh.png',site_title:'Beauty Buffet',site_url:'https://www.beautybuffet.co.th/'},{site_preview_image:'https://i.imgur.com/ynq8xYb.png',site_title:'HNH Cart',site_url:'https://www.hnhcart.com'},{site_preview_image:'https://i.imgur.com/F79apke.png',site_title:'Jomo Studio',site_url:'https://jomostudio.com'},{site_preview_image:'https://i.imgur.com/16SYFfO.png',site_title:'Mallats',site_url:'https://www.mallats.com/'},{site_preview_image:'https://i.imgur.com/meIw8F3.png',site_title:'Roar Sweden',site_url:'https://roarsweden.se/'},
  {site_preview_image:'https://i.imgur.com/Q2whqqw.png',site_title:'adeeg.com',site_url:'https://adeeg.com'},
  {site_preview_image:'https://i.imgur.com/84QvR8w.png',site_title:'Musotica Hub',site_url:'https://musotica.com/'}];

  constructor() { }

  ngOnInit(): void { 

    setTimeout(() => {
      this.initializeForm();
    });
    const elementToggleFunc = function (elem: Element) { elem.classList.toggle("active"); }

    this.sidebar = document.querySelector("[data-sidebar]");
    this.sidebarBtn = document.querySelector("[data-sidebar-btn]");

    if (this.sidebarBtn) {
      this.sidebarBtn.addEventListener("click", () => { if (this.sidebar) elementToggleFunc(this.sidebar); });
    }

    //Activating Modal-testimonial

    this.testimonialsItem = document.querySelectorAll('[data-testimonials-item]');
    this.modalContainer = document.querySelector('[data-modal-container]');
    this.modalCloseBtn = document.querySelector('[data-modal-close-btn]');
    this.overlay = document.querySelector('[data-overlay]');

    this.modalImg = document.querySelector('[data-modal-img]');
    this.modalTitle = document.querySelector('[data-modal-title]');
    this.modalText = document.querySelector('[data-modal-text]');

    const testimonialsModalFunc = () => {
      if (this.modalContainer && this.overlay) {
        this.modalContainer.classList.toggle('active');
        this.overlay.classList.toggle('active');
      }
    }

    for (let i = 0; i < this.testimonialsItem.length; i++) {
      this.testimonialsItem[i].addEventListener('click', () => {
        if (this.modalImg) {
          this.modalImg.src = (this.testimonialsItem[i].querySelector('[data-testimonials-avatar]') as HTMLImageElement).src;
          this.modalImg.alt = (this.testimonialsItem[i].querySelector('[data-testimonials-avatar]') as HTMLImageElement).alt;
        }
        if (this.modalTitle) {
          this.modalTitle.innerHTML = (this.testimonialsItem[i].querySelector('[data-testimonials-title]') as HTMLElement).innerHTML;
        }
        if (this.modalText) {
          this.modalText.innerHTML = (this.testimonialsItem[i].querySelector('[data-testimonials-text]') as HTMLElement).innerHTML;
        }

        testimonialsModalFunc();
      });
    }

    //Activating close button in modal-testimonial

    if (this.modalCloseBtn) {
      this.modalCloseBtn.addEventListener('click', testimonialsModalFunc);
    }
    if (this.overlay) {
      this.overlay.addEventListener('click', testimonialsModalFunc);
    }

    //Activating Filter Select and filtering options

    this.select = document.querySelector('[data-select]');
    this.selectItems = document.querySelectorAll('[data-select-item]');
    this.selectValue = document.querySelector('[data-select-value]');
    this.filterBtn = document.querySelectorAll('[data-filter-btn]');

    if (this.select) {
      this.select.addEventListener('click', () => { if (this.select) elementToggleFunc(this.select); });
    }

    for (let i = 0; i < this.selectItems.length; i++) {
      this.selectItems[i].addEventListener('click', () => {
        let selectedValue = (this.selectItems[i] as HTMLElement).innerText.toLowerCase();
        if (this.selectValue) {
          (this.selectValue as HTMLElement).innerText = (this.selectItems[i] as HTMLElement).innerText;
        }
        if (this.select) {
          elementToggleFunc(this.select);
        }
        this.filterFunc(selectedValue);
      });
    }

    this.filterItems = document.querySelectorAll('[data-filter-item]');

    //Enabling filter button for larger screens 

    let lastClickedBtn = this.filterBtn[0];

    for (let i = 0; i < this.filterBtn.length; i++) {
      this.filterBtn[i].addEventListener('click', () => {
        let selectedValue = (this.filterBtn[i] as HTMLElement).innerText.toLowerCase();
        if (this.selectValue) {
          (this.selectValue as HTMLElement).innerText = (this.filterBtn[i] as HTMLElement).innerText;
        }
        this.filterFunc(selectedValue);

        if (lastClickedBtn) {
          lastClickedBtn.classList.remove('active');
        }
        this.filterBtn[i].classList.add('active');
        lastClickedBtn = this.filterBtn[i];
      });
    }

    // Enabling Contact Form

    // this.form = document.querySelector('[data-form]');
    // this.formInputs = document.querySelectorAll('[data-form-input]');
    // this.formBtn = document.querySelector('[data-form-btn]');

    // for (let i = 0; i < this.formInputs.length; i++) {
    //   this.formInputs[i].addEventListener('input', () => {
    //     if (this.form && this.form.checkValidity()) {
    //       if (this.formBtn) {
    //         this.formBtn.removeAttribute('disabled');
    //       }
    //     } else {
    //       if (this.formBtn) {
    //         this.formBtn.setAttribute('disabled', '');
    //       }
    //     }
    //   });
    // }

    // Enabling Page Navigation 

    this.navigationLinks = document.querySelectorAll('[data-nav-link]');
    this.pages = document.querySelectorAll('[data-page]');

    for (let i = 0; i < this.navigationLinks.length; i++) {
      this.navigationLinks[i].addEventListener('click', () => {
        for (let j = 0; j < this.pages.length; j++) {
          if (this.navigationLinks[i].innerHTML.toLowerCase() == (this.pages[j] as HTMLElement).dataset['page']) {
            this.pages[j].classList.add('active');
            this.navigationLinks[i].classList.add('active');
            window.scrollTo(0, 0);
          } else {
            this.pages[j].classList.remove('active');
            this.navigationLinks[j].classList.remove('active');
          }
        }
      });
    }
  }

  filterFunc(selectedValue: string) {
    for (let i = 0; i < this.filterItems.length; i++) {
      if (selectedValue == "all") {
        this.filterItems[i].classList.add('active');
      } else if (selectedValue == (this.filterItems[i] as HTMLElement).dataset['category']) {
        this.filterItems[i].classList.add('active');
      } else {
        this.filterItems[i].classList.remove('active');
      }
    }
  }


  //Latest Email Contact Form Function

  initializeForm(): void {
    this.form = document.querySelector('[data-form]');
    this.formInputs = document.querySelectorAll('[data-form-input]');
    this.formBtn = document.querySelector('[data-form-btn]') as HTMLButtonElement;

    // Enable/disable the submit button based on form validity
    this.formInputs.forEach(input => {
      input.addEventListener('input', () => {
        if (this.form && this.form.checkValidity()) {
          this.formBtn?.removeAttribute('disabled');
        } else {
          this.formBtn?.setAttribute('disabled', '');
        }
      });
    });

    // Listen for form submission
    this.form?.addEventListener('submit', (e: Event) => {
      e.preventDefault();
      if (this.form && this.form.checkValidity()) {
        this.sendEmail();
      }
    });
  }

  sendEmail(): void {
    if (!this.form) {
      return;
    }
    // Replace with your actual EmailJS credentials
    const serviceID = 'service_0p05dui';
    const templateID = 'template_b3wl3i3';
    const publicKey = 'OeE4kljnIroikdpqK';

    emailjs.sendForm(serviceID, templateID, this.form, publicKey)
      .then((result: EmailJSResponseStatus) => {
        console.log('Email sent successfully:', result.text);
        this.emailMsg = 'Message sent successfully!'
        this.form?.reset();
        this.formBtn?.setAttribute('disabled', '');
        setTimeout(()=>{
          this.emailMsg = '';
        },1500)
      })
      .catch((error) => {
        console.error('Failed to send email:', error.text);
        alert('Failed to send message. Please try again later.');
        this.emailMsg = 'Something wrong! Please try again later.';
        setTimeout(()=>{
          this.emailMsg = '';
        },1500)
      });
  }
}
