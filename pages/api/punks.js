/* Recent Punks API: /punks 
   Example:
   { 
     "date":"6/14/2021, 3:42:37 AM",
     "amountOffered":"33.00",
     "id":4878,
     "type":"Male",
     "accessory_count":3,
     "accessories":["Frumpy Hair","Chinstrap","Classic Shades"],
     "url":"https://www.larvalabs.com/cryptopunks/details/4878",
     "img":"http://www.larvalabs.com/public/images/cryptopunks/punk4878.png"
    }
   */

import getRecentOffers from './punks/punks.js'

export default async (req, res) => {
  const response = await getRecentOffers()
  res.status(200).json(response)  
}

