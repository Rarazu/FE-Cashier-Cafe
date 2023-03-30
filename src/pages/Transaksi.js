import { useState, useEffect } from "react";
import axios from "axios";
import format from "date-fns/format";
import { Modal } from "bootstrap";
import "../css/Styles.css"

export default function Transaksi() {
    let [data, setData] = useState([])
    
    let [tanggal, setTanggal] = useState("")
    let [jumlah, setJumlah] = useState("")
    let [idTransaksi, setIdTransaksi] = useState(0)
    let [status, setStatus] = useState("")
    let [meja, setMeja] = useState("")
    let [role, setRole] = useState("")

    let [modal, setModal] = useState(null)
    let [struck, setStruck] = useState(null)

    let [detail, setDetail] = useState([])
    let [user, setUser] = useState([])
    let [idUser, setIdUser] = useState(0)
    let [namaPelanggan, setNamaPelanggan] = useState("")
    let [selectedTotal, setSelectedTotal] = useState(0)
    let [namaMenu, setNamaMenu] = useState("")
    let [harga, setHarga] = useState("")
    let [idDetail, setIdDetail] = useState(0)

    let [start, setStart] = useState("")
    let [end, setEnd] = useState("")

    let showStruck = (item, index) => {
        struck.show()
        setIdTransaksi(item.id_transaksi)
        setNamaPelanggan(item.nama_pelanggan)
        setTanggal(item.tgl_transaksi)
        setDetail(item.detail_transaksi)
        setSelectedTotal(item.total)
    }

    let token = localStorage.getItem(`token-kasir`)
    let authorization = {
        headers: {
            Authorization: `Bearer ${token}`
        }
    }

    let filter = (ev) => {
        ev.preventDefault()
        let endpoint = `http://localhost:8000/transaksi/filter`
        let request = {
            start: start,
            end: end,
            id_user: idUser
        }

        axios.post(endpoint, request, authorization)
        .then(response => {
            let result = response.data
            for (let i = 0; i < result.length; i++) {
                let total = 0
                for (let x = 0; x < result[i].detail_transaksi.length; x++) {
                    total += (result[i].detail_transaksi[x].harga *result[i].detail_transaksi[x].jumlah)
                }                    
                result[i].total = total
            }
            result.sort(function (a, b) {
                return new Date(b.createdAt) - new Date(a.createdAt);
              });
            setData(result)
        })
        .catch(error => console.log(error))

    }

    let handleByMe = (ev) => {
        ev.preventDefault()
        let endpoint = `http://localhost:8000/transaksi/my-handle`

        let user = JSON.parse(localStorage.getItem(`user-kasir`))
        let id = user.id_user

        let request = {
            id_user: id
        }

        axios.post(endpoint, request, authorization)
        .then(response => {
            let result = response.data
            for (let i = 0; i < result.length; i++) {
                let total = 0
                for (let x = 0; x < result[i].detail_transaksi.length; x++) {
                    total += (result[i].detail_transaksi[x].harga *result[i].detail_transaksi[x].jumlah)
                }                    
                result[i].total = total
            }
            result.sort(function (a, b) {
                return new Date(b.createdAt) - new Date(a.createdAt);
              });
            setData(result)
        })
        .catch(error => console.log(error))

    }

    let getUser = () => {
        let endpoint = `http://localhost:8000/user`

        axios.get(endpoint, authorization)
            .then(response => {
                setUser(response.data)
            })
            .catch(error => console.log(error))
    }

    let getData = (state, action) => {
        let endpoint = `http://localhost:8000/transaksi`

        axios.get(endpoint, authorization)
            .then(response => {
                let result = response.data
                for (let i = 0; i < result.length; i++) {
                    let total = 0
                    for (let x = 0; x < result[i].detail_transaksi.length; x++) {
                        total += (result[i].detail_transaksi[x].harga *result[i].detail_transaksi[x].jumlah)
                    }                    
                    result[i].total = total
                }
                result.sort(function (a, b) {
                    return new Date(b.createdAt) - new Date(a.createdAt);
                  });
                setData(result)
                // console.log(response.data)
            })
            .catch(error => console.log(error))
    }

    let editData = (item) => {
        modal.show()
        setIdTransaksi(item.id_transaksi)
        setStatus(item.status)
    }

    let saveData = ev => {
        let endpoint = `http://localhost:8000/transaksi/status/${idTransaksi}`
            let request = {
                status : status
            }

            axios.put(endpoint, request, authorization)
            .then(response => {
                alert(response.data.message)
                getData()
            })
            .catch(error => {
                alert(error.data.message)
            })
    }

    let deletedata = item => {
        if (window.confirm(`Are you sure ?`)) {
            let endpoint = `http://localhost:8000/transaksi/${item.id_transaksi}`

            axios.delete(endpoint, authorization)
            .then(response => {
                alert(response.data.message)
                getData()
            })
            .catch(error => {
                alert(error.data.message)
            })
        }
    }

    const formatter = new Intl.NumberFormat('en-ID', {
        style: 'currency',
        currency: 'IDR'
      });

    useEffect(() => {
        if(!localStorage.getItem(`token-kasir`)){
            window.location.href = "/signin"
        }
        setRole(localStorage.getItem(`role`))
        let struck = new Modal(
            document.getElementById("modal_struck")
        )
        let edit = new Modal(
            document.getElementById("modal_edit")
        )
        setStruck(struck)
        setModal(edit)
        getData()
        getUser()
    }, [])

    return (
        <div className="container-fluid">
            <div className={`row ${role === 'kasir' ? 'd-block' : 'd-none'}`}>
                <div className="col-2 my-3" style={{ marginLeft: 20 }}>
                    <form action="/order/add">
                        <button type="submit" className="btn btn-secondary">
                            <span className="fa fa-add"></span> add order
                        </button>
                    </form>
                </div>
                <div className="col-10">

                </div>
                <div className="col-3" style={{ marginLeft: 20 }}>
                    <form onSubmit={(ev) => handleByMe(ev)}>
                        <button type="submit" className="btn btn-warning">My Handle</button>
                    </form>
                </div>
            </div>
            <form onSubmit={(ev) => filter(ev)}>
                <div className={`row my-4 ${role === 'manajer' ? 'd-show' : 'd-none'}`} style={{ marginLeft: 13 }}>
                    <div className="col-2">
                        <h6>Start Date</h6>
                    </div>
                    <div className="col-2">
                        <h6>End Date</h6>
                    </div>
                    <div className="col-8">
                        <h6>User</h6>
                    </div>
                    <div className="col-2">
                        <input type="date"  className="form-control" value={start}
                        onChange={ev => setStart(ev.target.value)}/>
                    </div>
                    <div className="col-2">
                        <input type="date"  className="form-control" value={end}
                        onChange={ev => setEnd(ev.target.value)}/>
                    </div>
                    <div className="col-5">
                        <select className="form-control" value={idUser} onChange={ev => setIdUser(ev.target.value)}>
                            {user.map(item => (
                                <option key="" value={item.id_user} >{item.nama_user}</option>
                            ))}
                        </select>
                    </div>
                    <div className="col-1">
                        <button className="btn btn-info" type="submit">
                            <span className="fa fa-search"></span>
                        </button>
                    </div>
                </div>
            </form>

            <div className="row m-3">
                {data.map(item => (
                    <div className="col-md-2 col-lg-3 col-xs-8"
                    key={`key-${item.id_transaksi}`}>
                        <div className="card border-danger m-1">
                            <div className="card-body">
                                <div className="m-1">
                                        <h4>
                                            {item.meja.nomor_meja}
                                        </h4>
                                        <h6>ID Transaksi : {item.id_transaksi}</h6><br/>
                                        <small>Nama Customer : {item.nama_pelanggan}</small> <br/>
                                        <small>Tanggal : {item.tgl_transaksi}</small><br/>
                                        <small>
                                            Status : 
                                            {item.status == 'lunas' ? (
                                                <div className={'badge badge-pill badge-success'}>{item.status}</div>
                                                ) : (
                                                <div className={'badge badge-pill badge-danger'}>{item.status}</div>
                                            )}
                                        </small> <br/>
                                        <b>Total : {formatter.format(item.total)}</b> <br/>

                                        <div className={`row my-2 ${role === 'kasir' ? 'd-show' : 'd-none'}`}>
                                            <div className="col-4">
                                                <div className="btn btn-warning"
                                                onClick={() => showStruck(item)}>
                                                    <span className="fa fa-print"></span> 
                                                </div>
                                            </div>
                                            <div className="col-4">
                                                <div className="btn btn-info"
                                                onClick={() => editData(item)}>
                                                    <span className="fa fa-edit"></span> 
                                                </div>
                                            </div>
                                            <div className="col-4">
                                                <div className="btn btn-danger"
                                                onClick={() => deletedata(item)}>
                                                    <span className="fa fa-trash"></span> 
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                        </div>
                    </div>
                ))}
            </div>

            <div className="modal" id="modal_edit">
                <div className="modal-dialog">
                    <div className="modal-content">
                        <div className="modal-header" style={{ background: `lightblue` }}>
                            <h4>
                                Edit Status
                            </h4>
                        </div>
                        <div className="modal-body">
                            <form onSubmit={(ev) => saveData(ev)}>
                                Status
                                <select className="form-control"
                                onChange={ev => setStatus(ev.target.value)}
                                value={status}>
                                    <option value="">
                                        {status}
                                    </option>
                                    <option value="belum_bayar">
                                        Belum Bayar
                                    </option>
                                    <option value="lunas">
                                        Lunas
                                    </option>
                                </select>

                                <br/>
                                {/* button  */}
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

            <div className="modal" id="modal_struck">
                <div className="modal-dialog">
                    <div className="modal-content">
                        <div className="modal-header" style={{ background: `lightblue` }}>
                            <h4>
                                Detail
                            </h4>
                        </div>
                        <div className="modal-body">
                            <small>Nama Customer : {namaPelanggan}</small> <br/>
                            <small>Tanggal : {tanggal}</small><br/>
                            <h6 className="fst-italic my-2" style={{color: `teal`}}> Detail Pesanan : </h6>
                            <ul className="list-group">
                            {detail.map(item => (
                                <li key={`key${item.id_detail_transaksi}`} className="list-group-item">
                                    <div className="row" >
                                        <div className="col-3">
                                            {item.menu.nama_menu}
                                        </div>
                                        <div className="col-1">
                                            {item.jumlah}
                                        </div>
                                        <div className="col-4">
                                            {formatter.format(item.harga)}
                                        </div>
                                        <div className="col-4">
                                            {formatter.format(item.jumlah * item.harga)}
                                        </div>
                                    </div>
                                </li>
                            ))}
                            <li className="list-group-item">
                                <div className="row">
                                    <div className="col-8">
                                        Total
                                    </div>
                                    <div className="col-4">
                                        {formatter.format(selectedTotal)}
                                    </div>
                                </div>
                            </li>
                            <button type="button" className="btn btn-secondary mx-2 my-2" data-bs-dismiss="modal">
                                Close
                            </button>
                            </ul>
                        </div>
                    </div>
                </div>
            </div>
            {/* <div className="card mx-4 my-1">
                <div className="card-header"
                    style={{ background: `teal` }}>
                    <h4 className="text-white">
                        List Order
                    </h4>
                </div>

                <div className="card-body">
                    <ul className="list-group">
                        {data.map(item => (
                            <li className="list-group-item"
                                key={`idPS${item.id_transaksi}`}>
                                <div className="row">
                                    <div className="col-3">
                                        <small>Nama Customer</small>
                                        <h5>{item.nama_pelanggan}</h5>
                                    </div>
                                    <div className="col-2">
                                        <small>Tanggal</small>
                                        <h5>{format(new Date(item.tgl_transaksi), 'dd-mm-yyyy')}</h5>
                                    </div>
                                    <div className="col-2">
                                        <small>Status</small>
                                        <h5>
                                            {item.status == 'lunas' ? (
                                                <div className={'badge badge-pill badge-success'}>{item.status}</div>
                                                ) : (
                                                <div className={'badge badge-pill badge-danger'}>{item.status}</div>
                                            )}
                                        </h5>
                                    </div>
                                    <div className="col-2">
                                        <small>Total</small>
                                        <h5>Rp{item.total}</h5>
                                    </div>
                                    <div className="col-1">
                                        <button className="btn btn-info my-3"
                                        >
                                            <span className="fa fa-edit"></span> edit status
                                        </button>
                                    </div>
                                    <div className="col-1">
                                        <button className="btn btn-danger mx-12 my-3"
                                        >
                                            <span className="fa fa-trash"></span> delete
                                        </button>
                                    </div>
                                </div>
                                <h6 className="fst-italic my-3" style={{color: `teal`}}>Detail Pesanan :</h6>
                                {item.detail_transaksi.map((detail) => (
                                    <ul>
                                        <li>
                                            <h6>
                                                {detail.menu.nama_menu} {detail.jumlah} = Rp{detail.jumlah * detail.harga}
                                            </h6>
                                        </li>
                                    </ul>
                                ), 0)}
                            </li>
                        ))}
                    </ul>
                </div>
            </div> */}
        </div>
    )
}