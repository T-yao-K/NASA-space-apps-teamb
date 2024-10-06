// セットのデータを定義
const sets = [
    {
        backgroundImage: 'png/space1.png',
        description: '渦巻銀河NGC 1433をジェイムズ・ウェッブ宇宙望遠鏡（左上）とハッブル宇宙望遠鏡（右下）で観測した様子',
        bgmSource: 'audio/space1.wav'
    },
    {
        backgroundImage: 'png/space2.png',
        description: '画像全体を埋める薄いカーテンのような構造は、星団の星々の光を反射する星間物質で、反射星雲として知られています',
        bgmSource: 'audio/space2.wav'
    },
    {
        backgroundImage: 'png/space3.png',
        description: '彗星238P/Readが太陽に近づくにつれて水氷が昇華している様子',
        bgmSource: 'audio/space3.wav'
    },
    {
        backgroundImage: 'png/space4.png',
        description: '球状星団内のブラックホールのアーティストによる想像図',
        bgmSource: 'audio/space4.wav'
    },
    {
        backgroundImage: 'png/space5.png',
        description: 'ビッグバン後数億年で形成された初期の銀河の周りには、予想以上に密度の高い冷たいガスが存在していたことが観測されました',
        bgmSource: 'audio/space5.wav'
    },
];

let isZenMode = false;

document.addEventListener('DOMContentLoaded', () => {
    // ランダムにセットを選択
    const selectedSet = sets[Math.floor(Math.random() * sets.length)];

    // 背景画像を設定
    const backgroundImage = document.querySelector('.background-image');
    backgroundImage.style.backgroundImage = `url('${selectedSet.backgroundImage}')`;

    // 説明文を設定
    const descriptionCard = document.querySelector('.description-card');
    descriptionCard.textContent = selectedSet.description;

    // BGMのソースを設定
    const bgm = document.getElementById('bgm');
    bgm.src = selectedSet.bgmSource;

    // 音量の設定（必要に応じて調整）
    bgm.volume = 0.5;

    // 時計の更新を行う関数
    function updateClock() {
        const clockElement = document.getElementById('clock');
        const now = new Date();
        const hours = String(now.getHours()).padStart(2, '0');
        const minutes = String(now.getMinutes()).padStart(2, '0');
        const seconds = String(now.getSeconds()).padStart(2, '0');
        clockElement.textContent = `${hours}:${minutes}:${seconds}`;
    }

    // 1秒ごとに時計を更新
    setInterval(updateClock, 1000);
    updateClock();

    // 天気情報を表示する関数（サンプルデータ）
    function updateWeather() {
        const weatherElement = document.getElementById('weather');
        const weatherData = {
            location: 'Tokyo',
            temperature: '22°C',
            description: 'Clear Sky'
        };
        weatherElement.textContent = `${weatherData.location}: ${weatherData.temperature} - ${weatherData.description}`;
    }

    updateWeather();

    // 検索バーの機能を追加
    const searchBar = document.getElementById('searchBar');
    searchBar.addEventListener('keypress', function (event) {
        if (event.key === 'Enter') {
            performSearch();
        }
    });

    function performSearch() {
        const query = document.getElementById('searchBar').value.trim();
        if (query) {
            const googleSearchUrl = `https://www.google.com/search?q=${encodeURIComponent(query)}`;
            window.location.href = googleSearchUrl;
        } else {
            alert('検索キーワードを入力してください');
        }
    }

    // 背景画像をマウス操作で移動させるエフェクト
    document.addEventListener('mousemove', (event) => {
        const { clientX, clientY } = event;
        const centerX = window.innerWidth / 2;
        const centerY = window.innerHeight / 2;

        const moveX = (clientX - centerX) * 0.01;
        const moveY = (clientY - centerY) * 0.01;

        backgroundImage.style.transform = `translate(${moveX}px, ${moveY}px)`;
    });

    // 禅モードのトグル機能を追加
    document.addEventListener('keydown', (event) => {
        if (event.key === 'z' || event.key === 'Z') {
            toggleZenMode();
        }
    });

    // 全画面表示を切り替える関数
    function toggleFullScreen() {
        if (!document.fullscreenElement) {
            document.documentElement.requestFullscreen()
                .then(() => console.log("Entered full screen mode"))
                .catch((err) => console.error(`Error attempting to enable full-screen mode: ${err.message}`));
        } else {
            document.exitFullscreen()
                .then(() => console.log("Exited full screen mode"))
                .catch((err) => console.error(`Error attempting to exit full-screen mode: ${err.message}`));
        }
    }

    // 禅モードをトグルする関数
    function toggleZenMode() {
        isZenMode = !isZenMode;
        const contentWrapper = document.querySelector('.content-wrapper');
        const navbar = document.querySelector('.navbar');
        const zenModeInstruction = document.querySelector('.zen-mode-instruction');

        if (isZenMode) {
            // 全画面表示に切り替える
            toggleFullScreen();

            // 禅モードに切り替える
            contentWrapper.classList.add('zen-mode');
            navbar.classList.add('zen-mode');
            backgroundImage.classList.add('zen-mode');
            zenModeInstruction.style.display = 'none'; // 禅モード説明を非表示
            bgm.play();
        } else {
            // 全画面表示を解除
            toggleFullScreen();

            // 通常モードに戻す
            contentWrapper.classList.remove('zen-mode');
            navbar.classList.remove('zen-mode');
            backgroundImage.classList.remove('zen-mode');
            zenModeInstruction.style.display = 'block'; // 禅モード説明を表示
            bgm.pause();
        }
    }
});
