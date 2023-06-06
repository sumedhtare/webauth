import React, { useCallback, useContext, useState } from 'react';
import { AuthContext } from '../context/authContext';
import { useUsers } from '../hooks/useUsers';
import { user as userType } from '../types/interface';
import { useAuth } from '../hooks/useAuth';
import '../styles/component.scss';

const HomePage: React.FC = () => {
  const { user } = useContext(AuthContext);
  const { users, getUserById } = useUsers();
  const { logout } = useAuth();
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [userInfo, setUserInfo] = useState<userType | null>(null);

  const handleModal = useCallback(async (id: number) => {
    const res: any = await getUserById(id);
    setUserInfo(res);
    setIsOpen(true);
  }, []);

  const closeModal = useCallback(() => {
    setUserInfo(null);
    setIsOpen(false);
  }, []);

  return (
    <div className="container">
      <div className="right mt50">
        <button className="red" onClick={logout}>
          Logout
        </button>
      </div>
      <h2>Welcome {user?.username}</h2>

      {users && (
        <div>
          <h3>Online users</h3>
          {users?.map((item: userType) => {
            return (
              <div className="wrapper" key={item.id} onClick={() => handleModal(item.id)}>
                <p>Username: {item.username}</p>
                <p>Login time: {item.login_time}</p>
                <p>Last update time: {item.last_update_time}</p>
                <p>Last Login: {item.last_login}</p>
                <p>User IP: {item.user_ip}</p>
              </div>
            );
          })}
        </div>
      )}

      {isOpen && (
        <div className="modal">
          <div className="modal-content">
            <h2>User Information</h2>
            {userInfo && (
              <div>
                <p>Username: {userInfo?.username}</p>
                <p>User’s User-Agent: {userInfo?.user_agent}</p>
                <p>Register time: {userInfo?.register_time}</p>
                <p>Logins count: {userInfo?.logins_count}</p>
              </div>
            )}
            <button className="red" onClick={closeModal}>
              Close
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default HomePage;
