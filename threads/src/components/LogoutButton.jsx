import { Button } from '@chakra-ui/react'
import React from 'react'
import { useSetRecoilState } from 'recoil'
import useShowToast from '../hooks/useShowToast'
import userAtom from '../atoms/userAtom'
import { MdLogout } from 'react-icons/md'
import { useNavigate } from 'react-router-dom'

const LogoutButton = () => {
  const setUser = useSetRecoilState(userAtom)
  const showToast = useShowToast()
  // Initialize useHistory
  const navigate = useNavigate()

  const handleLogout = async () => {
    try {
      const res = await fetch('/api/users/logout/', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
      })

      if (res.ok) {
        localStorage.removeItem('user-threads')
        setUser(null)
        navigate('/')
      } else {
        // If not successful, display the error message from the response
        const errorText = await res.text()
        showToast('An error occurred.', errorText, 'error')
      }
    } catch (error) {
      showToast('Error', error, 'error') // Fixed useShowToast to showToast
    }
  }

  return (
    <Button
      position={'absolute'}
      top={'30px'}
      right={'30px'}
      size={'sm'}
      variant={'outline'}
      onClick={() => handleLogout()}
    >
      <MdLogout size={20} />
    </Button>
  )
}

export default LogoutButton
