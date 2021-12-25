import React, { useState, Fragment } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { authAction, forgotPassword } from '../slices/authSlice'
import Modal from '../components/includes/Modal'
import { ToastContainer, toast } from 'react-toastify'
import { unwrapResult } from '@reduxjs/toolkit'

export default function ForgotPasswordPage() {
  const [emailValue, setEmailValue] = useState('')
  const [messageFromServer, setMessageFromServer] = useState('')
  const { loading: isLoading, error } = useSelector((state) => state.auth)
  const dispatch = useDispatch()

  const onChange = (e) => {
    setEmailValue(e.target.value)
  }

  const closeErrorHandler = () => {
    dispatch(authAction.closeError())
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    const actionResult = await dispatch(forgotPassword({ email: emailValue }))
    const res = unwrapResult(actionResult)
    setMessageFromServer(res.data.msg)
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
          <p>{messageFromServer}</p>
          <div className="entity_comment_from">
            <form onSubmit={handleSubmit}>
              <div className="form-group comment">
                <div className="form-group">
                  <label>email</label>
                  <input
                    onChange={onChange}
                    type="text"
                    name="email"
                    className="form-control"
                    placeholder="email"
                    value={emailValue}
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
                    'send link'
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
