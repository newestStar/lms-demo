import { useEffect, useState } from 'react';
import { listUsersRequest } from '@users/request';
import { goBasePage, goDetailUserPage } from '@users/navigate';
import MainMenuLayout from '@menu-builder/components/mainMenuLayout';
import MainMenuDropItem from '@menu-builder/components/mainMenu/mainMenuDropItem';

export default function ListUsers() {
  const [pagination, setPagination] = useState(null);

  // useSession({ redirectTo: goLoginPage });

  async function listUsers() {
    const { data } = await listUsersRequest({
      page: 0,
      size: 10,
    });
    setPagination(data);
  }

  useEffect(() => {
    listUsers();
  }, []);

  return (
    <>
      <MainMenuLayout>
        <div className="mb-4">
          <MainMenuDropItem item={{ prueba: 'Flipas' }} className="bg-blue-300 rounded-3xl">
            {({ isDragging }) => <>{isDragging.toString()}Arrastra esto al menu</>}
          </MainMenuDropItem>
        </div>

        <button onClick={goBasePage}>Volver</button>
        <button onClick={goDetailUserPage}>Añadir usuario</button>

        <div>Usuarios:</div>
        <table>
          <thead>
            <tr>
              <th>Nombre</th>
              <th>Email</th>
              <th>Idioma</th>
              <th>Creado el</th>
            </tr>
          </thead>
          <tbody>
            {pagination
              ? pagination.items.map((item) => (
                  <tr key={item.id}>
                    <td>{item.name}</td>
                    <td>{item.email}</td>
                    <td>{item.language}</td>
                    <td>{item.created_at}</td>
                  </tr>
                ))
              : null}
          </tbody>
        </table>
      </MainMenuLayout>
    </>
  );
}
