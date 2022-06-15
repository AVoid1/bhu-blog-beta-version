import React from 'react';

import logo from '../img/beta1.png';
import logo_dark from '../img/beta2.png';
import { Link, useNavigate } from "react-router-dom";
import {
  Flex, Image, Input, Menu, MenuButton,
  MenuList,
  MenuItem,
  InputGroup, InputLeftElement, useColorMode, useColorModeValue
} from '@chakra-ui/react';
import { IoMoon, IoSearch, IoSunny, IoAdd, IoLogOut } from 'react-icons/io5'



const NavBar = ({ user }) => {
  const { colorMode, toggleColorMode } = useColorMode();
  const bg = useColorModeValue("#757575", "#E0E0E0");
  console.log(bg);
  return (
    <Flex justifyContent={'space-between'}
      alignItems={'center'}
      width={"100vw"}
      p={"4"}
    >
      <Link to={'/'}>
        <Image src={colorMode === "light" ? logo : logo_dark} width={"150px"} />
      </Link>
      <InputGroup mx={6} width="60vw">
        <InputLeftElement
          pointerEvents='none'
          children={<IoSearch fontSize={25} />}
        />
        <Input
          type='text'
          placeholder='Search...'
          fontSize={18}
          variant={"filled"}
          fontWeight={"medium"}
        />
      </InputGroup>
      <Flex justifyContent={"center"} alignItems={"center"}>
        <Flex
          width={"40px"}
          height="40px"
          justifyContent={"center"}
          alignItems="center"
          cursor={"pointer"}
          borderRadius="5px"
          onClick={toggleColorMode}
        >
          {colorMode === "light" ? (<IoMoon fontSize={25} />) : (<IoSunny fontSize={25} />)}
        </Flex>
        <Link to={'/create'}>
          <Flex justifyContent={"center"}
            alignItems="center"
            bg={bg}
            width="40px"
            height="40px"
            borderRadius='5px'
            mx={6}
            cursor="pointer"
            _hover={{ shadow: 'md' }}
            transition='ease-in-out'
            transitionDuration={'0.3s'}
          >
            <IoAdd
              fontSize={25}
              color={`${colorMode === "dark" ? "#111" : "#f1f1f1"}`} />
          </Flex>
        </Link>
        <Menu>
          <MenuButton>
            <Image
              src={user?.photoURL}
              width="40px"
              height="40px"
              rounded="full"
            />
          </MenuButton>
          <MenuList shadow={'lg'}>
            <Link to={''}>
              <MenuItem>My Account</MenuItem>
            </Link>
            <MenuItem flexDirection={'row'} alignItems='center' gap={4}>
              Logout <IoLogOut fontSize={20} /></MenuItem>

          </MenuList>
        </Menu>
      </Flex>
    </Flex>
  )
}

export default NavBar;