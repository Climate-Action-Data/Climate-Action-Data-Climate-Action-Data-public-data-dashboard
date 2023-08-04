import { Image } from '@chakra-ui/react'

import Afforestation from '@/assets/banners/afforestation.png'
import AvoidedConversion from '@/assets/banners/avoided-conversion.png'
import ChangeFuel from '@/assets/banners/change-fuel.png'
import Conservation from '@/assets/banners/conservation.png'
import EnergyDemand from '@/assets/banners/energy-demand.png'
import GHG from '@/assets/banners/ghg-management.png'
import ImprovedForest from '@/assets/banners/improved-forest-management.png'
import Landfill from '@/assets/banners/landfill.png'
import REDD from '@/assets/banners/redd.png'
import Revegetation from '@/assets/banners/reforestation-revegetation.png'
import Reforestation from '@/assets/banners/reforestation.png'

import { ProjectType } from '@/@types/ProjectDetails'

interface ProjectTypeBannerProps {
  projectType: ProjectType
  projectTypeText: string
}

export const ProjectTypeBanner = (props: ProjectTypeBannerProps) => {
  const { projectType, projectTypeText } = props

  const getImage = (projectType: ProjectType) => {
    switch (projectType) {
      case ProjectType.AFFORESTATION_REFORESTATION:
        return Afforestation.src
      case ProjectType.AGRICULTURE_FORESTRY_AND_OTHER_LAND_USE:
        return Conservation.src
      case ProjectType.AVOIDED_CONVERSION:
        return AvoidedConversion.src
      case ProjectType.CHANGE_OF_FUEL_OR_RAW_MATERIALS:
        return ChangeFuel.src
      case ProjectType.ELECTRICITY_GENERATION_FROM_SOLAR_PV:
        return EnergyDemand.src
      case ProjectType.ENERGY_DEMAND:
        return EnergyDemand.src
      case ProjectType.ENERGY_GENERATION:
        return EnergyDemand.src
      case ProjectType.ENERGY_INDUSTRIES_RENEWABLE:
        return EnergyDemand.src
      case ProjectType.GHG_MANAGEMENT:
        return GHG.src
      case ProjectType.HYDRO_POWER:
        return AvoidedConversion.src
      case ProjectType.IMPROVED_FOREST_MANAGEMENT:
        return ImprovedForest.src
      case ProjectType.LANDFILL_GAS_CAPTURE_COMBUSTION:
        return Landfill.src
      case ProjectType.REDD_REDUCED_EMISSIONS_FROM_DEFORESTATION_AND_DEGRADATION:
        return REDD.src
      case ProjectType.REDUCED_EMISSIONS_FROM_DEFORESTATION_DEGRADATION:
        return REDD.src
      case ProjectType.REFORESTATION:
        return Reforestation.src
      case ProjectType.REFORESTATION_AND_REVEGETATION:
        return Revegetation.src
      case ProjectType.RENEWABLE_ELECTRICITY_FROM_WIND:
        return AvoidedConversion.src
      case ProjectType.SOLAR_POWER:
        return AvoidedConversion.src
      case ProjectType.SOLAR_ELECTRICITY_SYSTEMS:
        return AvoidedConversion.src
      case ProjectType.WIND_POWER:
        return AvoidedConversion.src
      case ProjectType.ENERGY_EFFICIENCY_IMPROVEMENT:
        return EnergyDemand.src
      case ProjectType.DEFAULT:
        return AvoidedConversion.src
    }
  }
  return <Image borderRadius="8px" alt={projectTypeText} src={getImage(projectType)} h="336px" w="100%" objectFit={`cover`} />
}
