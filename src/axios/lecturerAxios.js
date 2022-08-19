import axios from 'axios'
import Swal from 'sweetalert2'

const URL = 'http://localhost:3000/lecturers'

const getLecturers = async (cb) => {
  try {
    let lecturers = await axios({
      method: 'GET',
      url: URL
    })
    cb(lecturers.data)
  } catch (err) {
    console.log(err)
  }
}

const addLecturer = async (lecturer) => {
  try {
    let result = await axios({
      method: "POST",
      url: URL + "/create",
      data: lecturer
    })

    Swal.fire(
      'Add Lecturer',
      'Lecturer has been added',
      'success'
    )
    console.log(result.data)
  } catch (err) {
    console.log(err)
  }
}

const editLecturer = async (id, lecturer) => {
  try {
    let result = await axios({
      method: "PUT",
      url: URL + "/update/" + id,
      data: lecturer
    })

    Swal.fire(
      'Edit Lecturer ' + id,
      'Lecturer ' + id + ' has been updated',
      'success'
    )
    console.log(result.data)
  } catch (err) {
    console.log(err)
  }
}

const removeLecturer = async (id) => {
  try {
    Swal.fire({
      title: 'Are you sure?',
      text: "You won't be able to revert this!",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes, delete it!'
    }).then(async (result) => {
      if (result.isConfirmed) {
        let result = await axios({
          method: "DELETE",
          url: URL + "/delete/" + id
        })

        Swal.fire(
          'Deleted!',
          'Your file has been deleted.',
          'success'
        )
      }
    })
  } catch (err) {
    console.log(err)
  }
}

const accountLecturer = async (id, cb) => {
  try {
    let result = await axios({
      method: "GET",
      url: URL + "/information/" + id
    })

    cb(result.data)
  } catch (err) {
    console.log(err)
  }
}

export {
  getLecturers,
  addLecturer,
  editLecturer,
  removeLecturer,
  accountLecturer
}