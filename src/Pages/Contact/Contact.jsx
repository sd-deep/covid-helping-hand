import React, { useEffect, useState } from 'react'

import './Contact.css';
import db from '../../Firebase';
import CircularIndeterminate from '../../Spinner/Spinner';
import BasicTable from '../../Table/Table';
import { Divider } from '@material-ui/core';
import { useHistory } from 'react-router';

const Contact = () => {

    const [Volunteers, setvolunteers] = useState([]);

    const [loading, setloading] = useState(false);

    const history = useHistory();

    useEffect(() => {
        try {
            setloading(true);
            db.collection('Volunteers').orderBy('name').get()
            .then(snapshot => {
                setvolunteers(snapshot.docs.map( doc => ({ data: doc.data() }) ))
            }).then(event => {
                setloading(false);
            })
        } catch(error) {
            alert(error.message);
            setloading(false);
        }
    },[])

    if(loading) {
        return (
            <div className='spinner'>
                <CircularIndeterminate/>
            </div>
        );
    } else {
        return (
            <div className='contact'>
                <h1>Bengal Red Volunteers</h1>
                <h3>Join our whatsapp group : <a className="whatsappIcon" href="https://chat.whatsapp.com/H0hVkXVD4ad6KrW07rHdQG" >Join</a></h3>
                <Divider/>
                <div>
                    <BasicTable
                        rows={Volunteers}
                    />
                </div>
            </div>
        );
    }
}

export default Contact