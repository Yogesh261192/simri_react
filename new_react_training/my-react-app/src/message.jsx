

function ProfileCard(props) {
    console.log(props)
        return <div className="add_class">
                <p>Name: {props.name}</p>
                <p>Details: {props.age}</p>
            </div>
        
}

export default ProfileCard;