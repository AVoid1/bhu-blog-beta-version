import React, { useState, useEffect, useRef } from 'react'
import { Alert, Box, Button, Flex, FormLabel, Input, InputGroup, InputLeftElement, Menu, MenuButton, MenuItem, MenuList, Text, useColorMode, useColorModeValue } from '@chakra-ui/react'
import { IoChevronDown, IoCloudUpload, IoLocation, IoThumbsUp, IoTrash, IoWarning } from 'react-icons/io5';
import { categories } from '../data';
import Spinner from "./Spinner";

import { getStorage, ref, uploadBytesResumable, getDownloadURL, deleteObject } from 'firebase/storage'
import { firebaseApp } from '../firebase-config';
import AlertMsg from './AlertMsg';
import { Editor } from '@tinymce/tinymce-react';
import { fetchUser } from '../utils/fetchUser';
import { doc, getFirestore, setDoc } from 'firebase/firestore';
import { useNavigate } from 'react-router-dom';

const Create = () => {
  const { colorMode } = useColorMode();
  const bg = useColorModeValue("#999999", "#212121");
  const textColor = useColorModeValue("#212121", "#999999");

  const editorRef = useRef(null);

  const [title, setTitle] = useState('');
  const [category, setCategory] = useState('Choose an Category');
  const [location, setLocation] = useState('');
  const [videoAsset, setVideoAsset] = useState(null);
  const [loading, setLoading] = useState(false);
  const [progress, setProgress] = useState(1);
  const [alert, setAlert] = useState(false);
  const [alertStatus, setAlertStatus] = useState('');
  const [alertMsg, setAlertMsg] = useState('');
  const [alertIcon, setAlertIcon] = useState(null);
  const [description, setDescription] = useState('');

  const [userInfo] = fetchUser();
  const navigate = useNavigate();

  const storage = getStorage(firebaseApp);
  const firebaseDb = getFirestore(firebaseApp);

  const uploadImage = (e) => {
    setLoading(true)
    const videoFile = e.target.files[0];

    const storageRef = ref(storage, `Video Blogs/${Date.now()}-${videoFile.name}`);

    const uploadTask = uploadBytesResumable(storageRef, videoFile);
    uploadTask.on('state_changed', (snapshot) => {
      const uploadProgress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
      setProgress(uploadProgress)
    }, (error) => {
      console.log(error);
    }, () => {
      getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
        setVideoAsset(downloadURL);
        setLoading(false);
        setAlert(true);
        setAlertStatus("success");
        setAlertIcon(<IoThumbsUp fontSize={25} />);
        setAlertMsg("Your video is uploaded successfully");
        setTimeout(() => {
          setAlert(false)
        }, 4000)
      });
    })
  };

  const deleteImage = () => {
    const deleteRef = ref(storage, videoAsset)
    deleteObject(deleteRef).then(() => {
      setVideoAsset(null)
      setAlert(true);
      setAlertStatus("error");
      setAlertIcon(<IoWarning fontSize={25} />);
      setAlertMsg("Your video is removed");
      setTimeout(() => {
        setAlert(false)
      }, 4000)
    })
  }

  const getDescriptionValue = () => {
    if (editorRef.current) {
      console.log(editorRef.current.getContent());
      setDescription(editorRef.current.getContent());
    }
  };

  const uploadDetails = async () => {
    try {
      setLoading(true);
      if (!title, !category, !videoAsset) {
        setAlert(true);
        setAlertStatus("error");
        setAlertIcon(<IoWarning fontSize={25} />);
        setAlertMsg("Required fields are missing!");
        setTimeout(() => {
          setAlert(false);
        }, 4000);
        setLoading(false);
      }
      else {
        const data = {
          id: `${Date.now()}`,
          title: title,
          userId: userInfo?.uid,
          category: category,
          location: location,
          videoUrl: videoAsset,
          description: description,
        };

        await setDoc(doc(firebaseDb, "videos", `${Date.now()}`), data);
        setLoading(false);
        navigate('/', { replace: true });
      }
    }
    catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    console.log(videoAsset);
  }, [title, location, description, category]);

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
        {alert && <AlertMsg status={alertStatus} msg={alertMsg} icon={alertIcon} />}
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
                color={`${colorMode === "dark" ? "#F1F1F1" : "#111"}`}
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
          {!videoAsset ?
            (<FormLabel width={'full'}>
              <Flex
                direction={'column'}
                alignItems="center"
                justifyContent={'center'}
                height="full"
                width={'full'}

              >
                <Flex
                  direction={'column'}
                  alignItems="center"
                  justifyContent={'center'}
                  height="full"
                  width={'full'}
                  cursor="pointer"
                >
                  {loading ?
                    (<Spinner msg={'Uploading Your Video'} progress={progress} />) :
                    (<>
                      <IoCloudUpload
                        fontSize={20}
                        color={`${colorMode === "dark" ? "#F1F1F1" : "#111"}`}
                      />
                      <Text
                        mt={5}
                        fontSize={20}
                        color={textColor}
                      >
                        Click to Upload
                      </Text>
                    </>)}
                </Flex>
              </Flex>
              {!loading && (
                <input
                  type={'file'}
                  name="upload-image"
                  onChange={uploadImage}
                  style={{ width: 0, height: 0 }}
                  accept="video/mp4, video/x-m4v, video/*"
                >

                </input>
              )}
            </FormLabel>
            ) : (
              <Flex
                width={'full'}
                height="full"
                alignItems={"center"}
                justifyContent={"center"}
                bg="black"
                position={"relative"}
              >
                <Flex
                  justifyContent={"center"}
                  alignItems="center"
                  width={"40px"}
                  height="40px"
                  rounded={"full"}
                  bg={"red"}
                  top={5}
                  right={5}
                  position={"absolute"}
                  cursor={"pointer"}
                  zIndex={10}
                  onClick={deleteImage}
                >
                  <IoTrash fontSize={20} color="white" />
                </Flex>

                <video
                  src={videoAsset}
                  controls
                  style={{ width: "100%", height: "100%" }}
                />
              </Flex>
            )}
        </Flex>

        <Editor
          onChange={getDescriptionValue}
          onInit={(evt, editor) => editorRef.current = editor}
          apiKey={process.env.REACT_APP_TINYMCE_API_ID}
          init={{
            height: 500,
            width: "100%",
            menubar: false,
            plugins: [
              'advlist', 'autolink', 'lists', 'link', 'image', 'charmap',
              'anchor', 'searchreplace', 'visualblocks', 'code', 'fullscreen',
              'insertdatetime', 'media', 'table', 'preview', 'help', 'wordcount'
            ],
            toolbar: 'undo redo | blocks | ' +
              'bold italic forecolor | alignleft aligncenter ' +
              'alignright alignjustify | bullist numlist outdent indent | ' +
              'removeformat | help',
            content_style: 'body { font-family:Helvetica,Arial,sans-serif; font-size:14px }',
            content_css: "dark",
            skin: "oxide-dark"
          }}
        />

        <Button
          isLoading={loading}
          loadingText="Uploading"
          colorScheme={"linkedin"}
          variant={`${loading ? "outline" : "solid"}`}
          width={'xl'}
          _hover={{ shadow: 'lg' }}
          fontSize={20}
          onClick={() => uploadDetails()}
        >
          Upload
        </Button>
      </Flex>
    </Flex >
  )
};

export default Create;