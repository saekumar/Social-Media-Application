import React, { useEffect, useRef, useState } from 'react'
import { Button, Flex } from '@chakra-ui/react'
import { Link } from 'react-router-dom'
import { useRecoilValue } from 'recoil'
import userAtom from '../atoms/userAtom'
import useShowToast from '../hooks/useShowToast'
import { Text } from '@chakra-ui/react'
import User from '../../../threadsBackend/models/userModel'
import UserPost from '../components/UserPost'
const HomePage = () => {
  const currUser = useRecoilValue(userAtom)
  const showToast = useShowToast()
  const [posts, setPosts] = useState([])
  const [loading, setLoading] = useState('false')
  useEffect(() => {
    const getFeedPosts = async () => {
      setLoading(true)
      try {
        const res = await fetch(`/api/posts/feed`)
        const data = await res.json()
        if (data.error) {
          showToast('Error', data.error, 'error')
          return
        }

        // Assign fetched data to postedByUsername
        setPosts(data)
      } catch (error) {
        showToast('Error', error.message, 'error')
      } finally {
        setLoading(false)
      }
    }
    getFeedPosts()
  }, [showToast])
  console.log(posts)
  return (
    <>
      {!loading && posts.length === 0 && (
        <h1>Follow some users to see the feed</h1>
      )}
      {loading && (
        <Flex justifyContent={'center'} my={5}>
          <Button isLoading colorScheme="blue" loadingText="Loading" />
        </Flex>
      )}
      {posts.map((post) => (
        <UserPost key={post._id} post={post} />
      ))}
    </>
  )
}

export default HomePage
