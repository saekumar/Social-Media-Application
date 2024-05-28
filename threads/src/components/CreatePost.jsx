import React, { useState } from 'react'
import {
  Button,
  Flex,
  FormControl,
  Image,
  Input,
  Textarea,
  useColorMode,
  useColorModeValue,
} from '@chakra-ui/react'
import { Text } from '@chakra-ui/react'
import { AddIcon } from '@chakra-ui/icons'
import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
} from '@chakra-ui/react'
import { CloseButton } from '@chakra-ui/react'
import { useRef } from 'react'
import { useDisclosure } from '@chakra-ui/react'
import usePreviewImage from '../hooks/usePreviewImage'
import { BsFillImageFill } from 'react-icons/bs'
import useShowToast from '../hooks/useShowToast'
import { useRecoilValue } from 'recoil'
import userAtom from '../atoms/userAtom'

const CreatePost = () => {
  const user = useRecoilValue(userAtom)

  const imageRef = useRef(null)
  const { colorMode } = useColorMode()
  const { isOpen, onOpen, onClose } = useDisclosure()
  const [postText, setPostText] = useState('')
  const [remainingChars, setRemainingChars] = useState(500)
  const MAX_CHARS = 500
  const { handleImageChange, imgUrl, setImgUrl } = usePreviewImage()
  const showToast = useShowToast()
  const [loading, setLoading] = useState(false)
  const handleTextChange = (e) => {
    const inputText = e.target.value
    if (inputText.length > MAX_CHARS) {
      const trimmedText = inputText.slice(0, MAX_CHARS)
      setPostText(trimmedText)
    } else {
      setPostText(inputText)
      setRemainingChars(MAX_CHARS - inputText.length)
    }
  }

  const handleCreatePost = async () => {
    setLoading(true)
    try {
      const res = await fetch('/api/posts/create', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          postedBy: user._id,
          text: postText,
          img: imgUrl,
        }),
      })
      const data = await res.json()
      if (data.error) {
        showToast('An error occurred.', data.error, 'error')
        return
      }
      showToast('Success', 'Post created successfully', 'success')
      onClose()
    } catch (error) {
      showToast('An error occurred.', error, 'error')
    } finally {
      setLoading(false)
    }
    setPostText('')
    setImgUrl('')
  }
  return (
    <>
      <Button
        position={'fixed'}
        bottom={10}
        right={10}
        leftIcon={<AddIcon />}
        size="lg"
        bg={useColorModeValue('gray.300', 'gray.700')}
        onClick={onOpen}
      >
        Post
      </Button>
      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Create Post</ModalHeader>
          <ModalCloseButton />
          <ModalBody pb={6}>
            <FormControl>
              <Textarea
                placeholder="Post your content here"
                onChange={handleTextChange}
                value={postText}
              />
              <Text
                fontSize={'xs'}
                fontWeight={'bold'}
                textAlign={'right'}
                color={'gray.400'}
                m={2}
              >
                {remainingChars}/{MAX_CHARS}
              </Text>
              <Input
                type="file"
                hidden
                ref={imageRef}
                onChange={handleImageChange}
              />
              <BsFillImageFill
                style={{ marginLeft: '5px', cursor: 'pointer' }}
                size={16}
                onClick={() => imageRef.current.click()}
              />
            </FormControl>
            {imgUrl && (
              <Flex mt={5} w={'full'} position={'relative'}>
                <Image src={imgUrl} w={'full'} />
                <CloseButton
                  position={'absolute'}
                  top={2}
                  right={2}
                  onClick={() => setImgUrl('')}
                />
              </Flex>
            )}
          </ModalBody>

          <ModalFooter>
            <Button
              isLoading={loading}
              colorScheme="blue"
              mr={3}
              onClick={handleCreatePost}
            >
              Post
            </Button>
            <Button variant="ghost">Secondary Action</Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  )
}

export default CreatePost
