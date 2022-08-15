export default function IndexPage() {
  const usersQuery = {
    data: [{ id: "afbn4r324t2kj", email: "dupa@gorrion.io" }],
  };

  return (
    <div>
      <button onClick={() => {}}>Add</button>
      {usersQuery.data && (
        <ol>
          {usersQuery.data.map((u) => (
            <li key={u.id}>
              <div>
                <span>
                  {u.email} - {u.id}
                </span>
                <button onClick={() => {}}>Delete</button>
              </div>
            </li>
          ))}
        </ol>
      )}
    </div>
  );
}
