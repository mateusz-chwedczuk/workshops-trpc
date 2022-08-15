import { useCallback } from "react";
import { trpc } from "../utils/trpc";

export default function IndexPage() {
  const addUserMutation = trpc.useMutation(["user.addUser"]);
  const deleteUserMutation = trpc.useMutation(["user.deleteUser"]);
  const usersQuery = trpc.useQuery(["user.getUsers"]);

  const handleDelete = useCallback(async (id: string) => {
    await deleteUserMutation.mutateAsync(
      { id },
      {
        onSuccess: () => {
          usersQuery.refetch();
        },
      }
    );
  }, []);

  const handleAdd = useCallback(async () => {
    const email = `${(Math.random() + 1).toString(36).substring(2)}@test.com`;
    const password = "password";

    await addUserMutation.mutateAsync(
      { email, password },
      {
        onSuccess: () => {
          usersQuery.refetch();
        },
      }
    );
  }, []);

  if (usersQuery.isLoading) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      <div>
        <button onClick={handleAdd}>Add random</button>
      </div>
      {usersQuery.data && (
        <ol>
          {usersQuery.data.map((u) => (
            <li key={u.id}>
              <div>
                <span>
                  {u.email} - {u.id}
                </span>
                <button onClick={() => handleDelete(u.id)}>Delete</button>
              </div>
            </li>
          ))}
        </ol>
      )}
    </div>
  );
}
