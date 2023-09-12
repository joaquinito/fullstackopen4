import { useState, useEffect } from 'react'
import LoginForm from './components/LoginForm'
import AddBlogForm from './components/AddBlogForm'
import BlogList from './components/BlogList'
import blogService from './services/blogs'
import loginService from './services/login'

const App = () => {
  const [blogs, setBlogs] = useState([])
  const [errorMessage, setErrorMessage] = useState(null)
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [newBlogTitle, setNewBlogTitle] = useState('')
  const [newBlogAuthor, setNewBlogAuthor] = useState('')
  const [newBlogUrl, setNewBlogUrl] = useState('')
  const [user, setUser] = useState(null)

  // Effect hook to get all blogs.
  // In order to user async/await in an effect hool, we need to define an async function 
  // inside the effect hook. This is because the effect hook cannot be async by itself.
  useEffect(() => {
    const getBlogs = async () => {
      const blogs = await blogService.getAll()
      setBlogs(blogs)
    }
    getBlogs().catch(console.error)
  }, [])

  // Effect hook to check if user has already logged in
  useEffect(() => {
    const loggedInUserJSON = window.localStorage.getItem('loggedInAppUser')
    if (loggedInUserJSON) {
      const user = JSON.parse(loggedInUserJSON)
      setUser(user)
      blogService.setToken(user.token)
    }
  }, [])

  const handleLogin = async (event) => {
    event.preventDefault()
    // console.log('logging in with username', username, 'and password', password)

    try {
      const user = await loginService.login({
        username, password,
      })

      window.localStorage.setItem(
        'loggedInAppUser', JSON.stringify(user)
      )
      blogService.setToken(user.token)

      setUser(user)
      setUsername('')
      setPassword('')
    }
    catch (exception) {
      setErrorMessage('Wrong credentials')
      setTimeout(() => {
        setErrorMessage(null)
      }, 5000)
    }
  }

  const handleLogout = () => {
    window.localStorage.removeItem('loggedInAppUser')
    setUser(null)
  }

  const handleAddBlog = async (event) => {
    event.preventDefault()
    // console.log('adding blog', newBlogTitle, newBlogAuthor, newBlogUrl)

    try {
      const blog = await blogService.add({
        title: newBlogTitle,
        author: newBlogAuthor,
        url: newBlogUrl
      })
      setBlogs(blogs.concat(blog))
    }
    catch (exception) {
      setErrorMessage('Error adding blog')
    }
  }

  if (user === null) {
    return (
      <div>
        <LoginForm usernameChangeHandler={setUsername} passwordChangeHandler={setPassword}
          submitEventHandler={handleLogin} />
      </div>
    )
  }
  else {
    return (
      <div>
        <h2>blogs</h2>
        <div>
          {user.name} logged in &nbsp;
          <button onClick={handleLogout}>logout</button>
        </div>
        <br />
        <AddBlogForm titleChangeHandler={setNewBlogTitle} authorChangeHandler={setNewBlogAuthor}
          urlChangeHandler={setNewBlogUrl} submitEventHandler={handleAddBlog} />
        <br />
        <BlogList blogs={blogs} />
      </div>
    )
  }
}

export default App