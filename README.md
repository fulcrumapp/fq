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
fq QUERY -f [format]
```

Supported formats are `csv`, `geojson`, and `json` .

## Example

Output a CSV to the console

```sh
fq 'SELECT feature_type, COUNT(1) FROM "Park Inventory/park_features" GROUP BY feature_type ORDER BY COUNT(1) DESC' -f csv
```

View GeoJSON features in geojson.io (requires [geojsonio-cli package](https://github.com/mapbox/geojsonio-cli))

```sh
fq 'SELECT * FROM "Park Inventory"' -f geojson | geojsonio
```
