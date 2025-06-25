import { NgClass } from '@angular/common';
import { Component } from '@angular/core';

@Component({
  selector: 'app-topbar',
  imports: [NgClass],
  templateUrl: './topbar.html',
  styleUrl: './topbar.css'
})
export class Topbar {
isMenuOpen = false;

  toggleMenu() {
    this.isMenuOpen = !this.isMenuOpen;
  }

  goToSettings() {
    this.isMenuOpen = false;
    // Navigate to settings
  }

  logout() {
    this.isMenuOpen = false;
    // Handle logout
  }
}
