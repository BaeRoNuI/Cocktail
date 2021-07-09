async function getCocktail(num) {
    try {
        const res = await axios.get('/cocktail');
        const cocktail = res.data;
        let randCocktail = (num * 1201) % cocktail.length;
        console.log(cocktail[randCocktail]);
        const img = document.getElementById("today_cocktail_img");
        const name = document.getElementById("today_cocktail_name");
        const block = document.getElementById("today_cocktail");

        const detail_block = document.getElementById("today_cocktail_detail");
        const detail_head = document.getElementById("detail_head");
        const detail_img = document.getElementById("detail_img");
        const detail_korname = document.getElementById("detail_korname");
        const detail_alco = document.getElementById("detail_alco");
        const detail_comment = document.getElementById("detail_comment");
        const detail_recipe = document.getElementById("detail_recipe");
        const kakao_button = document.getElementById("kakao_button");

        img.src = "./img/cocktail/" + (randCocktail + 1) +".jpg";
        name.textContent = cocktail[randCocktail].korName;

        detail_img.src = "./img/cocktail/" + (randCocktail + 1) +".jpg";
        detail_head.textContent = cocktail[randCocktail].engName;
        detail_korname.textContent = cocktail[randCocktail].korName;
        detail_alco.textContent = cocktail[randCocktail].alcohol + "도";
        detail_comment.textContent =  cocktail[randCocktail].comment;
        detail_recipe.textContent = cocktail[randCocktail].recipe;
        block.onclick = function () {
            detail_block.style.zIndex = "2";
        }
        detail_block.onclick = function () {
            detail_block.style.zIndex = "-2";
        }
        Kakao.init('459fb9bc6590a7d8a615ae9facd2548d');
        kakao_button.onclick = function() {
            Kakao.Link.sendDefault({
                objectType : 'feed',
                content : {
                    title : cocktail[randCocktail].korName,
                    description : '#칵테일 #' + cocktail[randCocktail].korName + ' #' + cocktail[randCocktail].alcohol + '도',
                    imageUrl : "https://baeronui.github.io/webTest/cocktail/" + (randCocktail + 1) +".jpg",
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
    } catch {
        console.error(404);
    }
}


window.onload = function() {
    const sideButton = document.getElementById("sidebar_button");
    const sideBar = document.getElementById("sidebar");
    let state = 0;
    let now = new Date();
    let rand = now.getDate();


    sideButton.src = "./img/bugger_icon.png";
    console.log(sideButton.src);

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


    getCocktail(rand);
};