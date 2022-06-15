import React from 'react'
import { Link } from 'react-router-dom';
import { Flex, Tooltip, useColorMode, useColorModeValue, Box } from '@chakra-ui/react'

function Category({ data }) {
  const { colorMode } = useColorMode();
  const bg = useColorModeValue("#757575", "#E0E0E0");
  return (
    <Flex cursor={'pointer'} my="5">
      <Link to={`/category/${data.name}`}>
        <Tooltip
          hasArrow placement='right'
          closeDelay={300}
          arrowSize={5}
          label={data.name}
          bg={bg}

        >
          <Box>{data.iconSrc}</Box>
        </Tooltip>
      </Link>
    </Flex>
  )
}

export default Category