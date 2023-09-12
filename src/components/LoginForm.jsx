
const LoginForm = ({ nameInput, passwordInput, usernameChangeHandler,
    passwordChangeHandler, submitEventHandler }) => {

    return (
        <div>
            <h2> log in to application </h2>
            <form onSubmit={submitEventHandler}>
                <div>
                    username <input value={nameInput}
                        onChange={({ target }) => usernameChangeHandler(target.value)} />
                </div>
                <div>
                    password <input value={passwordInput} type="password"
                        onChange={({ target }) => passwordChangeHandler(target.value)} />
                </div>
                <div>
                    <button type="submit">login</button>
                </div>
            </form>
        </div>
    )
}

export default LoginForm