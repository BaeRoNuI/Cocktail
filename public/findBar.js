async function getBar(map) {
    try {
        const res = await axios.get('/bar');
        const users = res.data;
        let click = [];
        let geocoder = new kakao.maps.services.Geocoder();
        let imageSrc = "https://t1.daumcdn.net/localimg/localimages/07/mapapidoc/markerStar.png";
        let imageSize = new kakao.maps.Size(24,35);
        let markerImage = new kakao.maps.MarkerImage(imageSrc, imageSize);
        let on = false;


        for(let i = 0; i < users.length; i++) {
            geocoder.addressSearch(users[i].address, function(result, status) {
                if (status === kakao.maps.services.Status.OK) {
                    click.push(0);
                    let coords = new kakao.maps.LatLng(result[0].y, result[0].x);
                    let marker = new kakao.maps.Marker({
                        map : map,
                        position : coords,
                        image : markerImage
                    });

                    /*let iwContent = "<div class='infobox'>"
                        + users[i].name + "<br>"
                        + '*'.repeat(users[i].grade) + "<br>"
                        + users[i].comment + "<br>"
                        + users[i].phone
                        + "</div>", iwRemoveable = true; */

                    let iwContent =
                    '    <div class = "wrap">'+
                    '        <div class = "info">'+
                    '            <div class = "info_title" id = "info_close">'+
                                        users[i].name +
                                        '<div class = "close" id = "info_close" title = "닫기" >' +
                    '            </div>'+
                    '        </div>'+
                    '        <div class = "stars">'+
                                    '★'.repeat(users[i].grade) +
                    '        </div>' +
                    '        <div class = "info_desc">'+
                                    users[i].comment +
                    '        </div>'+
                             '<div class = "info_phone ellipsis">'
                                    + "전화번호 : " + users[i].phone +
                            '</div>'+
                    '    </div>';
                    let overlay = new kakao.maps.CustomOverlay({
                        clickable : true,
                        content : iwContent,
                        map : map,
                        position : marker.getPosition()
                    });
                    overlay.setMap(null);

                    kakao.maps.event.addListener(marker, 'click', function(){
                        if (on === false) {
                            on = true;
                            overlay.setMap(map);
                            let close_button = document.getElementById("info_close");
                            close_button.onclick = function() {
                                overlay.setMap(null);
                                on = false;
                            }
                        }
                    })
                }
            })
        }
    } catch {
        console.error(404);
    }
}

window.onload = function() {
    const sideButton = document.getElementById("sidebar_button");
    const sideBar = document.getElementById("sidebar");
    let state = 0;

    sideButton.src = "./img/bugger_icon.png";

    sideButton.onclick = function() {
        if (state === 0) {
            sideButton.src = "./img/close_icon.png";
            document.getElementById("aside_cover").style.left = "0%";
            document.getElementById("sidebar").style.left = "60%";
            state = 1;
        } else {
            sideButton.src = "./img/bugger_icon.png";
            document.getElementById("aside_cover").style.left = "100%";
            document.getElementById("sidebar").style.left = "100%";
            state = 0;
        }
        sideBar.classList.toggle('active');
    };

    document.getElementById("aside_cover").onclick = function() {
        sideButton.src = "./img/bugger_icon.png";
        document.getElementById("sidebar").style.left = "100%";
        document.getElementById("aside_cover").style.left = "100%";
        state = 0;
    }

    /////////////////////////////////////////////
    let container = document.getElementById('map');
    let options = {
        center : new kakao.maps.LatLng(37.557147, 126.936827),
        level : 3
    };
    let map = new kakao.maps.Map(container, options);

    let option = {
        enableHighAccuracy : true,
        maximumAge : 30000,
        timeout : 27000
    };
    if('geolocation' in navigator){
        let currentLat, currentLon;
        navigator.geolocation.watchPosition(function(position) {
            currentLat = position.coords.latitude;
            currentLon = position.coords.longitude;
            let movLatLon = new kakao.maps.LatLng(currentLat,currentLon);
            map.setCenter(movLatLon);
            let marker = new kakao.maps.Marker({
                position : movLatLon,
            });
            marker.setMap(map);
        }, err, option);
    }

    ////////////////////////////////////////////////////


    getBar(map);



}

function suc() {
    console.log("geolocation success");
}

function err() {
    console.log("error occured");
};