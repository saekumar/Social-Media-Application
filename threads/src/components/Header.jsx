import { Flex, Image, useColorMode, Text } from '@chakra-ui/react'
import { Link } from 'react-router-dom'
import React from 'react'
import { useRecoilValue } from 'recoil'
import userAtom from '../atoms/userAtom'
import { AiFillHome } from 'react-icons/ai'
import { RxAvatar } from 'react-icons/rx'
const Header = () => {
  const colorMode = useColorMode()
  const toggleColorMode = useColorMode().toggleColorMode
  const currUser = useRecoilValue(userAtom)

  return (
    <Flex justifyContent={'space-between'} mt={6} mb="12">
      {currUser && (
        <Link to={'/'}>
          <AiFillHome size={24} />
        </Link>
      )}
      <Image
        cursor={'pointer'}
        w={6}
        src={colorMode === 'dark' ? '/light-logo.svg' : '/light-logo.svg'}
        onClick={toggleColorMode}
      />
      {currUser && (
        <Link to={`/${currUser.username}`}>
          <RxAvatar size={24} />
        </Link>
      )}
    </Flex>
  )
}

export default Header
