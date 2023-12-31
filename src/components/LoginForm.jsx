import PropTypes from 'prop-types'

const LoginForm = ({
  usernameChangeHandler,
  passwordChangeHandler,
  submitEventHandler }) => {

  return (
    <div>
      <form onSubmit={submitEventHandler}>
        <div>
          username <input id="username-input"
            onChange={({ target }) => usernameChangeHandler(target.value)} />
        </div>
        <div>
          password <input id="password-input" type="password"
            onChange={({ target }) => passwordChangeHandler(target.value)} />
        </div>
        <div>
          <button id="login-button" type="submit">login</button>
        </div>
      </form>
    </div>
  )
}

LoginForm.propTypes = {
  usernameChangeHandler: PropTypes.func.isRequired,
  passwordChangeHandler: PropTypes.func.isRequired,
  submitEventHandler: PropTypes.func.isRequired,
}

export default LoginForm