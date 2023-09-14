import { TFunction } from 'i18next'
import { Region, SubRegion } from '@/@types/geojson'

export const getWorldRegionList = (t: TFunction) => [
  {
    value: Region.AFRICA,
    label: t(`regions.${Region.AFRICA}`),
    isHeader: true,
  },
  {
    value: SubRegion.NORTHERN_AFRICA,
    label: t(`regions.${SubRegion.NORTHERN_AFRICA}`),
  },
  {
    value: SubRegion.SUB_SAHARAN_AFRICA,
    label: t(`regions.${SubRegion.SUB_SAHARAN_AFRICA}`),
  },
  {
    value: Region.AMERICAS,
    label: t(`regions.${Region.AMERICAS}`),
    isHeader: true,
  },
  {
    value: SubRegion.LATIN_AMERICA_AND_THE_CARIBBEAN,
    label: t(`regions.${SubRegion.LATIN_AMERICA_AND_THE_CARIBBEAN}`),
  },
  {
    value: SubRegion.NORTHERN_AMERICA,
    label: t(`regions.${SubRegion.NORTHERN_AMERICA}`),
  },
  {
    value: Region.ASIA,
    label: t(`regions.${Region.ASIA}`),
    isHeader: true,
  },
  {
    value: SubRegion.CENTRAL_ASIA,
    label: t(`regions.${SubRegion.CENTRAL_ASIA}`),
  },
  {
    value: SubRegion.EASTERN_ASIA,
    label: t(`regions.${SubRegion.EASTERN_ASIA}`),
  },
  {
    value: SubRegion.SOUTHERN_ASIA,
    label: t(`regions.${SubRegion.SOUTHERN_ASIA}`),
  },
  {
    value: SubRegion.SOUTH_EASTERN_ASIA,
    label: t(`regions.${SubRegion.SOUTH_EASTERN_ASIA}`),
  },
  {
    value: SubRegion.WESTERN_ASIA,
    label: t(`regions.${SubRegion.WESTERN_ASIA}`),
  },
  {
    value: Region.EUROPE,
    label: t(`regions.${Region.EUROPE}`),
    isHeader: true,
  },
  {
    value: SubRegion.EASTERN_EUROPE,
    label: t(`regions.${SubRegion.EASTERN_EUROPE}`),
  },
  {
    value: SubRegion.NORTHERN_EUROPE,
    label: t(`regions.${SubRegion.NORTHERN_EUROPE}`),
  },
  {
    value: SubRegion.SOUTHERN_EUROPE,
    label: t(`regions.${SubRegion.SOUTHERN_EUROPE}`),
  },
  {
    value: SubRegion.WESTERN_EUROPE,
    label: t(`regions.${SubRegion.WESTERN_EUROPE}`),
  },
  {
    value: Region.OCEANIA,
    label: t(`regions.${Region.OCEANIA}`),
    isHeader: true,
  },
  {
    value: SubRegion.AUSTRALIA_AND_NEW_ZEALAND,
    label: t(`regions.${SubRegion.AUSTRALIA_AND_NEW_ZEALAND}`),
  },
  {
    value: SubRegion.MELANESIA,
    label: t(`regions.${SubRegion.MELANESIA}`),
  },
  {
    value: SubRegion.MICRONESIA,
    label: t(`regions.${SubRegion.MICRONESIA}`),
  },
  {
    value: SubRegion.POLYNESIA,
    label: t(`regions.${SubRegion.POLYNESIA}`),
  },
]
