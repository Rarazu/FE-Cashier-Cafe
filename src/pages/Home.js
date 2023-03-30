import { useState, useEffect } from "react";
import axios from "axios";

export default function Home(){
    if(!localStorage.getItem(`token-kasir`)){
        window.location.href = "/signin"
    }

        let user = JSON.parse(localStorage.getItem(`user-kasir`))
        let role = user.role
        let name = user.nama_user
    return(
        <div className="mx-6 my-6" style={{ marginLeft: 100 }}>
            <h3>Welcome Back {role} {name} !!</h3>
        </div>
    )
}