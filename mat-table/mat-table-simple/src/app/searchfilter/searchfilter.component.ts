import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-searchfilter',
  templateUrl: './searchfilter.component.html',
  styleUrls: ['./searchfilter.component.css'],
})
export class SearchfilterComponent implements OnInit {
  constructor() {}

  ngOnInit(): void {}

  title = 'angular-text-search-highlight';

  searchText = '';

  characters = [
    'Ant-Man',
    'Aquaman',
    'Asterix',
    'The Atom',
    'The Avengers',
    'Batgirl',
    'Batman',
    'Batwoman',
    'Black Canary',
    'Black Panther',
    'Captain America',
    'Captain Marvel',
    'Catwoman',
    'Conan the Barbarian',
    'Daredevil',
    'The Defenders',
    'Doc Savage',
    'Doctor Strange',
    'Elektra',
    'Fantastic Four',
    'Ghost Rider',
    'Green Arrow',
    'Green Lantern',
    'Guardians of the Galaxy',
    'Hawkeye',
    'Hellboy',
    'Incredible Hulk',
    'Iron Fist',
    'Iron Man',
    'Marvelman',
    'Robin',
    'The Rocketeer',
    'The Shadow',
    'Spider-Man',
    'Sub-Mariner',
    'Supergirl',
    'Superman',
    'Teenage Mutant Ninja Turtles',
    'Thor',
    'The Wasp',
    'Watchmen',
    'Wolverine',
    'Wonder Woman',
    'X-Men',
    'Zatanna',
    'Zatara',
  ];
}
