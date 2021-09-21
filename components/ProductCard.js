import React from 'react';
import { Box, Image, Badge, } from "@chakra-ui/react"


const ProductCard = (product) => {
  const data = product.node

  const { name, categoryTags: tags } = data
  const price = data.shopifyProductEu.variants.edges[0].node.price
  const { url: imageUrl } = data.thumbnailImage.file
  const colors = data.colorFamily

  return (
    <Box maxW="sm" borderWidth="1px" borderRadius="lg" overflow="hidden">
      <Image src={imageUrl} alt={name} />
      <Box p="6">
        <Box d="flex" alignItems="baseline">
          {tags?.map((tag, index) => (
            <Badge mr={2} key={index} borderRadius="full" px="2" colorScheme="teal">
              {tag}
            </Badge>
          ))}
        </Box>
        <Box
          mt="1"
          fontWeight="semibold"
          as="h4"
          lineHeight="tight"
          isTruncated
        >
          {name}
        </Box>
        <Box>
          €{price}
        </Box>
        {colors && (
          <Box as="span" color="gray.600" fontSize="sm">
            Color: {colors.map(color => <span key={color.name}>{color.name}</span>)}
          </Box>
        )}
      </Box>
    </Box>
  )
}

export default ProductCard;