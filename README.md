This is a [Next.js](https://nextjs.org/) project bootstrapped with [`create-next-app`](https://github.com/vercel/next.js/tree/canary/packages/create-next-app).

## Getting Started

Install and init the project:
```
pnpm i
pnpm run prepare
```

First, run the development server:

```bash
pnpm dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

This project uses [`next/font`](https://nextjs.org/docs/basic-features/font-optimization) to automatically optimize and load Inter, a custom Google Font.

## Generate Test Files
Before committing changes to the Git Repository, run the following commands:

```bash
pnpm test:once
npm run test:once -- -u
```

## Used Libraries

This project uses the following libraries:

- ChakraUI (UI Framework)
- OvermindJS (State Management)
- NextJS
  
## Map support files

The map that is being used on the Home Page relies on pre-generated data. This data is versioned with the source code under:
- `src/assets/geo-map/continents-dots.ts`
- `src/assets/geo-map/countries-continents-mapping.ts`

You should not need to modify these files. However, if it is required to re-organize or change the map look-and-feel, you must use the provided utils program. Re-running the utils you can:
- add/remove a continent area or move a country to another one
- increase/decrease the number of dots displayed on the map

It is located under `[root]/utils` folder. All configuration for how many areas the world is splitted into and what area a country belongs to is in the `utils/src/geo-utils/continents.json`. You **DO NOT** need to modify the `utils/src/geo-utils/countries.geo.json` file.

To generate the map's support files, run the utils program from root:
```bash
pnpm run utils:run
```

## Export PDF setup
Package used to export project details pdf is [React-pdf](https://react-pdf.org/). 
- Required fonts for PDF are added in `/public` folder
- All 17 Cobenefits goals media are added as png files in assets.
- Google map in PDF is rendered using [Google Maps Static API](https://developers.google.com/maps/documentation/maps-static/overview)

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js/) - your feedback and contributions are welcome!