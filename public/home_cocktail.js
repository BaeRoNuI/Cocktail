const alcohol = [
    "진", "보드카", "럼", "테킬라", "위스키", "카시스", "미도리", "피치트리", "트리플섹", "깔루아"
]

async function recommend_cocktail() {
    try {
        Kakao.init('459fb9bc6590a7d8a615ae9facd2548d');
        const kakao_button = document.getElementById("kakao_button");
        kakao_button.style.visibility = "hidden";
        const res = await axios.get('/cocktail');
        const cocktail = res.data;
        select_alco(cocktail);
    } catch {
        console.error(404);
    }
}

function select_alco(cocktail) {
    const query = document.getElementById("query");
    const query_q = document.getElementById("query_q");
    const query_detail = document.getElementById("query_detail");
    const query_1 = document.getElementById("query_ans_1");
    const query_2 = document.getElementById("query_ans_2");

    const detail_block = document.getElementById("today_cocktail_detail");

    const memoi = Array.from({length: cocktail.length}, () => 0);
    let index = 0;

    detail_block.style.zIndex = "-3";
    query.style.zIndex = "3";

    query_q.textContent = alcohol[index] + " 있나요?";
    query_detail.textContent = "갖고있는 양주로 만들 수 있는 칵테일을 추천해 드려요.";
    query_1.textContent = "있어요";
    query_2.textContent = "없어요";

    query_1.onclick = function () {
        index++;
        if(index < alcohol.length){
            query_q.textContent = alcohol[index] + " 있나요?";
        } else {
            query.style.zIndex = "-3";
            show_recommend(memoi, cocktail);
        }
        setTimeout(function(){}, 1000);
    };

    query_2.onclick = function () {
        memoi[index++] = 1;
        if(index < alcohol.length) {
            query_q.textContent = alcohol[index] + " 있나요?";
        } else {
            query.style.zIndex = "-3";
            show_recommend(memoi, cocktail);
        }
        setTimeout(function(){}, 1000);
    };
}

function show_recommend(memoi, cocktail) {
    try {
        const pos = Array.from({length: cocktail.length}, () => 1);

        for(let i = 0; i < cocktail.length; i++) {
            if (
                (memoi[0] && cocktail[i].gin) ||
                (memoi[1] && cocktail[i].vodka) ||
                (memoi[2] && cocktail[i].rum) ||
                (memoi[3] && cocktail[i].tequila) ||
                (memoi[4] && cocktail[i].whiskey) ||
                (memoi[5] && cocktail[i].cassis) ||
                (memoi[6] && cocktail[i].midori) ||
                (memoi[7] && cocktail[i].peachTree) ||
                (memoi[8] && cocktail[i].tripleSec) ||
                (memoi[9] && cocktail[i].kahlua) ||
                !(cocktail[i].alcoholIngredient === "" || cocktail[i].alcoholIngredient === null)
            )
                pos[i] = 0;
        }
        let arr = [];
        for(let i = 0; i < pos.length; i++){
            if(pos[i])
                arr.push(i);
        }
        infinite_scroll(arr, cocktail);
    } catch (err) {
        console.log(err);
    }
}

function infinite_scroll(arr, cocktail) {
    console.log(arr);
    let index = 0;
    createPost(arr[index], cocktail[arr[index]])
    window.addEventListener('scroll',()=>{
        const {scrollHeight,scrollTop,clientHeight} = document.documentElement;
        if(scrollTop + clientHeight > scrollHeight - 5){
            index++;
            if(index < arr.length){
                createPost(arr[index], cocktail[arr[index]]);
                console.log(index);
            }
        }
    });
}

function createPost(index, cocktail) {
    const container = document.querySelector('.results_container');
    const post = document.createElement('div');
    const detail_head = document.getElementById("detail_head");
    const detail_img = document.getElementById("detail_img");
    const detail_korname = document.getElementById("detail_korname");
    const detail_alco = document.getElementById("detail_alco");
    const detail_comment = document.getElementById("detail_comment");
    const detail_recipe = document.getElementById("detail_recipe");
    const detail_block = document.getElementById("today_cocktail_detail");
    const kakao_button = document.getElementById("kakao_button");
    kakao_button.style.visibility = "hidden";


    setTimeout(() => {},2000);
    post.innerHTML = '<img class = "results_img" src = \"./img/cocktail/' + (index + 1) +
                    '.jpg\" alt = ' + (index + 1) + "img\"><br>" +
                    cocktail.korName + '<br>';
    post.className = "results_box";


    post.onclick = function () {
        detail_img.src = "./img/cocktail/" + (index + 1) +".jpg";
        detail_head.textContent = cocktail.engName;
        detail_korname.textContent = cocktail.korName;
        detail_alco.textContent = cocktail.alcohol + "도";
        detail_comment.textContent =  cocktail.comment;
        detail_recipe.textContent = cocktail.recipe;
        detail_block.style.zIndex = "4";
        detail_block.style.borderColor = "white";
        kakao_button.style.visibility = "visible";
        kakao_button.onclick = function() {
            Kakao.Link.sendDefault({
                objectType : 'feed',
                content : {
                    title : cocktail.korName,
                    description : '#칵테일 #' + cocktail.korName + ' #' + cocktail.alcohol + '도',
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

    }
    detail_block.onclick = function () {
        detail_block.style.zIndex = "-4";
        kakao_button.style.visibility = "hidden";
        detail_block.style.borderColor = "black";
        detail_img.src = "";
        detail_head.textContent = "";
        detail_korname.textContent = "";
        detail_alco.textContent = "";
        detail_comment.textContent = "";
        detail_recipe.textContent = "";
    }




    container.appendChild(post);
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