// ゲーム変数
let streak = 0; // 連続正解数
let bestStreak = localStorage.getItem("bestStreak") || 1; // 自己ベストの分母値

// HTML要素
const fractionElem = document.getElementById("fraction");
const bestScoreElem = document.getElementById("best-score");
const guessButtons = document.querySelectorAll(".guess-btn");

// 初期表示
bestScoreElem.textContent = `1 分の ${bestStreak}`;
updateFraction();

// 分母を計算して更新する関数
function updateFraction() {
    const denominator = 2 ** (streak + 1); // 2の(streak+1)乗
    fractionElem.textContent = `1 分の ${denominator}`;
}

// ボタンイベント
guessButtons.forEach(button => {
    button.addEventListener("click", () => {
        const userGuess = parseInt(button.getAttribute("data-guess"));
        const denominator = 2 ** (streak + 1); // 現在の確率の分母
        const randomNumber = Math.floor(Math.random() * denominator) + 1; // 1〜denominatorのランダム生成

        if (userGuess === randomNumber) {
            // 正解した場合
            streak++; // 連続正解数を増加
            updateFraction();

            // ベストスコアを更新
            if (streak > bestStreak - 1) { // ベスト分母を比較
                bestStreak = 2 ** (streak + 1); // 新しい分母値を計算
                bestScoreElem.textContent = `1 分の ${bestStreak}`;
                localStorage.setItem("bestStreak", bestStreak);
            }
        } else {
            // 間違えた場合
            streak = 0; // 連続正解数をリセット
            updateFraction();
        }
    });
});
