import { Component, Input, OnInit } from '@angular/core';
import { ActivatedRoute, Route, Router } from '@angular/router';
import { Review } from './review';

import { ReviewService } from './review.service';

@Component({
  selector: 'app-review',
  templateUrl: './review.component.html',
  styleUrls: ['./review.component.css']
})
export class ReviewComponent implements OnInit {

  public reviews: Review[];
  public searchString = '';
  public baseImageUrl = 'https://image.tmdb.org/t/p/w300';

  public showSearch = false;

  constructor(private reviewService: ReviewService,
    private activeRoute: ActivatedRoute,
    private router: Router) { }

  ngOnInit() {
    // Get movie details with id prametar passed from a search component
    this.activeRoute.queryParams.subscribe((string) => {
      this.searchString = string['search'];
      if (this.searchString || this.searchString === '') {
        this.showSearchBar();
      }
    });
    this.getReviews();
  }

  private getReviews() {
    this.reviewService.getAllReviews().subscribe(data => {
      this.reviews = data.reverse();
    });
  }

  public hideSearchBar() {
    this.showSearch = false;
    this.router.navigate(['/review']);
  }

  public showSearchBar() {
   this.showSearch = true;
  }
}
