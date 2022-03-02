import GroupExamenItem from "./GroupExamenItem"



const AffichageDesGroupes = () => {
    return (
        <div className="affichage-groupes">
            <div className="model-info">
                <p>Model :</p><br/>
                <p>Xxxxxx xxxxxxxxxxxxxxxxxxx XXXXXXXXXXX</p>
            </div>
            <div className="list-group">
                <GroupExamenItem />
            </div>
        </div>
    )
}


export default AffichageDesGroupes