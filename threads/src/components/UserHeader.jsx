import { Box, Flex, VStack, Text, Button } from '@chakra-ui/react'
import { Avatar } from '@chakra-ui/react'
import React, { useEffect, useState } from 'react'
import { BsInstagram } from 'react-icons/bs'
import { CgMoreO } from 'react-icons/cg'

import {
  Menu,
  MenuButton,
  MenuList,
  MenuItem,
  MenuItemOption,
  MenuGroup,
  MenuOptionGroup,
  MenuDivider,
  Portal,
} from '@chakra-ui/react'
import { Link, Route } from 'react-router-dom'
import '../index.css'
import userAtom from '../atoms/userAtom'
import { useRecoilValue } from 'recoil'
import useShowToast from '../hooks/useShowToast'
const UserHeader = ({ user }) => {
  const [followersText, setFollowersText] = useState('followers')
  const useToast = useShowToast()
  const currUser = useRecoilValue(userAtom)
  const [following, setFollowing] = useState(
    user.followers.includes(currUser._id)
  )

  const handleFollow = async () => {
    try {
      const res = await fetch(`api/users/follow/${user._id}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          followId: user._id,
        }),
      })

      const data = await res.json()
      if (data.error) {
        useToast('An error occurred.', data.error, 'error')
        return
      }
      if (following) {
        useToast('Success', `Unfollowed ${user.name} successfully`, 'success')
        user.followers.pop(currUser._id)
      } else {
        useToast('Success', `Followed ${user.name} successfully`, 'success')
        user.followers.push(currUser._id)
      }
      setFollowing(!following)
    } catch (error) {
      toast({
        title: 'An error occurred.',
        description: error,
        status: 'error',
        duration: 5000,
        isClosable: true,
      })
    }
  }

  useEffect(() => {
    if (user.followers.length <= 1) {
      setFollowersText('follower')
    } else {
      setFollowersText('followers')
    }
  }, [user.followers])

  const copyUrl = () => {
    const currurl = window.location.href

    navigator.clipboard.writeText(currurl).then(() => {
      toast({
        description: 'Profile Link Copied',
      })
    })
  }

  console.log(user.followers.length)
  return (
    <VStack gap={4} alignItems={'start'}>
      <Flex alignItems={'start'} justifyContent={'space-around'} gap={4}>
        <Flex>
          <Box>
            <Avatar
              name={user.username}
              src={user.profilePic}
              mt={5}
              size={{
                base: 'lg',
                md: '2xl',
              }}
            />
          </Box>
        </Flex>
        <VStack alignItems={'start'} gap={4}>
          <Flex
            flex={1}
            alignItems={'start'}
            justifyContent={'space-between'}
            gap={10}
          >
            <Text fontSize={'xl'} fontWeight={'3.504a1'}>
              {user.username}
            </Text>
            <Box>
              {currUser._id !== user._id ? (
                <Button
                  onClick={handleFollow}
                  bg={'gray.light'}
                  color={'gray.300'}
                  fontSize={'md'}
                  rounded={'md'}
                  p={2}
                  borderRadius={'md'}
                  ml={2} // Add margin-left for space after the text
                >
                  {following ? 'Unfollow' : 'Follow'}
                </Button>
              ) : (
                <Button
                  bg={'gray.light'}
                  color={'gray.300'}
                  fontSize={'md'}
                  rounded={'md'}
                  p={2}
                  borderRadius={'md'}
                  ml={2}
                >
                  <Link to={'/update'}>Edit Profile</Link>
                </Button>
              )}
            </Box>
            <Box>
              <Flex gap={2}>
                <Box className="icon-container">
                  <BsInstagram size={24} cursor={'pointer'} />
                </Box>
                <Box className="icon-container">
                  <Menu>
                    <MenuButton>
                      <CgMoreO size={24} cursor={'pointer'} />
                    </MenuButton>
                    <Portal>
                      <MenuList bg={'gray.dark'}>
                        <MenuItem bg={'gray.dark'} onClick={copyUrl}>
                          Copy Link
                        </MenuItem>
                      </MenuList>
                    </Portal>
                  </Menu>
                </Box>
              </Flex>
            </Box>
          </Flex>
          <Flex
            flex={1}
            alignItems={'start'}
            justifyContent={'space-between'}
            gap={10}
          >
            <Text mt={2} fontSize={'xl'} fontWeight={'3.504a1'}>
              0 Posts
            </Text>
            <Box>
              <Text ml={2} p={2} fontSize={'xl'} fontWeight={'3.504a1'}>
                {user.followers.length} {followersText}
              </Text>
            </Box>
            <Box>
              <Text ml={2} p={2} fontSize={'xl'} fontWeight={'3.504a1'}>
                {user.following.length} following
              </Text>
            </Box>
          </Flex>
          <VStack alignItems={'start'} gap={3}>
            <Flex>
              <Text fontSize={'xl'} fontWeight={'3.504a1'}>
                {user.name}
              </Text>
            </Flex>

            <Flex>
              <Text>{user.bio}</Text>
            </Flex>
          </VStack>
        </VStack>
      </Flex>
      <Flex w={'full'}>
        <Flex
          flex={1}
          borderBottom={'1.5px solid white'}
          justifyContent={'center'}
          pb="3"
          cursor={'pointer'}
        >
          <Text fontWeight={'bold'}> Threads</Text>
        </Flex>
        <Flex
          flex={1}
          borderBottom={'1px solid gray'}
          justifyContent={'center'}
          color={'gray.light'}
          pb="3"
          cursor={'pointer'}
        >
          <Text fontWeight={'bold'}> Replies</Text>
        </Flex>
      </Flex>
    </VStack>
  )
}

export default UserHeader

//  <VStack gap={4} alignItems={'start'}>
//       <Flex justifyContent={'space-between'} w={'full'}>
//         <Box>
//           <Text fontSize={'2xl'} fontWeight={'bold'}>
//             {user.name}
//           </Text>
//           <Flex gap={2} alignItems={'center'}>
//             <Text fontSize={'sm'}>4 posts</Text>
//             <Text
//               fontSize={{
//                 base: 'xs',
//                 md: 'sm',
//                 lg: 'md',
//               }}
//               bg={'gray.dark'}
//               color={'gray.light'}
//               p={1}
//               borderRadius={'full'}
//             >
//               {' '}
//               threads.net
//             </Text>
//           </Flex>
//         </Box>
//         <Box>
//           <Avatar
//             name={user.username}
//             src={user.profilePic}
//             size={{
//               base: 'lg',
//               md: '2xl',
//             }}
//           />
//         </Box>
//       </Flex>
//       <Text>{user.bio}</Text>

//       <Flex w={'full'} justifyContent={'space-between'}>
//         <Flex gap={2} justifyContent={'space-between'}>
//           <Text fontSize={'sm'} color={'gray/light'}>
//             {user.followers.length} {followersText}
//           </Text>
//           <Box
//             w="1"
//             h="1"
//             bg={'gray.light'}
//             borderRadius={'full'}
//             marginTop={'3'}
//           ></Box>
//           <Link
//             bg={'gray.dark'}
//             color={'gray.light'}
//             fontSize={'sm'}
//             rounded={'lg'}
//             p={1}
//             borderRadius={'full'}
//             href="https://www.instagram.com/zuck/?hl=en"
//           >
//             instagram.com
//           </Link>
//         </Flex>
//         <Flex gap={2}>
//           <Box className="icon-container">
//             <BsInstagram size={24} cursor={'pointer'} />
//           </Box>
//           <Box className="icon-container">
//             <Menu>
//               <MenuButton>
//                 <CgMoreO size={24} cursor={'pointer'} />
//               </MenuButton>
//               <Portal>
//                 <MenuList bg={'gray.dark'}>
//                   <MenuItem bg={'gray.dark'} onClick={copyUrl}>
//                     Copy Link
//                   </MenuItem>
//                 </MenuList>
//               </Portal>
//             </Menu>
//           </Box>
//         </Flex>
//       </Flex>
//       <Flex gap={2} w={'full'}>
//         <Flex
//           flex={1}
//           borderBottom={'1.5px solid white'}
//           justifyContent={'center'}
//           paddingBottom={3}
//           cursor={'pointer'}
//         >
//           <Text fontWeight={'bold'}>Threads</Text>
//         </Flex>
//         <Flex
//           flex={1}
//           borderBottom={'1.5px solid gray'}
//           justifyContent={'center'}
//           paddingBottom={3}
//           cursor={'pointer'}
//         >
//           <Text fontWeight={'bold'}>Replies</Text>
//         </Flex>
//       </Flex>
//     </VStack>
