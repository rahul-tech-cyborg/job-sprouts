import React, { useState, useEffect } from 'react';
import { backendUrl } from '../App';
import axios from 'axios';

const List = ({ token }) => {
    const [list, setList] = useState([]);
    const [updateDone,setUpdateDone] = useState(false);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await axios.get(backendUrl + '/api/user/list');
                if (response.data.success) {
                    console.log(response.data.allJobs);
                    setList(response.data.allJobs.reverse());
                }
            } catch (error) {
                console.error("Error fetching data", error);
            }
        };

        fetchData();
    }, [updateDone]);

    async function handleDelete(id){
        try{
            await axios.post(backendUrl+'/api/user/admin/delete',{id},{headers:{token}});
            setUpdateDone(prev => !prev);
        }
        catch(e){
            console.log(e);
        }
    }

    return (
        <div className='mx-[10px] mb-[10px]'>
            <table style={styles.table}>
                <thead>
                    <tr>
                        <th style={styles.th}>Image</th>
                        <th style={styles.th}>Company Name</th>
                        <th style={styles.th}>Job Role</th>
                        <th style={styles.th}>Batch</th>
                        <th style={styles.th}>Location</th>
                        <th style={styles.th}>Income</th>
                        <th style={styles.th}>Apply Link</th>
                        <th style={styles.th}>Date</th>
                        <th style={styles.th}>Delete</th>
                    </tr>
                </thead>
                <tbody>
                    {list.map((item, index) => (
                        <tr key={index}>
                            <td style={styles.td}>
                                {item.image && item.image.length > 0 && (
                                    <img src={item.image[0]} alt="Job" style={styles.image} />
                                )}
                            </td>
                            <td style={styles.td}>{item.company_name}</td>
                            <td style={styles.td}>{item.job_role}</td>
                            <td style={styles.td}>{item.batch}</td>
                            <td style={styles.td}>{item.location}</td>
                            <td style={styles.td}>{item.income}</td>
                            <td style={styles.td}>
                                <a href={item.apply_link} target="_blank" rel="noopener noreferrer">
                                    Apply Now
                                </a>
                            </td>
                            <td style={styles.td}>{Date(JSON.parse(item.date))}</td>
                            <td style={styles.td} className="text-red-600 font-bold"><button onClick={() => handleDelete(item._id)}>&#10006;</button></td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

const styles = {
    table: {
        width: '100%',
        borderCollapse: 'collapse',
        marginTop: '20px',
    },
    th: {
        border: '1px solid black',
        padding: '10px',
        backgroundColor: '#f2f2f2',
    },
    td: {
        border: '1px solid black',
        padding: '10px',
    },
    image: {
        width: '100px',
        height: '100px',
        objectFit: 'cover',
    },
};

export default List;
