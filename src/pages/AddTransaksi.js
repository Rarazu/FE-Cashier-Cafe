import { useState, useEffect } from "react";
import axios from "axios";
import format from "date-fns/format";
import { Modal } from "bootstrap";
import { useNavigate } from "react-router-dom";
import "../css/Styles.css"

export default function AddTransaksi() {
    if(!localStorage.getItem(`token-kasir`)){
        window.location.href = "/signin"
    }
    let navigate = useNavigate();

    let [data, setData] = useState([])
    let [meja, setMeja] = useState([])
    let [menu, setMenu] = useState([])

    let [namaPelanggan, setNamaPelanggan] = useState("")
    let [jumlah, setJumlah] = useState("")
    let [selectedMeja, setSelectedMeja] = useState("")
    let [selectedMenu, setSelectedMenu] = useState("")
    let [selectedDate, setSelectedDate] = useState("")

    let [detail, setDetail] = useState([])
    let [idTransaksi, setIdTransaksi] = useState(0)
    let [tanggal, setTanggal] = useState("")
    let [namaMenu, setNamaMenu] = useState("")
    let [harga, setHarga] = useState("")
    let [idDetail, setIdDetail] = useState(0)


    let token = localStorage.getItem(`token-kasir`)
    let authorization = {
        headers: {
            Authorization: `Bearer ${token}`
        }
    }

    let getMeja = () => {
        let endpoint = "http://localhost:8000/meja/ready"
        axios.get(endpoint, authorization)
            .then(result => {
                // store data to state siswa
                setMeja(result.data)
            })
            .catch(error => console.log(error))
    }

    let getMenu = () => {
        let endpoint = "http://localhost:8000/menu"
        axios.get(endpoint, authorization)
            .then(result => {
                // store data to state siswa
                // setMenu(result.data)
                let tempMenu = result.data
                for (let i = 0; i < tempMenu.length; i++) {
                    tempMenu[i].jumlah = 0 
                    tempMenu[i].isSelected = false                   
                }
                setMenu(tempMenu)
            })
            .catch(error => console.log(error))
    }

    let addMenu = (id_menu) => {
        let temp = [...selectedMenu]
        let found = temp.find(
            item => item.id_menu === id_menu
        )

        // jika ditemukan data yg sama = dihapus
        // jika tidak menemukan = ditambahkan
        if (found) {
            let index = temp.findIndex(
                item => item.id_menu === id_menu
            )
            temp.splice(index, 1)
        } else {
            temp.push({
                id_menu: id_menu,
                jumlah: jumlah
            })
        }
        // memasukkan id pelanggaran yg dipilih
        // ke selectedPelanggaran
        setSelectedMenu(temp)
    }

    let saveTransaksi = () => {
        if (window.confirm(`Sure to save this data?`)) {
            // ambil id_user
            let user = JSON.parse(localStorage.getItem(`user-kasir`))
            let id = user.id_user

            let cart = menu.filter(item => item.isSelected === true)

            let endpoint = `http://localhost:8000/transaksi`
            let request = {
                tgl_transaksi: selectedDate,
                id_user: id,
                id_meja: selectedMeja,
                nama_pelanggan: namaPelanggan,
                detail_transaksi : cart,
            }

            // sending data
            axios.post(endpoint, request, authorization)
                .then(result => {
                    alert(result.data.message)
                    navigate("/order")
                })
                .catch(error => console.log(error))
        }
    }

    const handleJumlah = (value, id) => {
        let tempMenu = [...menu]
        let selectedIndex = tempMenu.findIndex(it => it.id_menu === id)
        tempMenu[selectedIndex].jumlah = value
        setMenu(tempMenu)
    }

    const handleSelectMenu = (id) => {
        let tempMenu = [...menu]
        let selectedIndex = tempMenu.findIndex(it => it.id_menu === id)
        tempMenu[selectedIndex].isSelected = !tempMenu[selectedIndex].isSelected 
        setMenu(tempMenu)
    }

    useEffect(() => {
        getMeja()
        getMenu()
    }, [])

    return (
        <div className="container-fluid">
            <div>
                <form action="/order">
                    <button type="submit" className="btn btn-secondary mx-28 my-3" style={{ marginLeft: 220 }}>
                        <span className="fa fa-back"></span> back to list
                    </button>
                </form>
            </div>
            <div className="card mx-auto" style={{ width: 800 }}>
                <div className="card-header" style={{ background: `lightblue` }}>
                    <h4>Add Order</h4>
                </div>

                <div className="card-body">
                    <div className="row">
                        <div className="col-2 my-2">
                            Nama Customer
                        </div>
                        <div className="col-10 my-2">
                            <input type="text"
                                className="form-control"
                                onChange={ev => setNamaPelanggan(ev.target.value)}
                                value={namaPelanggan} />
                        </div>

                        <div className="col-2">
                            Pilih Meja
                        </div>
                        <div className="col-10">
                            <select className="form-control"
                                onChange={ev => setSelectedMeja(ev.target.value)}
                                value={selectedMeja}>
                                <option value="">
                                    --- List Meja ---
                                </option>
                                {meja.map(item => (
                                    <option
                                        value={item.id_meja}
                                        key={`key${item.id_meja}`}>
                                        {item.nomor_meja}
                                    </option>
                                ))}
                            </select>
                        </div>

                        <div className="col-2 my-2">
                            Tanggal Order
                        </div>
                        <div className="col-10 my-2">
                            <input type="date"
                                className="form-control"
                                onChange={ev => setSelectedDate(ev.target.value)}
                                value={selectedDate} />
                        </div>

                        <div className="col-2 my-2">
                            Menu
                        </div>
                        <div className="col-10 my-2">
                            {menu.map(item => (
                                <div className="row">
                                    <div classname="col-lg-6" key={`ppp${item.id_menu}`} >
                                        <input type={"checkbox"}
                                            value={item.id_menu}
                                            className="me-2"
                                            checked={item.isSelected}
                                            onChange={() => handleSelectMenu(item.id_menu)}
                                        />
                                        {item.nama_menu}
                                    </div>
                                    <div classname="col-lg-6" key={`ppp${item.id_menu}`} >
                                        <input type="number" className="form-control" style={{ width: 100 }}
                                        value={item.jumlah} onChange={ev => handleJumlah(ev.target.value, item.id_menu) }/>
                                       
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>

                    <button className="btn btn-success"
                        onClick={() => saveTransaksi()}>
                        <span className="fa fa-check"></span> Save
                    </button>
                </div>
            </div>
        </div>
    )
}