/* punks.js - Query TheGraph for punks */
import axios from "axios"
import { startTime, formatDate, formatPrice } from './utils.js'
const punkData = require('./data/punkdata.json')


export default async function getRecentOffers(options) { 
  const query = buildQuery(options)
  let results = await queryOffers(query)
  results = formatResponse(results)
  return(results)
}

function buildQuery(options) {
  /* All custom query logic goes here */
  let start = startTime(12) // Only pull the last 12h by default
  if(options && options.start) {
    start = startTime(options.start)
  }

  const query = `
  {
    transactions(where:{
      date_gt:${start},
      offer_not:null
    },
    orderBy: date) {
      date,
      offer {
        amountOffered,
        nftOfferedForSale {
          id
        }
      }
    }
  }
  `

  return(query)
}

async function queryOffers(query) {
    // Query TheGraph to grab latest transactions
    const url = 'https://api.thegraph.com/subgraphs/name/itsjerryokolo/cryptopunks'

    const response = await axios.post(url, {query: query })
    return(response.data.data.transactions)
}

function formatResponse(response) {
  let final = []



  for(let i = 0; i < response.length; i++) {
    const data = addPunkData(response[i].offer.nftOfferedForSale)
    final.push(data)
    final[i].date = formatDate(response[i].date)
    final[i].offer = formatPrice(response[i].offer.amountOffered)
    final[i].url = addUrl(response[i].offer.nftOfferedForSale.id)
    final[i].img = addImg(response[i].offer.nftOfferedForSale.id)
  }
  return(final)
}

function addPunkData(nft) {
  // Add Punk metadata from json files so we can sort, etc
  // Data originally sourced from: https://github.com/cryptopunksnotdead/punks
  /* Example:
  {
        id: 3581,
        type: 'Female',
        count: 3,
        accessories: [ 'Tassle Hat', 'Purple Lipstick', 'Nerd Glasses' ]
      }
  */
  nft = punkData[nft.id]
  return(nft)
}

function addUrl(id) {
  // Returns the URL to the listing so you can SNIPE it
  const url = `https://www.larvalabs.com/cryptopunks/details/${id}`
  return(url)
}

function addImg(id) {
  // Returns the Image so you can preview it
  // There are a few parameters that can be passed with the URL:
  // size (pixels)
  // customColor (hex w/o the #)
  // e.g. https://www.larvalabs.com/cryptopunks/cryptopunk4892.png?size=3072&customColor=FFC465

  // Image URLs are always 4 digits in length
  if(id >= 100 && id < 1000) {
    id = "0" + id  
  } else if (id >= 10 && id < 100) {
    id = "00" + id
  } else if (id < 10) {
    id = "000" + id
  }

  const url = `http://www.larvalabs.com/public/images/cryptopunks/punk${id}.png?size=128`
  return(url)
}