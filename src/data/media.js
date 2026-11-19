export const PL_LION_URL =
  'https://assets.football-logos.cc/logos/england/700x700/english-premier-league.ee1e9b08.png'

export const VERIFIED_MEDIA = {
  Arsenal: {
    logo: 'https://resources.premierleague.com/premierleague/badges/t3.png',
    jersey: 'https://cdn.shopify.com/s/files/1/0823/7986/6459/files/2002-04-arsenal-nike-home-shir-67928-1.jpg?v=1730207942',
  },
  'Manchester City': {
    logo: 'https://thumb.wikimedia.org/wikipedia/en/thumb/e/eb/Manchester_City_FC_badge.svg/250px-Manchester_City_FC_badge.svg.png',
    jersey: 'https://www.classicfootballshirts.co.uk/cdn-cgi/image/fit=pad,q=70,f=webp//pub/media/catalog/product//0/1/010726157222-1_j8dtpgxljle9vttw.jpg',
  },
  'Manchester United': {
    logo: 'https://thumb.wikimedia.org/wikipedia/en/thumb/7/7a/Manchester_United_FC_crest.svg/250px-Manchester_United_FC_crest.svg.png',
    jersey: '/images/man-united-1998-99.png',
  },
  Liverpool: {
    logo: 'https://thumb.wikimedia.org/wikipedia/sco/thumb/0/0c/Liverpool_FC.svg/500px-Liverpool_FC.svg.png',
    jersey: 'https://www.classicfootballshirts.co.uk/cdn-cgi/image/fit=pad,q=70,f=webp//pub/media/catalog/product//2/4/240625577450-1_a4famc6qy5wqbo8z.jpg',
  },
  Chelsea: {
    logo: 'https://resources.premierleague.com/premierleague/badges/t8.png',
    jersey: '/images/chelsea-2004-05.png',
  },
  'Tottenham Hotspur': {
    logo: 'https://thumb.wikimedia.org/wikipedia/en/thumb/b/b4/Tottenham_Hotspur.svg/250px-Tottenham_Hotspur.svg.png',
    jersey: 'https://www.classicfootballshirts.co.uk/cdn-cgi/image/fit=pad,q=80,w=1000,h=1000,f=webp//pub/media/catalog/product//0/9/090426983575-1_bb38w2ikt63vqpmr.jpg',
  },
  'Newcastle United': {
    logo: 'https://assets.football-logos.cc/logos/england/700x700/newcastle.02a86b26.png',
    jersey: 'https://www.classicfootballshirts.co.uk/cdn-cgi/image/fit=pad,q=70,f=webp//pub/media/catalog/product//a/0/a0b0aa25ee7a9d3608c12af1595b6aaea3d8eac6ebbd5821feab17370ca17ff0.jpeg',
  },
  'Aston Villa': {
    logo: 'https://resources.premierleague.com/premierleague/badges/t7.png',
    jersey: 'https://www.classicfootballshirts.co.uk/cdn-cgi/image/fit=pad,q=70,f=webp//pub/media/catalog/product//0/8/080425498177-1_ue7itaccnjk4glgh.jpg',
  },
  Everton: {
    logo: 'https://resources.premierleague.com/premierleague/badges/t11.png',
    jersey: 'https://www.classicfootballshirts.co.uk/cdn-cgi/image/fit=pad,q=80,w=1000,h=1000,f=webp//pub/media/catalog/product//b/d/bd0ef11c9d433a162f6a609530c77031e2f61bf8c351cd5af93d6cf4ad0770f3.jpeg',
  },
  'West Ham United': {
    logo: 'https://thumb.wikimedia.org/wikipedia/en/thumb/c/c2/West_Ham_United_FC_logo.svg/250px-West_Ham_United_FC_logo.svg.png',
    jersey: 'https://www.classicfootballshirts.co.uk/cdn-cgi/image/fit=pad,q=70,f=webp//pub/media/catalog/product//2/c/2cd2206f3752de48ce29d040b1941150f0f1c43a0feeef2fd749f053440240ea.jpeg',
  },
  'AFC Bournemouth': {
    logo: 'https://resources.premierleague.com/premierleague/badges/t91.png',
    jersey: 'https://www.classicfootballshirts.co.uk/cdn-cgi/image/fit=pad,q=70,f=webp//pub/media/catalog/product//1/3/131026255826-1_urxibhdnbqkdwque.jpg',
  },
}

export function resolveMedia(clubName, rawUrl, type) {
  if (rawUrl && /^https?:\/\//i.test(rawUrl)) return rawUrl
  const entry = VERIFIED_MEDIA[clubName]
  return entry ? entry[type] : rawUrl || ''
}
