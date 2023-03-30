import { CenterFocusStrong } from "@mui/icons-material";
import { useState, useEffect } from "react";
import axios from "axios";
import { Modal } from "bootstrap";

import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';

export default function User() {
    let [meja, setMeja] = useState([])
    let [ready, setReady] = useState([])
    let [modal, setModal] = useState(null)
    let [idMeja, setIdMeja] = useState(0)
    let [nomorMeja, setNomorMeja] = useState("")
    let [action, setAction] = useState("")
    let [role, setRole] = useState("")

    let token = localStorage.getItem(`token-kasir`)
    let authorization = {
        headers: {
            Authorization: `Bearer ${token}`
        }
    }

    let getMeja = () => {
        let endpoint = `http://localhost:8000/meja`

        axios.get(endpoint, authorization)
            .then(response => {
                setMeja(response.data)
            })
            .catch(error => console.log(error))
    }

    let addMeja = () => {
        modal.show()
        setIdMeja(0)
        setNomorMeja("")
        setAction("insert")
    }

    let editMeja = item => {
        modal.show()
        setIdMeja(item.id_meja)
        setNomorMeja(item.nomor_meja)
        setAction('edit')
    }

    let saveMeja = ev => {
        modal.hide()

        if (action === `insert`) {
            let endpoint = `http://localhost:8000/meja`
            let request = {
                nomor_meja : nomorMeja
            }

            axios.post(endpoint, request, authorization)
                .then(response => {
                    alert(response.data.message)
                    getMeja()
                })
                .catch(error => console.log(error))
        } else if (action === `edit`) {
            let endpoint = `http://localhost:8000/meja/${idMeja}`
            let request = {
                nomor_meja : nomorMeja
            }

            axios.put(endpoint, request, authorization)
            .then(response => {
                alert(response.data.message)
                getMeja()
            })
            .catch(error => console.log(error))
        }
    }

    let deleteMeja = item => {
        if (window.confirm(`Are you sure ?`)) {
            let endpoint = `http://localhost:8000/meja/${item.id_meja}`

            axios.delete(endpoint, authorization)
            .then(response => {
                alert(response.data.message)
                getMeja()
            })
            .catch(error => console.log(error))
        }
    }

    let mejaReady = (ev) => {
        ev.preventDefault()
        let endpoint = `http://localhost:8000/meja/ready`

        axios.get(endpoint, authorization)
        .then(response => {
           setMeja(response.data)
        })
        .catch(error => console.log(error))

    }

    useEffect(() => {
        if(!localStorage.getItem(`token-kasir`)){
            window.location.href = "/signin"
        }
        setRole(localStorage.getItem(`role`))
        let myModal = new Modal(
            document.getElementById("modal_meja")
        )
        setModal(myModal)
        getMeja()
    }, [])

    return (
        <div className="card mx-auto mt-4" style={{ width: 800}}>
            <div>
                <button className={`btn btn-secondary mx-4 my-3 ${role === 'admin' ? 'd-show' : 'd-none'}`}
                onClick={() => addMeja()}>
                    <span className="fa fa-add"></span> add table
                </button>
            </div>
            <div className={`${role === 'kasir' ? 'd-show' : 'd-none'}`} style={{ marginLeft: 20 }}>
                <form onSubmit={(ev) => mejaReady(ev)}>
                    <button type="submit" className="btn btn-success my-3">Ready</button>
                </form>
            </div>
            <TableContainer>
            <Table sx={{ width: 800 }} aria-label="simple table">
                <TableHead>
                    <TableRow>
                        <TableCell align="center">ID</TableCell>
                        <TableCell align="center">Nomor Meja</TableCell>
                        <TableCell align="center" className={`${role === 'admin' ? 'd-show' : 'd-none'}`}>
                            Option
                        </TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                {meja.map((item) => (
                    <TableRow
                    key={item.id_meja}
                    sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                    >
                    <TableCell align="center">
                        {item.id_meja}
                    </TableCell>
                    <TableCell align="center">{item.nomor_meja}</TableCell>
                    <TableCell align="center">
                        <div className={`btn btn-info ${role === 'admin' ? 'd-show' : 'd-none'}`}
                        onClick={() => editMeja(item)}>
                        <i className="fa-solid fa-pen-to-square"></i>
                        </div>
                        <div className={`btn btn-danger mx-2 ${role === 'admin' ? 'd-show' : 'd-none'}`}
                        onClick={() => deleteMeja(item)}>
                        <i className="fa-solid fa-trash"></i>
                        </div>
                    </TableCell>
                    </TableRow>
                ))}
                </TableBody>
            </Table>
        </TableContainer>

        <div className="modal" id="modal_meja">
            <div className="modal-dialog">
                <div className="modal-content">
                    <div className="modal-header" style={{ background: `lightcyan`, color: 'teal' }}>
                        <h4>
                            Form User
                        </h4>
                    </div>
                    <div className="modal-body">
                        <form onSubmit={(ev) => saveMeja(ev)}>

                            Nomor Meja
                            <input type="text" className="form-control mb-2" required
                                value={nomorMeja} onChange={ev => setNomorMeja(ev.target.value)} />

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