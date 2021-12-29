import React, { useState, useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { Link } from 'react-router-dom'
import { uploadAvatar } from '../slices/authSlice'

export default function ProfilePage() {
  const [newImage, setNewImage] = useState(null)
  const { user } = useSelector((state) => state.auth)
  const dispatch = useDispatch()
  useEffect(() => {
    return () => {
      newImage && URL.revokeObjectURL(newImage.review)
    }
  }, [newImage])

  const changeImageInputHandler = (e) => {
    const file = e.target.files[0]
    if (file) {
      file.review = URL.createObjectURL(file)
      setNewImage(file)
    }
  }

  const submitAvatarHandler = async (e) => {
    e.preventDefault()
    newImage.review = undefined
    await dispatch(uploadAvatar(newImage))
    setNewImage(null)
    document.getElementById('avatar').value = ''
  }

  return (
    <div className="container">
      <div className=" py-3 bg-light row bg-light m-2 h-60">
        <div className="col-xs-6 col-md-6 m-5 ">
          <h1>User Info</h1>
          <form className="p-2">
            <div class="input-group p-4 ">
              <span class="input-group-addon" id="basic-addon1">
                _id
              </span>
              <input
                type="text"
                class="form-control bg-white"
                placeholder="_id"
                value={user._id}
                aria-describedby="basic-addon1"
                readOnly
              />
            </div>
            <div class="input-group p-4">
              <span class="input-group-addon" id="basic-addon1">
                name
              </span>
              <input
                type="text"
                class="form-control bg-white"
                placeholder="Username"
                value={user.name}
                readOnly
                aria-describedby="basic-addon1"
              />
            </div>
            <div class="input-group p-4">
              <span class="input-group-addon" id="basic-addon1">
                Email
              </span>
              <input
                type="text"
                class="form-control bg-white"
                readOnly
                placeholder="Email"
                value={user.email}
                aria-describedby="basic-addon1"
              />
            </div>
            <div class="input-group p-4">
              <span class="input-group-addon" id="basic-addon1">
                Role
              </span>
              <input
                type="text"
                class="form-control bg-white"
                readOnly
                placeholder="role"
                value={user.role}
                aria-describedby="basic-addon1"
              />
            </div>
          </form>
        </div>
        <div className="col-xs-5 col-md-5 ml-5 mt-5 center">
          <a href="#" class="thumbnail" style={{ width: 100, height: 100 }}>
            <img src={user.avatar} alt="..." />
          </a>
          <form className="form-inline" onSubmit={submitAvatarHandler}>
            <div className="form-group">
              <input
                type="file"
                id="avatar"
                className="form-control"
                onChange={changeImageInputHandler}
                name="avatar"
              />
            </div>
            <div className="form-group">
              <button className="btn btn-sm btn-default">Change Avatar</button>
            </div>
          </form>

          <p>Preview Avatar</p>
          {newImage && (
            <a href="#" class="thumbnail" style={{ width: 150, height: 150 }}>
              <img src={newImage ? newImage.review : ''} alt="..." />
            </a>
          )}
        </div>

        {/* <div className="col-7 m-5">
        <h1>Hồ sơ của tôi</h1>
      </div>
      <div>
        <h4>Ảnh đại diện</h4>
        <img
          src="<%=avatar%>"
          alt=""
          width="200px"
          height="200px"
          id="old-avatar"
          style="border-radius:50%"
        />
        <input type="file" id="avatar" name="avatar" />
      </div> */}
      </div>
      <Link to="/forgotPassword"> Change Password</Link>
    </div>
  )
}
