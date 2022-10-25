import axios from "axios"
import React, { useState, useEffect } from "react"

export const useFetchProducts = () => {
 // -------------------------------------------------
 // States
 // -------------------------------------------------
 const [products, setProducts] = useState([])
 const [error, setError] = useState(false)

 // -------------------------------------------------
 // Effects
 // -------------------------------------------------
 useEffect(() => {
  let mounted = true
  axios
   .get('/api/products')
   .then((res) => {
    if (mounted) {
     setProducts(res.data.products)
    }
   })
   .catch((error) => {
    /* istanbul ignore next */
    if (mounted) {
     setError(true)
    }
   })

  return () => {
   mounted = false
  }
 }, [])

 return {
  products,
  error
 };
}