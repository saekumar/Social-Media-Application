import {
  Flex,
  Box,
  FormControl,
  FormLabel,
  Input,
  Checkbox,
  Stack,
  Link,
  Button,
  Heading,
  InputGroup,
  HStack,
  InputRightElement,
  Text,
  useColorModeValue,
} from '@chakra-ui/react'
import { ViewIcon, ViewOffIcon } from '@chakra-ui/icons'
import { useState } from 'react'
import { useRecoilValue } from 'recoil'
import authScreenAtom from '../atoms/authAtom'
import { useSetRecoilState } from 'recoil'
import { CgCollage } from 'react-icons/cg'
import { useToast } from '@chakra-ui/react'
import userAtom from '../atoms/userAtom'
export default function SimpleCard() {
  const toast = useToast()
  const [showPassword, setShowPassword] = useState(false)
  const setAuthScreen = useSetRecoilState(authScreenAtom)
  const [inputs, setInputs] = useState({
    username: '',
    password: '',
  })
  const setUser = useSetRecoilState(userAtom)
  const handleLogin = async () => {
    try {
      const res = await fetch('api/users/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(inputs),
      })

      const data = await res.json()
      if (data.error) {
        toast({
          title: 'An error occurred.',
          description: data.error,
          status: 'error',
          duration: 5000,
          isClosable: true,
        })
        return
      }
      toast({
        title: 'Login Successful.',
        description: 'You have successfully Logged in.',
        status: 'success',
        duration: 5000,
        isClosable: true,
      })
      localStorage.setItem('user-threads', JSON.stringify(data))
      setUser(data)

      setInputs({
        username: '',
        password: '',
      })
    } catch (error) {
      useShowToast('Error', error, 'error') // Log the specific error message
    }
  }
  return (
    <Flex
      align={'center'}
      justify={'center'}
      bg={useColorModeValue('gray.50', 'gray.800')}
    >
      <Stack spacing={8} mx={'auto'} maxW={'lg'} py={12} px={6}>
        <Stack align={'center'}>
          <Heading fontSize={'4xl'}>Sign in to your account</Heading>
        </Stack>
        <Box
          rounded={'lg'}
          bg={useColorModeValue('white', 'gray.700')}
          boxShadow={'lg'}
          p={8}
        >
          <Stack spacing={4}>
            <FormControl>
              <FormLabel>Username</FormLabel>
              <Input
                value={inputs.username}
                onChange={(e) => {
                  setInputs({ ...inputs, username: e.target.value })
                }}
                type="text"
              />
            </FormControl>
            <FormControl isRequired>
              <FormLabel>Password</FormLabel>
              <InputGroup>
                <Input
                  value={inputs.password}
                  onChange={(e) => {
                    setInputs({ ...inputs, password: e.target.value })
                  }}
                  pr="4.5rem"
                  type={showPassword ? 'text' : 'password'}
                />
                <InputRightElement h={'full'}>
                  <Button
                    variant={'ghost'}
                    onClick={() =>
                      setShowPassword((showPassword) => !showPassword)
                    }
                  >
                    {showPassword ? <ViewIcon /> : <ViewOffIcon />}
                  </Button>
                </InputRightElement>
              </InputGroup>
            </FormControl>
            <Stack spacing={10}>
              <Stack
                direction={{ base: 'column', sm: 'row' }}
                align={'start'}
                justify={'space-between'}
              >
                <Checkbox>Remember me</Checkbox>
              </Stack>
              <Button
                loadingText="Submitting"
                size="lg"
                bg={useColorModeValue('gray.700', 'gray.800')}
                color={'white'}
                _hover={{
                  bg: useColorModeValue('gray.900', 'gray.400'),
                  color: useColorModeValue('white', 'black'),
                }}
                onClick={handleLogin}
              >
                Sign in
              </Button>
            </Stack>
            <Stack>
              <Text>
                Don't have an account?{' '}
                <Link
                  onClick={() => setAuthScreen('signup')}
                  color={'blue.400'}
                >
                  Sign up
                </Link>
              </Text>
            </Stack>
          </Stack>
        </Box>
      </Stack>
    </Flex>
  )
}
