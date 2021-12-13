# Mat Table Simple

## Command

```dos
npm install -g @angular/cli
ng new mat-table-simple --routing --stye=css
cd mat-table-simple
npm i -S @angular/material @angular/cdk @angular/animations
ng add @angular/material
```

```
C:\Code\MyAngularMaterial\mat-table\mat-table-simple>ng add @angular/material
Skipping installation: Package already installed
? Choose a prebuilt theme name, or "custom" for a custom theme:
> Indigo/Pink        [ Preview: https://material.angular.io?theme=indigo-pink ]
  Deep Purple/Amber  [ Preview: https://material.angular.io?theme=deeppurple-amber ]
  Pink/Blue Grey     [ Preview: https://material.angular.io?theme=pink-bluegrey ]
  Purple/Green       [ Preview: https://material.angular.io?theme=purple-green ]
  Custom
? Set up global Angular Material typography styles? Yes
? Set up browser animations for Angular Material? Yes
...
```

\*.ts

```
import { MatAutocompleteModule, MatCheckboxModule, MatButtonModule, MatFormFieldModule, MatInputModule, MatDatepickerModule, MatRadioModule, MatSelectModule, MatSlideToggleModule, MatSliderModule  } from '@angular/material';

@NgModule({ imports: [ MatAutocompleteModule, MatCheckboxModule, MatButtonModule, MatFormFieldModule, MatDatepickerModule, MatRadioModule, MatInputModule, MatSelectModule, MatSlideToggleModule, MatSlideToggleModule ]})
```

app.module.ts

```
import { MatTableModule } from '@angular/material/table';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatSortModule } from '@angular/material/sort';
@NgModule({
  imports: [
    MatTableModule,
    MatPaginatorModule,
    MatSortModule,
  ],
```

```
ng serve
```

## Coding

### app.component.html

```
<table mat-table [dataSource]="dataSource" class="mat-elevation-z8">

  <!--- Note that these columns can be defined in any order.
        The actual rendered columns are set as a property on the row definition" -->

  <!-- Position Column -->
  <ng-container matColumnDef="position">
    <th mat-header-cell *matHeaderCellDef> No. </th>
    <td mat-cell *matCellDef="let element"> {{element.position}} </td>
  </ng-container>

  <!-- Name Column -->
  <ng-container matColumnDef="name">
    <th mat-header-cell *matHeaderCellDef> Name </th>
    <td mat-cell *matCellDef="let element"> {{element.name}} </td>
  </ng-container>

  <!-- Weight Column -->
  <ng-container matColumnDef="weight">
    <th mat-header-cell *matHeaderCellDef> Weight </th>
    <td mat-cell *matCellDef="let element"> {{element.weight}} </td>
  </ng-container>

  <!-- Symbol Column -->
  <ng-container matColumnDef="symbol">
    <th mat-header-cell *matHeaderCellDef> Symbol </th>
    <td mat-cell *matCellDef="let element"> {{element.symbol}} </td>
  </ng-container>

  <tr mat-header-row *matHeaderRowDef="displayedColumns"></tr>
  <tr mat-row *matRowDef="let row; columns: displayedColumns;"></tr>
</table>
```

### app.component.ts

```
import {Component} from '@angular/core';

export interface PeriodicElement {
  name: string;
  position: number;
  weight: number;
  symbol: string;
}

const ELEMENT_DATA: PeriodicElement[] = [
  {position: 1, name: 'Hydrogen', weight: 1.0079, symbol: 'H', score: 100},
  {position: 2, name: 'Helium', weight: 4.0026, symbol: 'He', score: 100},
  {position: 3, name: 'Lithium', weight: 6.941, symbol: 'Li', score: 100},
  {position: 4, name: 'Beryllium', weight: 9.0122, symbol: 'Be', score: 100},
  {position: 5, name: 'Boron', weight: 10.811, symbol: 'B', score: 100},
  {position: 6, name: 'Carbon', weight: 12.0107, symbol: 'C', score: 100},
  {position: 7, name: 'Nitrogen', weight: 14.0067, symbol: 'N', score: 100},
  {position: 8, name: 'Oxygen', weight: 15.9994, symbol: 'O', score: 100},
  {position: 9, name: 'Fluorine', weight: 18.9984, symbol: 'F', score: 100},
  {position: 10, name: 'Neon', weight: 20.1797, symbol: 'Ne', score: 100},
];

/**
 * @title Basic use of `<table mat-table>`
 */
@Component({
  selector: 'table-basic-example',
  styleUrls: ['table-basic-example.css'],
  templateUrl: 'table-basic-example.html',
})
export class TableBasicExample {
  displayedColumns: string[] = ['position', 'name', 'weight', 'symbol'];
  dataSource = ELEMENT_DATA;
}
```

### app.component.css

```
table {
  width: 100%;
}
```

## Add a new column

### app.component.html

```
  <!-- Score Column -->
  <ng-container matColumnDef="score">
    <th mat-header-cell *matHeaderCellDef>Score</th>
    <td mat-cell *matCellDef="let element">{{ element.score }}</td>
  </ng-container>
```

Note:

It can be "let" as a different name, i.e. "let user"

### app.component.ts

```
export interface PeriodicElement { ...;  score: number; }

const ELEMENT_DATA: PeriodicElement[] = [
  { ..., score: 100 },
  ...

  displayedColumns: string[] = [ ..., 'score', ];
  ...
```

## Add a new mat-text-column

If your column is only responsible for rendering a single string value for the header and cells, you can instead define your column using the mat-text-column.

### app.component.html

```
  <!-- SingleString Column -->
  <mat-text-column name="SingleString"></mat-text-column>
```

## More

Styling Columns

Row Template

Pagination

Sorting

SearchFilter

Filtering

```
ng g c home --dry-run
ng g c home
ng g c pagenotfound
ng g c basic
ng g c styling
ng g c row-template
ng g c pagination
ng g c sorting
ng g c pagesort
ng g c searchfilter
ng g c filter
```

## Screenshot

![](image/README/basic_01.png)

![](image/README/basic_02.png)

![](image/README/basic_03.png)

## Logs / Branches

```dos
git checkout -b v0.01_get_started main
git checkout -b v0.02_styling main
git checkout -b v0.03_row_template main
git checkout -b v0.04_pagination main
git checkout -b v0.05_sorting main
git checkout -b v0.06_pagesort_v1 main

git checkout -b v0.07_filter main
git checkout -b v0.08_selection main
git checkout -b v0.09_footer main
git checkout -b v0.10_sticky main

git checkout main
git branch -a
```

```dos
C:\Code\MyAngularMaterial\mat-table\mat-table-simple>git branch -a
* main
  v0.01_get_started
  v0.01_styling
  v0.03_row_template
  v0.04_pagination
  v0.05_sorting
  v0.06_pagesort_v1
  remotes/origin/main
```

## Misc

### Angular html inline code snippet

html

```
  <pre>
    <code [innerHTML]="css_code"></code>
  </pre>
```

ts

```
  css_code = `
    .mat-column-demo-name {
      padding-left: 16px;
      font-size: 20px;
    }
  `;
}
```

### CSS currentColor

You can use this value to indicate you want to use the value of color for other properties that accept a color value: borders, box shadows, outlines, or backgrounds.

currentColor is useful when you want a certain color to be consistent in an element. For example, if you want an element to have a border color that's the same as the element's text color, using currentColor makes a lot of sense because then if you decide the main text color you can change the value at only one place.

The currentColor keyword represents the value of an element's color property. This lets you use the color value on properties that do not receive it by default. If currentColor is used as the value of the color property, it instead takes its value from the inherited value of the color property.

### LiveAnnouncer

```
import { LiveAnnouncer } from '@angular/cdk/a11y';
```

### Troubleshooting - all pages are not found

The following will block all pages after '\*\*'.

```
const routes: Routes = [
  { path: 'home', component: HomeComponent },
  { path: '', redirectTo: 'home', pathMatch: 'full' },
  { path: '**', component: PagenotfoundComponent },
    ...
  { path: 'basic', component: BasicComponent },

];
```

Make sure it stays at the end!

```
const routes: Routes = [
  { path: 'home', component: HomeComponent },
  { path: 'basic', component: BasicComponent },
  ...
  { path: '', redirectTo: 'home', pathMatch: 'full' },
  { path: '**', component: PagenotfoundComponent },
];
```

### Troubleshooting - error NG8002: Can't bind to 'ngModel' since it isn't a known property of 'input'.

app.module.ts

```
import { FormsModule } from '@angular/forms';

[...]

@NgModule({
  imports: [
    [...]
    FormsModule
  ],
  [...]
})
```

### Filtering

The filter filter can only be used on arrays, and it returns an array containing only the matching items.

### Creating a Search Filter

https://dev.to/idrisrampurawala/creating-a-search-filter-in-angular-562d

src/pipes/filter.pipe.ts

app.module.ts

### CSS !important

The !important rule in CSS is used to add more importance to a property/value than normal.

In fact, if you use the !important rule, it will override ALL previous styling rules for that specific property on that element!

### Why need to put it in Style.css?

It doesn't work if put this in searchfilter.component.css

```
.font-weight-bold {
  font-weight: 700 !important;
}
```

The only way to override an !important rule is to include another !important rule on a declaration with the same (or higher) specificity in the source code - and here the problem starts! This makes the CSS code confusing and the debugging will be hard, especially if you have a large style sheet!

```
<style>
#myid {
  background-color: blue !important;
}

.myclass {
  background-color: gray !important;
}

p {
  background-color: red !important;
}
</style>

<!-- red -->
<p>This is some text in a paragraph.</p>

<!-- gray -->
<p class="myclass">This is some text in a paragraph.</p>

<!-- blue -->
<p id="myid">This is some text in a paragraph.</p>

</body>
```

### How to move component files to a different folder smartly