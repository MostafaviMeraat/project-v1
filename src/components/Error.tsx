import React from 'react'
import { useNavigate } from 'react-router-dom'

const Error = () => {
  const navigate = useNavigate()
  return (
    <div>
      <h1>صفحه مورد نظر یافت نشد !</h1>
      <button onClick={() => { navigate('/') }}>صفحه اصلی</button>
    </div>
  )
}

export default Error