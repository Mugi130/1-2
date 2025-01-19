// スコア、確率、およびローカルストレージを扱う変数
let currentScore = 0;
let bestScore = localStorage.getItem("bestScore") || 0;
let denominator = 2; // 初期確率の分母 (1/2)

// HTML要素を取得
const currentScoreElem = document.getElementById("current-score");
const bestScoreElem = document.getElementById("best-score");
const fractionElem = document.getElementById("fraction");
const guessButtons = document.querySelectorAll(".guess-btn");

// 初期表示
bestScoreElem.textContent = bestScore;
fractionElem.textContent = `1 / ${denominator}`;

// ボタンクリック時の処理
guessButtons.forEach(button => {
    button.addEventListener("click", () => {
        const userGuess = parseInt(button.getAttribute("data-guess"));
        const randomNumber = Math.floor(Math.random() * denominator) + 1; // 現在の確率でランダム生成

        if (userGuess === randomNumber) {
            // 正解した場合
            currentScore++;
            denominator *= 2; // 分母を倍増
            currentScoreElem.textContent = currentScore;
            fractionElem.textContent = `1 / ${denominator}`; // 確率を更新

            // ベストスコアを更新
            if (currentScore > bestScore) {
                bestScore = currentScore;
                bestScoreElem.textContent = bestScore;
                localStorage.setItem("bestScore", bestScore);
            }
        } else {
            // 間違えた場合
            alert("間違えました！スコアと確率がリセットされます。");
            currentScore = 0;
            denominator = 2; // 確率をリセット
            currentScoreElem.textContent = currentScore;
            fractionElem.textContent = `1 / ${denominator}`; // 確率をリセット
        }
    });
});
