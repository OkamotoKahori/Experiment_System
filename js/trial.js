var filenames; // csvから読み込まれた音源の一覧
var i = 0; // 試行回数の初期化
var userID; // IDの格納
var soundName; // 再生する音源名の名前
var answer; // オノマトペの入力を格納
var timearea;
var countMax = 20; // 試行回数の設定
var fileNumber = Math.floor( Math.random() * 5 );     //読み込むcsvを選定

// ページが開かれたときの処理
window.onload = function() {
    console.log(fileNumber);
    // csvファイルの読み込み
    $.get('./csvData/' + fileNumber + '.csv')
        .done(function(data) {
            // 改行区切りで読み込み，１行目(ヘッダー)をカット
            filenames = data.split(/\r\n|\r|\n/).slice(1);
            // ランダムに並べ替える
            filenames.sort(
                function() {
                    return Math.random() * 100 - Math.random() * 100;
                });
            $('#all').append(filenames);
            soundName = filenames[i];
            console.log(soundName);
            console.log(filenames);

        });
    //IDの設定(時刻をもっておく)
    // 月日と時刻の取得(ID(txtファイル名)として使用)
    DD = new Date();
    Month = DD.getMonth() + 1; // 月
    Day = DD.getDate(); // 日
    Hours = DD.getHours(); // 時
    Minutes = DD.getMinutes(); // 分
    Seconds = DD.getSeconds(); // 秒
    MilliSeconds = DD.getMilliseconds(); // ミリ秒
    Now = (Month + "_" + Day + "_" + Hours + "_" + Minutes + "_" + Seconds + "_" + MilliSeconds); // アンダーバー区切りでつなげた
    var test = document.getElementById("ID");
    test.value = Now;
    console.log(test);
};

// 実験を始めるボタンをおした時の処理
$('#start').on('click', function() {
    userID = $('input[ID]').val();
    // userID = $('input[name="ID"]').val();
    // mainを空にする
    $('#main').empty();
    // mainに処理を表示する
    $('#main').append('<div class="header"><h1>■実験</h1></div>' +
        '<div class="main">' +
        '<div class="num"><p>現在<span id="index">1</span>/' + countMax + '回</p></div>' +
        '<div id="result"></div><br>' +
        '<p>この音を他の人が聞くと何と答えるでしょう？</p>' +
        '<form><div id="onomatope"></div>' +
        '<div id="TIME"></div>' +
        '<p>次の効果音へいくときは「次へ」ボタンをクリック</p>' +
        '<input id="next" type="button" value="次へ"></form></div>' +
        '<ul class="tabs">' +
        '<li>' +
        '<input type="radio" name="tabs" id="tab1" />' +
        '<label for = "tab1">オノマトペとは</label>' +
        '<div id="tab-content1" class="tab-content">' +
        '<p>オノマトペとは、例えば「カエルが“ぴょん”と飛んだ」の“ぴょん”という擬態語や「ライオンが“ガオー”と鳴いた」の“ガオー”という擬音語の総称のことです。</p>' +
        '</div>' +
        '</li>' +
        '<li>' +
        '<input type="radio" name="tabs" id="tab2" checked/>' +
        '<label for="tab2">実験概要</label>' +
        '<div id="tab-content2" class="tab-content">' +
        '<p>この効果音を他の人が聞いた時、他の人はどのようなオノマトペでこの効果音を表現するのかを予想したものを、なるべくたくさん回答してください。<br>効果音は何度聞き直しても構いません。</p>' +
        '</div>' +
        '</li>' +
        '<li>' +
        '<input type="radio" name="tabs" id="tab3" />' +
        '<label for="tab3">操作方法</label>' +
        '<div id="tab-content3" class="tab-content">' +
        '<p>回答をフォームに入力した後、「次へ」ボタンを押すと次の効果音へ移ります。何も記入がなければ、ボタンを押しても次の音源へ移りません。</p>' +
        '</div>' +
        '</li>' +
        '</ul>');

    changeSound(filenames[i]);
});


// 次へボタンを押した時の処理
$(document).on('click', '#next', function() {
    // オノマトペ記入欄に何も記入せずにボタンを押した時の処理
    if ($('textarea[name="onomatope"]').val().length == 0) {
        console.log("0ですよ");
        // 記入してある状態で次へが押された時の処理
    } else {
        answer = $('textarea[name="onomatope"]').val(); // answerに記入欄の中身を格納
        time = $('input[name="time"]').val(); //時刻の格納
        console.log(answer);
        console.log(time);

        writeSoundImpression();
        soundName = filenames[i + 1]; // 次の音源を指定
        i += 1; // 試行回数をプラス１

        // 最後まで試行したらエンドページへ飛ぶ
        if (countMax <= i) {
            // mainを空にする
            $('#main').empty();
            // mainに処理を表示
            $('#main').append('<div class="header"><h1>■実験終了</h1></div>' +
                '<div class="main"><p>お疲れ様でした。本日の実験はこれにて終了です。</p>' +
                '<p>お忙しい中、ご協力いただきありがとうございました。</p>' +
                '<p>本実験に関する疑問や苦情などがございましたら、遠慮なく下記の連絡先にご連絡ください。</p>' +
                '<p>本実験で取得したデータの削除のご依頼なども、こちらの連絡先にご連絡ください。</p>' +
                '<div class="address">' +
                '<p>〒569-1052' +
                '<br />大阪府高槻市霊仙寺町2丁目1-1' +
                '<br />関西大学総合情報学部松下研究室' +
                '<br />4年　岡本　香帆里(実験責任者)' +
                '<br />TEL: 072-690-2161' +
                '<br />E-mail: k317680☆kansai-u.ac.jp (☆は＠に置き換えてください)</p>' +
                '</div></div>');
        }
        // 試行回数をプラス１する
        $('#index').text(i + 1);
        changeSound(filenames[i]);
    }
});

// 音源を変える処理
function changeSound(filename) {
    // resultを空にする
    $('#result').empty();
    // 音源再生部を更新
    $('#result').append('<audio controls autoplay><source src="./sound/' + filename + '.wav" type="audio/wav"></audio>');

    // オノマトペ記入欄を空にする
    $('#onomatope').empty();
    // オノマトペ記入欄を表示
    $('#onomatope').append('<textarea name="onomatope" class="onomatope" rows="6" cols="80" placeholder="オノマトペを入力してください。" autofocus></textarea><br>');

    //時間部分を空にする
    $('#TIME').empty();
    //時間を入力
    $('#TIME').append('<input id="time" type="hidden" name="time">');
    //時刻の取得
    DD = new Date();
    Hours = DD.getHours(); // 時
    Minutes = DD.getMinutes(); // 分
    Seconds = DD.getSeconds(); // 秒
    Time = (Hours + ":" + Minutes + ":" + Seconds); // アンダーバー区切りでつなげた


    var timearea = document.getElementById("time");
    timearea.value = Time;
    console.log(timearea);
}

// phpの処理
function writeSoundImpression(filename) {
    $.ajax({
        url: 'write.php',
        type: 'POST',
        async: true,
        data: {
            'ID': userID,
            'fileNumber': fileNumber,
            'name': soundName,
            'ans': answer,
            'time': time
        }

    }).success(function(data) {
        console.log(data);
    }).error(function() {
        console.log('error');
    });
}
