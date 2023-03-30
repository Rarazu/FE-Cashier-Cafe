import { useState, useEffect } from "react"
import axios from "axios"
import { Container } from "@mui/system"
import { Badge, Button, Card, Row, Col, Alert } from "react-bootstrap"
import React, {Fragment} from "react"
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import { Modal } from "bootstrap"
import "../css/Menu.css"
// import "../components/Property.css"

export default function Menu() {
    let [menu, setMenu] = useState([])
    let [makanan, setMakanan] = useState([])
    let [minuman, setMinuman] = useState([])
    let [idMenu, setIdMenu] = useState(0)
    let [namaMenu, setNamaMenu] = useState("")
    let [harga, setHarga] = useState("")
    let [deskripsi, setDeskripsi] = useState("")
    let [jenis, setJenis] = useState("")
    let [gambar, setGambar] = useState(null)
    let [filterParam, setFilterParam] = useState(["All"])
    let [role, setRole] = useState("")

    let [action, setAction] = useState("")
    let [uploadImage, setUploadImage] = useState(true)
    let [modal, setModal] = useState(null)
    let [keyword, setKeyword] = useState("")

    let token = localStorage.getItem(`token-kasir`)
    let authorization = {
        headers: {
            Authorization: `Bearer ${token}`
        }
    }

    let getData = () => {
        let endpoint = `http://localhost:8000/menu`

        axios.get(endpoint, authorization)
        .then(response => {
            setMenu(response.data)
        })
        .catch(error => console.log(error))
    }

    let getMakanan = () => {
        let endpoint = `http://localhost:8000/menu/makanan`
        
        axios.get(endpoint, authorization)
            .then(response => {
                getMakanan()
            })
            .catch(error => console.log(error))
    }

    let addMenu = () => {
        modal.show()
        setIdMenu(0)
        setNamaMenu("")
        setHarga("")
        setDeskripsi("")
        setJenis("")
        setGambar(null)
        setAction("insert")
        setUploadImage(true)
    }

    let editMenu = item => {
        modal.show()
        setIdMenu(item.id_menu)
        setNamaMenu(item.nama_menu)
        setHarga(item.harga)
        setDeskripsi(item.deskripsi)
        setJenis(item.jenis)
        setGambar(null)
        setAction("edit")
        setUploadImage(false)
    }

    let saveMenu = ev => {
        // ev.preventDefault()

        modal.hide()
        if (action === `insert`) {
            let endpoint = `http://localhost:8000/menu`
            let request = new FormData()
            request.append(`nama_menu`, namaMenu)
            request.append(`harga`, harga)
            request.append(`deskripsi`, deskripsi)
            request.append(`jenis`, jenis)
            request.append(`gambar`, gambar)

            axios.post(endpoint, request, authorization)
                .then(response => {
                    alert(response.data.message)
                    window.location.reload(true);
                    getData()
                })
                .catch(error => console.log(error))
        } else if (action === `edit`) {
            let endpoint = `http://localhost:8000/menu/${idMenu}`
            let request = new FormData()
            request.append(`nama_menu`, namaMenu)
            request.append(`harga`, harga)
            request.append(`deskripsi`, deskripsi)
            request.append(`jenis`, jenis)
            
            if (uploadImage === true) {
                request.append(`gambar`, gambar)
            }

            // sending data
            axios.put(endpoint, request, authorization)
                .then(response => {
                    alert(response.data.message)
                    getData()
                })
                .catch(error => console.log(error))
        }
    }

    let deleteMenu = item => {
        if (window.confirm(`Reolly?? You Want to Delete THIS?`)) {
            let endpoint = `http://localhost:8000/menu/${item.id_menu}`
            // sending data
            axios.delete(endpoint, authorization)
                .then(response => {
                    Alert(response.data.message)
                    getData()
                })
                .catch(error => console.log(error))
        }
    }

    let filterJenis = (ev) => {
        ev.preventDefault()
        let endpoint = `http://localhost:8000/menu/find`
        let request = {
            keyword: keyword
        }

        axios.post(endpoint, request, authorization)
            .then(response => {
                setMenu(response.data)
                console.log(response.data)
            })
            .catch(error => console.log(error))

    }

    let ReadMore = ({ children }) => {
        let text = children;
        let [isReadMore, setIsReadMore] = useState(true);
        let toggleReadMore = () => {
          setIsReadMore(!isReadMore);
        };
        return (
          <p className="text">
            {isReadMore ? text.slice(0, 40) : text}
            <span onClick={toggleReadMore} className="read-or-hide">
              {isReadMore ? "......read more" : " show less"}
            </span>
          </p>
        );
      };

    //   const filterItem = (curcat) => {
    //     const newItem = menu.filter((newVal) => {
    //       return newVal.jenis === curcat; 
    //             // comparing category for displaying data
    //     });
    //     return newItem;
    //   };

    const formatter = new Intl.NumberFormat('en-ID', {
        style: 'currency',
        currency: 'IDR'
    });
      
 
    useEffect(() => {
        if(!localStorage.getItem(`token-kasir`)){
            window.location.href = "/signin"
        }
        setRole(localStorage.getItem(`role`))
        let myModal = new Modal(
            document.getElementById("modal_menu")
        )
        setModal(myModal)
        getData()
    }, [])

    return (
        <Container xs={12} md={4} lg={3}>
            <div className="row mx-2 my-4" >
                <div className="col-lg-2">
                    <div className={`btn btn-secondary ${role === 'admin' ? 'd-block' : 'd-none'}`}
                        onClick={() => addMenu()}>
                            <span className="fa fa-add"></span> add menu
                    </div>
                </div>

                <div className="col-10">
                    <form onSubmit={(ev) => filterJenis(ev)}>
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

                {/* <div className="col-lg-2">
                    <form action="/menu/food">
                        <button type="submit" className="btn btn-secondary">
                            Food
                        </button>
                    </form>
                </div>
                <div className="col-lg-2">
                    <form action="/menu/drink">
                        <button type="submit" className="btn btn-secondary">
                            Drink
                        </button>
                    </form>
                </div> */}
            </div>
            <Row>
                {menu.map(item => (
                    <Col key={`key-${item.id_menu}`} xs={12} md={4} lg={3}>
                        <Card className="mt-4">
                            <Card.Img src= {`http://localhost:8000/image/${item.gambar}`}
                            style={{ width: 600, height: 200 }}/>

                            <Card.Body>
                                <div className="m-1">
                                    <h5>
                                        {item.nama_menu}
                                    </h5>
                                    <h6>
                                        Harga : {formatter.format(item.harga)}
                                    </h6>
                                    <p>
                                        <ReadMore>
                                            {item.deskripsi}
                                        </ReadMore>
                                    </p>
                                </div>

                                <div className="row">
                                    <div className="col-lg-4">
                                        <div className={`btn btn-info ${role === 'admin' ? 'd-show' : 'd-none'}`}
                                        onClick={() => editMenu(item)}>
                                            <EditIcon />
                                        </div>
                                    </div>
                                    <div className="col-lg-4">
                                        <div className={`btn btn-danger ${role === 'admin' ? 'd-show' : 'd-none'}`}
                                        onClick={() => deleteMenu(item)}>
                                            <DeleteIcon />
                                        </div>
                                    </div>
                                </div>
                            </Card.Body>
                        </Card>
                    </Col>
                ))}
            </Row>
            <div className="modal" id="modal_menu">
                        <div className="modal-dialog">
                            <div className="modal-content">
                                <div className="modal-header" style={{ background: `lightblue` }}>
                                    <h4>
                                        Form Menu
                                    </h4>
                                </div>
                                <div className="modal-body">
                                    <form onSubmit={(ev) => saveMenu(ev)}>
                                        Nama Menu
                                        <input type="text" className="form-control mb-2" required
                                        value={namaMenu} onChange={ev => setNamaMenu(ev.target.value)} />

                                        Harga
                                        <input type="text" className="form-control mb-2" required
                                        value={harga} onChange={ev => setHarga(ev.target.value)} />

                                        Deskripsi
                                        <input type="text" className="form-control mb-2" required
                                        value={deskripsi} onChange={ev => setDeskripsi(ev.target.value)} />

                                        Jenis
                                        <select class="form-control custom-select custom-select-sm"
                                        onChange={ev => setJenis(ev.target.value)}>
                                            <option selected value={jenis}>{jenis}</option>
                                            <option value="makanan">makanan</option>
                                            <option value="minuman">minuman</option>
                                        </select>
                                        
                                        Gambar
                                        <input type="file" 
                                        className={`form-control mb-2 ${uploadImage ? `` : `d-none`}`}
                                        required={uploadImage}
                                        accept="image/*"
                                        onChange={ev => setGambar(ev.target.files[0])} />

                                        <br/>
                                        <button className={`btn btn-sm m-2 ${uploadImage ? `d-none` : ``}`}
                                        type="button"
                                        style={{background: `lightgray`}}
                                        onClick={() => setUploadImage(true)}>
                                            Click to re-upload image
                                        </button>

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
        </Container>
     
        
    )
}