import React, { useState } from 'react';
import {
  MDBCol, MDBRow,
  MDBContainer,
  MDBTabs,
  MDBTabsItem,
  MDBTabsLink,
  MDBTabsContent,
  MDBTabsPane,
  MDBBtn,
  MDBIcon,
  MDBInput,
  MDBCheckbox
}
from 'mdb-react-ui-kit';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

export default function Login() {
  let [username, setUsername] = useState("")
  let [password, setPassword] = useState("")
  let navigate = useNavigate();

  let loginProcess = ev => {
    ev.preventDefault()

    let request = {
      username: username,
      password: password
    }

    let endpoint = `http://localhost:8000/user/auth`

    axios.post(endpoint, request)
        .then(response => {
            if (response.data.logged == true) {
                let token = response.data.token
                // penempatan token ke Local Storage Browser
                localStorage.setItem(`token-kasir`, token)
                let dataUser = JSON.stringify(response.data.dataUser)
                let role = response.data.dataUser.role
                localStorage.setItem(`user-kasir`, dataUser)
                localStorage.setItem("role", role)
                navigate("/")
                console.log('berhasil')
            } else {
                alert(response.data.message)
            }
        })
        .catch(error => {
            console.log(error)
        })
  }

  const [justifyActive, setJustifyActive] = useState('tab1');

  const handleJustifyClick = (value) => {
    if (value === justifyActive) {
      return;
    }

    setJustifyActive(value);
  };

  return (
    <MDBContainer className="p-3 my-5 d-flex flex-column w-45" style={{ width: 400 }}>
      <MDBTabs pills justify className='mb-3 d-flex flex-row justify-content-between'>
        <MDBTabsItem>
          <MDBTabsLink onClick={() => handleJustifyClick('tab1')} active={justifyActive === 'tab1'}>
            Sign in
          </MDBTabsLink>
        </MDBTabsItem>
        {/* <MDBTabsItem>
          <MDBTabsLink onClick={() => handleJustifyClick('tab2')} active={justifyActive === 'tab2'}>
            Register
          </MDBTabsLink>
        </MDBTabsItem> */}
      </MDBTabs>

      <MDBTabsContent>
        <MDBTabsPane show={justifyActive === 'tab1'} >
          <form onSubmit={ev => loginProcess(ev)}>
            <MDBInput wrapperClass='mb-4' label='Username' id='form1'
            value={username} onChange={(ev) => setUsername(ev.target.value)}/>
            <MDBInput wrapperClass='mb-4' label='Password' id='form2' type='password'
            value={password} onChange={(ev) => setPassword(ev.target.value)}/>
            <MDBBtn className="mb-4 w-100" onSubmit={ev => loginProcess(ev)}>
              Sign in
            </MDBBtn>
          </form>
        </MDBTabsPane>

      </MDBTabsContent>
    </MDBContainer>
  );
}

// export default function Login() {
//     return (
//         <div class="row justify-content-center mt-4">
//             <div class="col-md-5">
//                 <div class="form-signin">
//                     <form action="/login" method="POST">
//                         <h1 class="h3 mb-3 fw-normal text-center">
//                             Please Log in
//                         </h1>
                    
//                         <div class="form-floating">
//                             <input type="text" placeholder="Username"
//                             class="form-control" />
//                             <label for="username">
//                                 Username
//                             </label>
//                         </div>
//                         <div class="form-floating mt-3">
//                             <input type="password"  name="password"
//                             class="form-control" 
//                             id="password" placeholder="Password" />
//                             <label for="password">
//                                 Password
//                             </label>
//                         </div>

//                         <div class="mt-3">
//                             <select class="form-select">
//                                 <option selected>Login sebagai</option>
//                                 <option value="1">Admin</option>
//                                 <option value="2">Kasir</option>
//                                 <option value="3">Manager</option>
//                             </select>
//                         </div>
                    
//                         <button class="w-100 btn btn-lg btn-primary mt-3" type="submit">
//                             Log in
//                         </button>
//                     </form>
//                     <small class="d-block text-center mt-3">
//                         Not Registreted? 
//                         <a href="/register">
//                             Register Now!
//                         </a>
//                     </small>
//                 </div>
//             </div>
//         </div>
//     )
// }