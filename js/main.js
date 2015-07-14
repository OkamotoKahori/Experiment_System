window.onload = function() {
    var userAgent = window.navigator.userAgent.toLowerCase();
    var appVersion = window.navigator.appVersion.toLowerCase();

    if (userAgent.indexOf('firefox') != -1 || userAgent.indexOf('msie') != -1) {
        $('#main').empty();
        $('#main').append(
            '<div class="header">' +
            '<h1>■お詫び</h1>' +
            '</div>' +
            '<div class="space"></div>' +
            '<h2>ブラウザ非対応のお知らせ</h2>' +
            '<p>実験にご協力いただき、ありがとうございます。</p>' +
            '<p>申し訳ございませんが、本ブラウザは本実験システムに対応していません。</p>' +
            '<p>ですので、本ブラウザ以外からのご協力をお願いいたします。</p>');
        console.log('firefox');
    }
}

$('#ok').on('click', function() {
    var judge;
    judge = $("input[name='inform']:checked").val();
    if (judge == 'yes') {
        $('#main').empty();
        $('#main').append(
            '<div class="header">' +
            '<h1>■実験説明</h1>' +
            '</div>' +
            '<div class="space"></div>' +
            '<h2>オノマトペとは</h2>' +
            '<p>擬態語や擬音語の総称のことです。</p>' +
            '<p>例えば、「カエルが“ぴょん”と飛んだ」の“ぴょん”、「星が“キラキラ”光っている」の“キラキラ”が擬態語、<br />「ライオンが“ガオー”と鳴いた」の“ガオー”、「電話が“リンリン”鳴っている」の“リンリン”が擬音語です。</p>' +
            '<p>実験では、このオノマトペで回答していただきます。</p>' +
            '<input id="next" type="button" value="次へ">');
    }
    $('#next').on('click', function() {
        location.href = "description.html";
    });

});

$('#next').on('click', function() {
    location.href = "main.html";
});
