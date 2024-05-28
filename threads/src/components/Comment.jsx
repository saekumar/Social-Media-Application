import { Avatar, Flex, Text } from '@chakra-ui/react'
import React, { useState } from 'react'
import { BsThreeDots } from 'react-icons/bs'
import Actions from './Actions'
import { Divider } from '@chakra-ui/react'
const Comment = ({ comment, createdAt, likes, username, userAvatar }) => {
  const [liked, setLiked] = useState(false)
  return (
    <>
      <Flex gap={4} py={2} my={2} w={'full'}>
        <Avatar name="Mark mawa" src={userAvatar} size={'sm'} mb={4} />
        <Flex w={'full'} gap={1} flexDirection={'column'}>
          <Flex
            w={'full'}
            alignItems={'center'}
            justifyContent={'space-between'}
          >
            <Text fontSize={'sm'} color={'gray.light'} fontWeight={'bold'}>
              {username}
            </Text>
            <Flex gap={2} alignItems={'center'}>
              <Text fontSize={'sm'} color={'gray.light'}>
                {createdAt}
              </Text>
              <BsThreeDots />
            </Flex>
          </Flex>
          <Flex>
            <Text fontSize={'sm'}>{comment}</Text>
          </Flex>
          <Actions liked={liked} setLiked={setLiked} />
          <Text color={'gray.light'} fontSize={'sm'}>
            {likes} likes
          </Text>
        </Flex>
      </Flex>
      <Divider my={4} color={'gray.light'} />
    </>
  )
}

export default Comment
