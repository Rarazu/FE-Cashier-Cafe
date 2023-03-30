import { CenterFocusStrong } from "@mui/icons-material";
import { useState, useEffect } from "react";
import axios from "axios";
import { Modal } from "bootstrap";
import { useNavigate } from 'react-router-dom';

import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';

export default function User() {
    let navigate = useNavigate();
    // if( !localStorage.getItem(`token-kasir`)){
    //     window.location.href = "/signin"
    // }

    let [user, setUser] = useState([])
    let [modal, setModal] = useState(null)
    let [idUser, setIdUser] = useState(0)
    let [nama, setNama] = useState("")
    let [role, setRole] = useState("")
    let [username, setUsername] = useState("")
    let [password, setPassword] = useState("")
    let [action, setAction] = useState("")
    let [find, setFind] = useState([])
    let [keyword, setKeyword] = useState("")

    let [userRole, setUserRole] = useState("")

    let token = localStorage.getItem(`token-kasir`)
    let authorization = {
        headers: {
            Authorization: `Bearer ${token}`
        }
    }

    let getData = () => {
        let endpoint = `http://localhost:8000/user`

        axios.get(endpoint, authorization)
            .then(response => {
                setUser(response.data)
            })
            .catch(error => console.log(error))
    }

    let addUser = () => {
        modal.show()
        setIdUser(0)
        setNama("")
        setRole("")
        setUsername("")
        setPassword("")
        setAction("insert")
    }

    let editUser = item => {
        modal.show()

        setIdUser(item.id_user)
        setNama(item.nama_user)
        setRole(item.role)
        setUsername(item.username)
        setPassword(item.password)
        setAction('edit')
    }

    let saveUser = ev => {
        modal.hide()

        if (action === `insert`) {
            let endpoint = `http://localhost:8000/user`
            let request = {
                nama_user: nama,
                role: role,
                username: username,
                password: password
            }

            axios.post(endpoint, request, authorization)
                .then(response => {
                    alert(response.data.message)
                    getData()
                })
                .catch(error => console.log(error))
        } else if (action === `edit`) {
            let endpoint = `http://localhost:8000/user/${idUser}`
            let request = {
                nama_user: nama,
                role: role,
                username: username,
                password: password
            }

            axios.put(endpoint, request, authorization)
            .then(response => {
                alert(response.data.message)
                getData()
            })
            .catch(error => console.log(error))
        }
    }

    let deleteUser = item => {
        if (window.confirm(`Are you sure ?`)) {
            let endpoint = `http://localhost:8000/user/${item.id_user}`

            axios.delete(endpoint, authorization)
            .then(response => {
                alert(response.data.message)
                getData()
            })
            .catch(error => console.log(error))
        }
    }

    let findData = (ev) => {
        ev.preventDefault()
        let endpoint = `http://localhost:8000/user/find`
        let request = {
            keyword: keyword
        }

        axios.post(endpoint, request, authorization)
            .then(response => {
                setUser(response.data)
                console.log(response.data)
            })
            .catch(error => console.log(error))

    }

    useEffect(() => {
        // if(localStorage.getItem(`token-kasir`)){
        //     if (localStorage.getItem('role') !== "admin") {
        //         window.alert("You are not an Admin")
        //         navigate("/")
        //     } 
        // } else {
        //     window.location.href = "/signin"
        // }

        if(!localStorage.getItem(`token-kasir`)){
            window.location.href = "/signin"
        }
        setUserRole(localStorage.getItem(`role`))

        let myModal = new Modal(
            document.getElementById("modal_user")
        )
        setModal(myModal)
        getData()
    }, [])

    return (
        <div className="card mx-auto mt-4" style={{ width: 1000}}>
            <div className="row my-4">
                <div className="col-3">
                    <button className={`btn btn-secondary mx-4 ${userRole === 'admin' ? 'd-block' : 'd-none'}`}
                    onClick={() => addUser()}>
                        <span className="fa fa-add"></span> add user
                    </button>
                </div>

                <div className="col-8">
                    <form onSubmit={(ev) => findData(ev)}>
                        <div className="row">
                            <div className="col-9">
                                <input type="text" className="form-control" value={keyword} onChange={(ev) => setKeyword(ev.target.value)}/>
                            </div>

                            <div className="col-3">
                                <button className="btn btn-primary" type="submit">
                                    <span className="fa fa-search"></span>
                                </button>
                            </div>
                        </div>
                    </form>
                </div>
            </div>
            <TableContainer>
            <Table sx={{ width: 1000 }} aria-label="simple table">
                <TableHead>
                    <TableRow>
                        <TableCell align="center">ID</TableCell>
                        <TableCell align="center">Name</TableCell>
                        <TableCell align="center">Username</TableCell>
                        <TableCell align="center">Role</TableCell>
                        <TableCell className={`${userRole === 'admin' ? 'd-block' : 'd-none'}`} align="center">
                            Option
                        </TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                {user.map((item) => (
                    <TableRow
                    key={item.id_user}
                    sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                    >
                    <TableCell align="center">
                        {item.id_user}
                    </TableCell>
                    <TableCell align="center">{item.nama_user}</TableCell>
                    <TableCell align="center">{item.username}</TableCell>
                    <TableCell align="center">{item.role}</TableCell>
                    <TableCell align="center">
                        <div className={`btn btn-info m-2 ${userRole === 'admin' ? 'd-show' : 'd-none'}`}
                        onClick={() => editUser(item)}>
                        <i className="fa-solid fa-pen-to-square"></i>
                        </div>
                        <div className={`btn btn-danger m-2 ${userRole === 'admin' ? 'd-show' : 'd-none'}`}
                        onClick={() => deleteUser(item)}>
                        <i className="fa-solid fa-trash"></i>
                        </div>
                    </TableCell>
                    </TableRow>
                ))}
                </TableBody>
            </Table>
        </TableContainer>

        <div className="modal" id="modal_user">
            <div className="modal-dialog">
                <div className="modal-content">
                    <div className="modal-header" style={{ background: `lightcyan`, color: 'teal' }}>
                        <h4>
                            Form User
                        </h4>
                    </div>
                    <div className="modal-body">
                        <form onSubmit={(ev) => saveUser(ev)}>
                            Name
                            <input type="text" className="form-control mb-2" required
                                value={nama} onChange={ev => setNama(ev.target.value)} />

                            Role
                            <select 
                            className="form-control custom-select mb-2" required
                            aria-label="Filter Menu" 
                            onChange={ev => setRole(ev.target.value)}>
                                <option value={role}>{role}</option>
                                <option value="admin">Admin</option>
                                <option value="kasir">Kasir</option>
                                <option value="manajer">Manager</option>
                            </select>

                            Username
                            <input type="text" className="form-control mb-2" required
                                value={username} onChange={ev => setUsername(ev.target.value)} />

                            Password
                            <input type="password" className="form-control mb-2" required
                                value={password} onChange={ev => setPassword(ev.target.value)} />

                            <button className="btn btn-success mx-1" type="submit">
                                <span className="fa fa-check"></span> Save
                            </button>
                            <button type="button" className="btn btn-secondary mx-1" data-bs-dismiss="modal">
                                <span className="fa fa-times"></span> Cancel
                            </button>
                            
                        </form>
                    </div>
                </div>
            </div>
        </div>
        </div>
    )
}