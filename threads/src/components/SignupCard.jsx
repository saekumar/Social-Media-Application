import {
  Flex,
  Box,
  FormControl,
  FormLabel,
  Input,
  InputGroup,
  HStack,
  InputRightElement,
  Stack,
  Button,
  Heading,
  Text,
  useColorModeValue,
  Link,
} from '@chakra-ui/react'
import { useState } from 'react'
import { ViewIcon, ViewOffIcon } from '@chakra-ui/icons'
import { useSetRecoilState } from 'recoil'
import authScreenAtom from '../atoms/authAtom'
import { useToast } from '@chakra-ui/react'
import useShowToast from '../hooks/useShowToast'
import userAtom from '../atoms/userAtom'
export default function SignupCard() {
  const toast = useToast()
  const [showPassword, setShowPassword] = useState(false)
  const setAuthScreen = useSetRecoilState(authScreenAtom)
  const [inputs, setInputs] = useState({
    email: '',
    password: '',
    username: '',
    name: '',
  })
  const setUser = useSetRecoilState(userAtom)
  const handleSignup = async () => {
    try {
      const res = await fetch('api/users/signup', {
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
        title: 'Account created.',
        description: 'You have successfully signed up.',
        status: 'success',
        duration: 5000,
        isClosable: true,
      })
      localStorage.setItem('user-threads', JSON.stringify(data))
      setUser(data)

      setInputs({
        email: '',
        password: '',
        username: '',
        name: '',
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
          <Heading fontSize={'4xl'} textAlign={'center'}>
            Sign up
          </Heading>
        </Stack>
        <Box
          rounded={'lg'}
          bg={useColorModeValue('white', 'gray.700')}
          boxShadow={'lg'}
          mb={15}
          p={8}
        >
          <Stack spacing={4}>
            <HStack>
              <Box>
                <FormControl isRequired>
                  <FormLabel>Full Name</FormLabel>
                  <Input
                    onChange={(e) => {
                      setInputs((inputs) => ({
                        ...inputs,
                        name: e.target.value,
                      }))
                    }}
                    type="text"
                    value={inputs.fullName}
                  />
                </FormControl>
              </Box>
              <Box>
                <FormControl isRequired>
                  <FormLabel> Username</FormLabel>
                  <Input
                    onChange={(e) => {
                      setInputs((inputs) => ({
                        ...inputs,
                        username: e.target.value,
                      }))
                    }}
                    value={inputs.username}
                    type="text"
                  />
                </FormControl>
              </Box>
            </HStack>
            <FormControl isRequired>
              <FormLabel>Email address</FormLabel>
              <Input
                onChange={(e) => {
                  setInputs((inputs) => ({
                    ...inputs,
                    email: e.target.value,
                  }))
                }}
                value={inputs.email}
                type="email"
              />
            </FormControl>
            <FormControl isRequired>
              <FormLabel>Password</FormLabel>
              <InputGroup>
                <Input
                  onChange={(e) => {
                    setInputs((inputs) => ({
                      ...inputs,
                      password: e.target.value,
                    }))
                  }}
                  value={inputs.password}
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
            <Stack spacing={10} pt={2}>
              <Button
                loadingText="Submitting"
                size="lg"
                bg={useColorModeValue('gray.700', 'gray.800')}
                color={'white'}
                _hover={{
                  bg: useColorModeValue('gray.900', 'gray.400'),
                  color: useColorModeValue('white', 'black'),
                }}
                onClick={handleSignup}
              >
                Sign up
              </Button>
            </Stack>
            <Stack pt={6}>
              <Text align={'center'}>
                Already a user?{' '}
                <Link onClick={() => setAuthScreen('login')} color={'blue.400'}>
                  Login
                </Link>
              </Text>
            </Stack>
          </Stack>
        </Box>
      </Stack>
    </Flex>
  )
}
