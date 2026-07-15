/*
=====================================
 WR ID+
 badges.js

 Система галочек
=====================================
*/


/*
 Получить HTML галочек пользователя
*/


function renderBadges(user){


    if(!user || !user.badges){

        return "";

    }


    let html = "";



    /*
    Золотая галочка
    Владелец WR ID+
    */


    if(user.badges.owner){


        html += `

        <div class="badge badge-gold"
        title="Владелец WR ID+">

        ★

        </div>

        `;


    }



    /*
    Синяя галочка
    Подтвержденный аккаунт
    */


    if(user.badges.verified){


        html += `

        <div class="badge badge-blue"
        title="Подтверждён">

        ✓

        </div>

        `;


    }



    /*
    Зеленая галочка
    WR+
    */


    if(user.badges.wrplus){


        html += `

        <div class="badge badge-green"
        title="WR+">

        +

        </div>

        `;


    }



    return html;


}



/*
 Добавить галочку пользователю
*/


function addBadge(username,type){


    const user=getUser(username);


    if(!user){

        return false;

    }



    if(
        type==="owner" ||
        type==="verified" ||
        type==="wrplus"
    ){


        user.badges[type]=true;


        updateUser(
            username,
            {
                badges:user.badges
            }
        );


        return true;


    }



    return false;


}



/*
 Убрать галочку
*/


function removeBadge(username,type){


    const user=getUser(username);


    if(!user){

        return false;

    }



    user.badges[type]=false;



    updateUser(
        username,
        {
            badges:user.badges
        }
    );



    return true;


}



/*
 Проверка галочки
*/


function hasBadge(username,type){


    const user=getUser(username);


    if(!user){

        return false;

    }



    return !!user.badges[type];


}
