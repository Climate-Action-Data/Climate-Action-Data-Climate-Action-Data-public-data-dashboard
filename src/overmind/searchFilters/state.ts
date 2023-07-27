import { SearchFiltersStateData } from '@/@types/State'

export const state: SearchFiltersStateData = {
  projectStatuses: [],
  standards: [],
  methodologies: [],
  sectors: [],
  countries: [],
  get isEmpty() {
    return this.projectStatuses?.length === 0 && this.standards?.length === 0 && this.methodologies?.length === 0 && this.sectors?.length === 0 && this.countries?.length === 0
  },
}
