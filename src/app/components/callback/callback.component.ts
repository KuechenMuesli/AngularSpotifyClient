import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-callback',
  standalone: true,
  imports: [CommonModule],
  template: '<p>Loading...</p>',
})
export class CallbackComponent implements OnInit {
  constructor(private route: ActivatedRoute, private router: Router) {}

  ngOnInit() {
    const fragment = this.route.snapshot.fragment;

    if (!fragment) {
      console.error('No fragment found in URL.');
      return;
    }

    const params = new URLSearchParams(fragment);
    const accessToken = params.get('access_token');

    if (accessToken) {
      localStorage.setItem('spotifyToken', accessToken);

      // For now, skip fragment clearing and just navigate to home
      this.router.navigate(['/']);

    } else {
      console.error('Access token not found.');
    }
  }
}
