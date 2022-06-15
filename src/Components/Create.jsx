import React, { useState } from 'react'
import { Button, Flex, Input, InputGroup, InputLeftElement, Menu, MenuButton, MenuItem, MenuList, Text, useColorMode, useColorModeValue } from '@chakra-ui/react'
import { IoChevronDown, IoLocation } from 'react-icons/io5';
import { categories } from '../data';

const Create = () => {
  const { colorMode } = useColorMode();
  const bg = useColorModeValue("#999999", "#212121");
  const textColor = useColorModeValue("#212121", "#999999");
  const [title, setTitle] = useState('');
  const [category, setCategory] = useState('Choose an Category');
  const [location, setLocation] = useState('');

  return (
    <Flex justifyContent={'center'}
      alignItems="center"
      width={"full"}
      minHeight="100vh"
      padding={10}
    // bg={bg}
    >
      <Flex
        width={"80%"}
        height="full"
        border={"1px"}
        borderColor="#E0E0E0"
        borderRadius={"md"}
        p="4"
        flexDirection={"column"}
        alignItems="center"
        justifyContent={"center"}
        gap={2}
      >
        <Input
          variant={"flushed"}
          placeholder="title"
          focusBorderColor='#BDBDBD'
          isRequired
          errorBorderColor="red"
          type={'text'}
          _palceholder={{ color: "#9E9E9E" }}
          fontSize={20}
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />
        <Flex
          justifyContent={"space-between"}
          width="full"
          alignItems={'center'}
          gap={8}
          mx={4}
        >
          <Menu>
            <MenuButton
              width={"full"}
              colorScheme="blue"
              as={Button}
              rightIcon={<IoChevronDown fontSize={25} />}
            >
              {category}
            </MenuButton>
            <MenuList
              zIndex={101}
              width={'md'}
              shadow="xl"
            >
              {categories && categories.map(data => (
                <MenuItem
                  key={data.id}
                  _hover={{ bg: 'blackALpha.300' }}
                  fontSize={20}
                  px={4}
                  onClick={() => setCategory(data.name)}
                >
                  {data.iconSrc}{""}
                  <Text fontSize={18} mx={4}>
                    {data.name}
                  </Text>
                </MenuItem>
              ))}
            </MenuList>
          </Menu>
          <InputGroup>
            <InputLeftElement
              pointerEvents='none'
              children={<IoLocation
                fontSize={20}
                color={`${colorMode == "dark" ? "#F1F1F1" : "#111"}`}
              />}
            />
            <Input
              variant={"flushed"}
              placeholder="Location"
              focusBorderColor='#BDBDBD'
              isRequired
              errorBorderColor="red"
              type={'text'}
              _palceholder={{ color: "#9E9E9E" }}
              fontSize={20}
              value={location}
              onChange={(e) => setLocation(e.target.value)}
            />
          </InputGroup>
        </Flex>
        <Flex
          border={"1px"}
          borderColor="gray.500"
          height={"400px"}
          borderStyle="dashed"
          width='full'
          borderRadius={'md'}
          overflow="hidden"
          position={'relative'}
        >

        </Flex>
      </Flex>

    </Flex>
  )
};

export default Create;