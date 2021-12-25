import React, { useState, useEffect, Fragment } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { Link } from 'react-router-dom'
import { useHistory } from 'react-router-dom'
import { Loading } from '../components/includes/Loading'
import { ToastContainer, toast } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import { login, authAction } from '../slices/authSlice'
import Modal from '../components/includes/Modal'

export default function LoginPage() {
  const [userData, setUser] = useState({
    email: '',
    password: '',
  })

  const history = useHistory()
  const dispatch = useDispatch()
  const {
    loading: isLoading,
    error,
    authenticated,
  } = useSelector((state) => state.auth)

  const handleSubmit = async (e) => {
    e.preventDefault()
    await dispatch(login(userData))
  }

  const closeErrorHandler = () => {
    dispatch(authAction.closeError())
  }

  const onChange = (e) => {
    setUser({ ...userData, [e.target.name]: e.target.value })
  }

  if (authenticated) {
    history.push('/')
  }
  if (isLoading === true) {
    return <Loading />
  }
  return (
    <section id="subscribe_section" className="subscribe_section">
      <div className="row">
        <ToastContainer />
        {error && (
          <Modal onClose={closeErrorHandler}>
            <div>
              <h3>{error}</h3>
              <div className="right-btn">
                <button
                  type="button"
                  class="btn btn-primary btn-flat "
                  onClick={closeErrorHandler}
                >
                  Close
                </button>
              </div>
            </div>
          </Modal>
        )}
        <div className="col-md-6 col-md-offset-3">
          <div className="entity_comment_from">
            <form onSubmit={handleSubmit}>
              <div className="form-group comment">
                <div className="form-group">
                  <label>Email</label>
                  <input
                    onChange={onChange}
                    type="text"
                    name="email"
                    className="form-control"
                    placeholder="email"
                    value={userData.email}
                    required
                  />
                </div>
                <div className="form-group">
                  <label>Password</label>
                  <input
                    onChange={onChange}
                    type="password"
                    name="password"
                    className="form-control"
                    placeholder="Password"
                    value={userData.password}
                    required
                  />
                </div>

                <button
                  type="submit"
                  className="btn btn-primary btn-flat m-b-30 m-t-30"
                >
                  {isLoading ? (
                    <Fragment>
                      <i className="fa fa-spinner fa-spin" /> Loading
                    </Fragment>
                  ) : (
                    'Login'
                  )}
                </button>
                <div className="register-link m-t-15 text-center">
                  <p>
                    Did Not have account ? <Link to="/register">Sign In</Link>
                  </p>
                </div>
                <div className="m-t-15 text-center">
                  <p>or</p>
                </div>
                <div className="register-link m-t-15 text-center">
                  <p>
                    <Link to="/forgotPassword">Forgot password ?</Link>
                  </p>
                </div>
              </div>
            </form>
          </div>
        </div>
      </div>
    </section>
  )
}
