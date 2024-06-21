function Item({listItem}) {
    return (
        <div onClick={(e) => e.target.style.display = "none" }>
            <p> ={'>'} {listItem}</p>
        </div>
    );
}

export default Item;