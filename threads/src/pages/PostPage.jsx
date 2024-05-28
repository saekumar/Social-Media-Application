import React, { useState } from 'react'
import {
  Avatar,
  Box,
  Button,
  Divider,
  Flex,
  Image,
  Text,
} from '@chakra-ui/react'
import { BsThreeDots } from 'react-icons/bs'
import Actions from '../components/Actions'
import Comment from '../components/Comment'
const PostPage = () => {
  const [liked, setLiked] = useState(false)
  return (
    <>
      <Flex cursor={'pointer'}>
        <Flex w={'full'} alignItems={'center'} gap={3}>
          <Avatar name="Mark mawa" src="/zuck-avatar.png" size={'md'} />
          <Flex>
            <Text fontSize={'sm'} fontWeight={'bold'}>
              Mark Zuckerberg
            </Text>
            <Image src="/verified.png" w={4} h={4} ml={2} />
          </Flex>
        </Flex>
        <Flex gap={4} alignItems={'center'}>
          <Text fontSize={'sm'} color={'gray.light'}>
            1d
          </Text>
          <BsThreeDots />
        </Flex>
      </Flex>
      <Text my={3}>Lets talks about threads</Text>
      <Box
        borderRadius={6}
        overflow={'hidden'}
        border={'1px solid'}
        borderColor={'gray.light'}
      >
        <Image src="/post1.png" w={'full'} />
      </Box>
      <Flex gap={3} my={3}>
        <Actions liked={liked} setLiked={setLiked} />
      </Flex>
      <Flex gap={2} alignItems={'center'}>
        <Text color={'gray.light'}>238 replies</Text>
        <Box w={0.5} h={0.5} borderRadius={'full'} bg={'gray.light'}></Box>
        <Text color={'gray.light'} fontSize={'sm'}>
          231 likes
        </Text>
      </Flex>
      <Divider my={5} />
      <Flex justifyContent={'space-between'}>
        <Flex gap={2} alignItems={'center'}>
          <Text fontSize={'lg'} fontWeight={'bold'}>
            👋
          </Text>
          <Text color={'gray.light'}>Get the app to like,reply, and post</Text>
        </Flex>
        <Button>Get</Button>
      </Flex>
      <Divider my={5} />
      <Comment
        comment="Looks really good"
        createdAt="1d"
        likes={231}
        username="Saikumar"
        userAvatar="https://bit.ly/dan-abramov"
      />
      <Comment
        comment="zuccu is the best🔥🔥🔥"
        createdAt="1d"
        likes={561}
        username="Manikanta"
        userAvatar="https://bit.ly/prosper-baba"
      />
      <Comment
        comment="Lit🔥🔥🔥"
        createdAt="1d"
        likes={451}
        username="Ganesh"
        userAvatar="https://bit.ly/ryan-florence"
      />
      <Comment
        comment="Stunned!🔥"
        createdAt="2d"
        likes={731}
        username="Teja"
        userAvatar="https://bit.ly/kent-c-dodds"
      />
    </>
  )
}

export default PostPage
