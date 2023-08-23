import { ProjectSearchResult } from '@/@types/ProjectSearchResult'

export const projectData: ProjectSearchResult[] = [
  {
    id: `109`,
    warehouseProjectId: `4006d5d5-c51a-474e-9591-6aa26404800d`,
    name: `Bosques Solares de los Llanos 1`,
    developer: `MATRIX RENEWABLES COLOMBIA, S.A.S`,
    link: `test.com`,
    standard: `EcoRegistry`,
    methodology: `ACM0002: Grid-connected electricity generation from renewable sources / ACM0006: Electricity and heat generation from biomass `,
    sector: `Electricity; gas, steam and air conditioning supply`,
    country: `Colombia`,
    inCountryRegion: `Region 1`,
    status: `Authorized`,
    coveredByNdc: `Unknown`,
    creditingPeriodStart: `2020-08-22T00:00:00.000Z`,
    creditingPeriodEnd: `2030-08-21T00:00:00.000Z`,
    annualEst: 311410,
    annualIssued: 37202,
    annualRetired: 30167,
    annualAvailable: 7035,
  },
  {
    id: `30`,
    warehouseProjectId: `986703c1-c83f-4d8a-815a-d50a97539f6f`,
    name: `Carbono Ganados y Bosques`,
    developer: `Forestry Consulting Group S.A.S.`,
    link: `test.com`,
    standard: `EcoRegistry`,
    methodology: `AR-ACM0003: Afforestation and reforestation of lands except wetlands`,
    sector: `Agriculture; forestry and fishing`,
    country: `Colombia`,
    inCountryRegion: `Region 2`,
    status: `Authorized`,
    coveredByNdc: `Unknown`,
    creditingPeriodStart: `2010-05-02T00:00:00.000Z`,
    annualEst: 128161,
    annualIssued: 225734,
    annualRetired: 147403,
    annualAvailable: 78331,
  },
  {
    id: `65`,
    warehouseProjectId: `f4d6493a-4efe-4980-9063-521decc403f4`,
    name: `Manejo Sostenible de los Bosques Aplicado al Predio Santa Ana, Vereda El Popal, Municipio De Sonsón, Bajo El Esquema BancO2`,
    developer: `Corporación Masbosques`,
    link: `test.com`,
    standard: `EcoRegistry`,
    methodology: `M/LU-REDD+: Methodology for the Implementation of REDD+ Projects Consistent with National Reference Levels`,
    sector: `Agriculture; forestry and fishing`,
    country: `Colombia`,
    status: `Approved`,
    coveredByNdc: `Unknown`,
    creditingPeriodEnd: `2044-05-05T00:00:00.000Z`,
    annualEst: 35613,
    annualIssued: 0,
    annualRetired: 0,
    annualAvailable: 0,
  },
  {
    id: `28`,
    warehouseProjectId: `340276df-ce7a-46d4-b87f-d9f0d24704f9`,
    name: `Manejo Sostenible de los Bosques Aplicado en el Oriente Antioqueño bajo el esquema BancO2®`,
    developer: `Corporación Masbosques`,
    link: `test.com`,
    standard: `EcoRegistry`,
    methodology: `M/LU-REDD+: Methodology for the Implementation of REDD+ Projects Consistent with National Reference Levels`,
    sector: `Agriculture; forestry and fishing`,
    country: `Colombia`,
    status: `Authorized`,
    coveredByNdc: `Unknown`,
    creditingPeriodStart: `2017-11-01T00:00:00.000Z`,
    creditingPeriodEnd: `2027-10-31T00:00:00.000Z`,
    annualEst: 357571,
    annualIssued: 172795,
    annualRetired: 0,
    annualAvailable: 172795,
  },
]

export const csvProjectData = `"Bosques Solares de los Llanos 1","109","MATRIX RENEWABLES COLOMBIA, S.A.S",test.com,"EcoRegistry","ACM0002: Grid-connected electricity generation from renewable sources / ACM0006: Electricity and heat generation from biomass","Electricity; gas, steam and air conditioning supply","Colombia","Region 1",Authorized,2020/08/22 - 2030/08/21,311410,37202,30167,7035`
