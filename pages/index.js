
import React, { useEffect, useState } from 'react'
import InfiniteScroll from 'react-infinite-scroll-component';
import {
  Drawer, DrawerBody, DrawerHeader, DrawerOverlay, DrawerContent, DrawerCloseButton,
  Checkbox, Button, Grid, Select, HStack, Spacer,
  useDisclosure
} from "@chakra-ui/react"

import db from '../utils/db.json'
import ProductCard from '../components/ProductCard';
const DEFAULT_LIMIT = 6;


const App = () => {
  const [limit, setLimit] = useState(DEFAULT_LIMIT)
  const { isOpen, onOpen, onClose } = useDisclosure()

  const [colorFilterOptions, setColorFilterOptions] = useState()
  const [categoryFilterOptions, setCategoryFilterOptions] = useState()

  function unique(result, input) {
    if (result.includes(input)) {
      return result
    }
    return [...result, input]
  }

  const determineColorFilterOptions = (data) => {
    return data
      .map(product => {
        return product.node.colorFamily
      })
      .map(color => {
        if (color) {
          return color.map(item => (Object.values(item)))
        }
      })
      .join()
      .split(',')
      .reduce(unique, [])
      .reduce((result, input) => {
        const checked = false;
        return {
          ...result,
          [input]: {
            label: input,
            checked
          }
        }
      }, {});
  };

  const determineCategoryFilterOptions = (data) => {
    return data
      .map(product => {
        return product.node.categoryTags
      })
      .join()
      .split(',')
      .reduce(unique, [])
      .reduce((result, input) => {
        const checked = false;
        return {
          ...result,
          [input]: {
            label: input,
            checked
          }
        }
      }, {});
  };


  const { allContentfulProductPage: data } = db.data;
  const products = data.edges

  useEffect(() => {
    setColorFilterOptions(determineColorFilterOptions(products))
    setCategoryFilterOptions(determineCategoryFilterOptions(products))
  }, [products])

  if (products === undefined) {
    return null
  }

  if (colorFilterOptions === undefined) {
    return <div>Loading ....</div>
  }

  const unfilteredProducts = products.slice(0, limit)
  const filteredProducts =
    products
      .filter(input => colorFilterOptions[input.node.colorFamily?.map(item => (Object.values(item))).join()]?.checked)
      // .filter(input => categoryFilterOptions[input.node.categoryTags?.join().split(",").map(i => i)]?.checked)
      .slice(0, limit)

  return (
    <Grid py={16} px={4}>
      <>
        <Button colorScheme="blue" onClick={onOpen} variant="outline" mb={6}>
          Filters
        </Button>
        <Drawer placement="top" onClose={onClose} isOpen={isOpen} >
          <DrawerOverlay />
          <DrawerContent>
            <DrawerCloseButton />
            <DrawerHeader color="blue.600">Color</DrawerHeader>
            <DrawerBody>
              <Grid templateColumns="repeat(8, 1fr)">
                {Object.keys(colorFilterOptions).map(key => {
                  return (
                    <Checkbox key={key}
                      isChecked={colorFilterOptions[key].checked}
                      onChange={(e) => {
                        setLimit(DEFAULT_LIMIT)
                        setColorFilterOptions({
                          ...colorFilterOptions,
                          [key]: {
                            label: colorFilterOptions[key].label,
                            checked: !colorFilterOptions[key].checked
                          }
                        })
                      }}
                    >
                      {colorFilterOptions[key].label}
                    </Checkbox>
                  )
                })}
              </Grid>
            </DrawerBody>

            <DrawerHeader color="blue.600">Category</DrawerHeader>
            <DrawerBody>
              <Grid templateColumns="repeat(6, 1fr)">
                {Object.keys(categoryFilterOptions).map(key => {
                  return (
                    <Checkbox key={key}
                      isChecked={categoryFilterOptions[key].checked}
                      onChange={(e) => {
                        setLimit(DEFAULT_LIMIT)
                        setCategoryFilterOptions({
                          ...categoryFilterOptions,
                          [key]: {
                            label: categoryFilterOptions[key].label,
                            checked: !categoryFilterOptions[key].checked
                          }
                        })
                      }}
                    >
                      {categoryFilterOptions[key].label}
                    </Checkbox>
                  )
                })}
              </Grid>
            </DrawerBody>

            <DrawerHeader color="blue.600" >Price untill</DrawerHeader>
            <DrawerBody mb={4}>
              <HStack spacing={4}>
                <Select placeholder="Select price" w="50%" disabled>
                  <option> 100€</option>
                  <option> 200€</option>
                  <option> 300€</option>
                </Select>

                <Spacer />
                <Button onClick={onClose} colorScheme="blue">Filter</Button>
              </HStack>
            </DrawerBody>
          </DrawerContent>
        </Drawer>
      </>

      <InfiniteScroll
        dataLength={limit}
        next={() => {
          setLimit(limit + DEFAULT_LIMIT)
        }}
        hasMore={true}
        loader={<p >Loading.... </p>}
      >
        <Grid templateColumns="repeat(3, 1fr)" gap={6}>
          {filteredProducts.length < 1 ? unfilteredProducts.map((product, index) => (
            <ProductCard key={index} {...product} />
          )) : filteredProducts.map((product, index) => (
            <ProductCard key={index} {...product} />
          ))
          }
        </Grid>
      </InfiniteScroll>
    </Grid >
  )
}
export default App
