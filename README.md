![EarthDaily](https://github.com/lukebass/hw/blob/main/src/assets/logo.svg)

# EarthDaily Homework

## Setup

- Clone repository
- Install node lts
- Run `npm install`
- Create `.env.local` file
- Populate `.env.local` file (see example)
- Run `npm run dev`

## Example Env

```
VITE_ED_TOKEN=https://demo-venus-only-earthdaily.auth.us-east-1.amazoncognito.com/oauth2/token
VITE_ED_CLIENT_ID=ufl3rt4f70rvo4pp1fkfqjimf
VITE_ED_CLIENT_SECRET=1ldg7u8gdiidnulg49k46dc3gcepf7n2p2a625foirt5rjlc88gt
VITE_ED_SEARCH=https://api.eds.earthdaily.com/archive/v1/stac/v1/search
VITE_MAP_TOKEN=pk.eyJ1IjoibHVrZWJhc3MiLCJhIjoiY2xzbGFreGNzMGQyZDJpcDVyNDY4Z2ZxeSJ9.qGYOFFBtrdQsr4BYcqjo4g
```

## How to Search

- Start and End date are required
- Region search is optional
- Enter dates and/or region
- Click "SEARCH" button to search
- Search results are clickable
- View search results on map

## Dependencies

- Vite
- TypeScript
- React
- Material UI
- Material UI X
- Emotion
- Mapbox GL
- React Mapbox GL
- Mapbox GL Draw
- DayJS
