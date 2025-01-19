// ゲーム変数
let currentScore = 0;
let bestScore = localStorage.getItem("bestScore") || 0;
let streak = 0; // 連続正解数

// HTML要素
const fractionElem = document.getElementById("fraction");
const currentScoreElem = document.getElementById("current-score");
const bestScoreElem = document.getElementById("best-score");
const guessButtons = document.querySelectorAll(".guess-btn");

// 初期表示
bestScoreElem.textContent = bestScore;
updateFraction();

// 分母を計算して更新する関数
function updateFraction() {
    const denominator = 2 ** (streak + 1); // 2の(streak+1)乗
    fractionElem.textContent = `${denominator} 分の 1`;
}

// ボタンイベント
guessButtons.forEach(button => {
    button.addEventListener("click", () => {
        const userGuess = parseInt(button.getAttribute("data-guess"));
        const denominator = 2 ** (streak + 1); // 現在の確率の分母
        const randomNumber = Math.floor(Math.random() * denominator) + 1; // 1〜denominatorのランダム生成

        if (userGuess === randomNumber) {
            // 正解した場合
            currentScore++;
            streak++; // 連続正解数を増加
            currentScoreElem.textContent = currentScore;
            updateFraction();

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
            streak = 0; // 連続正解数をリセット
            currentScoreElem.textContent = currentScore;
            updateFraction();
        }
    });
});
