import React, { useState, Fragment } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { authAction, forgotPassword, resetPassword } from '../slices/authSlice'
import Modal from '../components/includes/Modal'
import { ToastContainer, toast } from 'react-toastify'
import { unwrapResult } from '@reduxjs/toolkit'
import { useParams, useHistory } from 'react-router-dom'

export default function ResetPassword() {
  const [formState, setFormState] = useState({
    newPassword: '',
    confirmPassword: '',
  })
  const { loading: isLoading, error } = useSelector((state) => state.auth)
  const history = useHistory()
  const token = useParams().token
  const dispatch = useDispatch()

  const onChange = (e) => {
    setFormState((prev) => {
      return { ...prev, [e.target.name]: e.target.value }
    })
  }

  const closeErrorHandler = () => {
    dispatch(authAction.closeError())
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    const res = await dispatch(resetPassword({ password: formState, token }))
    const resData = unwrapResult(res)
    if (resData.data.success) {
      history.push('/login')
    }
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
                  <label>Password</label>
                  <input
                    onChange={onChange}
                    type="password"
                    name="newPassword"
                    className="form-control"
                    placeholder="enter new password"
                    value={formState.password}
                    required
                  />
                </div>
                <div className="form-group">
                  <label>confirm Password</label>
                  <input
                    onChange={onChange}
                    type="password"
                    name="confirmPassword"
                    className="form-control"
                    placeholder="confirm password"
                    value={formState.confirmPassword}
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
                    'Change Password'
                  )}
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </section>
  )
}
