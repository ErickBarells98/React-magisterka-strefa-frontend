import React, { useState, useContext } from 'react';
import UserContext from '../../context/UserContext';
import { useQuery } from "@tanstack/react-query";
import jwtAxios from '../../utils/jwtAxios';



const Profile = () => {

    const context = useContext(UserContext);

    const { data: userInfo, isLoading: isUserInfoLoading } = useQuery(["userInfo"], () => 
        jwtAxios.get(`/api/MyProfile/${context.user.userid}`,{context:context})
    )


  return (
    <div className="profile-tab" style={{marginTop: 20}}>
    <div className="container-custom">
        <h1 className="h1--custom">Mój profil:</h1>
        <hr className='hr--custom'/>
        { isUserInfoLoading ?  
        <>
        </>
        : 
        <dl className="details-info">
            <div>
                <dd>ID:</dd>
                <dt>{ userInfo.data.id }</dt>
            </div>
            <div>
                <dd>Email:</dd>
                <dt>{ userInfo.data.email }</dt>
            </div>
            <div>
                <dd>Data rejestracji:</dd>
                <dt>{ userInfo.data.registrationDate }</dt>
            </div>
            <div>
                <dd>Imię</dd>
                <dt>{ userInfo.data.firstName }</dt>
            </div>
            <div>
                <dd>Nazwisko</dd>
                <dt>{ userInfo.data.surname }</dt>
            </div>
        </dl>
        }
        <hr className='hr--custom'/>
        <h1 className="h1--custom">Kierunek studiów:</h1>

        <button className="custom-button" style={{ width: "100px", marginTop: 15, marginBottom: 15}} >Zarządzaj</button>
    </div>
</div>
  )
}

export default Profile