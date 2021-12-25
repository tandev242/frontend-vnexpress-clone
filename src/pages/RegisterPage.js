import React, { useState, useEffect, Fragment, useCallback } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { Loading } from '../components/includes/Loading'
import { Link, useHistory, useParams } from 'react-router-dom'
import { ToastContainer, toast } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import { register, registerAdmin, authAction } from '../slices/authSlice'
import Modal from '../components/includes/Modal'

export default function RegisterPage() {
  const [userData, setUser] = useState({
    name: '',
    email: '',
    password: '',
    confirmPassword: '',
  })

  const history = useHistory()

  const { loading: isLoading, error } = useSelector((state) => state.auth)
  const [isSubmitted, setIsSubmitted] = useState(false)
  const dispatch = useDispatch()
  const isAdminRegister = window.location.href.indexOf('registerAdmin') > -1
  const closeErrorHandler = () => {
    dispatch(authAction.closeError())
    setIsSubmitted(false)
  }
  const onChange = (e) => {
    setUser({ ...userData, [e.target.name]: e.target.value })
  }
  const handleSubmit = async (e) => {
    e.preventDefault()
    if (!isAdminRegister) {
      await dispatch(register(userData))
    } else {
      await dispatch(registerAdmin(userData))
    }
    setIsSubmitted(true)
  }
  if (!error && isSubmitted && isAdminRegister) {
    history.push('/')
  }
  if (!error && isSubmitted) {
    history.push('/login')
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
            {isAdminRegister && <h2>Register for Admin</h2>}
            <form onSubmit={handleSubmit}>
              <div className="form-group comment">
                <div className="form-group">
                  <label>User Name</label>
                  <input
                    onChange={onChange}
                    type="text"
                    name="name"
                    className="form-control"
                    placeholder="User Name"
                    value={userData.name}
                    required
                  />
                </div>
                <div className="form-group">
                  <label>Email address</label>
                  <input
                    onChange={onChange}
                    name="email"
                    type="email"
                    className="form-control"
                    placeholder="Email"
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
                <div className="form-group">
                  <label>Confirm Password</label>
                  <input
                    onChange={onChange}
                    type="password"
                    name="confirmPassword"
                    className="form-control"
                    placeholder="Confirm Password "
                    value={userData.password2}
                    required
                  />
                </div>
                <div className="checkbox">
                  <label>
                    <input type="checkbox" /> Agree the terms and policy
                  </label>
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
                    'Register'
                  )}
                </button>
                <div className="register-link m-t-15 text-center">
                  {!isAdminRegister && (
                    <p>
                      Already have account ? <Link to="/login">Sign In</Link>
                    </p>
                  )}
                </div>
              </div>
            </form>
          </div>
        </div>
      </div>
    </section>
  )
}
