import React, { useState, useEffect } from 'react'
import { getLecturers, removeLecturer } from '../../axios/lecturerAxios'
import LoadingBar from '../../helpers/LoadingBar'
import {
  Link, useNavigate
} from 'react-router-dom'
import { FiPlus } from 'react-icons/fi'

const ListLecturers = () => {
  const [lecturers, setLecturers] = useState([])

  const navigate = useNavigate()

  useEffect(() => {
    // callback untuk mengambil data lecturer dari folder Axios
    getLecturers(result => setLecturers(result))
  }, [])

  const deleteHandler = (id) => {
    removeLecturer(id)
    navigate('/lecturers')
  }

  return (
    <>
      <div className="row my-3 text-center">
        <div className='col-9 mx-auto'>
          <div className='w-100'>
            <Link to="/lecturers/create"
              className='btn btn-sm btn-primary my-2'
            >
              <span className='me-2'>
                <FiPlus></FiPlus>
              </span>
              Add Lecturer
            </Link>
          </div>
          <div className='w-100'>
            <table className='table table-borderd'>
              <thead>
                <tr className='table-primary'>
                  <th>Id</th>
                  <th>Name</th>
                  <th>Subject</th>
                  <th>Age</th>
                  <th>Action</th>
                </tr>
              </thead>
              <tbody>
                {
                  lecturers.length > 0 ?
                    lecturers.map(lecturer => {
                      const { id, name, subject, age } = lecturer
                      return (
                        <tr key={id}>
                          <td>{id}</td>
                          <td>{name}</td>
                          <td>{subject}</td>
                          <td>{age} years old</td>
                          <td>
                            <Link to={`/lecturers/edit/${id}`} className="btn btn-sm btn-info">Edit</Link>
                            <button onClick={() => deleteHandler(+id)} className='btn btn-sm btn-danger'>Delete</button>
                          </td>
                        </tr>
                      )
                    }) :
                    <LoadingBar />
                }
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </>
  )
}

export default ListLecturers