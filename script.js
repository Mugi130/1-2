// スコアとローカルストレージを扱う変数
let currentScore = 0;
let bestScore = localStorage.getItem("bestScore") || 0;

// HTML要素を取得
const currentScoreElem = document.getElementById("current-score");
const bestScoreElem = document.getElementById("best-score");
const guessButtons = document.querySelectorAll(".guess-btn");

// 初期表示
bestScoreElem.textContent = bestScore;

// ボタンクリック時の処理
guessButtons.forEach(button => {
    button.addEventListener("click", () => {
        const userGuess = parseInt(button.getAttribute("data-guess"));
        const randomNumber = Math.floor(Math.random() * 2) + 1; // 1または2をランダム生成

        if (userGuess === randomNumber) {
            // 正解した場合
            currentScore++;
            currentScoreElem.textContent = currentScore;

            // ベストスコアを更新
            if (currentScore > bestScore) {
                bestScore = currentScore;
                bestScoreElem.textContent = bestScore;
                localStorage.setItem("bestScore", bestScore);
            }
        } else {
            // 間違えた場合
            alert("間違えました！スコアはリセットされます。");
            currentScore = 0;
            currentScoreElem.textContent = currentScore;
        }
    });
});
