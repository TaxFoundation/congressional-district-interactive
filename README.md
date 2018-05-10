# Congressional District Interactive Mapping Tool

## Data Sources

* [Cartographic Boundary Shapefiles - Congressional Districts](https://www.census.gov/geo/maps-data/data/cbf/cbf_cds.html)

To create the individual state topojson files, the [mapshaper](https://github.com/mbloch/mapshaper) tool was used with the following configuration:

```
mapshaper -i cb_2015_us_cd114_500k.shp name='' -proj merc -split STATEFP -o format=geojson
mapshaper -i *.json -o format=topojson force
```

Splitting directly to topojson does not create separate files, so you must first split to geojson and then convert to topojson. Mercator projection is used for individual states because Albers will make several of them appear crooked when viewed in isolation. Albers is still used for the full US map view.