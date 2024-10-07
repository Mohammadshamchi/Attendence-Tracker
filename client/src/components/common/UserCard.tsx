export default function UserCard({ name, phone }) {
    return (
        <div className="user-card">
            <img src="https://media.licdn.com/dms/image/v2/D4D03AQGgKFGM2OdqxA/profile-displayphoto-shrink_400_400/profile-displayphoto-shrink_400_400/0/1697013151564?e=1732147200&v=beta&t=jj2yubrmm3Nhik3M_xUW7bWA8Vx0dwoKT7bN7hnE9Ko" alt="User Image" />
            <h3>{name}</h3>
            <p className="user-card-phone">Phone</p>
            <p className="user-card-number">{phone}</p>
        </div>
    );
}
