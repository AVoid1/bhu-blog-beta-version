import React, { useState, useEffect } from 'react';
import { Flex } from '@chakra-ui/react';
// import { NavBar } from '../Components';
import { Category, Create, Feed, NavBar, Search, VideoPin } from '../Components';
import { Routes, Route } from 'react-router-dom';
import { categories } from '../data';


const Home = ({ user }) => {


    return (
        <>
            <NavBar user={user} />

            <Flex width={'100vw'}>
                <Flex direction={"column"}
                    justifyContent="start"
                    alignItems={'center'}
                    width="5%"
                >
                    {categories && categories.map((data) => <Category key={data.id} data={data} />)}
                </Flex>

                <Flex
                    width={"95%"}
                    px={4}

                // justifyContent="start"
                // alignItems={'center'}
                >
                    <Routes>
                        <Route path='/' element={<Feed />} />
                        <Route path='/category:categoryId' element={<Feed />} />
                        <Route path='/create' element={<Create />} />
                        <Route path='/videoDetail' element={<VideoPin />} />
                        <Route path='/Search' element={<Search />} />

                    </Routes>

                </Flex>
            </Flex>
        </>
    );
}

export default Home;
