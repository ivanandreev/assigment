# Test assignment

Create simplified earth map representation. Use wikidata as datasource.

On first step application should display whole country list. Selecting one of countries will lead to country details view. Country details view contains country properties such as flag, main spoken language(s), etc., and list of regions/states it consists of. This view should also contains list of countries this one has borders with. Selecting one of regions/states should bring to region/state details view, which contains list of region/state main properties and list of region/state cities.

### Run app
```sh
npm install
gulp dev
```

Open link: http://localhost:8000/dist/index.html#/
