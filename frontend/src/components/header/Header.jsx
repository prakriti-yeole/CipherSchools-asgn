import React from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { toast, Toaster } from 'react-hot-toast'

const Header = ({ getLocalStorageData, user, setUser }) => {
    const navigate = useNavigate();

    // const [user, setUser] = useState(getLocalStorageData);
    const handleLogout = () => {
        if (user != null) {
            localStorage.removeItem("user");
            setUser(getLocalStorageData);
            toast.success("Logout Successfully");
        } else {
            navigate('/signin');
        }
    }
    return (
        <>
            <div><Toaster /></div>
            <div className="header-section">
                <div className="header-main">
                    <div className="header-logo">
                        <Link to="/"><img src="/app-logo.png" alt="" /></Link>
                        <Link to="/" className='d-none d-sm-block'><p>&nbsp;CipherSchools</p></Link>
                    </div>
                    <div className="header-list">
                        <Link to="/" className="header-listitem">
                            <p>Home</p>
                        </Link>
                        <Link to="/" className="header-listitem">
                            <p>Trending</p>
                        </Link>
                    </div>
                    <div className="header-user dropdown-toggle" data-bs-toggle="dropdown">
                        <div className="user-icon">
                            <img src="/user.png" alt="" />
                        </div>
                        {
                            user != null ?
                                <div className='user-details'>
                                    <span className='greeting d-none d-sm-block'>Hey, <img src="/waving-hand.png" alt="" /></span>
                                    <span className='user-email d-none d-sm-block' title={user.userEmail}>{`${user.userEmail.length > 10 ? `${user.userEmail.slice(0, 9)}...` : user.userEmail}`}</span>
                                </div>
                                : null
                        }

                        <ul className="dropdown-menu">
                            <li >
                                {
                                    user != null ?
                                        <p style={{ marginBottom: "0" }} onClick={handleLogout} className="dropdown-item">Logout</p>
                                        :
                                        <p style={{ marginBottom: "0" }} onClick={handleLogout} className="dropdown-item">Signin</p>
                                }
                            </li>
                        </ul>
                    </div>
                </div>
            </div>
        </>
    )
}

export default Header