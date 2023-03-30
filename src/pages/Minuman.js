import { useState, useEffect } from "react"
import axios from "axios"
import { Container } from "@mui/system"
import { Badge, Button, Card, Row, Col, Alert } from "react-bootstrap"
import React, {Fragment} from "react"

export default function Minuman(){
    if(!localStorage.getItem(`token-kasir`)){
        window.location.href = "/signin"
    }

    let [minuman, setMinuman] = useState([])

    let token = localStorage.getItem(`token-kasir`)
    let authorization = {
        headers: {
            Authorization: `Bearer ${token}`
        }
    }

    let getminuman = () => {
        let endpoint = `http://localhost:8000/menu/minuman`
        
        axios.get(endpoint, authorization)
            .then(response => {
                setMinuman(response.data)
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

    useEffect(() => {
        getminuman()
    }, [])

    return (
        <Container xs={12} md={4} lg={3}>
            <div className="my-3">
                <form action="/menu">
                    <button type="submit" className="btn btn-info">
                        Back to the menu
                    </button>
                </form>
            </div>
            <Row>
                {minuman.map(item => (
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
                                        Harga : Rp {item.harga}
                                    </h6>
                                    <p>
                                        <ReadMore>
                                            {item.deskripsi}
                                        </ReadMore>
                                    </p>
                                </div>
                            </Card.Body>
                        </Card>
                    </Col>
                ))}
            </Row>
        </Container>
    )
}