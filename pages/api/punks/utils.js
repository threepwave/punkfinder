/* utils.js - Helper functions for formatting things like dat/time, etc */

export const startTime = (hours) => {
  // Returns a Unix epoch timstamp from the last n hours from now
  const timestamp = Math.round(new Date().getTime() / 1000)
  const twentyfour = timestamp - (hours * 3600)
  return(twentyfour)
}

export const formatDate = (timestamp) => {
  // Solidity uses Unix Epoch time
   // We'll convert it to something javascript-readable
   const date = new Date(timestamp*1000).toLocaleString()
   return(date)
 }
 
export const formatPrice = (amount) => {
   // Convert price to proper eth decimal places
   const price = amount * Math.pow(10, -18)
   return(price.toFixed(2))
 }

//  export { startTime, formatDate, formatPrice }