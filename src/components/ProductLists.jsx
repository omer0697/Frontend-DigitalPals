import React , { useState, useEffect, Profiler } from 'react'
import SelectField from './SelectField'
import PushPinIcon from '@mui/icons-material/PushPin';

const SORT_OPTIONS = {
  PRICE_LOW_TO_HIGH: 'Price low to high',
  PRICE_HIGH_TO_LOW: 'Price high to low'
}

  export default function ProductLists() {
    const [products, setProducts] = useState([])
    const [sortType, setSortType] = useState(SORT_OPTIONS.PRICE_LOW_TO_HIGH)

    useEffect(() => {
      const fetchProducts = async () => {
        const response = await fetch('http://localhost:5000/products')
        const data = await response.json()
        let sortedItems = data.filter(item => item.position !== null).sort((a, b) => a.position - b.position);

        // Create an array to hold rearranged items
        let rearrangedArray = [];

        // Loop through sortedItems and rearrange array based on position
        sortedItems.forEach(item => {
            rearrangedArray[item.position - 1] = item;
        });

        // Fill the remaining positions with items that have null position
        data.forEach(item => {
            if (item.position === null) {
                let index = 0;
                while (rearrangedArray[index] !== undefined) {
                    index++;
                }
                rearrangedArray[index] = item;
            }
        });

        setProducts(rearrangedArray)
        console.log(rearrangedArray)

      }
      fetchProducts()
    }
    , [])

    function sortProducts(sortType) {
      const sortedProducts = [...products];
      
      // Partition the array into two parts based on position
      let itemsWithPosition = sortedProducts.filter(item => item.position !== null);
      let itemsWithoutPosition = sortedProducts.filter(item => item.position === null);
  
      // Sort the part without positions based on price
      if (sortType === SORT_OPTIONS.PRICE_LOW_TO_HIGH) {
          itemsWithoutPosition.sort((a, b) => parseFloat(a.price) - parseFloat(b.price));
      } else if (sortType === SORT_OPTIONS.PRICE_HIGH_TO_LOW) {
          itemsWithoutPosition.sort((a, b) => parseFloat(b.price) - parseFloat(a.price));
      }
  
      // Merge items keeping items with position first and keeping their order
      const mergedArray = [];
      let positionIndex = 0;
      let nonPositionIndex = 0;
  
      for (let i = 0; i < sortedProducts.length; i++) {
          if (sortedProducts[i].position !== null) {
              mergedArray.push(sortedProducts[i]);
              positionIndex++;
          } else {
              mergedArray.push(itemsWithoutPosition[nonPositionIndex++]);
          }
      }
  
      setProducts(mergedArray);
  }

    return (
      <div>
        <div className="mx-auto max-w-2xl px-4 py-16 sm:px-6 sm:py-24 lg:max-w-7xl lg:px-8">
          <h2 className="sr-only">Products</h2>
          <div className=' flex w-full justify-end pb-10'>
            <SelectField
              label="Sort by"
              value={sortType}
              onChange={(e) => {
                setSortType(e.target.value)
                sortProducts(e.target.value)
              }}
              options={Object.values(SORT_OPTIONS)}
            />
          </div>
          <div className="grid grid-cols-1 gap-x-6 gap-y-10 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 xl:gap-x-8">
          {products.map((product) => (
              <a key={product.id} className="group">
                <div className="relative aspect-h-1 aspect-w-1 w-full overflow-hidden rounded-lg bg-gray-200 xl:aspect-h-8 xl:aspect-w-7">
                  <img
                    src={product.imgSrc}
                    className="h-full w-full object-cover object-center group-hover:opacity-75"
                  />
                  {product.pinned ? (
                    <div className="absolute top-2 right-2">
                      <PushPinIcon className="h-6 w-6 text-gray-800" />
                    </div>
                  ) : 
                  <div className="absolute top-2 right-2">
                    <PushPinIcon className="h-6 w-6 text-gray-500" />
                    </div>
                  }
                </div>
                <h3 className="mt-4 text-sm text-gray-700">{product.name}</h3>
                <p className="mt-1 text-lg font-medium text-gray-900">{product.price}</p>
              </a>
            ))}
          </div>
        </div>
      </div>
    )
  }
    
