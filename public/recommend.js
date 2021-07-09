async function recommend_cocktail() {
    try {
        const res = await axios.get('/cocktail');
        const cocktail = res.data;

        fetch("query.json")
            .then((res) => {
                return res.json();
            })
            .then((json) => {
                exec_query(json, cocktail);
            })
            .catch((err) => {
                console.error(err);
            });
    } catch {
        console.error(404);
    }
}

function exec_query(q, cocktail) {
    const query = document.getElementById("query");
    const query_q = document.getElementById("query_q");
    const query_detail = document.getElementById("query_detail");
    const query_1 = document.getElementById("query_ans_1");
    const query_2 = document.getElementById("query_ans_2");

    const detail_block = document.getElementById("today_cocktail_detail");

    const memoi = Array.from({length: q.length}, () => 0);

    let index = 0;

    detail_block.style.zIndex = "-3";
    query.style.zIndex = "3";

    query_q.textContent = q[index].q;
    query_detail.textContent = q[index].detail;
    query_1.textContent = q[index].ans_1;
    query_2.textContent = q[index].ans_2;

    query_1.onclick = function () {
        if(index === 0) {
            index++;
        }
        index++;
        if(index < q.length){
            query_q.textContent = q[index].q;
            query_detail.textContent = q[index].detail;
            query_1.textContent = q[index].ans_1;
            query_2.textContent = q[index].ans_2;
        } else {
            detail_block.style.zIndex = "3";query.style.zIndex = "-3";
            show_recommend(memoi, cocktail);
        }
        setTimeout(function(){}, 1000);
    };

    query_2.onclick = function () {
        memoi[index++] = 1;
        if(index < q.length) {
            query_q.textContent = q[index].q;
            query_detail.textContent = q[index].detail;
            query_1.textContent = q[index].ans_1;
            query_2.textContent = q[index].ans_2;
        } else {
            detail_block.style.zIndex = "3";query.style.zIndex = "-3";
            show_recommend(memoi, cocktail);
        }
        setTimeout(function(){}, 1000);
    };
}

function show_recommend(memoi, cocktail) {
    try {
        const detail_head = document.getElementById("detail_head");
        const detail_img = document.getElementById("detail_img");
        const detail_korname = document.getElementById("detail_korname");
        const detail_alco = document.getElementById("detail_alco");
        const detail_comment = document.getElementById("detail_comment");
        const detail_recipe = document.getElementById("detail_recipe");
        const next_button = document.getElementById("next_button");
        const kakao_button = document.getElementById("kakao_button");

        const pos = Array.from({length: cocktail.length}, () => 1);
        let max_alco, min_alco;
        let index;

        if(memoi[0] === 0) {
            max_alco = 0;
            min_alco = 0;
        } else {
            if(memoi[1] === 0) {
                min_alco = 0.1;
                max_alco = 10;
            } else {
                min_alco = 10;
                max_alco = 30;
            }
        }
        for(let tmp = 0; tmp < cocktail.length; tmp++){
            if(pos[tmp]) {
                if (!(cocktail[tmp].alcohol >= min_alco && cocktail[tmp].alcohol <= max_alco))
                    pos[tmp] = 0;
                if(memoi[2] && cocktail[tmp].coffee === memoi[2])
                    pos[tmp] = 0;
                if(!memoi[3] && cocktail[tmp].tropical !== memoi[3])
                    pos[tmp] = 0;
            }
        }
        let no_result = 1;

        for(let i = 0; i < cocktail.length; i++) {
            if(pos[i] === 1) {
                no_result = 0;
                break;
            }
        }
        if(no_result) {
            detail_head.textContent = "no matching results... sorry...";
        } else {
            index = 0;
            console.log(cocktail.length);
            while(pos[++index % cocktail.length] !== 1)
                continue;
            index %= cocktail.length;
            detail_img.src = "./img/cocktail/" + (index + 1) +".jpg";
            detail_head.textContent = cocktail[index].engName;
            detail_korname.textContent = cocktail[index].korName;
            detail_alco.textContent = cocktail[index].alcohol + "도";
            detail_comment.textContent =  cocktail[index].comment;
            detail_recipe.textContent = cocktail[index].recipe;
            next_button.onclick = function () {
                while(pos[++index % cocktail.length] !== 1)
                    continue;
                index %= cocktail.length;
                console.log(index);
                detail_img.src = "./img/cocktail/" + (index + 1) +".jpg";
                detail_head.textContent = cocktail[index].engName;
                detail_korname.textContent = cocktail[index].korName;
                detail_alco.textContent = cocktail[index].alcohol + "도";
                detail_comment.textContent =  cocktail[index].comment;
                detail_recipe.textContent = cocktail[index].recipe;
            }
        }
        Kakao.init('459fb9bc6590a7d8a615ae9facd2548d');
        kakao_button.onclick = function() {
            console.log("asdf");
            Kakao.Link.sendDefault({
                objectType : 'feed',
                content : {
                    title : cocktail[index].korName,
                    description : '#칵테일 #' + cocktail[index].korName + ' #' + cocktail[index].alcohol + '도',
                    imageUrl : "https://baeronui.github.io/webTest/cocktail/" + (index + 1) +".jpg",
                    link : {
                        mobileWebUrl : '',
                        webUrl: '',
                    },
                },
                social: {
                    likeCount: 286,
                    commentCount: 45,
                    sharedCount: 845,
                },
            });
        }
    } catch (err) {
        console.log(err);
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
    recommend_cocktail();
};