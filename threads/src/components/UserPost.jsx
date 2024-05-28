import React, { useState } from 'react'
import { Avatar, Box, Flex } from '@chakra-ui/react'
import { Link } from 'react-router-dom'
import { Text } from '@chakra-ui/react'
import { Image } from '@chakra-ui/react'
import { BsThreeDots } from 'react-icons/bs'
import Actions from './Actions'
const UserPost = ({ userId, post }) => {
  const [liked, setLiked] = useState(false)

  return (
    <Link to={`/${post.postedBy.username.toString()}/post/${post._id}`}>
      <Flex gap={3} mb={4} py={5}>
        <Flex flexDirection={'column'} alignItems={'center'}>
          <Avatar name="Mark mawa" src={post.postedBy.profilePic} size={'md'} />
          <Box w="1px" h={'full'} bg={'gray.light'} my={2}></Box>
          <Box position={'relative'} w={'full'}>
            <Avatar
              name="Kola Tioluwani"
              size={'xs'}
              src="https://bit.ly/dan-abramov"
              position={'relative'}
              top={'0px'}
              left={'14px'}
              padding={'2px'}
            />
            <Avatar
              name="Ryan Florence"
              src="https://bit.ly/ryan-florence"
              size={'xs'}
              position={'relative'}
              bottom={'0px'}
              right={'-9px'}
              padding={'2px'}
            />
            <Avatar
              name="Prosper Otemuyiwa"
              size={'xs'}
              src="https://bit.ly/prosper-baba"
              position={'relative'}
              bottom={'0px'}
              left={'4px'}
              padding={'2px'}
            />
          </Box>
        </Flex>
        <Flex flex={1} flexDirection={'column'} gap={2}>
          <Flex justifyContent={'space-between'} w={'full'}>
            <Flex w={'full'} alignItems={'center'}>
              <Text fontSize={'sm'} fontWeight={'bold'}>
                {post.postedBy.username}
              </Text>
              <Image src="/verified.png" w={4} h={4} ml={2} />
            </Flex>
            <Flex gap={4} alignItems={'center'}>
              <Text fontSize={'sm'} color={'gray.light'}>
                1d
              </Text>
              <BsThreeDots />
            </Flex>
          </Flex>
          <Text fontSize={'sm'}>{post.text}</Text>
          <Box
            borderRadius={6}
            overflow={'hidden'}
            border={'1px solid'}
            borderColor={'gray.light'}
          >
            <Image src={post.img} w={'full'} />
          </Box>
          <Flex gap={3} my={1}>
            <Actions liked={liked} setLiked={setLiked} />
          </Flex>
          <Flex>
            <Text color={'gray.light'} fontSize={'sm'}>
              {post.replies.length}
            </Text>
            <Box
              w={0.5}
              h={0.5}
              mt={3}
              ml={2}
              borderRadius={'full'}
              bg={'gray.light'}
            ></Box>
            <Text ml={2} color={'gray.light'} fontSize={'sm'}>
              {post.likes.length}
            </Text>
          </Flex>
        </Flex>
      </Flex>
    </Link>
  )
}

export default UserPost
