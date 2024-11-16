// components/UserAddress.tsx
interface UserAddressProps {
  address: string
}

const UserAddress: React.FC<UserAddressProps> = ({ address }) => {
  return (
    <div className="my-4 p-4 border rounded-md">
      <h3 className="text-lg font-semibold">Your Address:</h3>
      <p className="text-sm">{address}</p>
    </div>
  )
}

export default UserAddress
