# fq

Fulcrum query CLI

## Installation

```sh
npm install fulcrum-query-cli -g
```

## Setup

Create a file at ~/.fulcrumrc with your API token in it.

## Usage

```sh
fq QUERY -f [format] -t [API token]
```

Supported formats are `csv`, `geojson`, and `json` .

## Example

Output a CSV to the console

```sh
fq 'SELECT feature_type, COUNT(1) FROM "Park Inventory/park_features" GROUP BY feature_type ORDER BY COUNT(1) DESC' -f csv
```

Output a CSV file

```sh
fq 'SELECT feature_type, COUNT(1) FROM "Park Inventory/park_features" GROUP BY feature_type ORDER BY COUNT(1) DESC' -f csv > park-features-by-type.csv
```

View GeoJSON features in geojson.io (requires [geojsonio-cli package](https://github.com/mapbox/geojsonio-cli))

```sh
fq 'SELECT * FROM "Park Inventory"' -f geojson | geojsonio
```

Fetch records matching a column value. Here we use double quotes on the query and backslash escape the table name.

```sh
fq "SELECT * FROM \"Fire Hydrant Inventory\" WHERE hydrant_type = 'Pillar / Aboveground'" -f geojson | geojsonio
```
