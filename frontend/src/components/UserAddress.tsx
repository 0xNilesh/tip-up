// components/UserAddress.tsx
interface UserAddressProps {
  address: string
}

const UserAddress: React.FC<UserAddressProps> = ({ address }) => {
  return (
    <div className="my-4 p-4 border rounded-md bg-gray-100">
      <h3 className="text-lg font-semibold">Your Address:</h3>
      <p className="text-sm text-gray-700">{address}</p>
    </div>
  )
}

export default UserAddress
